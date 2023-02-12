import { HTMLInputTypeAttribute } from "react";

type TextFieldProps = {
    placeholder: string;
    type?: "email" | "number" | "password" | "search" | "tel" | "text" | "url"
}

export default TextFieldProps;