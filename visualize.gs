function mainVisual(){
 var ss = SpreadsheetApp.getActiveSpreadsheet();
 var master = ss.getSheetByName("Master Schedule");

 clearVisual(ss.getSheetByName("Thursday 4/11/19"));
 clearVisual(ss.getSheetByName("Friday 4/12/19"));
 clearVisual(ss.getSheetByName("Saturday 4/13/19"));
 clearVisual(ss.getSheetByName("Sunday 4/14/19"));
 
 sorted(master);

 var lastRow = getFirstEmptyRow(master);
 var rangeList = 'A2:K'+lastRow;
 var masterCopyValues = master.getRange(rangeList).getValues();

 visualize(masterCopyValues, lastRow);
}

//determines which sheets each row on the Master Schedule are visualized on.
function visualize(range, lastRow){
 var date = 4;
 for (var i = 0; i <= lastRow-2; i++){
    var row = range[i]; 
    var check = row[date];
   
    //[date] represents the column on "Master Schedule" holding dates
    if (check === "4/11/2019"){ 
      addToDay(row, "Thursday 4/11/19");
    }
    if (check === "4/12/2019"){ 
      addToDay(row, "Friday 4/12/19");
    }
    else if (check === "4/13/2019"){ 
      addToDay(row, "Saturday 4/13/19");
    }
    else if (check === "4/14/2019"){
      addToDay(row, "Sunday 4/14/19");
    }
  }
 }

//visualizes rows from the Master Schedule to its corresponding sheet 
function addToDay(row, day) {
   var sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(day);
   var startPoint = row[5]*2+2; //Start hour
   var endPoint = row[7]*2+1; //End hour
   
   if (row[6] === "30"){startPoint += 1;} //start min
   if (row[8] === "30"){endPoint += 1;} //end min
   
   var section = row[2]; //Event Section
   var col, bg;
   
   if (section === "Main"){col = "B", bg = "#AAC5DE";}
   else if (section === "Food"){col ="C", bg = "#F8E6A3";}
   else if (section === "Sponsor"){col = "D", bg = "#BCD7AD";}
   else if (section === "Mentor"){col = "E", bg = "#DF9E9A";}
   else if (section === "Campfire"){col = "F", bg = "#CDAABB";}
   else if (section === "Misc"){col = "G", bg = "#B1A9D3";}
   
   var startCell = col+startPoint;
   var endCell = col+endPoint;
   
   //error will occur if start and end time are the exact same, as endCell will occur before startCell
   if (startPoint === endPoint + 1){endCell = startCell;}
   
   sheet.getRange(startCell).setValue(row[1]).setBackground(bg).setVerticalAlignment("middle");
   sheet.getRange(startCell+":"+endCell).mergeVertically();
}