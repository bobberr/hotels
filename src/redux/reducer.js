import { combineReducers } from "redux";
import hotelsReducer from "./ducks/hotels";

const rootReducer = combineReducers({ hotelsReducer });

export default rootReducer;
