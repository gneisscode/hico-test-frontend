import { axiosWithoutToken } from "@/utils/axios";
import { TData } from "@/components/Table/Table";

class EmployeeServiceClass {
  
  AddEmployee(payload: TData) {
    return axiosWithoutToken.post("/employee", {
      ...payload,
    });
  }

  getEmployees() {
    return axiosWithoutToken.get("/employee");
  }

  getEmployee(id: string) {
    return axiosWithoutToken.get(`/employee/${id}`);
  }

  UpdateEmployee(payload: TData) {
    return axiosWithoutToken.put("/employee", {
      ...payload,
    });
  }
}

const EmployeeService = new EmployeeServiceClass();

export default EmployeeService;
