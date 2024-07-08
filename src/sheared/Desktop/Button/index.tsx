import { cva, VariantProps } from "class-variance-authority";
import styles from "./button.module.scss";
const buttonStyles = cva(`${styles.btnContainer}`, {
  variants: {
    intent: {
      primary: `${styles.primary}`,
      secondary: `${styles.secondary}`,
      thrid: `${styles.thrid}`,
    },
    defaultVariants: {
      intent: "primary",
    },
  },
});

interface ButtonProps extends VariantProps<typeof buttonStyles> {
  text: string;
}
export default function Button({ intent, text, ...props }: ButtonProps) {
  return (
    <span id="ts--button" className={buttonStyles({ intent })} {...props}>
      {text}
    </span>
  );
}
