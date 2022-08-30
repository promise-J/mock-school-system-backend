// General app state Goes here
// Auth and token reducer should have been together don;t know why you seperated them
import ACTIONS from "../actions";

/**
 *
 * @props status error, success, neutral
 *
 */
const initialState = {
  notifications: [],
  token: null
};

const tokenReducer = (state = initialState, actions) => {
  switch (actions.type) {
    case ACTIONS.NOTIFY:
      return {
        ...state,
        notifications: [
          {
            id: `${Date.now()}-${state.notifications.length + 1}`,
            ...actions.payload,
          },
          ...state.notifications,
        ],
      };

    case ACTIONS.UNNOTIFY:
      // console.log(
      //   state.notifications.filter(
      //     (notification) => notification.id !== actions.payload.id
      //   )
      // );
      return {
        ...state,
        notifications: state.notifications.filter(
          (notification) => notification.id !== actions.payload.id
        ),
      };
      case ACTIONS.TOKEN_ADD:
        return {
          ...state,
          token: actions.payload.token
        }
    default:
      return state;
  }
};

export default tokenReducer;
