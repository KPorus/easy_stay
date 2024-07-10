import { cva, VariantProps } from "class-variance-authority";
import styles from "./button.module.scss";

const buttonStyles = cva(`${styles.btnContainer}`, {
  variants: {
    intent: {
      primary: `${styles.primary}`,
      secondary: `${styles.secondary}`,
      thrid: `${styles.thrid}`,
      fourth: `${styles.fourth}`,
      fifth: `${styles.fifth}`,
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
  disabled?: boolean;
}

export default function Button({ intent, text, disabled, ...props }: ButtonProps) {
  return (
    <button
      id="ts--button"
      className={buttonStyles({ intent, disabled })}
      disabled={disabled}
      {...props}
    >
      {text}
    </button>
  );
}
