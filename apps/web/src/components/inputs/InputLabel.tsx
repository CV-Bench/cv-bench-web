export interface InputLabelProps extends React.PropsWithChildren {
  className?: string;
}

const InputLabel: React.FC<InputLabelProps> = ({ className, children }) => (
  <label className={`inline-block text-slate-300 ${className}`}>
    {children}
  </label>
);

export default InputLabel;
