import { useAppSelector } from "../../store/hooks";
import { Note } from "./note/note";

export const NoteList = () => {
  const notes = useAppSelector((state) => state.app.notes);

  return (
    <div className="noteList_wrap">
      {notes.map((note) => (
        <Note
          value={note.value}
          created_at={note.created_at}
          id={note.id}
          key={note.id}
        />
      ))}
    </div>
  );
};
