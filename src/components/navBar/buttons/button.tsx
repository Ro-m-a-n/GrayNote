import { FiEdit } from "react-icons/fi";
import { GrAdd } from "react-icons/gr";
import { IoMdArrowBack } from "react-icons/io";
import { RiDeleteBin2Line } from "react-icons/ri";

type propsType = {
  type: string;
  iconClass: string;
  btnFunc: () => void;
};
export const Button = (props: propsType) => {
  let CurrentIcon = () => {
    switch (props.type) {
      case "back":
        return <IoMdArrowBack className={`${props.iconClass}`} />;
      case "add":
        return <GrAdd className={`${props.iconClass}`} />;
      case "delete":
        return <RiDeleteBin2Line className={`${props.iconClass}`} />;
      case "edit":
        return <FiEdit className={`${props.iconClass}`} />;
      default:
        return <>icon</>;
    }
  };
  return (
    <button onClick={props.btnFunc} className="Button">
      <CurrentIcon />
    </button>
  );
};
