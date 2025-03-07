import { BACKEND_API } from "../constants/ApiConstant";
import axiosInstance from "./axiosInstance";

const createShop = async (shopData) => {
  try {
    const response = await axiosInstance.post(`${BACKEND_API.SHOP}`, shopData);
    return response.data;
  } catch (error) {
    throw error;
  }
};

const getUserShops = async (userId) => {
  try {
    const response = await axiosInstance.get(
      `${BACKEND_API.SHOP}/user/${userId}`
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

const getShopById = async (shopId) => {
  try {
    const response = await axiosInstance.get(`${BACKEND_API.SHOP}/${shopId}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

const removeShop = async (shopId, userId) => {
  try {
    const response = await axiosInstance.delete(
      `${BACKEND_API.SHOP}/${shopId}/${userId}`
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

const updateShop = async (shopId, updateData) => {
  try {
    const response = await axiosInstance.put(
      `${BACKEND_API.BACKEND_BASE_URL}${BACKEND_API.SHOP}/${shopId}`,
      updateData
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

export default {
  createShop,
  getUserShops,
  getShopById,
  removeShop,
  updateShop,
};
