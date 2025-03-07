import axios from "axios";
import { authHeader } from "../utils/Generator";
import { getToken } from "../Store";
import { BACKEND_API } from "../constants/ApiConstant";

const getUserData = async () => {
  try {
    const headers = authHeader(getToken());
    let userResponse = await axios.get(
      `${BACKEND_API.BACKEND_BASE_URL}${BACKEND_API.USER}/get-user`,
      {
        headers: headers,
      }
    );

    if (userResponse?.status === 200) {
      return {
        status: true,
        message: `User data fetched`,
        data: userResponse?.data,
      };
    } else {
      return {
        status: false,
        message: `User data not found`,
      };
    }
  } catch (error) {
    return {
      status: false,
      message: error?.response?.data?.message
        ? error?.response?.data?.message
        : `User data not found`,
    };
  }
};

export default { getUserData };
