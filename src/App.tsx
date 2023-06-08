import NavBar from "./components/navBar/navBar";
import WorkSpace from "./components/workSpace/workSpace";
import { NoteList } from "./components/noteList/noteList";
import { useAppDispatch, useAppSelector } from "./store/hooks";
import { useEffect } from "react";
import { getNotes, onAppStart, updateNote } from "./store/appReducer";
function App() {
  const currentId = useAppSelector((state) => state.app.currentNote?.currentId);
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(onAppStart());
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
