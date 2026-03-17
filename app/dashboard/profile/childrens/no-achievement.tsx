import React from "react";

const NoAchievement = () => {
  return (
    <div className="w-full md:min-h-[300px] min-h-[200px] h-full flex flex-col justify-center items-center">
      <div className="w-full md:max-h-[150px] max-h-[100px] h-full flex flex-col items-center justify-center gap-y-1">
        <p className="text-xl text-stone-600 font-[800]">No Achievements</p>
        <span className="text-stone-400 text-md text-center max-w-[300px]">
          There is No Achievements yet .. complete some milestones to get
          achievements
        </span>
      </div>
    </div>
  );
};

export default NoAchievement;
