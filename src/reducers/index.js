import { combineReducers } from "@reduxjs/toolkit";

import GeneralReducer from "./GeneralReducer";
import ShopReducer from "./ShopReducer";

export default combineReducers({
  generalState: GeneralReducer,
  shopState: ShopReducer,
});
