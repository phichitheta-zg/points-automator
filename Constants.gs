const RESPONSE = {
  NAME: 1,
  EVENT_TYPE: 3,
  EVENT_NAME: 4,
  LOCATION: 5,
  DATE: 6,
  TIME: 7,
  DRESS_CODE: 8,
  ATTENDEES: 10,
  ATTENDANCE_POINTS: 11,
  ABSENCE_POINTS: 12
}

const SP = {
  DIVIDER: "divider",
  NUM_MEMBERS: "members_length", // technically members + divider
  POINTS_URL: "points_url",
  FORM_URL: "form_url"
}

const INTERFACE = {
  POINTS_URL: "B2",
  FORM_URL: "B3",
  TESTS: "E2:E3",
  TEST_SHEET_URLS_SAVED: "E2",
  TEST_SHEET_URLS_VALID: "E3",
}

const POINTS_FIELD = {
  FIRST_NAME: 'A',
  LAST_NAME: 'B'
}

const ERROR = {
  URLS_FAILED_TO_SAVE: "Failed: Did you put in the sheet URLs?",
  POINTS_URL_INVALID: "Points sheet URL invalid!",
  FORM_URL_INVALID: "Form sheet URL invalid!"
}

// Globals
var scriptProperties = PropertiesService.getScriptProperties();
var interfaceURL = process.env.INTERFACE_URL;
var interfaceSheet = SpreadsheetApp.openByUrl(interfaceURL);

function PointsSheet() {
  this.sheetURL = scriptProperties.getProperty(SP.POINTS_URL);
  try { 
   this.sheet = SpreadsheetApp.openByUrl(this.sheetURL);
  } catch (error) {
    this.sheet = null;
  }
}

function FormSheet() {
  this.sheetURL = scriptProperties.getProperty(SP.FORM_URL);
  try { 
   this.sheet = SpreadsheetApp.openByUrl(this.sheetURL);
  } catch (error) {
    this.sheet = null;
  }
}