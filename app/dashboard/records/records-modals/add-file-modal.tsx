import Dialog from "@/components/modals/dialog";
import objectToFormData from "@/helper/object-to-formdata";
import { useAddFileMutation } from "@/redux/endpoints/records";
import React, { useEffect } from "react";
import { RecordsFileValidation } from "../file-validation";
import Alert from "@/components/alerts";
import FileInput from "@/components/inputs/file-input";
import Input from "@/components/inputs/input";
import SelectDirectory from "../select-directory";
import Button from "@/components/buttons/button";
import ValidationError from "@/components/states/errors/validationError";

const AddFileModal = ({
  refetchAllFolderFiles,
  currentDir,
}: {
  currentDir?: string;
  refetchAllFolderFiles: (...args: any) => any;
}) => {
  const [
    addFile,
    { data: addFileData, isLoading: addFileLoaing, error: addFileErrors },
  ] = useAddFileMutation();
  const { controller, displayError } = new RecordsFileValidation();

  const {
    register,
    handleSubmit,
    reset,
    watch,
    setValue,
    formState: { errors },
  } = controller();

  useEffect(() => {
    if (addFileErrors) {
      displayError(addFileErrors);
    }
  }, [addFileErrors]);

  useEffect(() => {
    if (addFileData) {
      reset();
      document.getElementById("add-file")?.click();
      setTimeout(() => {
        refetchAllFolderFiles();
      }, 2000);
    }
  }, [addFileData]);

  const onSubmit = async (values: any) =>
    addFile(objectToFormData({ ...values, file: values.file?.[0] }));

  return (
    <>
      <Dialog closeBtn id="add-file">
        <div className="w-full flex flex-col gap-y-[32px]">
          <div className="flex flex-col gap-y-[24px]">
            <h5 className="text-center text-black text-[24px] font-[800] leading-[32.74px]">
              Add file
            </h5>
            <form
              className="w-full flex flex-col"
              onSubmit={handleSubmit(onSubmit)}
            >
              {/* @ts-ignore */}
              {addFileErrors && (
                <Alert
                  type="error"
                  message={
                    // @ts-ignore
                    addFileErrors?.message
                  }
                  error={addFileErrors}
                />
              )}
              <div className="flex flex-col gap-y-[12px]">
                <FileInput
                  inputName="file"
                  label="Upload file"
                  watch={watch}
                  option={{
                    error: errors.email?.message,
                  }}
                  inputProps={{
                    ...register("file"),
                    accept: "application/pdf",
                  }}
                />
                <Input
                  option={{
                    type: "text",
                    placeholder: "File name",
                    error: errors.filename?.message,
                  }}
                  inputProps={{
                    ...register("filename"),
                  }}
                />

                <SelectDirectory
                  name="directory"
                  setValue={setValue}
                  defaultDir={currentDir}
                  error={errors?.directory?.message}
                />

                <div className="flex flex-col">
                  <textarea
                    {...register("description")}
                    rows={6}
                    placeholder="Description"
                    className="border px-[12px] py-[18px] rounded-[16px] px-[12px] text-[#83868B] text-[16px] font-[500] leading-[19.84px]"
                  />
                  {/* @ts-ignore */}
                  {errors?.description?.message && (
                    // @ts-ignore
                    <ValidationError text={errors?.description?.message} />
                  )}
                </div>
              </div>
              <div className="mt-[32px] w-full">
                <Button
                  text="Upload"
                  type="submit"
                  isLoading={addFileLoaing}
                  className="w-full"
                />
              </div>
            </form>
          </div>
        </div>
      </Dialog>
    </>
  );
};

export default AddFileModal;
