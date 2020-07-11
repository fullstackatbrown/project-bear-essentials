import axios from "axios";
import { diningHallInfo } from "./DiningUtils";

const url = "https://api-2cu446h72q-uc.a.run.app/graphql";

// returns promise
const axiosPost = query => {
    return axios.post(url, {
        query: query,
    }).catch(e => console.log(e));
};

const fetchCafes = () => {
    return axiosPost(`
        {
            cafes {
                name
                id
            }
        }
    `);
};

const fetchHours = id => {
    return axiosPost(`  
        {
            cafe (id: "${id}") {
                name
                days {
                    date
                    status
                    dayparts {
                        starttime
                        endtime
                    }
                }
            }
        }
    `);
};

const fetchMenuDetailed = id => {
    return axiosPost(`  
        {
            menu (id: ${id}) {
                name
                dayparts {
                    endtime
                    starttime
                    stations {
                        id
                        soup
                        items {
                          description
                          name
                        }
                    }
                }
            }
        }
    `);
};

// object returning all dining halls for query text
const fetchDiningAll = async () => {
    const { data } = await fetchLaundryRooms();
    const diningIds = data.data.cafes;

    const diningHallsDetailed = {};
    diningIds.forEach(hall => {
        if (hall.name in diningHallInfo) {
            const thisHall = diningHallInfo[hall.name];
            diningHallsDetailed[thisHall.queryText] = {
                title: thisHall.title,
                id: hall.id,
            };
        } else {
            console.log("[WARNING]'" + hall.name + "' not found in diningHallInfo");
        }
    });
    return diningHallsDetailed;
};


export { fetchCafes, fetchMenuDetailed, fetchHours };
