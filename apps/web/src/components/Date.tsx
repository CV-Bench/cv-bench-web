import InputField from "./inputs/InputField";

export interface DateProps {
    date: Date;
}

const Date: React.FC<DateProps> = ({ date }) => {

    return <InputField type="datetime-local" readOnly value={date.toISOString().slice(0, -5)} />;
}
export default Date;