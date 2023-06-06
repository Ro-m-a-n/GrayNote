import { createNote, openModalAC, returnToList } from "../../store/appReducer";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { Button } from "./buttons/button";
import { Search } from "./search/search";

const NavBar = () => {
  const currentId = useAppSelector((state) => state.app.currentNote?.currentId);
  const dispatch = useAppDispatch();

  const handleBack = () => {
    dispatch(returnToList());
  };
  const handleAdd = () => {
    dispatch(createNote());
  };
  const handleDelete = () => {
    dispatch(openModalAC());
  };
  const handleEdit = () => {};
  return (
    <div className="navBar_wrap">
      <div className="buttons_wrap">
        <Button
          type="back"
          iconClass="icon"
          btnFunc={handleBack}
          disabled={!currentId}
        />
        <Button type="add" iconClass="icon" btnFunc={handleAdd} />
        <Button
          type="delete"
          iconClass="icon"
          btnFunc={handleDelete}
          disabled={!currentId}
        />
        <Button
          type="edit"
          iconClass="icon"
          btnFunc={handleEdit}
          disabled={!currentId}
        />
      </div>
      <Search />
    </div>
  );
};
export default NavBar;
