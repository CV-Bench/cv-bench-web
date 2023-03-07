export interface SelectInputProps<T> extends React.PropsWithChildren {
  value: T;
  setValue: (val: T) => void;
}

const SelectInput = <T,>({
  value,
  setValue,
  children
}: SelectInputProps<T>) => {
  return (
    <select
      className="w-full bg-slate-800 text-sm border border-slate-600 rounded-lg text-slate-200 focus:outline-none focus:ring-2 focus:ring-slate-400"
      value={value as any}
      onChange={(e) => setValue(e.target.value as any)}
    >
      {children}
    </select>
  );
};
export default SelectInput;
