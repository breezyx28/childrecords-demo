import React from "react";

const MaxLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="wrapper relative max-w-[1200px] w-full">{children}</div>
    // <div className="wrapper relative max-w-[1440px] w-full">{children}</div>
  );
};

export default MaxLayout;
