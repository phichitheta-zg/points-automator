function runAllTests() {
  interfaceSheet.getRange(INTERFACE.TESTS).clear();
  saveSheetURLs();
  
  if (testSheetURLsSaved())
    testSheetURLsValid();
}

function printTestResult(result, range, errorMessage) {
  let resultMessage = result ? [["Passed"]] : [[errorMessage]];
  interfaceSheet.getRange(range).setValue(resultMessage);
}

// Test if sheet URLs properly saved
function testSheetURLsSaved() {
  let pointsSheetURL = scriptProperties.getProperty(SP.POINTS_URL);
  let formSheetURL = scriptProperties.getProperty(SP.FORM_URL);
  
  let testPassed = (pointsSheetURL && formSheetURL) ? true : false;
  printTestResult(testPassed, INTERFACE.TEST_SHEET_URLS_SAVED, ERROR.URLS_FAILED_TO_SAVE);
  return testPassed;
}

// Test if sheet URLs valid
function testSheetURLsValid() {
  let pointsSheet = new PointsSheet();
  let formSheet = new FormSheet();
  
  let testPassed = (pointsSheet.sheet && formSheet.sheet); // this should always pass, if any errors occur it will stop the script and display in the interface
  if (!testPassed) {
    var pointsErrorMessage = (pointsSheet.sheet) ? "": ERROR.POINTS_URL_INVALID;
    var formErrorMessage = (formSheet.sheet) ? "" : ERROR.FORM_URL_INVALID; 
  }
  
  printTestResult(testPassed, INTERFACE.TEST_SHEET_URLS_VALID, `Failed! ${pointsErrorMessage} ${formErrorMessage}`);
}

// Test if all members correctly stored into script properties
function testScriptProperties() {
  let testPassed = true;
  let summarySheet = pointsSheet.getSheets()[0];
  let members = summarySheet.getRange(`${POINTS_FIELD.FIRST_NAME}3:${POINTS_FIELD.LAST_NAME}${summarySheet.getLastRow()}`).getValues();
  let membersDict = scriptProperties.getProperties();

  // Store members in scriptProperties
  members.forEach((member, index) => {
    if (member[0] == "") return; // continue;

    if (index != membersDict[`${member[0]} ${member[1]}`]) {
      testPassed = false;
      return true; // break;
    }
  })
  
  testPassed ? console.log("scriptProperties passed") : console.log("scriptProperties failed");
}