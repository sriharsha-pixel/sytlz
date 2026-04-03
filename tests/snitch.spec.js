const { test } = require("@playwright/test");
const sections = require("../pageObjects/UI_Pages/pageIndex");
const fs = require("fs");
require("dotenv").config();

const categories = [
    "New", "Shirts", "T-Shirts", "Jeans", "Trousers", "Overshirt", "Cargo Pants",
    "Sweaters", "Hoodies & Sweatshirts", "Shorts", "Joggers", "Jackets",
    "Streetwear", "Footwear", "Plus Size", "Snitch Luxe"
];

const dataDir = "./test_Data";
if (!fs.existsSync(dataDir)) fs.mkdirSync(dataDir);

for (const category of categories) {
    test.describe.parallel(`Category: ${category}`, () => {
        test.only(`Scrape ${category}`, async ({ browser }) => {
            const page = await browser.newPage();
            const snitchPage = new sections.SnitchPage(test, page);
            await snitchPage.launchingApplication([process.env.snitchURL]);
            await snitchPage.captureProductDetails(category);
            await page.close();
        });
    });
}
