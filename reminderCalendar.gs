//updates the Run Of Show calendar and assign email/SMS reminders to the POC.
function remindCalendar() {
  var calendar = CalendarApp.getCalendarById("ef2ukhkc30fbiubl4tarvobcv4@group.calendar.google.com");
  calendar.setTimeZone("America/New_York");
  var ss = SpreadsheetApp.openByUrl("https://docs.google.com/spreadsheets/d/1uZT-oyTurfQc2COJiWQx2xP38ZzCuUPyp5v_TjwbwaU/edit#gid=0");
  var sheets = ss.getSheets();
  
  clearCalendar(calendar);
  
  for (var i = 0; i < sheets.length; i++){
    var sheet = sheets[i];
    var lastRow = getFirstEmptyRow(sheet);
    var rangeList = 'A2:K'+lastRow;
    var sheetValues = sheet.getRange(rangeList).getValues();
    
    syncCalendar(calendar, sheetValues, lastRow);
  }
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
  if (row[0] === "Wednesday"){day = 10;}
  else if (row[0] === "Thursday"){day = 11;}
  else if (row[0] === "Friday"){day = 12;}
  else if (row[0] === "Saturday"){day = 13;}
  else if (row[0] == "Sunday"){day = 14;}
  
  var start = new Date(2019, 3, day, row[1].getHours(), row[1].getMinutes(), 0);
  var end = new Date(2019, 3, day, row[1].getHours(), row[1].getMinutes()+10, 0);
  
  Logger.log(start + end);
  var event = calendar.createEvent(row[2], start, end).setLocation(row[3]);
  
  
  event.addGuest().addEmailReminder(minutesBefore).addSmsReminder(minutesBefore);
  //use addGuest to add POC and set SMS and email reminders!
  
}

function clearCalendar(calendar){
  var start = new Date("Mon Apr 8 19:56:53 GMT-05:00 2019");
  var end = new Date("Sun Apr 14 22:00:00 GMT-05:00 2019");
  var events = calendar.getEvents(start, end);
  
  for (var i = 0; i < events.length; i++){
    events[i].deleteEvent();
  }
}
