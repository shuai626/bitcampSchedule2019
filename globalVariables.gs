var appSheetName = "App / Website Schedule";
var masterScheduleName = "Master Schedule";

var boolean_sortAppSchedule = true;

var year = 2019;
var month = 11;

var days = {
Thurs: {
date: "11/07/2019",
sheetname: "Thursday"
},
Fri: {
date: "11/08/2019",
sheetname: "Friday"
},
Sat: {
date: "11/09/2019",
sheetname: "Saturday"
},
Sun: {
date: "11/10/2019",
sheetname: "Sunday"
},
}

var eventCategories = {
    0: {
    name: "Main",
    hex: "#AAC5DE",
    col: "B"
    },
    1: {
    name: "Food",
    hex: "#F8E6A3",
    col: "C"
    },
    2: {
    name: "Sponsor",
    hex: "#BCD7AD",
    col: "D"
    },
    3: {
    name: "Mentor",
    hex: "#DF9E9A",
    col: "E"
    },
    4: {
    name: "Mini",
    hex: "#B1A9D3",
    col: "F"
    },
totalEvents: 6
}

var masterCols = {
day: 0,
title: 1,
event_section: 2,
appear_on_app: 3,
featured: 4,
start_time:  5,
end_time:  6,
date:  7,
location:  8,
descr: 9,
caption: 10
}


//enum of the name of each col on app and main schedule (to replace indexes)
