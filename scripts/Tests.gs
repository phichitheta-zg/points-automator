function runAllTests() {
  testMemberKeys();
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
  return testPassed;
}

// Test if all members correctly stored into script properties
function testMemberKeys() {
  let membersDict = scriptProperties.getProperties();
  let divider = scriptProperties.getProperty(SP.DIVIDER);
  let num_members = scriptProperties.getProperty(SP.NUM_MEMBERS);
  
  let testPassed = (divider && num_members);
  printTestResult(testPassed, INTERFACE.TEST_MEMBER_KEYS_SAVED, ERROR.MEMBER_KEYS_FAILED_TO_SAVE);
  return testPassed;
}