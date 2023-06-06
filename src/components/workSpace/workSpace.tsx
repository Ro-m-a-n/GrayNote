import { ModalWindow } from "../../globalComponents/modalWindow/modal";
import { toFormatDateFull } from "../../globalFunc/dateFormat";
import { saveUserTextAC } from "../../store/appReducer";
import { useAppDispatch, useAppSelector } from "../../store/hooks";

const WorkSpace = () => {
  const dispatch = useAppDispatch();
  const currentNote = useAppSelector((state) => state.app.currentNote);
  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    dispatch(saveUserTextAC(e.target.value));
  };

  return (
    <div className="workSpace_wrap">
      <ModalWindow />
      <div className="date">
        {currentNote.currentCreated_at &&
          toFormatDateFull(currentNote.currentCreated_at)}
      </div>
      <textarea
        // readOnly={isReadOnly}
        value={currentNote.currentValue}
        onChange={handleChange}
        className="note"
      />
    </div>
  );
};
export default WorkSpace;
