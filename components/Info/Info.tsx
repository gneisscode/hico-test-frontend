import React, { useEffect, useState } from "react";
import { Button, Input } from "..";
import { formatSalary } from "@/utils";

const Info = ({ selectedEmployee }: any) => {
  const [fullName, setFullName] = useState("");
  const [selectedCheckbox, setSelectedCheckbox] = useState("Default");
  const [selectedGender, setSelectedGender] = useState("male");
 
  const initialFormState = {
    firstName: selectedEmployee.firstName || "",
    lastName: selectedEmployee.lastName || "",
    salutation: selectedEmployee.salutation || "",
    employeeNo: selectedEmployee.employeeNo || "",
    profileColour: selectedEmployee.profileColour || "",
    grossSalary: formatSalary(selectedEmployee.grossSalary )|| "",
  };

  const checkboxes = [
    { id: "Green", text: "Green" },
    { id: "Blue", text: "Blue" },
    { id: "Red", text: "Red" },
    { id: "Default", text: "Default" },
  ];

  const salutations = [
    { value: "Dr.", text: "Dr." },
    { value: "Mr.", text: "Mr." },
    { value: "Ms.", text: "Ms." },
    { value: "Mrs.", text: "Mrs." },
    { value: "Mx.", text: "Mx." },
  ];

  const salutationToGenderMap = {
    "Dr.": "unspecified",
    "Mr.": "male",
    "Ms.": "female",
    "Mrs.": "female",
    "Mx.": "unspecified",
  };

  const [formData, setFormData] = useState(initialFormState);

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

  useEffect(() => {
    console.log(formData);
  }, [formData]);

  return (
    <div className="flex flex-col items-center  gap-16 w-[100%] p-16">
      <h1 className="font-bold font-xl">Employee Information</h1>

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
            selectedCheckbox === "Default"
              ? ""
              : selectedCheckbox === "Red"
              ? "bg-red-400"
              : selectedCheckbox === "Green"
              ? "bg-green-400"
              : "bg-blue-400"
          } transition-colors delay-150 ease-linear`}
          onClick={() => {}}
        >
          Save
        </Button>
      </div>

      <div className=" flex justify-center gap-24">
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
              {salutations.map(({ text, value }, index) => {
                return (
                  <option value={value} key={index}>
                    {text}
                  </option>
                );
              })}
            </select>
          </div>

          <div className="flex gap-2">
            <p className=" min-w-[180px]"> Gender &nbsp;*</p>

            <div className="flex gap-16">
              <div className="flex gap-2">
                <label htmlFor="male">Male</label>
                <input
                  type="radio"
                  id="male"
                  name="gender"
                  value="male"
                  checked={selectedGender === "male"}
                />
              </div>

              <div className="flex gap-2">
                <label htmlFor="female">Female</label>
                <input
                  type="radio"
                  id="female"
                  name="gender"
                  value="female"
                  checked={selectedGender === "female"}
                />
              </div>

              <div className="flex gap-2">
                <label htmlFor="unspecified">Unspecified</label>
                <input
                  type="radio"
                  id="unspecified"
                  name="gender"
                  value="unspecified"
                  checked={selectedGender === "unspecified"}
                />
              </div>
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
                    <label htmlFor={checkbox.id}>{checkbox.text}</label>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Info;
