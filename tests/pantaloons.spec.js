const { test, expect } = require("@playwright/test");
const sections = require("../pageObjects/UI_Pages/pageIndex");
const fs = require('fs');

require("dotenv").config();

let pantaloonsPage;

const mensCategories = [
    { name: 'T-Shirts', clickMethod: 'clickOnTshirtsLink' },
    { name: 'Formal_Shirts', clickMethod: 'clickOnFormalShirtsLink' },
    { name: 'Active_Wear', clickMethod: 'clickOnActiveWearLink' },
    { name: 'AW25_Styles', clickMethod: 'clickOnAW25StylesLink' },
    { name: 'Jeans', clickMethod: 'clickOnJeansLink' },
    { name: 'Suit_And_Blazers', clickMethod: 'clickOnSuitAndBlazersLink' },
    { name: 'Ethnic_Wear', clickMethod: 'clickOnEthnicWearLink' },
    { name: 'Trousers', clickMethod: 'clickOnTrousersLink' },
    { name: 'Casual_Shirts', clickMethod: 'clickOnCasualShirtsLink' },
];

const womensCategories = [
    { name: 'Women_T-Shirts', clickMethod: 'clickOnTshirtsLink' },
    { name: 'Women_Dresses', clickMethod: 'clickOnDressesLink' },
    { name: 'Women_Lounge_Wear', clickMethod: 'clickOnLoungeWearLink' },
    { name: 'Women_AW25_Styles', clickMethod: 'clickOnAW25StylesLink' },
    { name: 'Women_Jeans', clickMethod: 'clickOnJeansLink' },
    { name: 'Women_Tops', clickMethod: 'clickOnTopsLink' },
    { name: 'Women_Ethnic_Wear', clickMethod: 'clickOnEthnicWearLink' },
    { name: 'Women_Trousers', clickMethod: 'clickOnTrousersLink' },
    { name: 'Women_Shirts', clickMethod: 'clickOnShirtsLink' },
    { name: 'Women_Co-ord_Sets', clickMethod: 'clickOnCoOrdSetsLink' },
];

test.beforeAll(async ({ browser }) => {
    const page = await browser.newPage();
    pantaloonsPage = new sections.PantaloonsPage(test, page);

    const dataDir = "./test_Data";
    if (!fs.existsSync(dataDir)) {
        fs.mkdirSync(dataDir);
    }

    await pantaloonsPage.launchingApplication([process.env.baseURL]);
});


for (const category of mensCategories) {
    test(`Capture Men's ${category.name} Data`, async () => {
        await pantaloonsPage.clickOnMensApparelLink();
        await pantaloonsPage[category.clickMethod]();
        await pantaloonsPage.captureProductDetails(category.name);
    });
}

for (const category of womensCategories) {
    test(`Capture Women's ${category.name} Data`, async () => {
        await pantaloonsPage.clickOnWomensApparelLink();
        await pantaloonsPage[category.clickMethod]();
        await pantaloonsPage.captureProductDetails(category.name);
    });
}

test.afterAll(async () => {
    await pantaloonsPage.page.close();
});

