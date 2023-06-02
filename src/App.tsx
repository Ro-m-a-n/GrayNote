import NavBar from "./components/navBar/navBar";
import WorkSpace from "./components/workSpace";
import { NoteList } from "./components/noteList/noteList";
import { Route, Routes } from "react-router-dom";
function App() {
  return (
    <div className="app_wrap">
      <div className="app_top">
        <NavBar />
      </div>
      <div className="app_bottom">
        <Routes>
          <Route path="/" element={<NoteList />} />
          <Route path="/note" element={<WorkSpace />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
