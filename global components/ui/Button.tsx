"use client";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { ReactNode } from "@node_modules/@types/react";

export default function Button({
  buttonText,
  clickAction,
  type = "button",
  className = "",
  children,
  disabled,
}: {
  buttonText: string;
  clickAction?: () => void;
  type?: "button" | "submit" | "reset";
  className?: string;
  children?: React.ReactNode;
  disabled?: boolean;
}) {
  return (
    <button
      type={type}
      className={`bg-(--primary-blue) py-3 px-4 rounded-[10px] text-white hover:bg-(--secondary-blue) duration-300 text-style__small-text cursor-pointer disabled:cursor-not-allowed disabled:border-(--secondary-grey) disabled:bg-(--secondary-grey) disabled:text-white disabled:opacity-70 disabled:hover:bg-(--secondary-grey) ${className}`}
      onClick={clickAction}
      disabled={disabled}
    >
      <div className={children ? "flex items-center" : ""}>
        <div className="flex-1">{buttonText}</div> {children}
      </div>
    </button>
  );
}

export function ButtonLight({
  buttonText,
  clickAction,
  className = "",
  type,
  icon,
  children,
  disabled,
}: {
  buttonText: string;
  clickAction: () => void;
  type?: "button" | "submit" | "reset";
  className?: string;
  icon?: React.ReactNode;
  children?: React.ReactNode;
  disabled?: boolean;
}) {
  return (
    <button
      type={type}
      className={`border border-(--secondary-blue) py-2.75 px-4 rounded-[10px] text-(--primary-blue) bg-white hover:bg-(--terciary-grey)/40 duration-300 text-style__small-text cursor-pointer disabled:cursor-not-allowed disabled:border-(--secondary-grey) disabled:bg-(--terciary-grey)/40 disabled:text-(--secondary-grey) disabled:opacity-70 disabled:hover:bg-(--terciary-grey)/40 ${className}`}
      onClick={clickAction}
      disabled={disabled}
    >
      <div className={icon || children ? "flex items-center gap-2" : ""}>
        {icon}
        {buttonText}
        {children}
      </div>
    </button>
  );
}

export function ButtonRed({
  buttonText,
  clickAction,
  type = "button",
  className = "",
  children,
  disabled,
}: {
  buttonText: string;
  clickAction?: () => void;
  type?: "button" | "submit" | "reset";
  className?: string;
  children?: React.ReactNode;
  disabled?: boolean;
}) {
  return (
    <button
      type={type}
      className={`bg-(--primary-red) py-3 px-4 rounded-[10px] text-white text-style__small-text cursor-pointer disabled:cursor-not-allowed disabled:bg-(--secondary-grey) disabled:text-white disabled:opacity-70 ${className}`}
      onClick={clickAction}
      disabled={disabled}
    >
      <div className={children ? "flex items-center" : ""}>
        <div className="flex-1">{buttonText}</div>
        {children}
      </div>
    </button>
  );
}

export function DeleteIconBtn({
  deleteFunc,
  children,
}: {
  deleteFunc: () => void;
  children?: ReactNode;
}) {
  return (
    <div
      className={`hover:text-(--secondary-red) text-(--primary-red)/80 cursor-pointer duration-300 ${children && "flex items-center gap-2.5"}`}
      onClick={deleteFunc}
    >
      <FontAwesomeIcon icon={["far", "trash-can"]} />

      {children}
    </div>
  );
}

export function UploadIconBtn({ uploadFunc }: { uploadFunc: () => void }) {
  return (
    <div
      className="py-1.5 px-2 h border border-(--secondary-grey) bg-white rounded-[10px] w-fit hover:bg-(--terciary-grey)/30 duration-100"
      onClick={uploadFunc}
    >
      <FontAwesomeIcon icon={["fas", "arrow-up-from-bracket"]} />
    </div>
  );
}
