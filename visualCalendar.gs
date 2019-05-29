function generalCalendar() {
    var sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("Master Schedule");
    
    var calendars = [CalendarApp.getCalendarById('kla3t6oibqea2la1lfcbis8ddg@group.calendar.google.com'),
                     CalendarApp.getCalendarById('5ddf8q3u6jf1cqjvmgv0j3kmck@group.calendar.google.com'),
                     CalendarApp.getCalendarById('c1jrt99at2f25knrlevajkg2rg@group.calendar.google.com'),
                     CalendarApp.getCalendarById('k7idl59c06ejiugg188057mc0o@group.calendar.google.com'),
                     CalendarApp.getCalendarById('gnn83kvuc756d4lllc2q99tkjo@group.calendar.google.com'),
                     CalendarApp.getCalendarById('gnclg9i5l3pvrsq40rhb5v2rng@group.calendar.google.com'),
                     ];
    
    for (var i = 0; i < calendars.length; i++){
        clearCalendar(calendars[i]);
    }
    
    var lastRow = master.getLastRow();
    var rangeList = 'A2:K'+lastRow;
    var sheetValues = sheet.getRange(rangeList).getValues();
    syncCalendarGeneral(calendars, sheetValues, lastRow);
}

function syncCalendarGeneral(calendars, range, lastRow){
    
    for (var i = 0; i <= lastRow-2; i++){
        var row = range[i];
        
        var words = row[2].split(", ");
        
        var section = words[0];
        
        var calendarType = -1;
        
        if (section === "Main"){calendarType = 0;}
        else if (section === "Food"){calendarType = 1;}
        else if (section === "Sponsor"){calendarType = 2;}
        else if (section === "Mentor"){calendarType = 3;}
        else if (section === "Campfire"){calendarType = 4;}
        else if (section === "Mini"){calendarType = 5;}
        
        addEventGeneral(row, calendars[calendarType]);
    }
}

//https://developers.google.com/apps-script/reference/calendar/calendar-app#getCalendarById(String)
function addEventGeneral(row, calendar){
    var day = 0;
    if (row[0] === "Saturday"){day = 11;}
    else if (row[0] === "Friday"){day = 12;}
    else if (row[0] === "Sunday"){day = 13;}
    else if (row[0] === "Thursday"){day = 14;}
    
    var location = row[7];
    var startDate = new Date(row[4]);
    var endDate = new Date(row[5]);
    
    var start = new Date(2019, 3, day, startDate.getHours(), startDate.getMinutes(), 0);
    var end = new Date(2019, 3, day, endDate.getHours(), endDate.getMinutes(), 0);
    
    var event = calendar.createEvent(row[1], start, end).setLocation(location);
}
