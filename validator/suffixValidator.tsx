import * as Yup from "yup";

export const numberWithSuffix = (
  suffix: string,
  min: number,
  max: number,
  fieldName: string,
  required: boolean = false
) =>
  Yup.string()
    .nullable()
    .test(
      "has-suffix",
      `${fieldName} must end with '${suffix}'`,
      (value) => !value || value.endsWith(suffix)
    )
    .test(
      "is-valid-number",
      `${fieldName} must be a valid number followed by '${suffix}'`,
      (value) => {
        if (!value) return !required; // If not required, allow empty values
        const numericPart = value.replace(suffix, "").trim();
        return /^(\d+|\d*\.\d+)$/.test(numericPart); // Check for a positive number (integer or decimal)
      }
    )
    .test(
      "is-in-range",
      `${fieldName} must be between ${min} and ${max} ${suffix}`,
      (value) => {
        if (!value) return !required; // Skip validation for null if not required
        const numericPart = parseFloat(value.replace(suffix, "").trim());
        return numericPart >= min && numericPart <= max;
      }
    )
    .when("$isRequired", {
      is: required,
      then: (schema) =>
        schema.required(`${fieldName} is required and must have '${suffix}'`),
      otherwise: (schema) => schema.nullable(),
    });
