//clears the visualized sheets to work around any pre-existing merged cells from previous schedules
function clearVisual(sheet){
  var cell = sheet.getRange("B2:G49");
  
  cell.merge();
  cell.setValue("").setBackground("white");
  cell.breakApart();
}


//returns the last empty row in the a sheet
function getFirstEmptyRow(sheet) { //source: https://stackoverflow.com/questions/6882104/faster-way-to-find-the-first-empty-row 
  var column = sheet.getRange('A:A');
  var values = column.getValues(); // get all data in one call
  var ct = 0; 
  while ( values[ct][0] != "" ) {
    ct++;
  }
  return (ct);
}

/*sorts a sheet by in a particular column order
For the Master Schedule, it sorts End min>end hour>start min>start hour>date */
function sorted(sheet){ 
  sheet.sort(9).sort(8).sort(7).sort(6).sort(5);
}

function clearCalendar(calendar){
  var start = new Date("Mon Jan 7 19:56:53 GMT-05:00 2019");
  var end = new Date("Sun Apr 14 22:00:00 GMT-05:00 2019");
  var events = calendar.getEvents(start, end);
  
  for (var i = 0; i < events.length; i++){
    events[i].deleteEvent();
  }
}
