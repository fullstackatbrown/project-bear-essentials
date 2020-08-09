import { LIGHTMODE, DARKMODE } from "../../constants/Colors";

export const getColors = (darkmode) => {
    if (darkmode) {
        return DARKMODE;
    }
    return LIGHTMODE;
};
