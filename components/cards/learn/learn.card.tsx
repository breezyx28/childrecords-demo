import { Heart } from "@/components/icons";
import { truncateString } from "@/helper/trimString";
import { PhotoPath } from "@/redux/ApiConfig";
import { useAddFavouriteMutation } from "@/redux/endpoints/milestones";
import { Link } from "react-router-dom";
import React from "react";
import { twMerge } from "tailwind-merge";

type LessonsCardProps = {
  id: string | number;
  title: string;
  topic: string;
  className?: string;
  href?: string;
  img?: string;
  liked?: boolean;
};

export const LearnCard = ({
  id,
  topic,
  title,
  className,
  href,
  img,
  liked,
}: LessonsCardProps) => {
  const [like, setLike] = React.useState(liked ?? false);

  const [addFav, { data, isLoading, isError }] = useAddFavouriteMutation();

  const handleLike = (e: React.MouseEvent) => {
    e.stopPropagation(); // Ensure the click doesn't propagate to the Link
    setLike(!liked);
    addFav({ id, type: "article" });
  };

  return (
    <div className="relative w-full h-auto flex flex-col gap-y-[12px]">
      {/* Like Button */}
      <button
        className="absolute top-[10px] right-[10px] p-[5px] rounded-full bg-white cursor-pointer z-10"
        type="button"
        onClick={handleLike}
      >
        <Heart
          fill={like ? "currentColor" : "none"}
          className={twMerge("text-[#83868B]", like && "text-error-600")}
        />
      </button>

      {/* Main Content */}
      <Link
        to={href ?? "#"}
        className={twMerge(
          "relative w-full h-auto flex flex-col gap-y-[12px]",
          className
        )}
      >
        <div className="size-full relative">
          <img
            src={img ? PhotoPath(img) : `/assets/pages/no-image.jpg`}
            width={1000}
            height={1000}
            alt="lesson-img"
            className="rounded-[12px] max-h-[140px] object-cover"
          />
        </div>
        <div className="flex flex-col gap-y-[8px] text-black">
          <p className="text-[16px] font-[800] leading-[21.82px]">{title}</p>
          <p
            className="text-[14px] font-[600] leading-[18.2px] line-clamp-3"
            dangerouslySetInnerHTML={{
              __html:
                truncateString(topic, 100, " <strong>read more</strong>") || "",
            }}
          />
        </div>
      </Link>
    </div>
  );
};
