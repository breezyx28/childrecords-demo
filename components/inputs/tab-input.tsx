"use client";

import React, { useEffect } from "react";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BoySVG, GirlSVG } from "../icons";
import ValidationError from "../states/errors/validationError";
import { UseFormSetValue } from "react-hook-form";

type GenderInputProps = {
  error?: any;
  name: string;
  defaultValue?: string;
  setValue: UseFormSetValue<any>;
};

const TabInput = ({
  error,
  setValue,
  name,
  defaultValue,
}: GenderInputProps) => {
  setValue(name, "boy");
  useEffect(() => {
    // Set the default value when the component mounts
    setValue && setValue(name, "boy");
  }, [name, setValue]);

  return (
    <Tabs
      defaultValue={defaultValue ?? "boy"}
      onValueChange={(value) => setValue && setValue(name, value)}
      className="w-full"
    >
      <TabsList className="w-full h-full bg-transparent border-2 border-[#E9ECF1] rounded-full p-[5px] gap-[12px]">
        <TabsTrigger className="tab-input-boy tab-input-switch" value="boy">
          <BoySVG className="tab-input-icon" />{" "}
          <span className="ml-[8px] text-[#83868B] tab-input-icon">Boy</span>
        </TabsTrigger>
        <TabsTrigger className="tab-input-girl tab-input-switch" value="girl">
          <GirlSVG className="tab-input-icon" />{" "}
          <span className="ml-[8px] text-[#83868B] tab-input-icon">Girl</span>
        </TabsTrigger>
      </TabsList>
      {error && <ValidationError text={error} />}
    </Tabs>
  );
};

export default TabInput;
