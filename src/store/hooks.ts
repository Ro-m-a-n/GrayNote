import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import type { appStateType } from "./store";

// Use throughout your app instead of plain `useDispatch` and `useSelector`
type DispatchFunc = () => any;
export const useAppDispatch: DispatchFunc = useDispatch;
export const useAppSelector: TypedUseSelectorHook<appStateType> = useSelector;
