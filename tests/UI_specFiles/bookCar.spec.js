const { test, expect } = require("@playwright/test");
const sections = require("../../pageObjects/UI_Pages/pageIndex");
require("dotenv").config();

  test("Booking car", async ({ page }) => {
    const loginPage = new sections.LoginPage(test, page);
    const bookCar=new sections.BookCar(test,page);
    await loginPage.launchingApplication([process.env.BASE_URL]);
    await loginPage.logInWithValidCred(
      [process.env.USER_EMAILID],
      [process.env.PASSWORD]
    );
    await bookCar.bookingCar();
  });

  test("Booking car by changing location", async ({ page }) => {
    const loginPage = new sections.LoginPage(test, page);
    const bookCar=new sections.BookCar(test,page);
    await loginPage.launchingApplication([process.env.BASE_URL]);
    await loginPage.logInWithValidCred(
      [process.env.USER_EMAILID],
      [process.env.PASSWORD]
    );
    await page.waitForTimeout(parseInt(process.env.SMALL_WAIT));
    await expect(bookCar.pickupLocation,"Verifying pickup location is visile").toBeVisible();
    await bookCar.clickOnPickUpLocation();
    await page.waitForTimeout(parseInt(process.env.SMALL_WAIT));
    await expect(bookCar.location1,"Verifying if location is present").toBeVisible();
    await bookCar.clickOnLocation1();
    await page.waitForTimeout(parseInt(process.env.SMALL_WAIT));
    await expect(bookCar.saveBtn,"Verifying if Save button is visible").toBeVisible();
    await bookCar.clickOnSaveBtn();
    await page.waitForTimeout(parseInt(process.env.SMALL_WAIT));
    await expect(bookCar.searchBtn,"Verifying if search button is visible").toBeVisible();
    await bookCar.clickOnSearchTn();
    await page.waitForTimeout(parseInt(process.env.SMALL_WAIT));
    });
