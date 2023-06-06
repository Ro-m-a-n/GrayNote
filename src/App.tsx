import NavBar from "./components/navBar/navBar";
import WorkSpace from "./components/workSpace/workSpace";
import { NoteList } from "./components/noteList/noteList";
import { Route, Routes } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "./store/hooks";
import { useEffect } from "react";
import { getNotes } from "./store/appReducer";
function App() {
  const currentId = useAppSelector((state) => state.app.currentNote?.currentId);
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(getNotes());
  }, []);
  return (
    <div className="app_wrap">
      <div className="app_top">
        <NavBar />
      </div>
      <div className="app_bottom">
        {currentId ? <WorkSpace /> : <NoteList />}
      </div>
    </div>
  );
}

export default App;
