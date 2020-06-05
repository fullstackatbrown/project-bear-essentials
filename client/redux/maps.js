import * as ActionTypes from "./ActionTypes";

export const maps = (state = { flags: [] }, action) => {
  switch (action.type) {
    case ActionTypes.ADD_FLAG:
      return { flags: state.flags.concat(action.payload) };

    case ActionTypes.DELETE_FLAG:
      return { flags: state.flags.filter(e => e !== action.payload) };

    default:
      return state;
  }
};
