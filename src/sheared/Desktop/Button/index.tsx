import { cva, VariantProps } from "class-variance-authority";
import styles from "./button.module.scss";

const buttonStyles = cva(`${styles.btnContainer}`, {
  variants: {
    intent: {
      primary: `${styles.primary}`,
      secondary: `${styles.secondary}`,
      third: `${styles.third}`,
      fourth: `${styles.fourth}`,
      fifth: `${styles.fifth}`,
      sixth: `${styles.sixth}`,
      seventh: `${styles.seventh}`,
      eighth: `${styles.eighth}`,
    },
    disabled: {
      true: `${styles.disabled}`,
      false: "",
    },
  },
  defaultVariants: {
    intent: "primary",
    disabled: false,
  },
});

interface ButtonProps extends VariantProps<typeof buttonStyles> {
  text: string;
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
}

export default function Button({
  intent,
  text,
  type = "button",
  disabled,
  ...props
}: ButtonProps) {
  return (
    <button
      id="ts--button"
      className={buttonStyles({ intent, disabled })}
      disabled={disabled}
      type={type}
      {...props}
    >
      {text}
    </button>
  );
}
