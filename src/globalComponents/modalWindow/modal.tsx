import { NavLink, Navigate } from "react-router-dom";
import { closeModalAC, deleteNote } from "../../store/appReducer";
import { useAppDispatch, useAppSelector } from "../../store/hooks";

export const ModalWindow = () => {
  const dispatch = useAppDispatch();
  const isModalOpen = useAppSelector((store) => store.app.isModalOpen);
  const handleDelete = () => {
    dispatch(deleteNote());
  };
  const handleCancel = () => {
    dispatch(closeModalAC());
  };
  return (
    <>
      {isModalOpen && (
        <div className="modal">
          <div className="modal_content">
            <h3>Delete this note?</h3>
            <div className="Button_group">
              <button onClick={handleDelete}>Yes</button>

              <button onClick={handleCancel}>Cancel</button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
