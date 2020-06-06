import * as ActionTypes from "./ActionTypes";

export const addNotification = notification => ({
  type: ActionTypes.ADD_NOTIFICATION,
  payload: notification,
});

export const deleteNotification = notification => ({
  type: ActionTypes.DELETE_NOTIFICATION,
  payload: notification,
});

export const addStarred = roomId => ({
  type: ActionTypes.ADD_STARRED,
  payload: roomId,
});

export const deleteStarred = roomId => ({
  type: ActionTypes.DELETE_STARRED,
  payload: roomId,
});

export const addFlag = flag => ({
  type: ActionTypes.ADD_FLAG,
  payload: flag,
});

export const deleteFlag = flag => ({
  type: ActionTypes.DELETE_FLAG,
  payload: flag,
});

export const toggleTheme = () => ({
  type: ActionTypes.TOGGLE_THEME,
});
