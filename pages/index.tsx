import { Button, Table, Info } from "@/components";
import { useEffect, useState } from "react";
import { TData } from "@/components/Table/Table";
import { EmployeeService } from "@/services";



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
  const [loading, setLoading] = useState(false)

  const handleClick = (employee: TData) => {
    setShowEmployeeInfo(true);
    setSelectedEmployee(employee);
    setIsNewEmployee(false)
  };

       const getEmployeesRequest = async () => {
         try {
           const response = await EmployeeService.getEmployees();
           console.log(response?.data);
           const data = response?.data?.data;
           setEmployeeData(data);
         } catch (error: any) {
           console.log(error);
         }
       };

  useEffect(()=>{
     getEmployeesRequest()

  }, [])


  
  return (
    <main className="flex flex-col items-center w-[100%]  md:px-16">
      <div className="flex w-[100%] justify-between items-center py-4">
        <h1 className="ml-auto self-center font-bold text-center text-2xl md:pl-24">
          Current Employees
        </h1>
        <Button
          className="ml-auto"
          onClick={() => {
            setShowEmployeeInfo(true);
            setSelectedEmployee(newEmployee);
            setIsNewEmployee(true);
          }}
        >
          Add Employee
        </Button>
      </div>
      {loading ? (
        <p>Loading employee data...</p>
      ) : (
        <Table
          data={employeeData}
          handleClick={handleClick}
          selectedEmployee={selectedEmployee}
        />
      )}

      {showEmployeeInfo && (
        <Info
          selectedEmployee={selectedEmployee}
          isNewEmployee={isNewEmployee}
          getEmployees={getEmployeesRequest}
        />
      )}
    </main>
  );
}
