import Alert from "@/components/alerts";
import Button from "@/components/buttons/button";
import Input from "@/components/inputs/input";
import Dialog from "@/components/modals/dialog";
import React, { useEffect } from "react";
import { RecordsFolderValidation } from "../folder-validation";
import { useAddFolderMutation } from "@/redux/endpoints/records";
import SelectDirectory from "../select-directory";

const AddFolderModal = ({
  currentDir,
  refetchAllFolderFiles,
}: {
  currentDir?: string;
  refetchAllFolderFiles: (...args: any) => any;
}) => {
  const [
    createFolder,
    {
      data: addFolderData,
      isLoading: AddingFolderIsLoading,
      error: AddFolderError,
    },
  ] = useAddFolderMutation();

  const { controller, displayError } = new RecordsFolderValidation();

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = controller();

  useEffect(() => {
    if (AddFolderError) {
      displayError(AddFolderError);
    }
  }, [AddFolderError]);

  useEffect(() => {
    if (addFolderData) {
      reset();
      document.getElementById("add-folder")?.click();
      setTimeout(() => {
        refetchAllFolderFiles();
      }, 2000);
    }
  }, [addFolderData]);

  const onSubmit = (values: any) => {
    console.log("value: ", values);

    createFolder(values);
  };

  return (
    <>
      <Dialog closeBtn id="add-folder" forceDisplay={true}>
        <form onSubmit={handleSubmit(onSubmit)}>
          {/* @ts-ignore */}
          {AddFolderError && (
            <Alert
              type="error"
              message={
                // @ts-ignore
                AddFolderError?.message
              }
              error={AddFolderError}
            />
          )}
          <div className="w-full flex flex-col gap-y-[32px]">
            <div className="flex flex-col gap-y-[24px]">
              <h5 className="text-center text-black text-[24px] font-[800] leading-[32.74px]">
                Add folder
              </h5>
              <div className="flex flex-col gap-y-[12px]">
                <Input
                  option={{
                    type: "text",
                    placeholder: "Folder name",
                    error: errors?.folderName?.message,
                  }}
                  inputProps={{
                    ...register("folderName"),
                  }}
                />

                <SelectDirectory
                  name="directory"
                  setValue={setValue}
                  defaultDir={currentDir}
                  error={errors?.directory?.message}
                />
              </div>
            </div>
            <Button
              type="submit"
              text="Create folder"
              isLoading={AddingFolderIsLoading}
              className="w-full"
            />
          </div>
        </form>
      </Dialog>
    </>
  );
};

export default AddFolderModal;
