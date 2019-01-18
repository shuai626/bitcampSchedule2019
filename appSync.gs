function mainApp(){
 var ss = SpreadsheetApp.getActiveSpreadsheet();
 var master = ss.getSheetByName("Master Schedule");
 
 sorted(master);

 var lastRow = getFirstEmptyRow(master);
 var rangeList = 'A2:K'+lastRow;
 var masterCopyValues = master.getRange(rangeList).getValues();
 
 appSync(masterCopyValues, master, lastRow);
}

/*syncs the correct rows of the Master Schedule to the App Schedule.*/
function appSync(range, master, lastRow){
  var appear = 3;
  var num = 2;
  
  for (var i = 0; i <= lastRow-2; i++){
    var row = range[i];
    var check = row[appear];
    
    if (check === "Y"){
      
      /*This option will edit data that is already there, or append it to the end
      var cell = master.getRange(i+2, 1);
      Logger.log(cell.getFontColor()+cell.getValue());
      if (cell.getFontColor() === "#ff0000"){
        cell.setFontColor("Purple");
        appendToApp(row);
      }*/
      
      //this option just overwrites all the information in sorted order
      addToApp(row, num);
      num++;
    }
  }
}

//adds rows of the Master Schedule to the App Schedule
function addToApp(row, num){
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("App Schedule");
  
  var startHour = row[5];
  var startAMPM = "AM";
  var endHour = row[7];
  var endAMPM = "AM";
  var description = "";
  
  if (typeof row[10] != "undefined"){description = row[10];}
  
  if (startHour > 12){ startHour -= 12; startAMPM = "PM";}
  else if (startHour === "0"){startHour = 12;}
  if (endHour > 12){endHour -= 12; endAMPM = "PM";}
  
  var syncedInfo = [ [row[0], row[1], row[4], startHour, row[6], startAMPM, 
    row[4] +" "+row[5]+":"+row[6]+":00", row[4], endHour, row[8], endAMPM,
    row[4] +" "+row[7]+":"+row[8]+":00", row[9], description ] ];
  
  sheet.getRange("A"+num+":N"+num).setValues(syncedInfo);
  
  var finalCheck = sheet.getRange("N"+num);
  if (finalCheck === "undefined"){finalCheck.setValue("");}
}

/*Updates the current row values OR appends all the information to the end if it does not exist yet
CAVEATS: 1. EVENT NAME CANNOT BE CHANGED. DO NOT MISPELL
         2. ROWS CAN BE ADDED AND ALTERED BUT NOT REMOVED FROM THE APP BY SCRIPT
         3. MUST BE RUN BEFORE THE RUN OF SHOW */
function appendToApp(row){
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("App Schedule");
  var lastRow = getFirstEmptyRow(sheet);
  
  var startHour = row[5];
  var startAMPM = "AM";
  var endHour = row[7];
  var endAMPM = "AM";
  var description = "";
  
  if (typeof row[10] != "undefined"){description = row[10];}
  
  if (startHour > 12){ startHour -= 12; startAMPM = "PM";}
  else if (startHour === "0"){startHour = 12;}
  if (endHour > 12){endHour -= 12; endAMPM = "PM";}
  
  var syncedInfo = [ [row[0], row[1], row[4], startHour, row[6], startAMPM, 
    row[4] +" "+row[5]+":"+row[6]+":00", row[4], endHour, row[8], endAMPM,
    row[4] +" "+row[7]+":"+row[8]+":00", row[9], description ] ];
    
  for (var i = 2; i <= lastRow; i++){
    if (sheet.getRange(i, 2).getValue() === row[1]){
      sheet.getRange("A"+i+":N"+i).setValues(syncedInfo);
      var finalCheck = sheet.getRange("N"+i);
      if (finalCheck === "undefined"){finalCheck.setValue("");}
      return;
    }
  }
  
  Logger.log(lastRow+syncedInfo);
  
  lastRow += 1;
  sheet.getRange("A"+lastRow+":N"+lastRow).setValues(syncedInfo);
  var finalCheck = sheet.getRange("N"+lastRow);
  if (finalCheck === "undefined"){finalCheck.setValue("");}
}