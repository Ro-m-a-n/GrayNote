import { ThunkAction } from "redux-thunk";
import { appStateType } from "./store";
import { deleteNoteAPI, getNotesAPI, updateNoteAPI } from "../api/api";
import {
  closeModalACType,
  filterNotesBySearchACType,
  setIsNoteEditableAC,
  setIsNoteEditableACType,
} from "./navBarReducer";

const SET_NOTES = "SET_NOTES";
const DELETE_NOTE = "DELETE_NOTE";
const SET_CURRENT_NOTE = "SET_CURRENT_ID";
const CREATE_NOTE = "CREATE_NOTE";
const SAVE_USER_TEXT = "SAVE_USER_TEXT";
const UPDATE_NOTE = "UPDATE_NOTE";

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

type updateNoteACType = {
  type: typeof UPDATE_NOTE;
  currentNote?: currentNoteType;
};

type actionsTypes =
  | setNotesACType
  | deleteNoteACType
  | setCurrentNoteACType
  | createNoteACType
  | saveUserTextACType
  | filterNotesBySearchACType
  | setIsNoteEditableACType
  | updateNoteACType
  | closeModalACType;

let initialState = {
  notes: ([] as Array<noteType>) || null,
  currentNote: {
    currentId: "",
    currentValue: "",
    currentCreated_at: "",
  } as currentNoteType,
};

export const appReducer = (
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

    case UPDATE_NOTE:
      const newNotes = state.notes.map((note) => {
        if (
          note.id ===
          (action.currentNote?.currentId || state.currentNote.currentId)
        ) {
          return {
            id: action.currentNote?.currentId || state.currentNote.currentId,
            value:
              action.currentNote?.currentValue ||
              state.currentNote.currentValue,
            created_at:
              action.currentNote?.currentCreated_at ||
              state.currentNote.currentCreated_at,
          };
        }
        return note;
      });
      return {
        ...state,
        notes: newNotes,
      };

    default:
      return state;
  }
};

export const setNotesAC = (notes: Array<noteType>): setNotesACType => ({
  type: SET_NOTES,
  notes,
});
export const createNoteAC = (note: noteType): createNoteACType => ({
  type: CREATE_NOTE,
  note,
});
export const deleteNoteAC = (id: string): deleteNoteACType => ({
  type: DELETE_NOTE,
  id,
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

export const saveUserTextAC = (value: string): saveUserTextACType => ({
  type: SAVE_USER_TEXT,
  value,
});

export const updateNoteAC = (
  currentNote?: currentNoteType
): updateNoteACType => ({
  type: UPDATE_NOTE,
  currentNote,
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
    let previousNoteId = getState().app.currentNote.currentId;
    let previousNoteValue = getState().app.currentNote.currentValue;
    if (previousNoteId && previousNoteValue) {
      // in case there are exist not empty previous note
      //save previous user note when he switch notes
      await updateNoteAPI(previousNoteId, previousNoteValue);
      dispatch(updateNoteAC()); // update previous notes
    } else if (
      previousNoteId &&
      previousNoteValue === "" &&
      previousNoteId !== id
    ) {
      // in case there are exist previous note but with empty value
      // and if you dont click on the same note
      await deleteNoteAPI(previousNoteId); // deleting note by server
      dispatch(deleteNoteAC(previousNoteId)); // if ok, deleting note by reducer
    }
    dispatch(setCurrentNoteAC(id, value, created_at)); //set active note to current
    dispatch(setIsNoteEditableAC(true)); // make note editable at first opening
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
