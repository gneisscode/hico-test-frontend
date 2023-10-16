import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import { Info } from "@/components";
import { EmployeeService } from "@/services";



describe("Info", () => {
  const employeeData = {
    firstName: "Shalom",
    lastName: "Effiom",
    salutation: "Dr.",
    gender: "male",
    employeeNo: 1222223,
    grossSalary: "9000000",
    profileColour: "Blue",
  };

  const getEmployees = jest.fn(() => EmployeeService.getEmployees());

  test("renders without crashing", async () => {
    render(
      <Info
        selectedEmployee={employeeData}
        isNewEmployee={false}
        getEmployees={getEmployees}
      />
    );

    const fullNameField = await screen.findByTestId(`fullName`);
    await waitFor(() =>
      expect(fullNameField).toHaveDisplayValue("Shalom Effiom")
    );
  });
});
