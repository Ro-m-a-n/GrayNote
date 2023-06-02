import {
  applyMiddleware,
  combineReducers,
  compose,
  legacy_createStore as createStore,
} from "redux";
import thunkMiddleware from "redux-thunk";
import appReducer from "./appReducer";

let rootReducers = combineReducers({
  app: appReducer,
});
type rootReducersType = typeof rootReducers;
export type appStateType = ReturnType<rootReducersType>;
//@ts-ignore
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
let store = createStore(
  rootReducers,
  composeEnhancers(applyMiddleware(thunkMiddleware))
);

export default store;
export type AppDispatch = typeof store.dispatch;
//@ts-ignore
window.__store__ = store;
