import { Inter } from "next/font/google";
import { Button, Table, Info } from "@/components";
import { useState } from "react";
import { dataType } from "@/components/Table/Table";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const newEmployee: dataType = {
    employeeNo: "",
    firstName: "",
    lastName: "",
    salutation: "",
    profileColour: "Default",
    grossSalary:""
  };
  const data = [
    {
      employeeNo: "12345678",
      firstName: "Shalom David",
      lastName: "Effiom",
      salutation: "Mr.",
      profileColour: "Blue",
      grossSalary: "560000",
    },
    {
      employeeNo: "12345578",
      firstName: "Archibald Eusebius Jonathan",
      lastName: "van der Merwe",
      salutation: "Mx.",
      profileColour: "Green",
      grossSalary: "760000000",
    },
    {
      employeeNo: "12245678",
      firstName: "Emmanuella Biye",
      lastName: "Ikwen",
      salutation: "Ms.",
      profileColour: "Red",
      grossSalary: "230000",
    },
  ];

  const [showEmployeeInfo, setShowEmployeeInfo] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState<null | dataType>(
    null
  );

  const handleClick = (employee: dataType) => {
    setShowEmployeeInfo(true);
    setSelectedEmployee(employee);
  };
  return (
    <>
      <main className="flex flex-col items-center">
        <div className="flex w-full  justify-center items-center p-4">
          <h1 className="ml-auto self-center font-bold text-center text-xl pl-24">
            Current Employees
          </h1>
          <Button
            className="ml-auto"
            onClick={() => {
              setShowEmployeeInfo(true);
              setSelectedEmployee(newEmployee);
            }}
          >
            Add Employee
          </Button>
        </div>
        <Table
          data={data}
          handleClick={handleClick}
          selectedEmployee={selectedEmployee}
        />
        {showEmployeeInfo && <Info selectedEmployee={selectedEmployee} />}
      </main>
    </>
  );
}
