export const formatSalary =(value: any) => {
    const numberValue = parseFloat(value?.replace(/,/g, "")); 
    const newValue = isNaN(numberValue) ? "" : numberValue.toLocaleString();
    return newValue
}