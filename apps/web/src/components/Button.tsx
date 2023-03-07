import React from "react";

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  color?: "indigo" | "green" | "red";
  size?: "lg" | "md" | "sm";
}

const Button: React.FC<React.PropsWithChildren<ButtonProps>> = ({
  children,
  color = "indigo",
  size = "md",
  className,
  ...props
}) => {
  const colorScheme = {
    indigo:
      "text-white bg-indigo-600 hover:bg-indigo-700 focus:ring-indigo-500 disabled:bg-indigo-600/20",
    green:
      "text-white bg-green-600 hover:bg-green-700 focus:ring-green-500 disabled:bg-indigo-600/20",
    red: "text-white bg-red-600 hover:bg-red-700 focus:ring-red-500 disabled:bg-indigo-600/20"
  }[color];

  return (
    <button
      {...props}
      className={`flex justify-center rounded-md border border-transparent transition-all duration-150 py-2 px-4 text-sm font-medium shadow-sm ${colorScheme} ${className} focus:outline-none focus:ring-2 focus:ring-offset-2`}
    >
      {children}
    </button>
  );
};
export default Button;
