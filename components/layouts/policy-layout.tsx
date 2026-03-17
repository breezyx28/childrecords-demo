import React from "react";

const PolicyLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <div className="bg-primary-600 w-screen">
        <div className="responsive">{children}</div>
      </div>
    </>
  );
};

export default PolicyLayout;
