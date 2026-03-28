import { Input } from "../../components/ui/input";

type InputFieldProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
    value?: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    placeholder: string;
};

export function InputField({ value, placeholder, ...props}: InputFieldProps){
    return (
        <Input 
        placeholder={placeholder}
        className="bg-white w-1/2" 
        defaultValue={value}
        onChange={(e) => {
            props.onChange(e);
        }}
        />
    )
}