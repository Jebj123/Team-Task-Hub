import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "../../Shared/components/ui/select";

import React from 'react'

type SelectFieldProps = {
    value?: string;
    onChange: (value: string) => void;
    placeholder: string;
    className?: string;
};

export function SelectField({ placeholder, value, onChange, className }: SelectFieldProps) {
  return (
    <Select value={value} onValueChange={(selectedValue) => onChange(selectedValue)}>
      <SelectTrigger className={className ?? "w-37"}>
        <SelectValue placeholder={placeholder} />
      </SelectTrigger>
      <SelectContent className="bg-white">
        <SelectItem className="hover:font-bold" value="low">Low</SelectItem>
        <SelectItem className="hover:font-bold" value="medium">Medium</SelectItem>
        <SelectItem className="hover:font-bold" value="high">High</SelectItem>
      </SelectContent>
    </Select>
  )
}


export default SelectField