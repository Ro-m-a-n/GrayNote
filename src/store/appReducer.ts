import { ThunkAction } from "redux-thunk";
import { appStateType } from "./store";
import {
  createNoteAPI,
  deleteNoteAPI,
  getNotesAPI,
  updateNoteAPI,
} from "../api/api";

const SET_NOTES = "SET_NOTES";
const DELETE_NOTE = "DELETE_NOTE";
const OPEN_MODAL = "OPEN_MODAL";
const CLOSE_MODAL = "CLOSE_MODAL";
const SET_CURRENT_NOTE = "SET_CURRENT_ID";
const CREATE_NOTE = "CREATE_NOTE";
const SAVE_USER_TEXT = "SAVE_USER_TEXT";
const FILTER_NOTES_BY_SEARCH = "FILTER_NOTES_BY_SEARCH";
const SET_IS_NOTE_EDITABLE = "SET_IS_NOTE_EDITABLE";

export const value = "ddTSkIjunmWO5BDXfirrDx";

export type thunkType = ThunkAction<void, appStateType, unknown, actionsTypes>;
type valuesType = {
  ddTSkIjunmWO5BDXfirrDx: string;
};
type serverRecordsType = {
  id: string;
  app_id: string;
  entity_id: string;
  values: valuesType;
  rel_values: null;
  subform_values: object;
  approved: boolean;
  created_at: string;
  updated_at: string;
  added_by: string;
  user_ids: null;
};
type InitialStateType = typeof initialState;

export type noteType = {
  value: string;
  id: string;
  created_at: string;
};
type currentNoteType = {
  currentId: string;
  currentValue: string;
  currentCreated_at: string;
};
type setNotesACType = {
  type: typeof SET_NOTES;
  notes: Array<noteType>;
};
type deleteNoteACType = {
  type: typeof DELETE_NOTE;
  id: string;
};
type openModalACType = {
  type: typeof OPEN_MODAL;
};
type closeModalACType = {
  type: typeof CLOSE_MODAL;
};
type setCurrentNoteACType = {
  type: typeof SET_CURRENT_NOTE;
  id: string;
  value: string;
  created_at: string;
};
type createNoteACType = {
  type: typeof CREATE_NOTE;
  note: noteType;
};
type saveUserTextACType = {
  type: typeof SAVE_USER_TEXT;
  value: string;
};
type filterNotesBySearchACType = {
  type: typeof FILTER_NOTES_BY_SEARCH;
  searchQuery: string;
};
type setIsNoteEditableACType = {
  type: typeof SET_IS_NOTE_EDITABLE;
  value: boolean;
};

type actionsTypes =
  | setNotesACType
  | deleteNoteACType
  | openModalACType
  | closeModalACType
  | setCurrentNoteACType
  | createNoteACType
  | saveUserTextACType
  | filterNotesBySearchACType
  | setIsNoteEditableACType;

let initialState = {
  notes: ([] as Array<noteType>) || null,
  currentNote: {
    currentId: "",
    currentValue: "",
    currentCreated_at: "",
  } as currentNoteType,
  isModalOpen: false as boolean,
  searchQuery: "" as string,
  filteredNotesBySearch: null as Array<noteType> | null,
  isNoteEditable: true as boolean,
};

let appReducer = (
  state: InitialStateType = initialState,
  action: actionsTypes
) => {
  switch (action.type) {
    case SET_NOTES:
      return {
        ...state,
        notes: action.notes,
      };
    case DELETE_NOTE:
      let result = state.notes.filter((note) => {
        return note.id !== action.id;
      });

      return {
        ...state,
        notes: result,
      };
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
    case SET_CURRENT_NOTE:
      return {
        ...state,
        currentNote: {
          currentId: action.id,
          currentValue: action.value,
          currentCreated_at: action.created_at,
        },
      };
    case CREATE_NOTE:
      return {
        ...state,
        notes: [...state.notes, action.note],
      };
    case SAVE_USER_TEXT:
      return {
        ...state,
        currentNote: {
          ...state.currentNote,
          currentValue: action.value,
        },
      };
    case FILTER_NOTES_BY_SEARCH:
      const filteredNotes = state.notes.filter((note) =>
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

export const setNotesAC = (notes: Array<noteType>): setNotesACType => ({
  type: SET_NOTES,
  notes,
});
export const deleteNoteAC = (id: string): deleteNoteACType => ({
  type: DELETE_NOTE,
  id,
});
export const openModalAC = (): openModalACType => ({
  type: OPEN_MODAL,
});
export const closeModalAC = (): closeModalACType => ({
  type: CLOSE_MODAL,
});
export const setCurrentNoteAC = (
  id: string,
  value: string,
  created_at: string
): setCurrentNoteACType => ({
  type: SET_CURRENT_NOTE,
  id,
  value,
  created_at,
});
export const createNoteAC = (note: noteType): createNoteACType => ({
  type: CREATE_NOTE,
  note,
});
export const saveUserTextAC = (value: string): saveUserTextACType => ({
  type: SAVE_USER_TEXT,
  value,
});
export const filterNotesBySearchAC = (
  searchQuery: string
): filterNotesBySearchACType => ({
  type: FILTER_NOTES_BY_SEARCH,
  searchQuery,
});
export const setIsNoteEditableAC = (
  value: boolean
): setIsNoteEditableACType => ({
  type: SET_IS_NOTE_EDITABLE,
  value,
});

export const getNotes = (): thunkType => async (dispatch) => {
  let res = await getNotesAPI();
  let notes = res.records.map((item: serverRecordsType) => {
    // taking from server response usefull data only
    let note = {
      value: item.values[value],
      id: item.id,
      created_at: item.created_at,
    };
    return note;
  });
  dispatch(setNotesAC(notes)); //seting notes
};

export const createNote = (): thunkType => async (dispatch, getState) => {
  let res = await createNoteAPI();
  let newNote = {
    value: res.record.values[value],
    id: res.record.id,
    created_at: res.record.created_at,
  };
  if (getState().app.currentNote.currentId) {
    dispatch(updateNote());
  }
  dispatch(
    setCurrentNoteAC(
      res.record.id,
      "", //displaying new empty note at first entering,
      res.record.created_at
    )
  ); //set note from response to current
  dispatch(createNoteAC(newNote)); //adding new note to storage
};

export const deleteNote = (): thunkType => async (dispatch, getState) => {
  await deleteNoteAPI(getState().app.currentNote.currentId); // deleting note by server
  dispatch(deleteNoteAC(getState().app.currentNote.currentId)); // if ok, deleting note by reducer
  dispatch(closeModalAC()); // closing modal window
  dispatch(setCurrentNoteAC("", "", "")); // reset current note
};

export const returnToList = (): thunkType => async (dispatch, getState) => {
  await updateNoteAPI(
    //save user text when he switch notes
    getState().app.currentNote.currentId,
    getState().app.currentNote.currentValue
  );
  dispatch(setCurrentNoteAC("", "", "")); // reset curent note
  dispatch(getNotes()); //refresh notes
};
export const updateNote =
  (currentId?: string, currentValue?: string): thunkType =>
  async (dispatch, getState) => {
    await updateNoteAPI(
      //save user text when he switch notes
      currentId || getState().app.currentNote.currentId,
      currentValue || getState().app.currentNote.currentValue
    );
  };
export const onNoteClick =
  (id: string, value: string, created_at: string): thunkType =>
  async (dispatch, getState) => {
    if (getState().app.currentNote.currentId) {
      //save user text when he switch notes
      await updateNoteAPI(
        getState().app.currentNote.currentId,
        getState().app.currentNote.currentValue
      );
    }
    dispatch(setCurrentNoteAC(id, value, created_at)); //set this note to current
    dispatch(setIsNoteEditableAC(true)); // make note editable at first open
  };
export const onNoteChange =
  (value: string): thunkType =>
  (dispatch, getState) => {
    dispatch(saveUserTextAC(value));
    let currentId = getState().app.currentNote.currentId;
    let created_at = getState().app.currentNote.currentCreated_at;
    let stingifyNoteValue = JSON.stringify({ currentId, value, created_at });
    localStorage.setItem("currentNote", stingifyNoteValue);
  };

export const onAppStart = (): thunkType => async (dispatch) => {
  const value = localStorage.getItem("currentNote");
  if (typeof value === "string") {
    //for typescript
    const localCurrentNote = JSON.parse(value);
    await updateNoteAPI(localCurrentNote.currentId, localCurrentNote.value);
    // restore data from local storage if it exist
    localStorage.clear();
  }
  dispatch(getNotes()); //download notes from server at app start
};

export default appReducer;

// devide app reducer
// making large width version
// elipsis doesn`t work
