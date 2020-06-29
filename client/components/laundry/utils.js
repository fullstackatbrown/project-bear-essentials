// adds 's' to word when plural
export const pluralize = (num, word) => {
    if (num == 1) {
        return `${num} ${word}`;
    } else {
        return `${num} ${word}s`;
    }
};

// display/query information for each laundry room (queryText is used as the identifier)
export const roomInfo = {
    "111 BROWN ST RM106": {
        queryText: "111 BROWN STREET 106",
        title: "111 Brown Street",
        room: "106",
    },
    "125-127 WATERMAN STREET RM003": {
        queryText: "125-127 WATERMAN STREET 003",
        title: "125-127 Waterman Street",
        room: "003",
    },
    "315 THAYER ST": {
        queryText: "315 THAYER STREET 009",
        title: "315 Thayer Street",
        room: "009",
    },
    "ANDREWS E RM154": {
        // swapped with ANDREWS W
        queryText: "ANDREWS WEST 160",
        title: "Andrews West",
        room: "160",
    },
    "ANDREWS W RM160": {
        // swapped with ANDREWS E
        queryText: "ANDREWS EAST 154",
        title: "Andrews East",
        room: "154",
    },
    "ARCHIBALD-BRONSON RMA103": {
        queryText: "ARCHIBALD-BRONSON A103",
        title: "Archibald-Bronson",
        room: "A103",
    },
    "BARBOUR APTS RM070": {
        queryText: "BARBOUR APARTMENTS 070",
        title: "Barbour Apartments",
        room: "070",
    },
    "BUXTON HOUSE RM008": {
        queryText: "BUXTON HOUSE 008",
        title: "Buxton House",
        room: "008",
    },
    "CASWELL MIDDLE RM000": {
        queryText: "CASWELL MIDDLE 000",
        title: "Caswell Middle",
        room: "000",
    },
    "CASWELL NORTH RM010B": {
        queryText: "CASWELL NORTH 010B",
        title: "Caswell North",
        room: "010B",
    },
    "CHAMPLIN RM110A": {
        queryText: "CHAMPLIN HALL 110A",
        title: "Champlin Hall",
        room: "110A",
    },
    "CHAPIN HOUSE RM023": {
        queryText: "CHAPIN HOUSE 023",
        title: "Chaplin House",
        room: "023B",
    },
    "DIMAN HOUSE RM028": {
        queryText: "DIMAN HOUSE 028",
        title: "Diman House",
        room: "028",
    },
    "DIMAN HOUSE RM106 ": {
        queryText: "DIMAN HOUSE 106",
        title: "Diman House",
        room: "106",
    },
    "EVERETT-POLAND RME243": {
        queryText: "EVERETT-POLAND E243",
        title: "Everett-Poland",
        room: "E243",
    },
    "EVERETT-POLAND-RME166": {
        // extra '-'
        queryText: "EVERETT-POLAND E166",
        title: "Everett-Poland",
        room: "E166",
    },
    "GOODARD HOUSE RM018": {
        // name typo
        queryText: "GODDARD HOUSE 018",
        title: "Goddard House",
        room: "018",
    },
    "GOODARD HOUSE RM130": {
        // name typo
        queryText: "GODDARD HOUSE 130",
        title: "Goddard House",
        room: "130",
    },
    "GRAD CENTER A RM120": {
        queryText: "GRAD CENTER A 120",
        title: "Grad Center A",
        room: "120",
    },
    "GRAD CENTER B RM113": {
        // room typo
        queryText: "GRAD CENTER B 133",
        title: "Grad Center B",
        room: "133",
    },
    "GRAD CENTER C RM120": {
        queryText: "GRAD CENTER C 120",
        title: "Grad Center C",
        room: "120",
    },
    "GRAD CENTER D RM130": {
        queryText: "GRAD CENTER D 130",
        title: "Grad Center D",
        room: "130",
    },
    "HARKNESS HOUSE RM023": {
        queryText: "HARKNESS HOUSE 023",
        title: "Harkness House",
        room: "023",
    },
    "HARKNESS HOUSE RM106": {
        queryText: "HARKNESS HOUSE 106",
        title: "Harkness House",
        room: "106",
    },
    "HEDGEMAN D RM009A": {
        // name typo
        queryText: "HEGEMAN 009A",
        title: "Hegeman",
        room: "009A",
    },
    "HOPE COLLEGE RM015": {
        queryText: "HOPE COLLEGE 015",
        title: "Hope College",
        room: "015",
    },
    "JAMISON-MEAD RMJ055": {
        // name typo
        queryText: "JAMESON-MEAD J055",
        title: "Jameson Mead",
        room: "J055",
    },
    "KING HOUSE RM007": {
        queryText: "KING HOUSE 007",
        title: "King House",
        room: "007",
    },
    "LITTLEFIELD HALL RM011": {
        queryText: "LITTLEFIELD HALL 011",
        title: "Littlefield Hall",
        room: "011",
    },
    "MACHADO HOUSE RM209": {
        queryText: "MACHADO HOUSE 209",
        title: "Machado House",
        room: "209",
    },
    "MARCY HOUSE RM028": {
        queryText: "MARCY HOUSE 028",
        title: "Marcy House",
        room: "028",
    },
    "METCALF HALL": {
        queryText: "METCALF HALL 007",
        title: "Metcalf Hall",
        room: "007",
    },
    "MILLER HALL": {
        queryText: "MILLER HALL 007",
        title: "Miller Hall",
        room: "007",
    },
    "MINDEN HALL RM102": {
        queryText: "MINDEN HALL 102",
        title: "Minden Hall",
        room: "102",
    },
    "MORRISS RM211A": {
        queryText: "MORRISS HALL 211A",
        title: "Morriss Hall",
        room: "211A",
    },
    "MORRISS RM311A": {
        queryText: "MORRISS HALL 311A",
        title: "Morriss Hall",
        room: "311A",
    },
    "MORRISS RM411A": {
        queryText: "MORRISS HALL 411A",
        title: "Morriss Hall",
        room: "411A",
    },
    "NPEMBROKE 2 RM000": {
        queryText: "NEW PEMBROKE 2 000",
        title: "New Pembroke 2",
        room: "000",
    },
    "NPEMBROKE 3 RM000": {
        queryText: "NEW PEMBROKE 3 000",
        title: "New Pembroke 3",
        room: "000",
    },
    "NPEMBROKE 3 RM020": {
        queryText: "NEW PEMBROKE 3 020",
        title: "New Pembroke 3",
        room: "020",
    },
    "NPEMBROKE 4 RM117": {
        queryText: "NEW PEMBROKE 4 117",
        title: "New Pembroke 4",
        room: "117",
    },
    "OLNEY HOUSE RM024": {
        queryText: "OLNEY HOUSE 024",
        title: "Olney House",
        room: "024",
    },
    "PERKINS RM020 ": {
        queryText: "PERKINS HALL 020",
        title: "Perkins Hall",
        room: "020",
    },
    "PLANTATIONS HOUSE RM108": {
        queryText: "PLANTATIONS HOUSE 108",
        title: "Plantations House",
        room: "108",
    },
    "SEARS HOUSE RM023": {
        queryText: "SEARS HOUSE 023",
        title: "Sears House",
        room: "023",
    },
    "SEARS HOUSE RM106": {
        queryText: "SEARS HOUSE 106",
        title: "Sears House",
        room: "106",
    },
    "SLATER HALL RM008": {
        queryText: "SLATER HALL 008",
        title: "Slater",
        room: "008",
    },
    "VGQA RM001": {
        // name typo
        queryText: "VARTAN GREGORIAN QUAD 001",
        title: "Gregorian Quad B",
        room: "001",
    },
    "VGQA RM007": {
        queryText: "VARTAN GREGORIAN QUAD 007",
        title: "Gregorian Quad A",
        room: "007",
    },
    "WAYLAND HOUSE RM023": {
        queryText: "WAYLAND HOUSE 023",
        title: "Wayland House",
        room: "023",
    },
    "WEST HOUSE RM100B": {
        // room typo ?
        queryText: "WEST HOUSE 105",
        title: "West House",
        room: "105",
    },
    "WOOLLEY RM101A": {
        queryText: "WOOLLEY 101A",
        title: "Woolley",
        room: "101A",
    },
    "WOOLLEY RM201A": {
        queryText: "WOOLLEY 201A",
        title: "Woolley",
        room: "201A",
    },
    "WOOLLEY RM301A": {
        queryText: "WOOLLEY 301A",
        title: "Woolley",
        room: "301A",
    },
    "WOOLLEY RM401A": {
        queryText: "WOOLLEY 401A",
        title: "Woolley",
        room: "401A",
    },
    "YO10 RM142": {
        queryText: "YOUNG ORCHARD 10 142",
        title: "Young Orchard 10",
        room: "142",
    },
    "YO2 RM142": {
        queryText: "YOUNG ORCHARD 2 142",
        title: "Young Orchard 2",
        room: "142",
    },
    "YO4 RM142": {
        queryText: "YOUNG ORCHARD 4 142",
        title: "Young Orchard 4",
        room: "142",
    },
};
