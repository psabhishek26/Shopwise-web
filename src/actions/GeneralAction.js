import { AuthenicationService, StorageService } from "../services";
import UserService from "../services/UserService";
import { generalActionTypes } from "../constants/ActionTypes";
import ShopAction from "./ShopAction";

const setIsAppLoading = (isAppLoading) => {
  return {
    type: generalActionTypes.SET_IS_APP_LOADING,
    payload: isAppLoading,
  };
};

const setToken = (token) => {
  return {
    type: generalActionTypes.SET_TOKEN,
    payload: token,
  };
};

const setUserData = (userData) => {
  return {
    type: generalActionTypes.SET_USER_DATA,
    payload: userData,
  };
};

const appStart = () => {
  return (dispatch, getState) => {
    const token = StorageService.getToken();
    if (token) {
      dispatch({
        type: generalActionTypes.SET_TOKEN,
        payload: token,
      });

      UserService.getUserData().then((userResponse) => {
        if (userResponse?.status) {
          dispatch({
            type: generalActionTypes.SET_USER_DATA,
            payload: userResponse?.data,
          });
          dispatch(ShopAction.getUserShops(userResponse?.data?.data?._id));
          dispatch({
            type: generalActionTypes.SET_IS_APP_LOADING,
            payload: false,
          });
        } else if (userResponse?.message === "TokenExpiredError") {
          AuthenicationService.refreshToken().then((tokenResponse) => {
            if (tokenResponse?.status) {
              dispatch({
                type: generalActionTypes.SET_TOKEN,
                payload: tokenResponse?.data,
              });

              UserService.getUserData().then((userResponse) => {
                if (userResponse?.status) {
                  dispatch({
                    type: generalActionTypes.SET_USER_DATA,
                    payload: userResponse?.data,
                  });

                  dispatch({
                    type: generalActionTypes.SET_IS_APP_LOADING,
                    payload: false,
                  });
                }
              });
            } else {
              dispatch({
                type: generalActionTypes.SET_TOKEN,
                payload: "",
              });

              dispatch({
                type: generalActionTypes.SET_IS_APP_LOADING,
                payload: false,
              });
            }
          });
        }
      });
    }
    dispatch({
      type: generalActionTypes.SET_IS_APP_LOADING,
      payload: false,
    });
  };
};

export default {
  setIsAppLoading,
  setToken,
  appStart,
  setUserData,
};
