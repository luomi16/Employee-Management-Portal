"use client";

import { useFormStatus } from "react-dom";
import { type ComponentProps } from "react";

type Props = ComponentProps<"button"> & {
  pendingText: string;
};

export function SubmitButton({ children, pendingText, ...props }: Props) {
  const { pending } = useFormStatus();

  return (
    <button
      {...props}
      type="submit"
      aria-disabled={pending}
      className={`w-[300px] h-[40px] flex justify-center items-center font-bold text-white rounded-sm transition-colors duration-300 ${
        pending
          ? "bg-gray-500 cursor-not-allowed"
          : "bg-gray-400 hover:bg-gray-500"
      }`}
    >
      {pending ? pendingText : children}
    </button>
  );
}
