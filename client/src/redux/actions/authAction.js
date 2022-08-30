import { axiosRequest } from "src/utils/axiosRequest";
import ACTIONS from "./index";

export const dispatchLogin = () => {
  return {
    type: ACTIONS.LOGIN,
  };
};

export const dispatchLogout = () => {
  return {
    type: ACTIONS.LOGOUT,
    payload: {
      user: null,
      isLogged: false,
      role: null
    }
  };
};

export const fetchUser = async () => {
  try {
    const res = await axiosRequest.get("/users/info");
    return res.data.user;
  } catch (error) {
    console.log(error, 'from the info')
  }
};


export const dispatchUser = (user) => {
  return {
    type: ACTIONS.GET_USER,
    payload: {
      user,
      role: user?.role,
    },
  };
};
