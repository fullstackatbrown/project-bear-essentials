const axios = require("axios");
const { brownapi } = require("../../constants/urls");

const getLaundryRooms = async () => {
  let endpoint = brownapi + `laundry/rooms?client_id=${process.env.CLIENT_ID}`;
  let { data } = await axios.get(endpoint).catch((e) => console.log(e));
  return data;
};

const getLaundryRoom = async (room_id, details) => {
  let endpoint =
    brownapi + `laundry/rooms/${room_id}?client_id=${process.env.CLIENT_ID}`;
  endpoint += details ? "&get_status=true" : "";
  let { data } = await axios.get(endpoint).catch((e) => console.log(e));
  return data.result;
};

const getLaundryMachine = async (room_id, machine_id, details) => {
  let endpoint =
    brownapi +
    `laundry/rooms/${room_id}/machines/${machine_id}?client_id=${process.env.CLIENT_ID}`;
  endpoint += details ? "&get_status=true" : "";
  let { data } = await axios.get(endpoint).catch((e) => console.log(e));
  return data.result;
};

module.exports = {
  getLaundryRooms: getLaundryRooms,
  getLaundryRoom: getLaundryRoom,
  getLaundryMachine: getLaundryMachine,
};
