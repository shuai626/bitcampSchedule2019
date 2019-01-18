function generalCalendar() {
  var calendar = CalendarApp.getCalendarById("4aeb2g8de04s3d8ssnh91ktmsc@group.calendar.google.com");
  calendar.setTimeZone("America/New_York");
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("Master Schedule");
  
  clearCalendar(calendar);
  
  var lastRow = getFirstEmptyRow(sheet);
  var rangeList = 'A2:K'+lastRow;
  var sheetValues = sheet.getRange(rangeList).getValues();
  syncCalendar(calendar, sheetValues, lastRow);
}

function syncCalendar(calendar, range, lastRow){
  
  for (var i = 0; i < lastRow-2; i++){
    var row = range[i];
    
    addEvent(row, calendar);
  }
}

//https://developers.google.com/apps-script/reference/calendar/calendar-app#getCalendarById(String)
function addEvent(row, calendar){
  var day = 0;
  if (row[0] === "Thursday"){day = 11;}
  else if (row[0] === "Friday"){day = 12;}
  else if (row[0] === "Saturday"){day = 13;}
  else if (row[0] == "Sunday"){day = 14;}
  
  var start = new Date(2019, 3, day, row[5], row[6], 0);
  var end = new Date(2019, 3, day, row[7], row[8], 0);
  
  Logger.log(start + end);
  var event = calendar.createEvent(row[1], start, end).setLocation(row[9]);  
}

function clearCalendar(calendar){
  var start = new Date("Mon Apr 8 19:56:53 GMT-05:00 2019");
  var end = new Date("Sun Apr 14 22:00:00 GMT-05:00 2019");
  var events = calendar.getEvents(start, end);
  
  for (var i = 0; i < events.length; i++){
    events[i].deleteEvent();
  }
}