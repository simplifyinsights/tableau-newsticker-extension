'use strict';

(function () {

  let unregisterSettingsEventListener = null;
  let unregisterFilterEventListener = null;

  $(document).ready(function () {
    // Initialises Tableau Data Extension
    tableau.extensions.initializeAsync({ 'configure':configure }).then(function () {
      refresh();
      unregisterSettingsEventListener = tableau.extensions.settings.addEventListener(tableau.TableauEventType.SettingsChanged, (settingsEvent) => {
        refresh();
      });
    }, function () { console.log('Error while Initializing: ' + err.toString()); });
  }); 

  function refresh() {
    
    const worksheets = tableau.extensions.dashboardContent.dashboard.worksheets;
    
    // Unregister Event Listeners for old Worksheet, if exists.
    if (unregisterFilterEventListener != null) {
      unregisterFilterEventListener();
    }

    var sheetName = tableau.extensions.settings.get("worksheet");
    if (sheetName == undefined || sheetName =="" || sheetName == null) {

      // Exit the function if no worksheet name is present !!!
      return;
    } else {
      // If a worksheet is selected, then we hide the configuration screen.
    }

    // Use the worksheet name saved in the Settings to find and return
    // the worksheet object.
    var worksheet = worksheets.find(function (sheet) {
      return sheet.name === sheetName;
    });

    // Add an event listener to the worksheet.
    unregisterFilterEventListener = worksheet.addEventListener(tableau.TableauEventType.FilterChanged, (filterEvent) => {
      refresh();
    });

    worksheet.getSummaryDataAsync().then(function (sumdata) {
      // We have created an array to match the underlying data source and then
      // looped through to populate our array with the value data set. We also added
      // logic to read from the column names and column order from our configiration.
      const worksheetData = sumdata.data;
      var tableData = makeArray(sumdata.columns.length,sumdata.totalRowCount);
      
 
      for (var i = 0; i < tableData.length; i++) {
        for (var j = 0; j < tableData[i].length; j++) {
          tableData[i][j] = worksheetData[i][j].formattedValue;
        }
      }

      $("#news").html("<li><span>"+tableData.toString()+"</span></li>");
      
      $('.js-conveyor-3').jConveyorTicker({
          reverse_elm: true,
          anim_duration: 200,
          force_loop: false
      });
    })
  }

  function configure() {
    const popupUrl=`${window.location.origin}/dialog.html`;
    let defaultPayload="";
    tableau.extensions.ui.displayDialogAsync(popupUrl, defaultPayload, { height:300, width:600 }).then((closePayload) => {
      refresh();
    }).catch((error) => {
      switch (error.errorCode) {
        case tableau.ErrorCodes.DialogClosedByUser:
          console.log("Dialog was closed by user");
          break;
        default:
          console.error(error.message);
      }
    });
  }

  // Creates an empty 2D array. we will use this to match the the data set returned
  // by Tableau and repopulate this with the values we want.
  function makeArray(d1, d2) {
    var arr = new Array(d1), i, l;
    for(i = 0, l = d2; i < l; i++) {
        arr[i] = new Array(d1);
    }
    return arr;
  }
})();