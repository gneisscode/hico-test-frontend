import React from 'react'

type ButtonProps = {
  children: JSX.Element | React.ReactNode;
  className?: string;
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
  disabled?: boolean;
};
const Button = ({children,className, onClick, disabled}: ButtonProps) => {
  return (
    <button
      onClick={onClick}
      className={`${
        disabled
          ? "cursor-not-allowed bg-gray-200 text-gray-400 border-gray-400"
          : "bg-gray-300 text-black border-black"
      } text-lg border   px-2 rounded-[3px] transition-colors delay-150 ease-linear ${className}`}
      disabled={disabled}
      type="submit"
    >
      {children}
    </button>
  );
}

export default Button