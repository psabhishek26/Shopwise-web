import { combineReducers } from "@reduxjs/toolkit";

import GeneralReducer from "./GeneralReducer";

export default combineReducers({
  generalState: GeneralReducer,
});
