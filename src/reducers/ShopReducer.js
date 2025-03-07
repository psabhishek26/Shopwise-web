import { shopActionTypes } from "../constants/ActionTypes";

const initialState = {
  isLoading: false,
  userShops: [],
  currentShop: {},
};

export default (state = initialState, action) => {
  switch (action.type) {
    case shopActionTypes.SET_IS_LOADING:
      return { ...state, isLoading: action.payload };
    case shopActionTypes.GET_USER_SHOPS:
      return { ...state, userShops: action.payload };
    case shopActionTypes.SET_CURRENT_SHOP:
      return { ...state, currentShop: action.payload };
    default:
      return state;
  }
};
