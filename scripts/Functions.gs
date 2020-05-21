function toUpperStr(str) {
  return str.split(' ')
            .map(word => word[0].toUpperCase() + word.substr(1))
            .join(' ');
}

function convertTimeToReadableFormat(time) {
  const hours = (time.getHours() % 12) ? time.getHours() % 12 : 12;
  const minutes = time.toTimeString().split(":")[1];
  const period = Math.floor(time.getHours() / 12) ? "PM" : "AM";
  return `${hours}:${minutes} ${period}`; 
}

function convertDateToReadableFormat(date) {
  const date_tokens = date.toDateString().split(" ");
  const month = date_tokens[1];
  const day = date_tokens[2].replace(/^0+/g, ''); // trim leading zeros
  return `${month} ${day}${getDateSuffix(day)}`;
}

function getDateSuffix(day) {
  if (day % 10 == 1)
    return "st";
  else if (day % 10 == 2)
    return "nd";
  else if (day % 10 == 3)
    return "rd";
  else 
    return "th";
}

function saveSheetURLs() {
  let pointsSheetURL = interfaceSheet.getRange(INTERFACE.POINTS_URL).getValue();
  let formSheetURL = interfaceSheet.getRange(INTERFACE.FORM_URL).getValue();
  scriptProperties.setProperty(SP.POINTS_URL, pointsSheetURL);
  scriptProperties.setProperty(SP.FORM_URL, formSheetURL);
}

function setTriggers() {
  ScriptApp.newTrigger("publishNewEvent")
    .forSpreadsheet(SHEETS.FORM)
    .onFormSubmit()
    .create();
}

function deleteTriggers() {
  let allTriggers = ScriptApp.getProjectTriggers();
  allTriggers.forEach(trigger => {
    ScriptApp.deleteTrigger(trigger);                    
  });
}

