import Button from "@/components/buttons/button";
import OutlineButton from "@/components/buttons/OutlineButton";
import React, { Dispatch, SetStateAction } from "react";

type TExistedVisitorProps = {
  existingData: any;
  setShowForm: Dispatch<SetStateAction<boolean>>;
  handleRedirect: () => void;
};

const ExistedVisitor = ({
  existingData,
  setShowForm,
  handleRedirect,
}: TExistedVisitorProps) => {
  // Handle proceeding with existing data
  const handleProceedWithExisting = (): any => {
    handleRedirect();
  };

  // Handle entering new data
  const handleEnterNewData = (): any => {
    setShowForm(true); // Show the form again
  };
  return (
    <div>
      <h1 className="mb-[12px] text-black md:text-[26px] text-[22px] font-[800] md:leading-[38.19px] leading-[28.8px]">
        You have already submitted your information:
      </h1>
      <ul className="list-disc pl-5 mb-4">
        <li>
          <span className="font-[700]">Full Name</span>: {existingData.fullname}
        </li>
        <li>
          <span className="font-[700]">Phone</span>: {existingData.phone}
        </li>
        <li>
          <span className="font-[700]">Email</span>: {existingData.email}
        </li>
      </ul>
      <div className="flex gap-2 flex-col mt-2">
        <Button
          type="button"
          text="Continue"
          className="w-full"
          buttonAttributes={{
            onClick: handleProceedWithExisting,
          }}
        />
        <OutlineButton
          type="button"
          text="New data"
          className="w-full"
          options={{
            onClick: handleEnterNewData,
          }}
        />
      </div>
    </div>
  );
};

export default ExistedVisitor;
