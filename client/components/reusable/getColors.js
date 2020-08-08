import { LIGHTMODE, DARKMODE } from "../../constants/Colors";

export const getColors = (darkmode) => {
    console.log(darkmode);
    if (darkmode) {
        return DARKMODE;
    }
    return LIGHTMODE;
};
