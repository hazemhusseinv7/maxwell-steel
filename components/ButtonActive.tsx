import React, { ReactNode } from "react";
import Link from "next/link";

interface ButtonActiveProps {
  href?: string;
  children: ReactNode;
  className?: string;
  onClick?: () => void;
  type?: "button" | "submit" | "reset";
}

function ButtonActive({
  href,
  children,
  className = "",
  onClick,
  type = "button",
}: ButtonActiveProps) {
  const buttonContent = (
    <>
      <span className="relative z-10">{children}</span>
      <span className="absolute inset-0 rounded-md bg-gradient-to-r from-[#f6f7ff] to-[#f5f6ff] opacity-0 transition-opacity duration-200 group-hover:opacity-100 dark:from-[#070e41] dark:to-[#263381]"></span>
    </>
  );

  const buttonClasses = `group relative inline-flex h-12 items-center justify-center overflow-hidden rounded-md dark:border-[rgb(76_100_255)] border-2 border-[#263381] bg-transparent px-6 font-medium dark:text-white text-black transition-all duration-100 hover:[box-shadow:5px_5px_rgb(38_51_129)] translate-x-[3px] hover:translate-x-[0px] translate-y-[3px] hover:translate-y-[0px] [box-shadow:0px_0px_rgb(38_51_129)] dark:hover:[box-shadow:5px_5px_rgb(76_100_255)] dark:active:[box-shadow:0px_0px_rgb(76_100_255)] active:[box-shadow:0px_0px_rgb(38_51_129)] active:translate-y-[3px] active:translate-x-[3px] ${className}`;

  if (href) {
    return (
      <Link href={href} className={buttonClasses}>
        {buttonContent}
      </Link>
    );
  }

  return (
    <button type={type} onClick={onClick} className={buttonClasses}>
      {buttonContent}
    </button>
  );
}

export default ButtonActive;
