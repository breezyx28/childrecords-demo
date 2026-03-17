import React from "react";

const Loading = () => {
  return (
    <div className="h-screen w-screen flex items-center justify-center bg-gradient">
      <div className="flex flex-col items-center gap-y-6">
        <img
          src="/assets/logos/logo-icon.svg"
          alt="Loading"
          className="w-16 h-16 animate-pulse"
        />
      </div>
    </div>
  );
};

export default Loading;
