import InputField from "./inputs/InputField";

export interface DateProps {
  date: Date;
}

const Date: React.FC<DateProps> = ({ date }) => {
  return (
    <InputField
      type="datetime-local"
      readOnly
      value={date.toISOString().slice(0, -5)}
      className="text-sm bg-transparent text-start p-0 text-slate-200"
    />
  );
};
export default Date;
