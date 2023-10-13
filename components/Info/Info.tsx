import React, { useEffect, useState } from "react";
import { Button, Input } from "..";
import { EmployeeService } from "@/services";
import { formatSalary } from "@/utils";
import { Gender } from "../Table/Table";

const Info = ({ selectedEmployee, isNewEmployee }: any) => {


  const [fullName, setFullName] = useState("");
  const [selectedCheckbox, setSelectedCheckbox] = useState("Default");
  const [selectedGender, setSelectedGender] = useState<Gender>("male");
 
  const initialFormState = {
    firstName: selectedEmployee.firstName || "",
    lastName: selectedEmployee.lastName || "",
    salutation: selectedEmployee.salutation || "",
    employeeNo: selectedEmployee.employeeNo || "",
    profileColour: selectedEmployee.profileColour || "",
    grossSalary: formatSalary(selectedEmployee.grossSalary )|| "",
    gender:selectedGender
  };

  const [formData, setFormData] = useState(initialFormState);


  const checkboxes = [
    { id: "Green", label: "Green" },
    { id: "Blue", label: "Blue" },
    { id: "Red", label: "Red" },
    { id: "Default", label: "Default" },
  ];

  const salutations = [
    { value: "Dr.", label: "Dr." },
    { value: "Mr.", label: "Mr." },
    { value: "Ms.", label: "Ms." },
    { value: "Mrs.", label: "Mrs." },
    { value: "Mx.", label: "Mx." },
  ];

  const genders = [
    {id:"male", label:"Male"},
    {id:"female", label: "Female"},
    {id: "unspecified", label: "Unspecified"}

  ]

  const salutationToGenderMap = {
    "Dr.": "unspecified",
    "Mr.": "male",
    "Ms.": "female",
    "Mrs.": "female",
    "Mx.": "unspecified",
  };


  const handleCheck = (id: string) => {
    setSelectedCheckbox(id);
  };

  const handleInputChange = (e: any) => {
    const { name, value, type, checked } = e.target;
     let newValue;

     if (type === "checkbox") {
       newValue = checked ? value : "";
     } else if (name === "grossSalary") {
       const numberValue = parseFloat(value.replace(/,/g, ""));
       newValue = isNaN(numberValue) ? "" : numberValue.toLocaleString();
     } else {
       newValue = value;
     }

    setFormData({ ...formData, [name]: newValue });
  };

  const resetform = () => {
    setFormData(initialFormState);
    setSelectedCheckbox(selectedEmployee.profileColour || "Default");
  };

  useEffect(() => {
    if (selectedEmployee) {
      setFullName(selectedEmployee.firstName + " " + selectedEmployee.lastName);
      setFormData(initialFormState);
      setSelectedCheckbox(selectedEmployee.profileColour || "Default");

      setSelectedGender(
        //@ts-ignore
        salutationToGenderMap[selectedEmployee.salutation] || "male"
      );
    }
  }, [selectedEmployee]);

  useEffect(() => {
    //@ts-ignore
    setSelectedGender(salutationToGenderMap[formData.salutation] || "male");
  }, [formData.salutation]);

  useEffect(() => {
    setFullName(formData.firstName + " " + formData.lastName);
  }, [formData.firstName, formData.lastName]);



  const UpdateEmployeeRequest = async (e:any) => {
    e.preventDefault();

    try {
       if (isNewEmployee) {
        const response = await EmployeeService.AddEmployee(formData)
         console.log(response.data);
       }

      const id = selectedEmployee._id
      const formDataWithId = {
        ...formData,
        id:id
      }
      const response = await EmployeeService.UpdateEmployee(formDataWithId)
      console.log(response.data);
    } catch (error: any) {
      console.log(error);
      throw new Error(error?.response?.data?.message || "An error occurred");
    }
  };





  return (
    <div className="flex flex-col items-center  gap-16 w-[100%] p-16">
      <h1 className="font-bold font-xl">Employee Information</h1>

      <form
        onSubmit={UpdateEmployeeRequest}
        className=" flex flex-col items-center gap-24 w-[100%]"
      >
        <div className=" flex self-end gap-4">
          <Button
            className=""
            onClick={() => {
              resetform();
            }}
            disabled={
              !Object.keys(formData).some(
                //@ts-ignore
                (key) => formData[key] !== initialFormState[key]
              )
            }
          >
            Cancel
          </Button>
          <Button
            className={`${
              selectedCheckbox === "Blue"
                ? "!bg-blue-400"
                : selectedCheckbox === "Red"
                ? "!bg-red-400"
                : selectedCheckbox === "Green"
                ? "!bg-green-400"
                : ""
            } transition-colors delay-150 ease-linear`}
          >
            Save
          </Button>
        </div>

        <div className="flex justify-between w-[100%]">
          {" "}
          <div className="flex flex-col gap-4">
            <Input
              name="firstName"
              value={formData.firstName}
              label="First Name(s)"
              required={true}
              onChange={(e) => {
                handleInputChange(e);
              }}
            />
            <Input
              name="lastName"
              value={formData.lastName}
              label="Last Name"
              required={true}
              onChange={(e) => {
                handleInputChange(e);
              }}
            />
            <div className="flex w-[100%] gap-2">
              <label htmlFor="salutation" className=" min-w-[180px]">
                Salutation &nbsp;*
              </label>

              <select
                name="salutation"
                id="salutation"
                value={formData.salutation}
                onChange={(e) => handleInputChange(e)}
                className="border border-black"
              >
                {salutations.map(({ label, value }, index) => {
                  return (
                    <option value={value} key={index}>
                      {label}
                    </option>
                  );
                })}
              </select>
            </div>

            <div className="flex gap-2">
              <p className=" min-w-[180px]"> Gender &nbsp;*</p>

              <div className="flex gap-16">
                {genders.map((gender, index) => {
                  return (
                    <div className="flex gap-2" key={index}>
                      <label htmlFor={gender.id}>{gender.label}</label>
                      <input
                        type="radio"
                        id={gender.id}
                        name="gender"
                        value={gender.id}
                        checked={selectedGender === gender.id}
                      />
                    </div>
                  );
                })}
              </div>
            </div>

            <Input
              name="employeeNo"
              label="Employee#"
              required={true}
              value={formData.employeeNo}
              onChange={(e) => handleInputChange(e)}
            />
          </div>
          <div className="flex flex-col gap-4">
            <Input
              name="fullName"
              label="Full Name"
              required={true}
              value={fullName}
              readOnly={true}
            />

            <Input
              name="grossSalary"
              label="Gross Salary $PY"
              required={true}
              value={formData.grossSalary}
              onChange={(e) => handleInputChange(e)}
            />

            <div className="flex gap-2">
              <p className=" min-w-[180px]"> Employee Profile Colour</p>
              <div className="flex gap-4">
                {checkboxes.map((checkbox, index) => {
                  return (
                    <div className="flex gap-2" key={index}>
                      <input
                        type="checkbox"
                        id={checkbox.id}
                        name="profileColour"
                        value={checkbox.id}
                        checked={selectedCheckbox === checkbox.id}
                        onChange={(e) => {
                          handleCheck(checkbox.id);
                          handleInputChange(e);
                        }}
                      />
                      <label htmlFor={checkbox.id}>{checkbox.label}</label>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Info;
