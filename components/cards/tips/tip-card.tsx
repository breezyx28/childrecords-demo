import { Heart, Light } from "@/components/icons";
import { useAddFavouriteMutation } from "@/redux/endpoints/milestones";
import React, { useEffect } from "react";
import { twMerge } from "tailwind-merge";

type TipsCardProps = {
  id: number | string;
  tip: string;
  liked?: boolean;
};

export const TipsCard = ({ tip, liked, id }: TipsCardProps) => {
  // Initialize like state based on both props and localStorage
  const [like, setLike] = React.useState(liked);
  const [addFav] = useAddFavouriteMutation();

  const handleLike = () => {
    const newLikeState = !like;
    setLike(newLikeState);

    console.log("id: ", id);

    // Update server
    addFav({ id: id, type: "tip" });
  };

  return (
    <div className="relative w-full h-[160px] p-[24px] rounded-[12px] bg-blue-100 flex flex-col justify-between">
      <button
        type="button"
        className="absolute top-[10px] right-[10px]"
        onClick={handleLike}
      >
        <Heart
          fill={like ? "currentColor" : "none"}
          className={twMerge("text-[#83868B]", like && "text-error-600")}
        />
      </button>
      <div className="flex items-center gap-x-[8px] text-primary-500 text-[]">
        <span className="light-bulb-icon">
          <Light />
        </span>
        <span className="text-[16px] font-[700] leading-[19.84px]">
          Did you know?
        </span>
      </div>
      <p className="text-black text-[14px] font-[700] leading-[18.2px]">
        {tip}
      </p>
    </div>
  );
};
