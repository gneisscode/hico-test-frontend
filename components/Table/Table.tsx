import React from "react";

export type Salutation = "Dr." | "Mr." | "Ms." | "Mrs." | "Mx.";
export type ProfileColour = "Green" | "Red" | "Blue" | "Default";
export type Gender = "male" | "female" | "unspecified"

export type TData = {
  employeeNo: number | null;
  firstName: string;
  lastName: string;
  salutation: Salutation;
  gender: Gender;
  profileColour: ProfileColour;
  grossSalary: string | null;
};

const Table = ({ data, handleClick, selectedEmployee }: any) => {
  const headings = [
    "Employee #",
    "First Name",
    "Last Name",
    "Salutation",
    "Profile Colour",
  ];

  return (
    <div className="flex md:p-16 w-[100%]">
      {data.length > 0 ? (
        <table className="table-auto w-[100%]">
          <thead>
            <tr className=" bg-gray-300">
              {headings.map((heading, index) => {
                return (
                  <th key={index} className=" text-left">
                    {heading}
                  </th>
                );
              })}
            </tr>
          </thead>

          <tbody>
            {data?.map((employee: TData, index: number) => {
              return (
                <tr
                  key={index}
                  className={`${
                    selectedEmployee?.employeeNo == employee.employeeNo
                      ? "bg-blue-200 border-4 border-blue-300"
                      : "even:bg-blue-100"
                  }  cursor-pointer hover:bg-blue-200 transition-colors 150 ease-linear`}
                  onClick={() => {
                    handleClick(employee);
                  }}
                >
                  <td>{employee.employeeNo}</td>
                  <td>{employee.firstName}</td>
                  <td>{employee.lastName}</td>
                  <td>{employee.salutation}</td>
                  <td>{employee.profileColour}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      ) : (
        <div className="flex justify-center items-center w-[100%] ">
          <p>No employee found, add new employee</p>
        </div>
      )}
    </div>
  );
};

export default Table;
