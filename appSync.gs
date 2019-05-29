//Takes all rows with a "y" under the "Appear on App" col and puts them in the App Schedule in a specified order
function mainApp(){
    var ss = SpreadsheetApp.getActiveSpreadsheet();
    var master = ss.getSheetByName(masterScheduleName);
    
    sorted(master);
    
    var lastRow = master.getLastRow();
    var lastCol = master.getLastColumn();
    var rangeList = master.getRange(1, 1, lastRow, lastCol);
    var masterCopyValues = rangeList.getValues();
    
    appSync(masterCopyValues, master, lastRow);
}

/*syncs the correct rows of the Master Schedule to the App Schedule.
 appends rows to the App Schedule so that there are no blank rows.
 
 FUNCTION DOES NOT DELETE ROWS*/
function appSync(range, master, lastRow){
    var row_in_app_schedule = 2;
    
    for (var i = 1; i < lastRow; i++){
        var row = range[i];
        var check = row[masterCols.appear_on_app];
        
        if (check === "Y"){
            addToApp(row, row_in_app_schedule);
            row_in_app_schedule++;
        }
    }
}

//adds rows of the Master Schedule to the App Schedule
function addToApp(row, num){
    var sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(appSheetName);
    var lastRow = sheet.getMaxRows();
    if (num > lastRow){sheet.insertRowsAfter(lastRow, 1);}
    
    var startHour = row[masterCols.start_time].getHours();
    var startMin = row[masterCols.start_time].getMinutes();
    var startAMPM = "AM";
    var endHour = row[masterCols.end_time].getHours();
    var endMin = row[masterCols.end_time].getMinutes();
    var endAMPM = "AM";
    var description = row[masterCols.descr];
    var location = row[masterCols.location];
    var eventSection = row[masterCols.event_section];
    var featured = row[masterCols.featured];
    var caption = row[masterCols.caption]
    
    //dates Date objects and creates a String in the form m/dd/yyyy. Takes into account events that go over days
    var dd = row[masterCols.date].split("/")[1];
    var mm = month;
    var yyyy = year;
    
    var formattedStartDate = mm + '/' + dd + '/' + yyyy;
    var formattedEndDate = (endHour < startHour) ? mm + '/' + (parseInt(dd, 10)+1) + '/' + yyyy : mm + '/' + dd + '/' + yyyy;
    
    //makes sure hours are in 12 o clock AM/ PM format
    if (startHour >= 12){
        if (startHour > 12){
            startHour -= 12;
        }
        startAMPM = "PM";
    }
    
    if (endHour >= 12){
        if (endHour > 12){
            endHour -= 12;
        }
        endAMPM = "PM";
    }
    
    //performs some calculations to figure out if its AM or PM
    var startHourAMPM = (startAMPM === "PM" && startHour != 12 ) ? startHour + 12 : startHour;
    var endHourAMPM = (endAMPM === "PM" && endHour != 12) ? endHour + 12 : endHour;
    
    //Formatted Row. WILL NEED TO BE CHANGED AS APP SCHEDULE CHANGES
    var appRow = [ [row[masterCols.day], row[masterCols.title], formattedStartDate, startHour, startMin, startAMPM,
                    formattedStartDate +" "+startHourAMPM+":"+startMin+":00", formattedEndDate, endHour, endMin, endAMPM,
                    formattedEndDate +" "+endHourAMPM+":"+endMin+":00", location, description,  eventSection, featured, caption] ];
    
    sheet.getRange(num, 1, 1, sheet.getLastColumn()).setValues(appRow)
}
