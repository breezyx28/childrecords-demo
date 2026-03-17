import { PhotoPath } from "@/redux/ApiConfig";
import { twMerge } from "tailwind-merge";
import React from "react";

const PLACEHOLDER_IMAGE = "/assets/pages/no-image.jpg";

type ChildThumbnail = {
  thumb: string;
  props?: any;
  className?: string;
};

export const ChildThumb = ({ thumb, props, className }: ChildThumbnail) => {
  const src = thumb ? PhotoPath(thumb) : "";
  const [imgSrc, setImgSrc] = React.useState(src);

  React.useEffect(() => {
    setImgSrc(src || PLACEHOLDER_IMAGE);
  }, [src]);

  if (!thumb) {
    return (
      <div
        className={twMerge(
          "child-account-thumb w-[56px] h-[56px] rounded-full bg-stone-400",
          className
        )}
        {...props}
      />
    );
  }

  return (
    <img
      src={imgSrc}
      alt="child-thumbnail"
      className={twMerge(
        "child-account-thumb w-[56px] h-[56px] rounded-full bg-stone-400 object-cover",
        className
      )}
      onError={() => setImgSrc(PLACEHOLDER_IMAGE)}
      {...props}
    />
  );
};
