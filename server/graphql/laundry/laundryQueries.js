const axios = require("axios");
const { brownapi } = require("../../constants/urls");

// Returns all laundry rooms.
const getLaundryRooms = async () => {
    let endpoint = brownapi + `laundry/rooms?client_id=${process.env.CLIENT_ID}`;
    let { data } = await axios.get(endpoint).catch(e => console.log(e));
    return data;
};

// Returns laundry room with given id.
const getLaundryRoom = async (room_id, details) => {
    let endpoint =
    brownapi + `laundry/rooms/${room_id}?client_id=${process.env.CLIENT_ID}`;
    endpoint += details ? "&get_status=true" : "";
    let { data } = await axios.get(endpoint).catch(e => console.log(e));
    return data.result;
};

// Returns laundry machine with given id.
const getLaundryMachine = async (room_id, machine_id, details) => {
    let endpoint =
    brownapi +
    `laundry/rooms/${room_id}/machines/${machine_id}?client_id=${process.env.CLIENT_ID}`;
    endpoint += details ? "&get_status=true" : "";
    let { data } = await axios.get(endpoint).catch(e => console.log(e));
    return data.result;
};

module.exports = {
    getLaundryRooms: getLaundryRooms,
    getLaundryRoom: getLaundryRoom,
    getLaundryMachine: getLaundryMachine,
};
