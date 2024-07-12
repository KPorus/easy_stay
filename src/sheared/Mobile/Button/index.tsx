import { cva, VariantProps } from "class-variance-authority";
import styles from "./button.module.scss";
const buttonStyles = cva(`${styles.btnContainer}`, {
  variants: {
    intent: {
      primary: `${styles.primary}`,
      secondary: `${styles.secondary}`,
      third: `${styles.third}`,
      forth: `${styles.forth}`,
    },
    disabled: {
      true: `${styles.disabled}`,
      false: "",
    },
    defaultVariants: {
      intent: "primary",
      disabled: false
    },
  },
});

interface ButtonProps extends VariantProps<typeof buttonStyles> {
  text: string;
  disabled?: boolean;
}
export default function Button({ intent,disabled, text, ...props }: ButtonProps) {
  return (
    <span
      id="ts--button"
      className={buttonStyles({ intent, disabled })}
      {...props}
    >
      {text}
    </span>
  );
}
