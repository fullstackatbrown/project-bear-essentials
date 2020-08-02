import * as ActionTypes from "./ActionTypes";

export const settings = (
    state = { darkmode: false, preferences: [] },
    action
) => {
    switch (action.type) {
    case ActionTypes.TOGGLE_THEME:
        return { ...state, darkmode: !state.darkmode };

    case ActionTypes.TOGGLE_PREFERENCE:
        if (state.preferences.includes(action.payload)) {
            return { ...state, preferences: state.preferences.filter(e => e != action.payload) };
        } else {
            return { ...state, preferences: state.preferences.concat(action.payload) };
        }

    default:
        return state;
    }
};
