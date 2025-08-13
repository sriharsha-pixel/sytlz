const { test } = require("@playwright/test");
const sections = require("../../pageObjects/UI_Pages/pageIndex");
const path = require("path");
require("dotenv").config();
const {
  readExcelData,
  writeExcelData,
} = require("../../utilities/readExcel.js");

test.describe("Login Tests", () => {
  test("Login using .env credentials", async ({ page }) => {
    const loginPage = new sections.LoginPage(test, page);
    await loginPage.launchingApplication([process.env.BASE_URL]);
    await loginPage.logInWithValidCredentials(
      [process.env.USER_EMAILID],
      [process.env.PASSWORD]
    );
  });

  test("Login with Excel data and store accountId and status in Excel", async ({
    page,
  }) => {
    const excelPath = path.resolve(__dirname, "../../test_Data/userData.xlsx");
    const testData = readExcelData(excelPath, "Sheet1");

    for (const index in testData) {
      const { Email, Password } = testData[index];
      const loginPage = new sections.LoginPage(test, page);
      await loginPage.launchingApplication([process.env.BASE_URL]);
      await loginPage.logInWithValidCredentials([Email], [Password]);
      const { accountId, accountStatus } = await loginPage.getAccountStatus();
      testData[index].AccountID = accountId;
      testData[index].AccountStatus = accountStatus;
      await loginPage.logout();
    }
    writeExcelData(excelPath, "Sheet1", testData);
  });
});
