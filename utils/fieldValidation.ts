//format salary field, works for formatting data fetched from API, would need something better to handle input change

export const formatSalary = (value: any) => {
  const numberValue = parseFloat(value?.replace(/,/g, ""));
  const newValue = isNaN(numberValue)
    ? ""
    : numberValue.toLocaleString().replace(/,/g, " ");
  return newValue;
};

//to format numeric only fields

export const handleNumericInput = (value: any) => {
  return value.replace(/\D/g, "");
};


//to format alphabetic only fields

export const handleAlphabeticInput = (value: any) => {
  return value.replace(/[^a-zA-Z\s]/g, "");
};
