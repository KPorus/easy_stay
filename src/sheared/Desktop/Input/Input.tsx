import React from "react";
import { cva, VariantProps } from "class-variance-authority";
import styles from "./Input.module.scss";

const inputContainer = cva(styles.inputContainer);

const inputBody = cva(styles.inputBody, {
  variants: {
    inputIntent: {
      primary: `${styles.inputBody}`,
      secondary: `${styles.inputBodySecondary}`,
    },
    focus: {
      true: styles.inputFocus,
    },
  },
  defaultVariants: {
    inputIntent: "primary",
  },
});

const labelBody = cva(styles.labelBody, {
  variants: {
    labelIntent: {
      primary: `${styles.labelPrimary}`,
      secondary: `${styles.labelSecondary}`,
    },
  },
  defaultVariants: {
    labelIntent: "primary",
  },
});

interface IInputType extends VariantProps<typeof labelBody & typeof inputBody> {
  type: string;
  id: string;
  name: string;
  value?:string
  placeholder: string;
  isRequired?: boolean;
  labelTitle: string;
  handleChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  labelIntent?: "primary" | "secondary";
}

const Input = ({
  type,
  id,
  name,
  value,
  placeholder,
  isRequired,
  labelTitle,
  handleChange,
  inputIntent,
  labelIntent,
}: IInputType) => {
  return (
    <div className={inputContainer()}>
      <input
        type={type}
        id={id}
        name={name}
        value={value}
        className={inputBody({ inputIntent, focus: false })}
        placeholder={placeholder ? placeholder : ""}
        required={isRequired ? true : false}
        onChange={handleChange}
      />
      <label htmlFor={id} className={labelBody({ labelIntent })}>
        {labelTitle}
      </label>
    </div>
  );
};

export default Input;
