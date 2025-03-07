import { BACKEND_API } from "../constants/ApiConstant";
import axiosInstance from "./axiosInstance";

const createItem = async (itemData) => {
  try {
    const response = await axiosInstance.post(`${BACKEND_API.ITEM}`, itemData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export default {
  createItem,
};
