const LAUNDRY_DATA = {
  "125-127 WATERMAN STREET 003": {
    title: "125-127 Waterman Street",
    room: "003",
    machines: [
      {
        id: 1,
        avail: true,
        time_remaining: 0,
        type: "WASHER",
      },
      {
        id: 2,
        avail: false,
        time_remaining: 30,
        type: "WASHER",
      },
      {
        id: 3,
        avail: false,
        time_remaining: 1,
        type: "DRYER",
      },
      {
        id: 4,
        avail: true,
        time_remaining: 0,
        type: "DRYER",
      },
    ],
  },
  "ANDREWS WEST 160": {
    title: "Andrews West",
    room: "160",
    machines: [
      {
        id: 1,
        avail: true,
        time_remaining: 0,
        type: "WASHER",
      },
      {
        id: 2,
        avail: true,
        time_remaining: 0,
        type: "WASHER",
      },
      {
        id: 3,
        avail: false,
        time_remaining: 25,
        type: "DRYER",
      },
      {
        id: 4,
        avail: false,
        time_remaining: 12,
        type: "DRYER",
      },
    ],
  },
  "METCALF HALL": {
    title: "Metcalf Hall",
    room: "",
    machines: [
      {
        id: 1,
        avail: false,
        time_remaining: 10,
        type: "WASHER",
      },
      {
        id: 2,
        avail: false,
        time_remaining: 59,
        type: "DRYER",
      },
    ],
  },
  "MILLER HALL": {
    title: "Miller Hall",
    room: null,
    machines: [
      {
        id: 1,
        avail: false,
        time_remaining: 20,
        type: "WASHER",
      },
      {
        id: 2,
        avail: true,
        time_remaining: 0,
        type: "DRYER",
      },
    ],
  },
};

export { LAUNDRY_DATA };
