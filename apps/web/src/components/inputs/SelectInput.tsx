export interface SelectInputProps<T> extends React.PropsWithChildren {
    value: T;
    setValue: (val: T) => void;
}

const SelectInput = <T, >({ value, setValue, children}: SelectInputProps<T>) => {

    return (
        <select className="w-full text-black" value={value as any} onChange={(e) => setValue(e.target.value as any)}>
            {children}
        </select>
    )
}
export default SelectInput;