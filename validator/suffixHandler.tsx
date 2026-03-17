import { useAddSuffix } from "@/hooks/useAddSuffix";
import { UseFormSetValue } from "react-hook-form";

export const suffixHandler = (
  event: any,
  fieldName: string,
  suffix: string,
  setValue: UseFormSetValue<any>
) => {
  const rawValue = event.target.value; // Get the raw input
  const updatedValue = useAddSuffix(rawValue, suffix); // Process the value with the suffix logic

  setValue(fieldName, updatedValue); // Update the React Hook Form state
};
