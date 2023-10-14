/**
 * @jest-environment jsdom
 */

import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import Home from "../pages";
import { EmployeeService } from "@/services";

describe("Home", () => {
  test("renders without crashing", () => {
    render(<Home />);
  });

  test("fetches data and renders table", async () => {
    EmployeeService.getEmployees = jest.fn().mockResolvedValue({
      data: {
        data: [
          {
            firstName: "Eyo",
            lastName: "Emmanuel",
            salutation: "Mr.",
            gender: "Unspecified",
            employeeNum: 200000,
            grossSalary: 9000000,
            profileColor: "default",
          },
          {
            firstName: "Perpe",
            lastName: "Eyo",
            salutation: "Ms.",
            gender: "Unspecified",
            employeeNum: 200001,
            grossSalary: 9000000,
            profileColor: "green",
          },
        ],
      },
    });

    render(<Home />);
  });

  test("handles error when fetching data", async () => {
    EmployeeService.getEmployees = jest
      .fn()
      .mockRejectedValue(new Error("Fetch error"));

    render(<Home />);
  });
});
