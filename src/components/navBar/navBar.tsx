import { createNote, openModalAC } from "../../store/appReducer";
import { useAppDispatch } from "../../store/hooks";
import { Button } from "./buttons/button";

const NavBar = () => {
  const dispatch = useAppDispatch();
  const handleBack = () => {};
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
        <Button type="back" iconClass="icon" btnFunc={handleBack} />
        <Button type="add" iconClass="icon" btnFunc={handleAdd} />
        <Button type="delete" iconClass="icon" btnFunc={handleDelete} />
        <Button type="edit" iconClass="icon" btnFunc={handleEdit} />
      </div>
      <div className="search_wrap"> search</div>
    </div>
  );
};
export default NavBar;
