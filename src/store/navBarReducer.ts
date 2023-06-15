import { createNoteAPI, deleteNoteAPI, updateNoteAPI } from "../api/api";
import {
  createNoteAC,
  deleteNoteAC,
  noteType,
  setCurrentNoteAC,
  thunkType,
  updateNoteAC,
  value,
} from "./appReducer";

const OPEN_MODAL = "OPEN_MODAL";
const CLOSE_MODAL = "CLOSE_MODAL";
const FILTER_NOTES_BY_SEARCH = "FILTER_NOTES_BY_SEARCH";
const SET_IS_NOTE_EDITABLE = "SET_IS_NOTE_EDITABLE";
type initialStateType = typeof initialState;
type openModalACType = {
  type: typeof OPEN_MODAL;
};
export type closeModalACType = {
  type: typeof CLOSE_MODAL;
};
export type filterNotesBySearchACType = {
  type: typeof FILTER_NOTES_BY_SEARCH;
  searchQuery: string;
  notes: Array<noteType>;
};
export type setIsNoteEditableACType = {
  type: typeof SET_IS_NOTE_EDITABLE;
  value: boolean;
};
type actionsType =
  | openModalACType
  | closeModalACType
  | filterNotesBySearchACType
  | setIsNoteEditableACType;

let initialState = {
  isModalOpen: false as boolean,
  searchQuery: "" as string,
  filteredNotesBySearch: null as Array<noteType> | null,
  isNoteEditable: true as boolean,
};
export const navBarReducer = (
  state: initialStateType = initialState,
  action: actionsType
) => {
  switch (action.type) {
    case OPEN_MODAL:
      return {
        ...state,
        isModalOpen: true,
      };
    case CLOSE_MODAL:
      return {
        ...state,
        isModalOpen: false,
      };
    case FILTER_NOTES_BY_SEARCH:
      const filteredNotes = action.notes.filter((note) =>
        note.value.toLowerCase().includes(action.searchQuery.toLowerCase())
      );
      return {
        ...state,
        searchQuery: action.searchQuery,
        filteredNotesBySearch: filteredNotes,
      };
    case SET_IS_NOTE_EDITABLE:
      return {
        ...state,
        isNoteEditable: action.value,
      };
    default:
      return state;
  }
};
export const openModalAC = (): openModalACType => ({
  type: OPEN_MODAL,
});
export const closeModalAC = (): closeModalACType => ({
  type: CLOSE_MODAL,
});
export const filterNotesBySearchAC = (
  searchQuery: string,
  notes: Array<noteType>
): filterNotesBySearchACType => ({
  type: FILTER_NOTES_BY_SEARCH,
  searchQuery,
  notes,
});
export const setIsNoteEditableAC = (
  value: boolean
): setIsNoteEditableACType => ({
  type: SET_IS_NOTE_EDITABLE,
  value,
});
export const onSearch =
  (searchQuery: string): thunkType =>
  (dispatch, getState) => {
    const notes = getState().app.notes;
    dispatch(returnToList());
    dispatch(filterNotesBySearchAC(searchQuery, notes));
  };
export const returnToList = (): thunkType => async (dispatch, getState) => {
  // on "back" button click
  let currentId = getState().app.currentNote.currentId;
  let currentValue = getState().app.currentNote.currentValue;
  if (currentId && !currentValue) {
    // in case when user press "back" when note is empty
    await deleteNoteAPI(currentId); // deleting note by server
    dispatch(deleteNoteAC(currentId)); // if ok, deleting note by reducer
  } else {
    await updateNoteAPI(
      //send note data to server
      currentId,
      currentValue
    );
    dispatch(updateNoteAC()); //refresh notes by reducer
  }
  dispatch(setCurrentNoteAC("", "", "")); // reset curent note
};

export const createNote = (): thunkType => async (dispatch, getState) => {
  let currentId = getState().app.currentNote.currentId;
  let currentValue = getState().app.currentNote.currentValue;
  await updateNoteAPI(
    //if there was any opened note, save note data to server
    currentId,
    currentValue
  );
  dispatch(updateNoteAC()); // if ok, update note by reducers
  let res = await createNoteAPI(); //create new note in server
  let newNote = {
    // make from server response require format
    value: res.record.values[value],
    id: res.record.id,
    created_at: res.record.created_at,
  };

  dispatch(createNoteAC(newNote)); //adding new note to storage
  dispatch(
    setCurrentNoteAC(
      //set note from response to current
      res.record.id,
      "", //displaying new empty note at first entering,
      res.record.created_at
    )
  );
};

export const deleteNote = (): thunkType => async (dispatch, getState) => {
  await deleteNoteAPI(getState().app.currentNote.currentId); // deleting note by server
  dispatch(deleteNoteAC(getState().app.currentNote.currentId)); // if ok, deleting note by reducer
  dispatch(closeModalAC()); // closing modal window
  dispatch(setCurrentNoteAC("", "", "")); // reset current note
};
