import AutocompleteInput from "@/components/inputs/select-input";
import { useGetAllFoldersQuery } from "@/redux/endpoints/records";
import React, { useMemo } from "react";
import { UseFormSetValue } from "react-hook-form";

type TSelectDirectory = {
  error?: any;
  setValue: UseFormSetValue<any>;
  name: string;
  defaultDir?: string;
};

const SelectDirectory = ({
  name,
  setValue,
  error,
  defaultDir,
}: TSelectDirectory) => {
  const { data: allFoldersData, isLoading: foldersLoading } =
    useGetAllFoldersQuery(undefined);

  const cachedFoldersData = useMemo(() => allFoldersData, [allFoldersData]);

  const foldersArray = cachedFoldersData?.map((item: any) => ({
    text: `${item?.directory}${item.directory === "/" ? "" : "/"}${
      item?.filename
    }`,
    value: `${item?.directory}${item.directory === "/" ? "" : "/"}${
      item?.filename
    }`,
  }));

  return (
    <>
      <AutocompleteInput
        name={name}
        setValue={setValue}
        option={{
          optionsData: foldersArray ?? [{ text: "/Root", value: "/" }],
          placeholder: "Select directory *optional",
          withSearch: true,
          error: error,
          defaultValue: defaultDir,
        }}
      />
    </>
  );
};

export default SelectDirectory;
