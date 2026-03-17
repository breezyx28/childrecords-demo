import SelectInput from "@/components/inputs/select-input";
import React from "react";
import countries from "i18n-iso-countries";
import { UseFormSetValue } from "react-hook-form";
import enLocale from "i18n-iso-countries/langs/en.json";
import arLocale from "i18n-iso-countries/langs/ar.json";
import frLocale from "i18n-iso-countries/langs/fr.json";

// Register languages for localization
countries.registerLocale(enLocale);
countries.registerLocale(arLocale);
countries.registerLocale(frLocale);

type TNationalityInput = {
  language: "en" | "ar" | "fr";
  error?: any;
  setValue: UseFormSetValue<any>;
  name: string;
  defaultValue?: any;
};

// Helper function to convert ISO country code to flag emoji
const getFlagEmoji = (countryCode: string) =>
  countryCode
    .toUpperCase()
    .replace(/./g, (char) => String.fromCodePoint(127397 + char.charCodeAt(0)));

const NationalityInput = ({
  language = "en",
  error,
  setValue,
  name,
  defaultValue,
}: TNationalityInput) => {
  const countryCodes = countries.getAlpha2Codes(); // Get all country codes

  // Generate options with flag emojis and names
  const optionsData = Object.keys(countryCodes).map((code) => ({
    value: countries.getName(code, language) as string,
    text: `${countries.getName(code, language)}`,
    // text: `${getFlagEmoji(code)} ${countries.getName(code, language)}`,
  }));

  return (
    <SelectInput
      option={{
        optionsData,
        placeholder: "Select your nationality",
        className: "w-full",
        error: error,
        defaultValue,
      }}
      name={name}
      setValue={setValue}
    />
  );
};

export default NationalityInput;
