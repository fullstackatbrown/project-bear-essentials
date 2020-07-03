const axios = require("axios");
const { brownapi } = require("../../constants/urls");

const CAFE_MAP = new Map();
CAFE_MAP.set("ratty", 1531);
CAFE_MAP.set("vdub", 1532);
CAFE_MAP.set("andrews", 1533);
CAFE_MAP.set("blueroom", 1534);
CAFE_MAP.set("jos", 1535);
CAFE_MAP.set("ivyroom", 1536);
CAFE_MAP.set("campusmarket", 1537);
CAFE_MAP.set("cafecarts", 1538);

/**
 * Returns information for `cafe`.
 * @param {string} cafe cafe for which to return information for.
 */
const getCafe = async cafe => {
    let cafe_id = CAFE_MAP.get(cafe);
    let endpoint =
        brownapi + `dining/cafe/${cafe_id}?client_id=${process.env.CLIENT_ID}`;
    let { data } = await axios.get(endpoint).catch(e => console.log(e));
    let res = data.results.cafes[cafe_id];
    res.id = cafe_id;
    return res;
};

/**
 * Returns information for all cafes.
 */
const getCafes = async () => {
    let cafe_ids = Array.from(CAFE_MAP.values());
    let keys = cafe_ids.join(",");
    let endpoint =
        brownapi + `dining/cafe/${keys}?client_id=${process.env.CLIENT_ID}`;
    let { data } = await axios.get(endpoint).catch(e => console.log(e));
    let res = cafe_ids.map(cafe_id => {
        let cafe = data.results.cafes[cafe_id];
        cafe.id = cafe_id;
        return cafe;
    });
    return res;
};

/**
 * Returns today's menu for `cafe`.
 * @param {string} cafe cafe for which to return today's menu.
 */
const getMenu = async cafe => {
    let cafe_id = CAFE_MAP.get(cafe);
    let endpoint =
        brownapi +
        `dining/cafe/${cafe_id}/menu?client_id=${process.env.CLIENT_ID}`;
    let { data } = await axios.get(endpoint).catch(e => console.log(e));
    let res = data.results.days[0].cafes[cafe_id];
    res.cafe_id = cafe_id;
    return res;
};

/**
 * Returns today's menus for all cafes.
 */
const getMenus = async () => {
    let cafe_ids = Array.from(CAFE_MAP.values());
    let keys = cafe_ids.join(",");
    let endpoint =
        brownapi +
        `dining/cafe/${keys}/menu?client_id=${process.env.CLIENT_ID}`;
    let { data } = await axios.get(endpoint).catch(e => console.log(e));
    let res = cafe_ids.map(cafe_id => {
        let menu = data.results.days[0].cafes[cafe_id];
        menu.cafe_id = cafe_id;
        return menu;
    });
    return res;
};

/**
 * Returns menus occuring on `dates` for given `cafe`, in the order specified by `dates`.
 * @param {string} cafe cafe for which to return menus for.
 * @param {Array<Date>} dates dates for which to return menus for.
 */
const getMenuOnDays = async (cafe, dates) => {
    let cafe_id = CAFE_MAP.get(cafe);
    dates = dates.map(date => date.toISOString().split("T")[0]);
    let endpoint =
        brownapi +
        `dining/cafe/${cafe_id}/menu/${date.join(",")}?client_id=${
            process.env.CLIENT_ID
        }`;
    let { data } = await axios.get(endpoint).catch(e => console.log(e));
    let res = data.results.days.map(day => {
        let menu = day.cafes[cafe_id];
        menu.cafe_id = cafe_id;
        return menu;
    });
    return data.results.days;
};

module.exports = {
    getCafe: getCafe,
    getCafes: getCafes,
    getMenu: getMenu,
    getMenus: getMenus,
    getMenuOnDays: getMenuOnDays,
};
