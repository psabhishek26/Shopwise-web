import { generalActionTypes } from "../constants/ActionTypes";

const initialState = {
  isAppLoading: true,
  token: "",
  isFirstTimeUse: true,
  userData: {},
};

export default (state = initialState, action) => {
  switch (action.type) {
    case generalActionTypes.SET_IS_APP_LOADING:
      return { ...state, isAppLoading: action.payload };
    case generalActionTypes.SET_TOKEN:
      return { ...state, token: action.payload };
    case generalActionTypes.SET_USER_DATA:
      return { ...state, userData: action.payload };
    default:
      return state;
  }
};
