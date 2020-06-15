const { roomInfo } = require("./utils")
const { createApolloFetch } = require("apollo-fetch");

const uri = "https://api-2cu446h72q-uc.a.run.app/graphql";
const fetch = createApolloFetch({ uri });

const fetchLaundryRooms = () => {
    return fetch({
        query: `{
            laundryRooms {
                results {
                    name
                    id
                }
            }
        }`,
    });
};

const fetchLaundryRoomDetailed = (id) => {
    return fetch({
        query: `{
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
        }`,
    });
};

// returns object containing **roomInfo** information for all laundry rooms
const fetchLaundryAll = async () => {
    let nameIds = await fetchLaundryRooms();
    nameIds = nameIds.data.laundryRooms.results;

    const allRoomsDetailed = {};
    nameIds.forEach(v => {
        const thisRoom = roomInfo[v.name];
        allRoomsDetailed[thisRoom.queryText] = {
            title: thisRoom.title,
            room: thisRoom.room,
            id: v.id,
            // machines: fetchLaundryRoomDetailed(v.id),
        };
    });

    return allRoomsDetailed;
};

export { fetchLaundryRoomDetailed, fetchLaundryAll };