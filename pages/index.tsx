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
          setLoading(true)
           const response = await EmployeeService.getEmployees();
           console.log(response?.data);
           const data = response?.data?.data;
           setEmployeeData(data);
           setLoading(false)
         } catch (error: any) {
           console.log(error);
           setLoading(false)
         }
       };

       //loads data from API when page loads

  useEffect(()=>{
     getEmployeesRequest()

  }, [])


  
  return (
    <main className="flex flex-col items-center w-[100%]  md:px-16">
      <div className="flex w-[100%] justify-between items-center py-4">
        <h1 className="ml-auto self-center font-bold text-center text-2xl md:pl-24">
          Current Employees
        </h1>
        {/* when button is clicked, it sets the selected employee variable to use the default newEmployee object*/}
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
        <p>Please wait a moment. Loading employee data...</p>
      ) : (
        //employee data fetched from the backend API is passed as a prop to the table component, 
        //the handleclick function is also passed to allow each row load its individual data, 
        //selectedEmployee state  is passed as a prop and can be set in the table component with handleClick
        <Table
          data={employeeData}
          handleClick={handleClick}
          selectedEmployee={selectedEmployee}
        />
      )}

      {showEmployeeInfo && (

        //when a row is clicked in the table or "add new employee" button is clicked,
        // Selected employee data is passed to and rendered in the info component

        <Info
          selectedEmployee={selectedEmployee}
          isNewEmployee={isNewEmployee}
          getEmployees={getEmployeesRequest}
        />
      )}
    </main>
  );
}
