import axios from "axios";
import { BACKEND_API } from "../constants/ApiConstant";

const AuthRequest = axios.create({
  baseURL: BACKEND_API.BACKEND_BASE_URL,
});

const register = async (user) => {
  if (!user?.username || !user?.email || !user?.password || !user?.role) {
    return { status: false, message: "Please fill up all fields" };
  }
  try {
    let requestBody = {
      username: user?.username,
      email: user?.email,
      password: user?.password,
      role: user?.role,
    };

    const userExist = await checkUserExist("email", user?.email);
    if (userExist?.status) {
      return { status: false, message: "User already exists" };
    }

    let registerResponse = await AuthRequest.post(
      BACKEND_API.REGISTER,
      requestBody
    );

    return registerResponse?.data;
  } catch (error) {
    console.error(error);
    return { status: false, message: "Oops! Something went wrong" };
  }
};

const login = async (user) => {
  if (!user?.email || !user?.password) {
    return { status: false, message: "Please fill up all fields" };
  }
  try {
    let requestBody = {
      email: user?.email,
      password: user?.password,
    };
    let loginResponse = await AuthRequest.post(BACKEND_API.LOGIN, requestBody);
    return loginResponse?.data;
  } catch (error) {
    console.error(error);
    return { status: false, message: "Oops! Something went wrong" };
  }
};

const checkUserExist = async (type, value) => {
  try {
    let params = { [type]: value };
    let userCheckResponse = await AuthRequest.get(BACKEND_API.USER_EXIST, {
      params,
    });
    return userCheckResponse?.data;
  } catch (error) {
    console.error(error);
    return { status: false, message: "Oops! Something went wrong" };
  }
};

export default { register, login, checkUserExist };
