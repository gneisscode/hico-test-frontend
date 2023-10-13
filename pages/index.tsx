import { Inter } from "next/font/google";
import { Button, Table, Info } from "@/components";
import { useEffect, useState } from "react";
import { TData } from "@/components/Table/Table";
import { EmployeeService } from "@/services";



const inter = Inter({ subsets: ["latin"] });

export default function Home() {

  const newEmployee: TData = {
    employeeNo: null,
    firstName: "",
    lastName: "",
    salutation: "Dr.",
    profileColour: "Default",
    grossSalary:null,
    gender: "male"
  };

  const [employeeData, setEmployeeData] = useState([])
  const [showEmployeeInfo, setShowEmployeeInfo] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState<null | TData>(
    null
  );
  const [isNewEmployee, setIsNewEmployee] = useState(false)

  const handleClick = (employee: TData) => {
    setShowEmployeeInfo(true);
    setSelectedEmployee(employee);
    setIsNewEmployee(false)
  };

       const getEmployeesRequest = async () => {
         try {
           const response = await EmployeeService.getEmployees();
           console.log(response.data);
           const data = response.data?.data;
           setEmployeeData(data);
         } catch (error: any) {
           console.log(error);
           throw new Error(
             error?.response?.data?.message || "An error occurred"
           );
         }
       };

  useEffect(()=>{
     getEmployeesRequest()

  }, [])


  
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
              setIsNewEmployee(true)
            }}
          >
            Add Employee
          </Button>
        </div>
        <Table
          data={employeeData}
          handleClick={handleClick}
          selectedEmployee={selectedEmployee}
        />
        {showEmployeeInfo && <Info selectedEmployee={selectedEmployee} isNewEmployee={isNewEmployee} getEmployees={getEmployeesRequest} />}
      </main>
    </>
  );
}
