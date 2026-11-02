import type { ButtonHTMLAttributes } from "react";
import type { VariantProps } from "class-variance-authority";
import { buttonVariants } from "../button.variants";
import { cn } from "../../../lib/cn";

type Props = ButtonHTMLAttributes<HTMLButtonElement> &
  VariantProps<typeof buttonVariants> & {
    buttonText?: string;
  };

const Button = ({
  variant,
  className,
  children,
  buttonText,
  ...rest
}: Props) => {
  return (
    <button className={cn(buttonVariants({ variant }), className)} {...rest}>
      {buttonText}
      {children}
    </button>
  );
};

export default Button;
