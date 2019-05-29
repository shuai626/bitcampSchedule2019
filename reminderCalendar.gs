//updates the Run Of Show calendar and assign email/SMS reminders to the POC.
function remindCalendar() {
    var calendar = CalendarApp.getCalendarById("ef2ukhkc30fbiubl4tarvobcv4@group.calendar.google.com");
    var ss = SpreadsheetApp.openByUrl("https://docs.google.com/spreadsheets/d/1uZT-oyTurfQc2COJiWQx2xP38ZzCuUPyp5v_TjwbwaU/edit#gid=0");
    var sheet = ss.getSheetByName("Main");
    var lastRow = sheet.getLastRow();
    var rangeList = 'A2:G'+lastRow;
    var sheetValues = sheet.getRange(rangeList).getValues();
    
    clearCalendar(calendar);
    //syncCalendarRemind(calendar, sheetValues, lastRow);
}

function syncCalendarRemind(calendar, range, lastRow){
    
    for (var i = 0; i < lastRow-2; i++){
        var row = range[i];
        
        addEventRemind(row, calendar);
        
        if (i%20 === 0){
            Utilities.sleep(3000);
            Logger.log("SLEEPING");
        }
    }
}

//https://developers.google.com/apps-script/reference/calendar/calendar-app#getCalendarById(String)
function addEventRemind(row, calendar){
    var day = 0;
    if (row[0] === "Saturday"){day = 11;}
    else if (row[0] === "Friday"){day = 12;}
    else if (row[0] === "Sunday"){day = 13;}
    else if (row[0] === "Thursday"){day = 14;}
    else if (row[0] === "Wednesday"){day = 10;}
    
    var start = new Date(2019, 3, day, row[1].getHours(), row[1].getMinutes(), 0);
    var end = new Date(2019, 3, day, row[1].getHours(), row[1].getMinutes()+10, 0);
    
    var event = calendar.createEvent(row[2], start, end).setLocation(row[3]);
    if (row[4] !== ''){event.addGuest(row[4]);}
    if (row[5] !== ''){event.addGuest(row[5]);}
    if (row[6] !== ''){event.addGuest(row[6]);}
    
    event.addEmailReminder(5).addPopupReminder(7); //can only have 5
}

//Changes all font colors on the Master Schedule back to black to indicate that changes have been added to the Run of Show
function revertToBlack() {
    var ss = SpreadsheetApp.getActiveSpreadsheet();
    var master = ss.getSheetByName("Master Schedule");
    
    var lastRow = master.getLastRow();
    var rangeList = 'A2:L'+lastRow;
    var range = master.getRange(rangeList);
    
    range.setFontColor("Black");
}
