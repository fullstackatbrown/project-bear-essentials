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

// Returns a single JS Object containing all cafe data.
const getCafe = async cafe => {
  let cafe_id = CAFE_MAP.get(cafe);
  let endpoint =
    brownapi +
    `dining/cafes/${CAFE_MAP.get(cafe)}?client_id=${process.env.CLIENT_ID}`;
  let { data } = await axios.get(endpoint).catch(e => console.log(e));
  return data.results.cafes[cafe_id];
};

// Returns an array of cafes
const getCafes = async () => {
  let keys = "";
  CAFE_MAP.forEach(e => (keys += e + ","));
  let endpoint =
    brownapi + `dining/cafes/${keys}?client_id=${process.env.CLIENT_ID}`;
  let { data } = await axios.get(endpoint).catch(e => console.log(e));
  let ret = [];
  CAFE_MAP.forEach(e => ret.push(data.results.cafes[e]));
  return ret;
};

// Returns menus.
const getMenu = async cafe => {
  let endpoint =
    brownapi +
    `dining/cafes/${CAFE_MAP.get(cafe)}/menu?client_id=${process.env.CLIENT_ID}`;
  let { data } = await axios.get(endpoint).catch(e => console.log(e));
  console.log(data.results.days);
  return data.results.days;
};

// Returns menus.
//TODO: This one is weirdly formatted
//use yourDate.toISOString().split('T')[0]
const getMenuOnDay = async (cafe, date) => {
  let endpoint =
    brownapi +
    `dining/cafes/${CAFE_MAP.get(cafe)}/${date}?client_id=${
      process.env.CLIENT_ID
    }`;
  let { data } = await axios.get(endpoint).catch(e => console.log(e));
  return data.results.days;
};

module.exports = {
  getCafe: getCafe,
  getCafes: getCafes,
  getMenu: getMenu,
  getMenuOnDay: getMenuOnDay,
};
