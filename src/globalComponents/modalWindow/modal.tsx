import { deleteNote } from "../../store/navBarReducer";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { closeModalAC } from "../../store/navBarReducer";

export const ModalWindow = () => {
  const dispatch = useAppDispatch();
  const isModalOpen = useAppSelector((store) => store.navBar.isModalOpen);
  const handleDelete = () => {
    dispatch(deleteNote());
  };
  const handleCancel = () => {
    dispatch(closeModalAC());
  };
  return (
    <>
      {isModalOpen && (
        <div className="modal_wrap" onClick={handleCancel}>
          <div className="modal">
            <h3>Delete this note?</h3>
            <div className="button_group">
              <button onClick={handleDelete}>Yes</button>
              <button onClick={handleCancel}>Cancel</button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
