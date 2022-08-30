import ACTIONS from "../actions";
import Cookie from 'universal-cookie'

const cookies = new Cookie()

const initialState = {
  user: null,
  isLogged: Boolean(cookies.get("loginID")),
  role: null,
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case ACTIONS.LOGIN:
      // localStorage.setItem("isLogged", true);
      return {
        ...state,
        isLogged: true,
      };
    case ACTIONS.GET_USER:
      return {
        ...state,
        user: action.payload,
        role: action.payload.role,
      };
    case ACTIONS.LOGOUT:
      cookies.remove("loginID");
      return {
        ...state,
        user: null,
        isLogged: false,
        role: null,
      };
    default:
      return state;
  }
};

export default authReducer;
