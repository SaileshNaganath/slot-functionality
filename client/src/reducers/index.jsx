import { combineReducers } from "redux";
import {slotActionReducer } from "./slotReducer";
import errorReducer from "./errorReducer";


const rootReducer = combineReducers({
  slotAction: slotActionReducer,
  error:errorReducer
});

export default rootReducer;