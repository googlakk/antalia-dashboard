import { FC, PropsWithChildren } from "react";

type TextFiledTypes = "text" | "tel" | "date" | "number";

type TextFieldProps = {
  onChange?: (val: any) => void;
  value?: string | number;
  type?: TextFiledTypes;
};

const TextField: FC<TextFieldProps> = ({ onChange, value, type  }) => {
  return (
    <input
      className=" + border-b-[2px] border-black"
      onChange={(e) => onChange?.(e.target.value)}
      value={value}
      type={type}
    />
  );
};

export default TextField;
