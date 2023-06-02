import { ThunkAction } from "redux-thunk";
import { appStateType } from "./store";
import { createNoteAPI, deleteNoteAPI, getNotesAPI } from "../api/api";

const SET_NOTES = "SET_NOTES";
const DELETE_NOTE = "DELETE_NOTE";
const OPEN_MODAL = "OPEN_MODAL";
const CLOSE_MODAL = "CLOSE_MODAL";
const SET_CURRENT_ID = "SET_CURRENT_ID";

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
type setCurrentIdACType = {
  type: typeof SET_CURRENT_ID;
  id: string;
};
type actionsTypes =
  | setNotesACType
  | deleteNoteACType
  | openModalACType
  | closeModalACType
  | setCurrentIdACType;

let initialState = {
  notes: ([] as Array<noteType>) || null,
  currentId: "" as string,
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
    case SET_CURRENT_ID:
      console.log(state.currentId);
      return {
        ...state,
        currentId: action.id,
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
export const setCurrentIdAC = (id: string): setCurrentIdACType => ({
  type: SET_CURRENT_ID,
  id,
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
  await createNoteAPI();
  dispatch(getNotes()); //get updated notes
};

export const deleteNote =
  (id: string): thunkType =>
  async (dispatch) => {
    await deleteNoteAPI(id); // deleting note by server
    dispatch(deleteNote(id)); // deleting note by reducer
    dispatch(closeModalAC()); // closing modal window
  };
export default appReducer;
