"use client";

import { useState } from "react";
import { twMerge } from "tailwind-merge";

type DialogProps = {
  id: string;
  closeBtn?: boolean;
  children: React.ReactNode;
  contentClass?: string;
  modalClass?: string;
  forceDisplay?: boolean;
  onClose?: (...args: any) => any;
};

const Dialog = ({
  closeBtn,
  children,
  id,
  contentClass,
  modalClass,
  forceDisplay = false,
  onClose,
}: DialogProps) => {
  const [isChecked, setIsChecked] = useState(false);
  return (
    <>
      <input
        type="checkbox"
        id={id}
        checked={isChecked}
        className="modal-toggle"
        onChange={(e) => setIsChecked(!isChecked)}
      />
      <div className="modal" role="dialog">
        <div
          className={twMerge("modal-box md:w-full max-w-[400px]", modalClass)}
        >
          {closeBtn ? (
            <label
              className="modal-backdrop text-black btn btn-sm btn-circle btn-ghost absolute right-2 top-2 z-[999999] bg-white"
              htmlFor={id}
              onClick={onClose}
            >
              ✕
            </label>
          ) : (
            ""
          )}

          <div className={twMerge("dialog-content", contentClass)}>
            {children}
          </div>
        </div>
        <label className="modal-backdrop" htmlFor={id}>
          close
        </label>
      </div>
    </>
  );
};
export default Dialog;
