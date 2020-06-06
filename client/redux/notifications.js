import * as ActionTypes from "./ActionTypes";

export const notifications = (state = { notifications: [] }, action) => {
  switch (action.type) {
    case ActionTypes.ADD_NOTIFICATION:
      return { notifications: state.notifications.concat(action.payload) };

    case ActionTypes.DELETE_NOTIFICATION:
      return {
        notifications: state.notifications.filter(e => e !== action.payload),
      };

    default:
      return state;
  }
};
