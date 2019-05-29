//clears the visualized sheets to work around any pre-existing merged cells from previous schedules
function clearVisual(sheet){
    var cell = sheet.getRange("B2:H49");
    
    cell.merge();
    cell.setValue("").setBackground("white");
    cell.breakApart();
}


/*sorts a sheet by in a particular column order
 For the Master Schedule, it sorts End min>end hour>start min>start hour>date */
function sorted(sheet){
    sheet.sort(masterCols.end_time+1).sort(masterCols.start_time+1).sort(masterCols.date+1);
}

//Changes all font colors on the Master Schedule back to black to indicate that changes have been added to the Run of Show
function revertToBlack() {
    var ss = SpreadsheetApp.getActiveSpreadsheet();
    var master = ss.getSheetByName(masterScheduleName);
    
    var lastRow = master.getLastRow();
    var lastCol = master.getLastColumn();
    
    var range = master.getRange(2, 1, lastRow, lastCol);
    
    range.setFontColor("Black");
}
