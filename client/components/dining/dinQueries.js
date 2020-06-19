const { createApolloFetch } = require("apollo-fetch");

const uri = "https://api-2cu446h72q-uc.a.run.app/graphql";
const fetch = createApolloFetch({ uri });

const fetchCafes = () => {
    return fetch({
        query: `{
            cafes {
                name
                id
            }
        }`,
    });
};

const fetchHours = () => {
    return fetch({
        query: `{
            cafes {
                name
                id
                days {
                    date
                    status
                    dayparts {
                        starttime
                        endtime
                    }
                }
            }
        }`,
    });
};

const fetchDiningDetailed = (id) => {
    return fetch({
        query: `{
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
        }`,
    });
};

export { fetchCafes, fetchDiningDetailed, fetchHours };