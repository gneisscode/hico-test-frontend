import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import Table from "../components/Table/Table";

describe("Table Component", () => {
  const sampleData = [
    {
      employeeNo: 1,
      firstName: "John",
      lastName: "Doe",
      salutation: "Mr.",
      gender: "male",
      profileColour: "Green",
      grossSalary: "100000",
    },
  ];

  test("renders without crashing", () => {
    render(
      <Table data={sampleData} handleClick={() => {}} selectedEmployee={null} />
    );
  });

  test("displays employee data correctly", () => {
    render(
      <Table data={sampleData} handleClick={() => {}} selectedEmployee={null} />
    );
    expect(screen.getByText("John")).toBeInTheDocument();
    expect(screen.getByText("Doe")).toBeInTheDocument();
  });

  test("calls handleClick with the correct employee data when a row is clicked", () => {
    const handleClickMock = jest.fn();
    render(
      <Table
        data={sampleData}
        handleClick={handleClickMock}
        selectedEmployee={null}
      />
    );

    fireEvent.click(screen.getByText("John"));

    expect(handleClickMock).toHaveBeenCalledWith(sampleData[0]);
  });

  test("data matches the TData type", () => {
    sampleData.forEach((employee) => {
      expect(employee).toEqual(
        expect.objectContaining({
          employeeNo: expect.any(Number),
          firstName: expect.any(String),
          lastName: expect.any(String),
          salutation: expect.stringMatching(/^(Dr\.|Mr\.|Ms\.|Mrs\.|Mx\.)$/),
          gender: expect.stringMatching(/^(male|female|unspecified)$/),
          profileColour: expect.stringMatching(/^(Green|Red|Blue|Default)$/),
          grossSalary: expect.any(String),
        })
      );
    });
  });

  test("renders a message when there is no data", () => {
    render(<Table data={[]} handleClick={() => {}} selectedEmployee={null} />);
    expect(
      screen.getByText("No employee found, add new employee")
    ).toBeInTheDocument();
  });
});
