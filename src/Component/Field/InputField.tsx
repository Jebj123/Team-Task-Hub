import { Input } from "../../Shared/components/ui/input";

type InputFieldProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
    value?: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    placeholder: string;
};

export function InputField({ value, placeholder, ...props}: InputFieldProps){
    return (
        <Input 
        placeholder={placeholder}
        className="bg-white w-full h-10" 
        value={value}
        onChange={(e) => {
            props.onChange(e);
        }}
        />
    )
}