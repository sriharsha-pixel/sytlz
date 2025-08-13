const fs = require("fs");
const path = require("path");

function clearAllureResultsFolder() {
  const resultsPath = path.join(__dirname, "allure-results");

  if (fs.existsSync(resultsPath)) {
    try {
      fs.rmSync(resultsPath, { recursive: true, force: true });
      console.log("🔥 Cleared the allure-results folder.");
    } catch (error) {
      console.error("❌ Error clearing allure-results folder:", error);
    }
  } else {
    console.log("⚠️ allure-results folder not found. Skipping deletion.");
  }
}

module.exports = async () => {
  clearAllureResultsFolder();
};
