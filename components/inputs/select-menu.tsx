import * as React from "react";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { twMerge } from "tailwind-merge";

type SelectMenuProps = {
  placeholder?: string;
  options: { value: string; name: string }[];
  value: string;
  onChange: (value: string) => void;
  title?: string;
  className?: string;
  customTrigger?: React.ReactNode;
};

export function SelectMenu({
  options,
  value,
  onChange,
  className,
  placeholder,
  title,
  customTrigger,
}: SelectMenuProps) {
  return (
    <Select value={value} onValueChange={onChange}>
      <SelectTrigger className={twMerge("w-[180px]", className)}>
        {customTrigger ?? (
          <SelectValue placeholder={placeholder ?? "Select item"} />
        )}
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>{title ?? "Filter by date"}</SelectLabel>
          {options?.map(({ name, value }, index) => (
            <SelectItem key={index} value={value}>
              {name}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}
