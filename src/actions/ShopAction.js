import { ShopService } from "../services";
import { shopActionTypes } from "../constants/ActionTypes";

const addNewShop = (shopData) => {
  return async (dispatch) => {
    dispatch({
      type: shopActionTypes.SET_IS_LOADING,
      payload: true,
    });

    try {
      const shopResponse = await ShopService.createShop(shopData);
      const shopsResponse = await ShopService.getUserShops(shopData?.userId);
      
      dispatch({
        type: shopActionTypes.GET_USER_SHOPS,
        payload: shopsResponse?.data,
      });
      
      dispatch({
        type: shopActionTypes.SET_IS_LOADING,
        payload: false,
      });

      return shopResponse;
    } catch (error) {
      dispatch({
        type: shopActionTypes.SET_IS_LOADING,
        payload: false,
      });
      throw error
    }
  };
};

const removeShop = (shopId, userId) => {
  return (dispatch) => {
    dispatch({
      type: shopActionTypes.SET_IS_LOADING,
      payload: true,
    });

    ShopService.removeShop(shopId, userId)
      .then(() => {
        return ShopService.getUserShops(userId);
      })
      .then((shopsResponse) => {
        dispatch({
          type: shopActionTypes.GET_USER_SHOPS,
          payload: shopsResponse?.data,
        });
        dispatch({
          type: shopActionTypes.SET_IS_LOADING,
          payload: false,
        });
      })
      .catch(() => {
        dispatch({
          type: shopActionTypes.SET_IS_LOADING,
          payload: false,
        });
      });
  };
};

const getUserShops = (userId) => {
  return (dispatch) => {
    dispatch({
      type: shopActionTypes.SET_IS_LOADING,
      payload: true,
    });

    ShopService.getUserShops(userId)
      .then((shopsResponse) => {
        dispatch({
          type: shopActionTypes.GET_USER_SHOPS,
          payload: shopsResponse?.data,
        });
        dispatch({
          type: shopActionTypes.SET_IS_LOADING,
          payload: false,
        });
      })
      .catch(() => {
        dispatch({
          type: shopActionTypes.SET_IS_LOADING,
          payload: false,
        });
      });
  };
};

const updateShop = (shopId, updateData) => {
  return (dispatch) => {
    dispatch({
      type: shopActionTypes.SET_IS_LOADING,
      payload: true,
    });

    ShopService.updateShop(shopId, updateData)
      .then(() => {
        return ShopService.getUserShops(updateData?.userId);
      })
      .then((shopsResponse) => {
        dispatch({
          type: shopActionTypes.GET_USER_SHOPS,
          payload: shopsResponse?.data,
        });
        dispatch({
          type: shopActionTypes.SET_IS_LOADING,
          payload: false,
        });
      })
      .catch(() => {
        dispatch({
          type: shopActionTypes.SET_IS_LOADING,
          payload: false,
        });
      });
  };
};

const setCurrentShop = (shopData) => {
  return {
    type: shopActionTypes.SET_CURRENT_SHOP,
    payload: shopData,
  };
};

export default {
  addNewShop,
  removeShop,
  getUserShops,
  updateShop,
  setCurrentShop,
};
