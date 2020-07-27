import * as ActionTypes from "./ActionTypes";

export const dining = (state = { starred: [] }, action) => {
    switch (action.type) {
    case ActionTypes.ADD_DINING_STARRED:
        return { starred: state.starred.concat(action.payload) };

    case ActionTypes.DELETE_DINING_STARRED:
        return { starred: state.starred.filter(e => e !== action.payload) };
      
    default:
        return state;
    }
};