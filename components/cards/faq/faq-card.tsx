"use client";

import { FaqCardProps } from "@/types";
import React, { useRef, useEffect } from "react";

const FaqCard = ({ question, answer, id = 0 }: FaqCardProps) => {
  const inputId = `faq-${id}`;
  const [open, setOpen] = React.useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, []);

  return (
    <div ref={containerRef} className="collapse collapse-plus bg-white border border-[#E2E6ED] rounded-[12px]">
      <input
        type="checkbox"
        id={inputId}
        className="peer"
        aria-label={`Toggle: ${question}`}
        checked={open}
        onChange={(e) => setOpen(e.target.checked)}
      />
      <label
        htmlFor={inputId}
        className="collapse-title min-h-[0px] md:text-[16px] text-[14px] font-[700] leading-[19.84px] md:px-[24px] md:py-[26px] py-[22px] cursor-pointer"
      >
        {question}
      </label>
      <div className="collapse-content">
        <p>{answer}</p>
      </div>
    </div>
  );
};

export default FaqCard;
