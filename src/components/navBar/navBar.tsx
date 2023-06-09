import {
  createNote,
  openModalAC,
  returnToList,
  setIsNoteEditableAC,
} from "../../store/appReducer";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { Button } from "./buttons/button";
import { Search } from "./search/search";
import { useEffect } from "react";
import { useState } from "react";

const NavBar = () => {
  const currentId = useAppSelector((state) => state.app.currentNote?.currentId);
  const currentValue = useAppSelector(
    (state) => state.app.currentNote?.currentValue
  );
  const dispatch = useAppDispatch();
  const isNoteEditable = useAppSelector((state) => state.app.isNoteEditable);
  const [pressedButton, setPressedButton] = useState(""); //className for pressed button
  useEffect(() => {
    if (isNoteEditable) {
      //make background green if button is pressed
      setPressedButton("pressedButton");
    } else {
      setPressedButton("");
    }
  }, [isNoteEditable]);

  const handleBack = () => {
    dispatch(returnToList());
  };
  const handleAdd = () => {
    dispatch(createNote());
  };
  const handleDelete = () => {
    dispatch(openModalAC());
  };
  const handleEdit = () => {
    dispatch(setIsNoteEditableAC(!isNoteEditable));
  };
  return (
    <div className="navBar_wrap">
      <div className="buttons_wrap">
        <Button
          type="back"
          iconClass="icon"
          buttonFunction={handleBack}
          disabled={!currentId}
        />
        <Button
          type="add"
          iconClass="icon"
          buttonFunction={handleAdd}
          disabled={currentId !== "" && !currentValue}
        />
        <Button
          type="delete"
          iconClass="icon"
          buttonFunction={handleDelete}
          disabled={!currentId}
        />
        <Button
          type="edit"
          iconClass="icon"
          buttonFunction={handleEdit}
          disabled={!currentId}
          pressedButton={pressedButton}
        />
      </div>
      <Search />
    </div>
  );
};
export default NavBar;
