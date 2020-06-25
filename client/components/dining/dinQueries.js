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

const fetchHours = async (id) => {
    return await fetch({
        query: `{
            cafe (id: ${id}) {
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
        }`,
    });
};

const fetchMenuDetailed = (id) => {
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

export { fetchCafes, fetchMenuDetailed, fetchHours };