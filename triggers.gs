/*Edits made to the master schedule will have red text on their respective day.
 This will help other scripts determine what events need to be changed and which stay*/
function onEdit(e){
    var sheet = SpreadsheetApp.getActiveSheet();
    var range = SpreadsheetApp.getActiveRange();
    var erange = e.range;//The range of cells edited
    var columnOfCellEdited = range.getColumn();
    var dateCol = 7;
    
    if (sheet.getName() === "Master Schedule"){
        var cell = sheet.getRange(range.getRow(), 1);
        e.range.setFontColor("RED");
        
        if (columnOfCellEdited === 1) {// Column 3 is Column C
            if (erange.getValue() === "Thursday"){
                var cell = sheet.getRange(range.getRow(), dateCol);
                cell.setValue(days.Thurs.date);
            }
            if (range.getValue() === "Friday"){
                var cell = sheet.getRange(range.getRow(), dateCol);
                cell.setValue(days.Fri.date);
            }
            if (range.getValue() === "Saturday"){
                var cell = sheet.getRange(range.getRow(), dateCol);
                cell.setValue(days.Sat.date);
            }
            if (range.getValue() === "Sunday"){
                var cell = sheet.getRange(range.getRow(), dateCol);
                cell.setValue(days.Sun.date);
            }
        }
    }
}

//Adds a UI to the Bitcamp schedule so scripts can be run through the Add-On Tab
function onOpen() {
    var menu = SpreadsheetApp.getUi().createAddonMenu();
    // Or DocumentApp or FormApp.
    menu.addItem('Add Workshops to Master Schedule', 'menuItem0').addSeparator()
    .addItem('Visualize Master Schedule', 'menuItem1').addSeparator()
    .addItem('Update App Schedule', 'menuItem2').addSeparator()
    .addItem('Sync Calendar with Run of Show', 'menuItem3').addSeparator();
    menu.addToUi();
}

function menuItem0(){
    var ui = SpreadsheetApp.getUi(); // Same variations.
    
    var result = ui.alert(
                          'Are you sure you want to continue?',
                          'This script will add sponsor/mentor workshops to the Master Schedule',
                          ui.ButtonSet.YES_NO);
    
    // Process the user's response.
    if (result == ui.Button.YES) {
        addWorkshops();
        ui.alert('Workshops have been added to the Master Schedule');
    } else {
        // User clicked "No" or X in the title bar.
        ui.alert('Operation failed. Please try again.');
    }
}

//Updates the visual schedules
function menuItem1() {
    var ui = SpreadsheetApp.getUi(); // Same variations.
    
    var result = ui.alert(
                          'Are you sure you want to continue?',
                          'This script will visualize the Master Schedule (and Calendar)',
                          ui.ButtonSet.YES_NO);
    
    // Process the user's response.
    if (result == ui.Button.YES) {
        mainVisual();
        //***************generalCalendar();
        ui.alert('Visual Schedules have been updated');
    } else {
        // User clicked "No" or X in the title bar.
        ui.alert('Operation failed. Please try again.');
    }
}

//Updates the App Schedule
function menuItem2() {
    var ui = SpreadsheetApp.getUi(); // Same variations.
    
    var result = ui.alert(
                          'Are you sure you want to continue?',
                          'This script will update the App Schedule',
                          ui.ButtonSet.YES_NO);
    
    // Process the user's response.
    if (result == ui.Button.YES) {
        mainApp();
        ui.alert('App Schedule has been updated');
    } else {
        // User clicked "No" or X in the title bar.
        ui.alert('Operation failed. Please try again.');
    }
}

//Updates the Run of Show
function menuItem3(){
    var ui = SpreadsheetApp.getUi(); // Same variations.
    
    var result = ui.alert(
                          'Are you sure you have manually updated the Run of Show',
                          'This script will revert colors back to black and update the Remind Calendar',
                          ui.ButtonSet.YES_NO);
    
    // Process the user's response.
    if (result == ui.Button.YES) {
        //**************remindCalendar();
        revertToBlack();
        ui.alert('Reminder Schedule has been synced and Master Schedule reverted');
    } else {
        // User clicked "No" or X in the title bar.
        ui.alert('Operation failed. Please try again.');
    }
}
