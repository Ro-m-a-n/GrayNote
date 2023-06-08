import { actualDate } from "../../../globalFunc/dateFormat";
import { noteType, onNoteClick } from "../../../store/appReducer";
import { useAppDispatch } from "../../../store/hooks";

export const Note = (props: noteType) => {
  const dispatch = useAppDispatch();
  const handleClick = () => {
    dispatch(onNoteClick(props.id, props.value, props.created_at));
  };
  const noteDevide = (note: string) => {
    const regex = /^([^\n.]{0,200}[^\s])[\n.]?([\s\S]*)$/; // Matches up to 200 characters, then a non-space character, followed by a dot or a new line, and captures the rest of the text
    const matches = note.match(regex);
    if (matches) {
      const part1 = matches[1]; // Header
      const part2 = matches[2]; // The rest of the text
      return [part1, part2];
    } else {
      return [note, null];
    }
  };
  let devidedNote = noteDevide(props.value);

  return (
    <div className="note_wrap" onClick={handleClick}>
      <time>{actualDate(props.created_at)}</time>
      <div className="rightSide">
        <header>{devidedNote[0]}</header>
        <p className="note">{devidedNote[1]}</p>
      </div>
    </div>
  );
};
