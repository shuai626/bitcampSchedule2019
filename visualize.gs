//turns cells in the Master Schedule into a nice visual schedule to view
function mainVisual(){
    var ss = SpreadsheetApp.getActiveSpreadsheet();
    var master = ss.getSheetByName(masterScheduleName);
    
    clearVisual(ss.getSheetByName(days.Thurs.sheetname));
    clearVisual(ss.getSheetByName(days.Fri.sheetname));
    clearVisual(ss.getSheetByName(days.Sat.sheetname));
    clearVisual(ss.getSheetByName(days.Sun.sheetname));
    
    sorted(master);
    
    var lastRow = master.getLastRow();
    var lastCol = master.getLastColumn();
    var rangeList = master.getRange(1, 1, lastRow, lastCol);
    var masterCopyValues = rangeList.getValues();
    
    visualize(masterCopyValues, lastRow);
}

//determines which sheets each row on the Master Schedule are visualized on.
function visualize(range, lastRow){
    for (var i = 1; i < lastRow; i++){
        
        var row = range[i];
        var check = row[masterCols.date].toString();
        
        Logger.log(row);
        //[date] represents the column on "Master Schedule" holding dates
        if (check === days.Thurs.date){
            addToDay(row, days.Thurs.sheetname);
        }
        if (check === days.Fri.date){
            addToDay(row, days.Fri.sheetname);
        }
        if (check === days.Sat.date){
            addToDay(row, days.Sat.sheetname);
        }
        if (check === days.Sun.date){
            addToDay(row, days.Sun.sheetname);
        }
    }
}

//visualizes rows from the Master Schedule to its corresponding sheet
function addToDay(row, day) {
    var sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(day);
    
    
    var startDate = new Date(row[masterCols.start_time]);
    var endDate = new Date(row[masterCols.end_time]);
    Logger.log(startDate);
    var startPoint = startDate.getHours() * 2+2; //Start hour
    var endPoint = (endDate.getHours() === 0) ? 24 * 2+1 : endDate.getHours() * 2 + 1; //End hour
    
    if (startDate.getMinutes() === 30){startPoint += 1;} //start min
    if (endDate.getMinutes() === 30){endPoint += 1;} //end min
    
    var words = row[masterCols.event_section].split(","); //delimiter
    
    //if workshop is the first word, then we use the next keyword as its event
    //This is an artefact of a request from Bitcamp 2019
    var section = (words[0] === "Workshop") ? words[1] : words[0]; //Event Section
    var col, bg;
    
    Logger.log(section);
    
    for (var i = 0; i < eventCategories.totalEvents; i++){
        if (section === eventCategories[i].name){
            col = eventCategories[i].col, bg = eventCategories[i].hex;
            break;
        }
    }
    
    var startCell = col+startPoint;
    var endCell = col+endPoint;
    Logger.log(startCell);
    
    //if an event already exists at that cell, then put this event in the overflow col
    //In the future we may need more overflow columns
    
    if (sheet.getRange(startCell).getBackground() !== "#ffffff"){ startCell = 'G'+startPoint; endCell = 'G'+endPoint;}
    else if (sheet.getRange(endCell).getBackground() !== "#ffffff"){ startCell = 'G'+startPoint; endCell = 'G'+endPoint;}
    else if (sheet.getRange(col+Math.floor((startPoint+endPoint)/2)).getBackground() !== "#ffffff"){ startCell = 'G'+startPoint; endCell = 'G'+endPoint;}
    
    if (sheet.getRange(startCell).getBackground() !== "#ffffff"){ startCell = 'H'+startPoint; endCell = 'H'+endPoint;}
    
    //error will occur if start and end time are the exact same, as endCell will occur before startCell
    if (startPoint === endPoint + 1){endCell = startCell;}
    
    sheet.getRange(startCell).setValue(row[masterCols.title]);
    sheet.getRange(startCell+":"+endCell).setBackground(bg).setVerticalAlignment("middle").setBorder(true, true, true, true, true, false);
}
