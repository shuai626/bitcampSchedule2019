//adds new workshops or updates old ones in the master schedule. Name must be consistent
function addWorkshops(){
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var master = ss.getSheetByName("Master Schedule");
  var workshops = ss.getSheetByName("Event Request");
  
  var lastRow = getFirstEmptyRow(workshops);
  var rangeList = 'B2:I'+lastRow;
  var workshopCopyValues = workshops.getRange(rangeList).getValues();
  
  syncWorkshops(workshopCopyValues, lastRow, master);
  sorted(master);
}

function syncWorkshops(workshopCopyValues, lastRow, master){
  
  
  for (var i = 0; i <= lastRow - 2; i++){
    var row = workshopCopyValues[i];
    
    var day = "";
    var date = "";
    if (row[2] === "Friday 4/12/2019"){day = "Friday"; date = "4/12/2019";}
    else if (row[2] === "Saturday 4/13/2019"){day = "Saturday"; date = "4/13/2019";}
    else if (row[2] === "Sunday 4/14/2019"){day = "Sunday"; date = "4/14/2019";}
    
    var eventType = "Mentor";
    if (row[5] === "Sponsor"){eventType = "Sponsor";}
    
    var values = [ [day, row[0], eventType ,"Y", date, row[3].getHours(), row[3].getMinutes(), row[4].getHours(), row[4].getMinutes(), row[1], ""] ];
  
    appendToMaster(master, values, row[0]);
  }
}

function appendToMaster(master, values, eventName){
   var newRow = getFirstEmptyRow(master)+1;
   
   for (var i = 2; i <= newRow-1; i++){
      if (master.getRange(i, 2).getValue() === eventName){
        var masterRow = master.getRange("A"+i+":K"+i).getValues();
        
        for (var j = 0; j < values[0].length; j++){
          if (masterRow[0][j] !== values[0][j]){
            master.getRange(i, j+1).setValue(values[0][j]).setFontColor("Red");
            master.getRange(i, 1).setFontColor("RED");
          }
        }
      return;
      }
   }
   master.getRange("A"+newRow+":K"+newRow).setValues(values).setFontColor("RED");
}