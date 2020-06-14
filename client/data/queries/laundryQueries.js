const { roomInfo } = require("../laundrydata/roomInfo")
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

const fetchLaundryAll = async () => {
    let nameIds = await fetchLaundryRooms();
    nameIds = nameIds.data.laundryRooms.results;

    const allRoomsDetailed = {};
    nameIds.forEach(v => {
        allRoomsDetailed[roomInfo[v.name].queryText] = {
            title: roomInfo[v.name].title,
            room: roomInfo[v.name].room,
            id: v.id,
            // machines: fetchLaundryRoomDetailed(v.id),
        };
    });

    return allRoomsDetailed;

    // return nameIds
    //     .reduce((a, v) => ({...a,
    //         [roomInfo[v.name].queryText]: {
    //             title: roomInfo[v.name].title,
    //             room: roomInfo[v.name].room,
    //             machines: fetchLaundryRoomDetailed(v.id)
    //         }
    //     }), {});
};

export { fetchLaundryRoomDetailed, fetchLaundryAll };