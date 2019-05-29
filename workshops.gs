//adds new workshops or updates old ones in the master schedule. Name must be consistent and put in string format
function addWorkshops(){
    var ss = SpreadsheetApp.getActiveSpreadsheet();
    var master = ss.getSheetByName("Master Schedule");
    var workshops = ss.getSheetByName("Event Request");
    
    var lastRow = workshops.getLastRow();
    var rangeList = 'B2:K'+lastRow;
    var workshopCopyValues = workshops.getRange(rangeList).getValues();
    
    syncWorkshops(workshopCopyValues, lastRow, master);
    //sorted(master);
}

function syncWorkshops(workshopCopyValues, lastRow, master){
    
    for (var i = 0; i <= lastRow - 2; i++){
        var row = workshopCopyValues[i];
        
        var day = "";
        var date = "";
        
        if (row[2] === "Friday 4/12/2019"){day = "Friday"; date = "4/12/2019";}
        else if (row[2] === "Saturday 4/13/2019"){day = "Saturday"; date = "4/13/2019";}
        else if (row[2] === "Sunday 4/14/2019"){day = "Sunday"; date = "4/14/2019";}
        else{ return; }
        var eventType = "Mentor";
        if (row[5] === "Sponsor"){eventType = "Sponsor";}
        
        var start = row[3];
        var end = row[4];
        
        var values = [ [day, row[0], eventType ,"Y", start, end, date, row[1], "", "", "N"] ];
        
        appendToMaster(master, values, row[0]);
    }
}

function appendToMaster(master, values, eventName){
    var newRow = master.getLastRow()+1;
    
    master.getRange("A"+newRow+":K"+newRow).setValues(values).setFontColor("RED");
}
