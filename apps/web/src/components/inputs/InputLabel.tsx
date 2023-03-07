export interface InputLabelProps extends React.PropsWithChildren {
  className?: string;
  htmlFor?: string;
}

const InputLabel: React.FC<InputLabelProps> = ({
  className,
  children,
  htmlFor
}) => (
  <label
    className={`inline-block text-slate-300 text-sm ${className}`}
    htmlFor={htmlFor}
  >
    {children}
  </label>
);

export default InputLabel;
