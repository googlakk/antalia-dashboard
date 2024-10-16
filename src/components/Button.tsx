import { FC, PropsWithChildren } from "react";

type ButtonProps = {
  onClick?: () => void;
};

const Button: FC<PropsWithChildren<ButtonProps>> = ({ children, onClick }) => {
  return <button
      className="border-[1px] bg-[#25ccff] p-1 rounded-md text-white font-bold "
      onClick={onClick}>{children}</button>;
};

export default Button;
