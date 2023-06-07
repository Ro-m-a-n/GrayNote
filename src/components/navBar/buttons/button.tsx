import { FiEdit } from "react-icons/fi";
import { GrAdd } from "react-icons/gr";
import { IoMdArrowBack } from "react-icons/io";
import { RiDeleteBin2Line } from "react-icons/ri";

type propsType = {
  type: string;
  iconClass: string;
  disabled?: boolean;
  buttonFunction: () => void;
  pressedButton?: string;
};
export const Button = (props: propsType) => {
  const CurrentIcon = () => {
    switch (props.type) {
      case "back":
        return <IoMdArrowBack className={`${props.iconClass}`} />;
      case "add":
        return <GrAdd className={`${props.iconClass}`} />;

      case "delete":
        return <RiDeleteBin2Line className={`${props.iconClass}`} />;

      case "edit":
        return <FiEdit className={`${props.iconClass} editIcon`} />;

      default:
        return <>icon</>;
    }
  };
  return (
    <button
      onClick={props.buttonFunction}
      className={`Button ${props.pressedButton}`}
      disabled={props.disabled}
    >
      <CurrentIcon />
    </button>
  );
};
