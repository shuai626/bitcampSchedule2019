function revertToBlack() {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var master = ss.getSheetByName("Master Schedule");
  
  var lastRow = getFirstEmptyRow(master);
  var rangeList = 'A2:K'+lastRow;
  var range = master.getRange(rangeList);
  
  range.setFontColor("Black");
}

/*
for run of show: Thursday and Friday AV is already premade.

  Run of Show = Main is manually put into place, as well as mentor greets etc
  Food = check 15 min before. Insomnia Cookies is premade?
    How to do white band orange band red band?
*/


/*
for run of show: Thursday and Friday AV is already premade.

  Run of Show = Main is manually put into place, as well as mentor greets etc
  Food = check 15 min before. Insomnia Cookies is premade?
    How to do white band orange band red band?
    
    w
*/
