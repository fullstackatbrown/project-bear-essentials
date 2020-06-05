import * as ActionTypes from "./ActionTypes";

export const settings = (state = { darkmode: false }, action) => {
  switch (action.type) {
    case ActionTypes.TOGGLE_THEME:
      return { darkmode: !state.darkmode };

    default:
      return state;
  }
};
