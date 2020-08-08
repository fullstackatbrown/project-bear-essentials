import { store } from "../../App";
import { lightmode, darkmode } from "../../constants/Colors";

export const getColors = () => {
  if (store.getState().settings.darkmode) {
    return darkmode;
  }
  return lightmode;
};
