import { FiEdit } from "react-icons/fi";
import { GrAdd } from "react-icons/gr";
import { IoMdArrowBack } from "react-icons/io";
import { RiDeleteBin2Line } from "react-icons/ri";

type propsType = {
  type: string;
  iconClass: string;
  disabled?: boolean;
  btnFunc: () => void;
};
export const Button = (props: propsType) => {
  let CurrentButton = () => {
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
      onClick={props.btnFunc}
      className="Button"
      disabled={props.disabled}
    >
      <CurrentButton />
    </button>
  );
};
