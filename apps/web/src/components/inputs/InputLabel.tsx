export interface InputLabelProps extends React.PropsWithChildren {
  className?: string;
}

const InputLabel: React.FC<InputLabelProps> = ({ className, children }) => (
  <label className={`inline-block mb-2 text-white ${className}`}>
    {children}
  </label>
);

export default InputLabel;
