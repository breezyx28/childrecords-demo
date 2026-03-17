"use client";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { PartnerVisitorValidation } from "@/validator/Validation/PartnerVisitorValidation";
import { usePostVisitorDataMutation } from "@/redux/endpoints/visitor";
import Dialog from "@/components/modals/dialog";
import Button from "@/components/buttons/button";
import Input from "@/components/inputs/input";
import ExistedVisitor from "./existed-visitor";
import Alert from "@/components/alerts";

const VisitedCustomer = () => {
  const navigate = useNavigate();
  const [postVisitorData, { data, isLoading, error }] =
    usePostVisitorDataMutation();

  // Validation logic
  const { controller, displayError } = new PartnerVisitorValidation();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = controller();

  // State for managing local storage and form visibility
  const [existingData, setExistingData] = useState<any | null>(null);
  const [showForm, setShowForm] = useState<boolean>(true);

  const handleRedirect = () => {
    // REDIRECT
    const partnerLink = sessionStorage.getItem("partner-link");

    if (partnerLink) {
      // Open the link in a new tab
      window.open(partnerLink, "_blank");

      document.getElementById("partner-visitor-dialog")?.click();

      setTimeout(() => {
        window.location.reload();
      }, 1000);
    } else {
      // Log an error if no link is found
      console.error("No partner link found in session storage.");
    }
  };

  // Load existing data from localStorage on component mount
  useEffect(() => {
    const storedData = localStorage.getItem("visitorData");
    if (storedData) {
      setExistingData(JSON.parse(storedData));
      setShowForm(false); // Hide the form initially if data exists
    }
    reset({
      partner: sessionStorage.getItem("partner-name") ?? "---",
    });
  }, []);

  // Save data to localStorage after successful submission
  useEffect(() => {
    if (data) {
      localStorage.setItem("visitorData", JSON.stringify(data));
      reset(); // Reset the form
      // toast.success("Visitor data submitted successfully!");
      handleRedirect();
    }
  }, [data]);

  // Handle error display
  useEffect(() => {
    if (error && "errors" in error) {
      displayError(error.errors); // Assuming displayError handles field-specific errors
    }
    console.log("error: ", error);
    console.log("errors: ", errors);
  }, [error, errors]);

  // Submit handler
  const onSubmit = async (values: any) => {
    try {
      await postVisitorData(values).unwrap(); // Unwrap the result to handle errors
    } catch (err: any) {
      // toast.error(err.data?.message || "Failed to submit visitor data.");
    }
  };

  return (
    <Dialog
      id={`partner-visitor-dialog`}
      modalClass="!w-full !h-screen !p-[0px] md:w-full !max-w-[100vw] !max-h-[100vh] bg-primary-100"
      contentClass="size-full"
      closeBtn
    >
      <section
        id="visited-customer"
        className="flex flex-col justify-center items-center size-full mx-auto my-auto md:py-[100px] py-[20px]"
      >
        <div className="wrapper responsive">
          <div className="w-full flex justify-center">
            <div className="p-8 rounded-[16px] bg-white w-full max-w-[500px]">
              {existingData && !showForm ? (
                <ExistedVisitor
                  existingData={existingData}
                  setShowForm={setShowForm}
                  handleRedirect={handleRedirect}
                />
              ) : (
                <div>
                  <h1 className="mb-[12px] text-black md:text-[26px] text-[22px] font-[800] md:leading-[38.19px] leading-[28.8px]">
                    Fill your informations before continue
                  </h1>
                  <form
                    onSubmit={handleSubmit(onSubmit)}
                    className="flex flex-col gap-y-[8px]"
                  >
                    {/* @ts-ignore */}
                    {error?.data && (
                      <Alert
                        type="error"
                        // @ts-ignore
                        message={error?.data?.error}
                        // @ts-ignore
                        error={error?.data}
                      />
                    )}

                    <div className="login-inputs flex flex-col gap-y-[14px]">
                      <input
                        type="hidden"
                        {...register("partner")}
                        name="partner"
                      />
                      <Input
                        option={{
                          type: "text",
                          placeholder: "Full name",
                          error:
                            errors?.fullname?.message ||
                            // @ts-ignore
                            error?.data?.errors?.fullname,
                        }}
                        inputProps={{
                          ...register("fullname"),
                          id: "fullname",
                        }}
                      />
                      <Input
                        option={{
                          type: "tel",
                          className: "",
                          error:
                            errors?.phone?.message ||
                            // @ts-ignore
                            error?.data?.errors?.phone,
                          placeholder: "Phone",
                        }}
                        inputProps={{
                          ...register("phone"),
                        }}
                      />
                      <Input
                        option={{
                          type: "email",
                          placeholder: "Email Address",
                          error:
                            errors?.email?.message ||
                            // @ts-ignore
                            error?.data?.errors?.email,
                        }}
                        inputProps={{
                          ...register("email"),
                          id: "email",
                        }}
                      />
                    </div>
                    <div className="login-btn flex flex-col gap-y-[20px]">
                      <Button
                        type="submit"
                        text="Submit"
                        isLoading={isLoading}
                      />
                    </div>
                  </form>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    </Dialog>
  );
};

export default VisitedCustomer;
