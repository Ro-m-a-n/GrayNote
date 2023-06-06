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

export const value = "dcSdutWOLaWQHznSkZmmoW";
// let obj = {
//   records: [
//     {
//       id: "dcOComWRTdQi_dKSoZewj-",
//       app_id: "cQW7WJkaHcI4oDn2OUW4um",
//       entity_id: "cEfCooW5jcL4ZcLgdcGgaR",
//       values: { dcSdutWOLaWQHznSkZmmoW: "hello " },
//       rel_values: null,
//       subform_values: {},
//       approved: false,
//       created_at: "2023-05-30T12:02:00.000Z",
//       updated_at: "2023-05-30T12:02:00.000Z",
//       added_by: "remont-info@ukr.net",
//       user_ids: null,
//     },
//   ],
// };
export type thunkType = ThunkAction<void, appStateType, unknown, actionsTypes>;
type valuesType = {
  dcSdutWOLaWQHznSkZmmoW: string;
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
type actionsTypes =
  | setNotesACType
  | deleteNoteACType
  | openModalACType
  | closeModalACType
  | setCurrentNoteACType
  | createNoteACType
  | saveUserTextACType;

let initialState = {
  notes: ([] as Array<noteType>) || null,
  currentNote: {
    currentId: "",
    currentValue: "",
    currentCreated_at: "",
  } as currentNoteType,

  isModalOpen: false as boolean,
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
        note.id !== action.id;
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

export const createNote = (): thunkType => async (dispatch) => {
  let res = await createNoteAPI();
  let newNote = {
    value: res.record.values[value],
    id: res.record.id,
    created_at: res.record.created_at,
  };
  dispatch(
    setCurrentNoteAC(
      res.record.id,
      "", //displaying new empty note instead of res.record.values[value],
      res.record.created_at
    )
  ); //set note from response to current
  dispatch(createNoteAC(newNote)); //adding new note to storage
};

export const deleteNote = (): thunkType => async (dispatch, getState) => {
  await deleteNoteAPI(getState().app.currentNote.currentId); // deleting note by server
  dispatch(deleteNoteAC(getState().app.currentNote.currentId)); // if ok, deleting note by reducer
  dispatch(setCurrentNoteAC("", "", "")); // reset current note
  dispatch(closeModalAC()); // closing modal window
};

export const returnToList = (): thunkType => async (dispatch, getState) => {
  await updateNoteAPI(
    getState().app.currentNote.currentId,
    getState().app.currentNote.currentValue
  );
  dispatch(setCurrentNoteAC("", "", "")); // reset curent note
  dispatch(getNotes());
};

export default appReducer;
