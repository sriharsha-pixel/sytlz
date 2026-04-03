const { excuteSteps } = require("../../utilities/actions");
const fs = require("fs");

exports.PantaloonsPage = class PantaloonsPage {
  constructor(test, page) {
    this.test = test;
    this.page = page;
    this.mensApparelLink = page.locator("(//span[text()='MEN'])[2]");
    this.womensApparelLink = page.locator("(//span[text()='WOMEN'])[2]");
    this.aW25StylesLink = page.locator("//p[text()='AW25 Styles']");
    this.tshirtsLink = page.locator("//p[text()='T-Shirts']");
    this.ethnicWearLink = page.locator("//p[text()='Ethnic Wear']");
    this.formalShirtsLink = page.locator("//p[text()='Formal Shirts']");
    this.activeWearLink = page.locator("//p[text()='Active Wear']");
    this.suitAndBlazersLink = page.locator("//p[text()='Suit & Blazers']");
    this.sunglassesLink = page.locator("//p[text()='Sunglasses']");
    this.jeansLink = page.locator("//p[text()='Jeans']");
    this.trousersLink = page.locator("//p[text()='Trousers']");
    this.casualShirtsLink = page.locator("//p[text()='Casual Shirts']");
    this.dressesLink = page.locator("//p[text()='Dresses']");
    this.loungeWearLink = page.locator("//p[text()='Lounge Wear']");
    this.shirtsLink = page.locator("//p[text()='Shirts']");
    this.topsLink = page.locator("//p[text()='Tops']");
    this.coOrdSetsLink = page.locator("//p[text()='Co-ord Sets']");
    this.productBrandLabels = page.locator("//div[contains(@class,'product-brand')]");
    this.loadMore = page.locator("//div[text()='LOAD MORE']");
    this.pantaloonsLogo = page.locator("//span[@class='logoIcon']");
  }

  launchingApplication = async (baseUrl) => {
    await excuteSteps(this.test, this.page, "navigate", "Navigate to the Pantaloons URL", baseUrl);
  };

  clickOnMensApparelLink = async () => {
    await excuteSteps(this.test, this.mensApparelLink, "click", "Clicking on Men's Apparel link");
  };

  clickOnWomensApparelLink = async () => {
    await excuteSteps(this.test, this.womensApparelLink, "click", "Clicking on Women's Apparel link");
  };

  clickOnAW25StylesLink = async () => {
    await excuteSteps(this.test, this.aW25StylesLink, "click", "Clicking on Autumn Winter 2025 Styles");
  };

  clickOnTshirtsLink = async () => {
    await excuteSteps(this.test, this.tshirtsLink, "click", "Clicking on T-shirts");
  };

  clickOnEthnicWearLink = async () => {
    await excuteSteps(this.test, this.ethnicWearLink, "click", "Clicking on Ethnic Wear");
  };

  clickOnFormalShirtsLink = async () => {
    await excuteSteps(this.test, this.formalShirtsLink, "click", "Clicking on Formal Shirts");
  };

  clickOnActiveWearLink = async () => {
    await excuteSteps(this.test, this.activeWearLink, "click", "Clicking on Active Wear");
  };

  clickOnSuitAndBlazersLink = async () => {
    await excuteSteps(this.test, this.suitAndBlazersLink, "click", "Clicking on Suit & Blazers");
  };

  clickOnJeansLink = async () => {
    await excuteSteps(this.test, this.jeansLink, "click", "Clicking on Jeans");
  };

  clickOnTrousersLink = async () => {
    await excuteSteps(this.test, this.trousersLink, "click", "Clicking on Trousers");
  };

  clickOnCasualShirtsLink = async () => {
    await excuteSteps(this.test, this.casualShirtsLink, "click", "Clicking on Casual Shirts");
  };

  clickOnDressesLink = async () => {
    await excuteSteps(this.test, this.dressesLink, "click", "Clicking on Dresses");
  };

  clickOnLoungeWearLink = async () => {
    await excuteSteps(this.test, this.loungeWearLink, "click", "Clicking on Lounge Wear");
  };

  clickOnShirtsLink = async () => {
    await excuteSteps(this.test, this.shirtsLink, "click", "Clicking on Shirts");
  };

  clickOnTopsLink = async () => {
    await excuteSteps(this.test, this.topsLink, "click", "Clicking on Tops");
  };

  clickOnCoOrdSetsLink = async () => {
    await excuteSteps(this.test, this.coOrdSetsLink, "click", "Clicking on Co-ord Sets");
  };

  clickOnLoadMore = async () => {
    await excuteSteps(this.test, this.loadMore, "click", "Clicking on Load More");
  };

  captureProductDetails = async (categoryName) => {
    let allProductDetails = [];
    let processedBrandLabelsCount = 0;
    for (let j = 0; j < 1; j++) {
      await this.page.waitForTimeout(parseInt(process.env.mediumWait));
      const brandLabels = await this.productBrandLabels.all();
      if (brandLabels.length <= processedBrandLabelsCount) {
        console.log("No new products to process. Exiting...");
        break;
      }
      for (let i = processedBrandLabelsCount; i < brandLabels.length; i++) {
        const [newPage] = await Promise.all([
          this.page.context().waitForEvent('page'),
          brandLabels[i].click(),
        ]);
        console.log(`Processing product ${i + 1} of ${brandLabels.length}`);
        try {
          await newPage.waitForLoadState('domcontentloaded', { timeout: 10000 });
          const response = await newPage.waitForResponse(
            (res) => res.url().includes("aop_get_newfeedinfo.php"), // API response URL
            { timeout: 10000 }
          );
          const json = await response.json();
          const productDetails = this.extractDetailsFromAPIResponse(json);
          allProductDetails.push(productDetails);
        } catch (err) {
          console.warn(`Skipping brand ${i + 1}:`, err.message);
        } finally {
          if (!newPage.isClosed()) await newPage.close().catch(() => { });
        }
      }
      processedBrandLabelsCount = brandLabels.length;
      const isVisible = await this.loadMore.isVisible();
      if (isVisible) {
        await this.clickOnLoadMore();
        await this.page.waitForTimeout(parseInt(process.env.smallWait));
      } else {
        console.log(`No more products available for the category '${categoryName}'`);
        break;
      }
    }
    this.saveProductDetailsToFile(allProductDetails, categoryName);
    await this.pantaloonsLogo.click();
  };

  formatBrandName = (brand) => {
    if (!brand) return "";
    return brand
      .replace(/\+/g, " ")
      .split(" ")
      .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
      .join(" ");
  };

  formatCategory = (catString) => {
    if (!catString) return "";
    return catString
      .replace(/\+/g, " ")
      .trim();
  };

  extractDetailsFromAPIResponse = (apiResponse) => {
    const product = apiResponse[0];
    const title = product.title ? product.title.replace(/\+/g, ' ') : "";
    const productUrl = product.link2page || "";
    const price = parseFloat(product.valueofitem) || 0.0;
    const gender = product.gender || "Unisex";
    const currency = "INR";
    const fabric = product.cloth_type && product.cloth_type !== "0" ? product.cloth_type : "Cotton";
    const occasion = ["Casual"];
    const pattern = "Solid";
    const brand = this.formatBrandName(product.brand);
    const imageUrl = product.path_to_picture || "";
    const imagesList = product.path_to_picture;
    const ratings = product.ratings ? product.ratings : "No Ratings Till Now";
    const reviewCount = product.review_count ? product.reviewCount : 0;
    const sizes = product.sizes_for_ids
      ? product.sizes_for_ids.split(";").map(s => s.trim()).filter(Boolean)
      : [];
    const sizesInStock = product.sizes_in_stock
      ? product.sizes_in_stock.split(";").map(s => s.trim()).filter(Boolean)
      : [];
    const sizesOutOfStock = product.sizes_not_in_stock
      ? product.sizes_not_in_stock.split(";").map(s => s.trim()).filter(Boolean)
      : [];
    const colors = product.colour
      ? product.colour.split(",").map(c => c.trim()).filter(Boolean)
      : [];
    const masterCat = product.category ? this.formatCategory(product.category) : "";
    const subCats = product.subcategory
      ? product.subcategory.split("+").map(s => this.formatCategory(s)).filter(Boolean)
      : [];
    const description = product.description ? product.description : "No Description Available";

    return {
      source: process.env.baseURL,
      base_url: process.env.baseURL,
      title: title,
      product_url: productUrl,
      price: price,
      currency: currency,
      brand: brand,
      sizes: sizes,
      sizes_in_stock: sizesInStock,
      sizes_not_in_stock: sizesOutOfStock,
      image_url: imageUrl,
      images_list: [imagesList],
      gender: gender,
      raw_colours: colors,
      colours: colors,
      master_category: masterCat ? [masterCat] : [],
      category: subCats.length > 0 ? [subCats[0]] : [],
      sub_category: subCats.length > 1 ? subCats.slice(1) : [],
      fabric: fabric,
      occasion: occasion,
      pattern: pattern,
      ratings: ratings,
      review_count: reviewCount,
      description: description
    };
  };

  saveProductDetailsToFile = (data, categoryName) => {
    const filePath = `./test_Data/${categoryName}_Data.json`;
    if (fs.existsSync(filePath)) {
      let existingData = JSON.parse(fs.readFileSync(filePath, "utf-8"));
      if (!Array.isArray(existingData)) {
        console.warn("Existing data is not an array, initializing as an empty array.");
        existingData = [];
      }
      existingData.push(...data);
      fs.writeFileSync(filePath, JSON.stringify(existingData, null, 2));
    } else {
      fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
    }
  };

};
