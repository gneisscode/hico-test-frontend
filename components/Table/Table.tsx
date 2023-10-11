import React from "react";

export type dataType = {
  employeeNo: string;
  firstName: string;
  lastName: string;
  salutation: string;
  profileColour: "Green" | "Red" | "Blue" | "Default";
  grossSalary: string
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
    <div className="flex justify-center p-16 w-[100%]">
      <table className="table-auto w-[100%]">
        <tr className=" bg-gray-300">
          {headings.map((heading, index) => {
            return (
              <th key={index} className=" text-left">
                {heading}
              </th>
            );
          })}
        </tr>
        <tbody>
          {data.map(
            (
              employee: dataType,
              index: number
            ) => {
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
            }
          )}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
