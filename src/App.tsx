import { NavBar } from "./components/navBar/navBar";
import { WorkSpace } from "./components/workSpace/workSpace";
import { NoteList } from "./components/noteList/noteList";
import { useAppDispatch, useAppSelector } from "./store/hooks";
import { useEffect } from "react";
import { onAppStart } from "./store/appReducer";
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
        <span className="mobileOnly">
          {currentId ? <WorkSpace /> : <NoteList />}
        </span>
        <span className="desktopOnly">
          <NoteList />
          <WorkSpace />
        </span>
      </div>
    </div>
  );
}

export default App;
