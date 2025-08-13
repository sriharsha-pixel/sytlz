const xlsx = require("xlsx");

function readExcelData(filePath, sheetName) {
  console.log(filePath);
  const workbook = xlsx.readFile(filePath);
  const worksheet = workbook.Sheets[sheetName];
  return xlsx.utils.sheet_to_json(worksheet);
}
function writeExcelData(filePath, sheetName, updatedData) {
  const worksheet = xlsx.utils.json_to_sheet(updatedData);
  const workbook = xlsx.utils.book_new();
  xlsx.utils.book_append_sheet(workbook, worksheet, sheetName);
  xlsx.writeFile(workbook, filePath);
}
module.exports = { readExcelData, writeExcelData };
