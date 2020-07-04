import { roomInfo } from "./utils";
import axios from "axios";

const url = "https://api-2cu446h72q-uc.a.run.app/graphql";

// returns promise
const axiosPost = query => {
    return axios.post(url, {
        query: query,
    }).catch(e => console.log(e));
};

const fetchLaundryRooms = () => {
    return axiosPost(`
        {
            laundryRooms {
                results {
                    name
                    id
                }
            }
        }
    `);
};

const fetchLaundryRoomDetailed = id => {
    return axiosPost(`
        {
            laundryRoomDetailed (id: ${id}) {
                machines {
                    id
                    type
                    machine_no
                    avail
                    ext_cycle
                    offline
                    time_remaining
                }
            }
        }
    `);
};

// returns object containing list of all laundry rooms using roomInfo data
const fetchLaundryAll = async () => {
    const { data } = await fetchLaundryRooms();
    const nameIds = data.data.laundryRooms.results;

    const allRoomsDetailed = {};
    nameIds.forEach(v => {
        if (v.name in roomInfo) {
            const thisRoom = roomInfo[v.name];
            allRoomsDetailed[thisRoom.queryText] = {
                title: thisRoom.title,
                room: thisRoom.room,
                id: v.id,
            };
        } else {
            console.log("[WARNING] Laundry room '" + v.name + "' not found in roomInfo");
        }        
    });

    return allRoomsDetailed;
};

export { fetchLaundryRoomDetailed, fetchLaundryAll };
