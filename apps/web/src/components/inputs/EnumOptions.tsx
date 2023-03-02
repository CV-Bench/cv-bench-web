export interface EnumOptionsProps {
    enumType: any;
}

const EnumOptions: React.FC<EnumOptionsProps> = ({ enumType }) => {

    const options = Object.keys(enumType);

    return <>
        {options.map(option => (<option key={enumType[option]} value={enumType[option]}>{enumType[option]}</option>))}
    </>
}
export default EnumOptions;