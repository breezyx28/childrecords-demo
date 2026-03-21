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
  /** When provided the modal is fully controlled by the parent (no checkbox hack needed). */
  isOpen?: boolean;
};

const Dialog = ({
  closeBtn,
  children,
  id,
  contentClass,
  modalClass,
  forceDisplay = false,
  onClose,
  isOpen,
}: DialogProps) => {
  const [isChecked, setIsChecked] = useState(false);

  const controlled = isOpen !== undefined;
  const show = controlled ? isOpen : isChecked;

  const handleClose = () => {
    if (controlled) {
      onClose?.();
    } else {
      setIsChecked(false);
      onClose?.();
    }
  };

  return (
    <>
      <input
        type="checkbox"
        id={id}
        checked={show}
        className="modal-toggle"
        readOnly={controlled}
        onChange={() => {
          if (!controlled) setIsChecked((prev) => !prev);
        }}
      />
      <div className="modal" role="dialog">
        <div
          className={twMerge("modal-box md:w-full max-w-[400px]", modalClass)}
        >
          {closeBtn ? (
            <label
              className="modal-backdrop text-black btn btn-sm btn-circle btn-ghost absolute right-2 top-2 z-[999999] bg-white"
              htmlFor={controlled ? undefined : id}
              onClick={handleClose}
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
        <label
          className="modal-backdrop"
          htmlFor={controlled ? undefined : id}
          onClick={handleClose}
        >
          close
        </label>
      </div>
    </>
  );
};
export default Dialog;
