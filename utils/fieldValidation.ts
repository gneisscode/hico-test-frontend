
export const formatSalary = (value: any) => {
  const numberValue = parseFloat(value?.replace(/,/g, ""));
  const newValue = isNaN(numberValue)
    ? ""
    : numberValue.toLocaleString().replace(/,/g, " ");
  return newValue;
};

export const handleNumericInput = (value: any) => {
  return value.replace(/\D/g, "");
};

export const handleAlphabeticInput = (value: any) => {
  return value.replace(/[^a-zA-Z\s]/g, "");
};
