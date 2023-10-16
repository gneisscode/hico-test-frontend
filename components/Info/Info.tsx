import React, { useEffect, useState } from "react";
import { Button, Input } from "..";
import { EmployeeService } from "@/services";
import { formatSalary, handleAlphabeticInput, handleNumericInput } from "@/utils";
import { Gender } from "../Table/Table";

const Info = ({ selectedEmployee, isNewEmployee, getEmployees }: any) => {
  const [fullName, setFullName] = useState("");
  const [selectedCheckbox, setSelectedCheckbox] = useState("Default");
  const [selectedGender, setSelectedGender] = useState<Gender>(selectedEmployee.gender);
  const [message, setMessage] = useState("")
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false)

  const initialFormState = {
    firstName: selectedEmployee.firstName,
    lastName: selectedEmployee.lastName,
    salutation: selectedEmployee.salutation,
    employeeNo: selectedEmployee.employeeNo || "",
    profileColour: selectedEmployee.profileColour,
    grossSalary: formatSalary(selectedEmployee.grossSalary) || "",
    gender: selectedEmployee.gender,
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
    { id: "male", label: "Male" },
    { id: "female", label: "Female" },
    { id: "unspecified", label: "Unspecified" },
  ];

  //mapping salutations to specific genders for autopopulate functionality

  const salutationToGenderMap = {
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

    switch (name) {
      case "profileColour":
        newValue = checked ? value : "";
        break;
      case "grossSalary":
        const numberValue = parseFloat(value.replace(/,/g, " "));
        newValue = isNaN(numberValue) ? "" : numberValue.toLocaleString();
        break;
      case "employeeNo":
        newValue = handleNumericInput(value);
        break;
      case "firstName":
      case "lastName":
        newValue = handleAlphabeticInput(value);
        break;

      default:
        newValue = value;
    }

    setFormData({ ...formData, [name]: newValue });
  };

  //function to remove all changes and reset form to initial state as at when component mounted

  const resetform = () => {
    setFormData(initialFormState);
    setSelectedCheckbox(selectedEmployee.profileColour || "Default");
  };


  //autofill specific fields based on selected employee data

  useEffect(() => {
    if (selectedEmployee) {
      setFullName(selectedEmployee.firstName + " " + selectedEmployee.lastName);
      setFormData(initialFormState);
      setSelectedCheckbox(selectedEmployee.profileColour || "Default");

      setSelectedGender(
        //@ts-ignore
        salutationToGenderMap[selectedEmployee.salutation] || selectedEmployee.gender
      );
      setMessage("")
      setError("")
    }
  }, [selectedEmployee]);



  //autopopulate gender based on selected salutation 

  useEffect(() => {
    //@ts-ignore
    setSelectedGender(salutationToGenderMap[formData.salutation] || selectedEmployee.gender);
  }, [formData.salutation]);



  //autofill full name field when user types inside first name or last name field

  useEffect(() => {
    setFullName(formData.firstName + " " + formData.lastName);
  }, [formData.firstName, formData.lastName]);


  

  //request for saving form details, sends to either addEmployee or updateEmployee endpoint 
  //depending on if isNewEmployee is true. After request is made getEmployees is called again to update table data.

  const UpdateEmployeeRequest = async (e: any) => {
    e.preventDefault();

    try {
      if (isNewEmployee) {
        setLoading(true)
        const response = await EmployeeService.AddEmployee(formData);
        console.log(response?.data);
        setMessage(response?.data?.message)
        setLoading(false);
        return getEmployees();
      }

      setLoading(true);
      const id = selectedEmployee._id;
      const formDataWithId = {
        ...formData,
        id: id,
      };
      const response = await EmployeeService.UpdateEmployee(formDataWithId);
      console.log(response.data);
       setMessage(response.data?.message);
       setLoading(false);
      return getEmployees();
    } catch (error: any) {
      console.log(error);
      setError(error?.response?.data?.message || "An error occurred");
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center gap-16 w-[100%] p-4 md:p-16 md:border border-gray-300 mb-16">
      <h1 className="font-bold text-xl">Employee Information</h1>

      {error && (
        <p
          data-testid="error-message"
          className="text-red-500 font-bold text-md"
        >
          {error}
        </p>
      )}

      {message && (
        <p
          data-testid="success-message"
          className="text-green-500 font-bold text-md"
        >
          {message}
        </p>
      )}

      <form
        onSubmit={UpdateEmployeeRequest}
        className=" flex flex-col gap-24 w-[100%]"
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
            {loading ? "Saving..." : "Save"}
          </Button>
        </div>

        <div className="flex flex-col gap-4 lg:gap-0 lg:flex-row md:justify-between md:pl-0 w-[100%]">
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
              <label htmlFor="salutation" className="min-w-[180px]">
                Salutation &nbsp;*
              </label>

              <select
                name="salutation"
                id="salutation"
                value={formData.salutation}
                onChange={(e) => handleInputChange(e)}
                className="border border-black md:w-[350px] p-1"
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
              <p className="min-w-[180px]"> Gender &nbsp;*</p>

              <div className="flex gap-2  md:gap-16">
                {genders.map((gender, index) => {
                  return (
                    <div className="flex gap-2" key={index}>
                      <input
                        type="radio"
                        id={gender.id}
                        name="gender"
                        value={gender.id}
                        checked={selectedGender === gender.id}
                        onChange={() => {
                          //@ts-ignore
                          setSelectedGender(gender.id);
                          setFormData({
                            ...formData, //@ts-ignore
                            gender: gender.id,
                          });
                        }}
                      />
                      <label htmlFor={gender.id}>{gender.label}</label>
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
              className=" text-end"
            />
          </div>
          <div className="flex flex-col gap-4">
            <Input
              name="fullName"
              label="Full Name"
              required={true}
              value={fullName}
              readOnly={true}
              disabled={true}
            />

            <Input
              name="grossSalary"
              label="Gross Salary $PY"
              required={true}
              value={formData.grossSalary}
              onChange={(e) => handleInputChange(e)}
              className="text-end"
            />

            <div className="flex gap-2">
              <p className=" min-w-[180px]"> Employee Profile Colour</p>
              <div className="flex gap-2 md:gap-4">
                {checkboxes.map((checkbox, index) => {
                  return (
                    <div className="flex gap-1 md:gap-2" key={index}>
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
