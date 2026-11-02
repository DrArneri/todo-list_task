import { cva } from "class-variance-authority";

export const buttonVariants = cva(
  "flex items-center h-full px-5 rounded-xl border-2 border-solid font-inter font-bold text-lg cursor-pointer transition duration-300 disabled:opacity-50 disabled:pointer-events-none",
  {
    variants: {
      variant: {
        addButton:
          "text-white bg-black border-black hover:text-black hover:bg-white",
        deleteButton:
          "bg-transparent text-l border-transparent hover:border-black",
      },
    },
    defaultVariants: { variant: "deleteButton" },
  },
);