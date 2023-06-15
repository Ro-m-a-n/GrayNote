import { ModalWindow } from "../../globalComponents/modalWindow/modal";
import { toFormatDateFull } from "../../globalFunc/dateFormat";
import { onNoteChange } from "../../store/appReducer";
import { useAppDispatch, useAppSelector } from "../../store/hooks";

export const WorkSpace = () => {
  const dispatch = useAppDispatch();
  const currentNote = useAppSelector((state) => state.app.currentNote);
  const isNoteEditable = useAppSelector((state) => state.navBar.isNoteEditable);
  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    dispatch(onNoteChange(e.target.value));
  };

  return (
    <div className="workSpace_wrap">
      <ModalWindow />
      <div className="date">
        {currentNote.currentCreated_at &&
          toFormatDateFull(currentNote.currentCreated_at)}
      </div>
      <textarea
        readOnly={!currentNote.currentId || !isNoteEditable}
        value={currentNote.currentValue}
        onChange={handleChange}
        className="note"
      />
    </div>
  );
};
