import axios from "axios";
import { diningHallInfo } from "./DiningUtils";

const url = "https://api-2cu446h72q-uc.a.run.app/graphql";

// returns promise
const axiosPost = query => {
    return axios.post(url, {
        query: query,
    }).catch(e => console.log(e));
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
            menu (id: "${id}") {
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


export {fetchMenuDetailed, fetchHours};
