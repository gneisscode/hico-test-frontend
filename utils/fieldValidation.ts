

export const validateFormData = (formData:any) => {
  const errors = {
    firstName: "",
    lastName: "",
    employeeNo: "",
    salutation: "",
    grossSalary: "",
  };

  const requiredFields = ["firstName", "lastName", "salutation", "employeeNo"];
  requiredFields.forEach((field) => {
    if (!formData[field]) {

    //@ts-ignore
      errors[field] = `${field} is required`;
    }
  });


  if (!/^[a-zA-Z]+$/.test(formData.firstName)) {
    errors.firstName = "Only alphabets are allowed for First Name";
  }

  if (!/^[a-zA-Z]+$/.test(formData.lastName)) {
    errors.lastName = "Only alphabets are allowed for Last Name";
  }


  if (!/^\d+$/.test(formData.employeeNo)) {
    errors.employeeNo = "Only numbers are allowed for Employee#";
  }

  if (!/^\d+$/.test(formData.grossSalary)) {
    errors.grossSalary = "Only numbers are allowed for Gross Salary";
  }

  return errors;
};

export default validateFormData;
