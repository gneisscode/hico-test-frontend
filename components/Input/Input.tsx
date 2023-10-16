import React from "react";

type InputType = {
  name: string;
  label?: string;
  type?: string;
  required?: boolean;
  placeholder?: string;
  value?: string;
  error?: boolean;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onEnterPress?: (event: React.KeyboardEvent<HTMLInputElement>) => void;
  pattern?: string;
  minLength?: number;
  maxLength?: number;
  disabled?: boolean;
  className?: string;
  readOnly?: boolean;
};

const Input = ({
  name,
  label,
  type,
  required,
  placeholder,
  value,
  error,
  onChange,
  onEnterPress,
  pattern,
  minLength,
  maxLength,
  disabled,
  className,
  readOnly,
}: InputType) => {
  return (
    <div className="flex gap-2 w-fit">
      {label && (
        <label htmlFor={name} className="flex gap-2 min-w-[180px]">
          {label}
          {required && <p>*</p>}
        </label>
      )}

      <input
        className={`${className} ${
          readOnly ? "text-gray-500 border-gray-500 outline-none" : "border-black"
        } ${disabled? "cursor-not-allowed bg-white" : ""} border p-1 md:w-[350px] font-medium`}
        title={label}
        value={value}
        type={type}
        name={name}
        id={name}
        placeholder={placeholder}
        onChange={onChange}
        disabled={disabled}
        required={required}
        minLength={minLength}
        maxLength={maxLength}
        pattern={pattern}
        readOnly={readOnly}
        data-testid={name}
      />
    </div>
  );
};

export default Input;
