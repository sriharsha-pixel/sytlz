const { excuteSteps } = require("../../utilities/actions");
const fs = require("fs");

exports.SnitchPage = class SnitchPage {
  constructor(test, page) {
    this.test = test;
    this.page = page;
    this.menuBar = page.locator("(//*[name()='svg'])[1]");
    this.productBrandLabels = page.locator("//h2/preceding::a[1]");
    this.productTitleLabel = page.locator(
      "//div[contains(@class,'flex justify-between items-center mb')]/h1"
    );
    this.productSizesLabel = page.locator("//h1[text()='SIZES']/parent::div//span//span");
    this.priceLabel = page.locator(
      "//div[contains(@class,'flex justify-between items-center mb')]/div/p"
    );
    this.descriptionLabel = page.locator("//p[text()='Details']/following::p[1]");
    this.sizeFitLabel = page.locator("//p[contains(text(),'Fit -')]");
    this.imageLabel = page.locator(
      "//div[@class='relative']//div[contains(@class,'flex-1 flex items-center')]//img"
    );
    this.ratingsLabel = page.locator("//button[text()='Style Reviews']/following::span[1]");
    this.reviewsLabel = page.locator("//span[contains(text(),'Review')]/preceding::span[1]");
    this.occasionLabel = page.locator("//p[text()='Specification']/following-sibling::p[1]");
    this.patternLabel = page.locator("//p[text()='Specification']/following-sibling::p[2]");
    this.fabricLabel = page.locator("//p[text()='Specification']/following-sibling::p[4]");
    this.subCategoryLabel = page.locator("//p[text()='Specification']/following-sibling::p[3]");
  };

  launchingApplication = async (baseUrl) => {
    await excuteSteps(this.test, this.page, "navigate", "Navigate to the Snitch URL", baseUrl);
  };

  clickOnMenuBar = async () => {
    await excuteSteps(this.test, this.menuBar, "click", "Clicking on menu bar");
  };

  clickOnCategoryType = async (categoryName) => {
    await excuteSteps(this.test, categoryName, "click", `Clicking on ${categoryName} Link`);
  };

  getProductTitle = async (titleLocator) => {
    const productTitle = await titleLocator.innerText();
    return productTitle;
  };

  getProductSizes = async (sizeLocator) => {
    const sizesElement = await sizeLocator.all();
    const sizes = [];
    for (let j = 0; j < sizesElement.length; j++) {
      const sizeText = await sizesElement[j].innerText();
      sizes.push(sizeText.trim());
    }
    return sizes;
  };

  getProductPrice = async (priceLocator) => {
    const priceElements = await priceLocator.all();
    for (let i = 0; i < priceElements.length; i++) {
      const style = await priceElements[i].getAttribute('style');
      if (!style || !style.includes('text-decoration-line: line-through')) {
        const discountedPrice = await priceElements[i].innerText();
        return parseFloat(discountedPrice.replace(/[₹,]/g, '').trim());
      };
    };
    const regularPrice = await priceElements[0].innerText();
    return parseFloat(regularPrice.replace(/[₹,]/g, '').trim());
  };

  getProductDescription = async (descLocator) => {
    const productDescription = await descLocator.innerText();
    return productDescription;
  };

  getFitType = async (sizeFitLocator) => {
    try {
      const count = await sizeFitLocator.count();
      if (count === 0) {
        return [];
      }
      if (!(await sizeFitLocator.isVisible())) {
        return [];
      }
      let fitType = await sizeFitLocator.innerText();
      const match = fitType.match(/Fit - (.*?)(?: |$)/);
      if (match && match[1]) {
        return [match[1].trim()];
      } else {
        return [fitType.trim()];
      }
    } catch (e) {
      return [];
    }
  };

  getImageUrl = async (imageLocator) => {
    return await imageLocator.getAttribute('src');
  };

  getRatingOutOfFive = async () => {
    try {
      const count = await this.ratingsLabel.count();
      if (count === 0) {
        return "0";
      }
      if (!(await this.ratingsLabel.isVisible())) {
        return "0";
      }
      let rating = await this.ratingsLabel.innerText();
      rating = rating.trim();
      const match = rating.match(/([\d.]+)/);
      if (match && match[1]) {
        return match[1];
      }
      return rating;
    } catch (error) {
      return "0";
    }
  };

  getReviewsCount = async () => {
    try {
      const count = await this.reviewsLabel.count();
      if (count === 0) {
        return "0";
      }
      if (!(await this.reviewsLabel.isVisible())) {
        return "0";
      }
      let reviewsCount = await this.reviewsLabel.innerText();
      reviewsCount = reviewsCount.trim();
      const match = reviewsCount.match(/(\d+)/);
      if (match && match[1]) {
        return match[1];
      }
      return "0"
    } catch (error) {
      return "0";
    }
  };

  getOccasion = async () => {
    try {
      const count = await this.occasionLabel.count();
      if (count === 0) {
        return [];
      }
      if (!(await this.occasionLabel.isVisible())) {
        return [];
      }
      let text = await this.occasionLabel.innerText();
      text = text.trim();
      if (!text) {
        return [];
      }
      const parts = text
        .split(/[,|/]/)
        .map(v => v.trim())
        .filter(v => v.length > 0);
      return parts.length ? parts : [];
    } catch (err) {
      return [];
    }
  };

  getPattern = async () => {
    try {
      const count = await this.patternLabel.count();
      if (count === 0) return [];
      if (!(await this.patternLabel.isVisible())) return [];
      let text = await this.patternLabel.innerText();
      text = text.trim();
      if (!text) return [];
      const parts = text.split(/[,|/]/).map(v => v.trim()).filter(v => v.length > 0);
      return parts.length ? parts : [];
    } catch {
      return [];
    }
  };

  getFabric = async () => {
    try {
      const count = await this.fabricLabel.count();
      if (count === 0) return [];
      if (!(await this.fabricLabel.isVisible())) return [];
      let text = await this.fabricLabel.innerText();
      text = text.trim();
      if (!text) return [];
      const parts = text.split(/[,|/]/).map(v => v.trim()).filter(v => v.length > 0);
      return parts.length ? parts : [];
    } catch {
      return [];
    }
  };

  getSubCategory = async () => {
    try {
      const count = await this.subCategoryLabel.count();
      if (count === 0) return [];
      if (!(await this.subCategoryLabel.isVisible())) return [];
      let text = await this.subCategoryLabel.innerText();
      text = text.trim();
      if (!text) return [];
      const parts = text.split(/[,|/]/).map(v => v.trim()).filter(v => v.length > 0);
      return parts.length ? parts : [];
    } catch {
      return [];
    }
  };

  captureProductDetails = async (category) => {
    const productDetails = [];
    await this.menuBar.waitFor({ state: "visible" });
    await this.clickOnMenuBar();
    const categoryName = this.page.locator(`//span[normalize-space()='${category}']`);
    try {
      await categoryName.waitFor({ state: "visible", timeout: 5000 });
    } catch {
      console.log("Skipping category:", category);
      return;
    }
    const masterCategory = await categoryName.innerText();
    await this.clickOnCategoryType(categoryName);
    const brandLabels = await this.productBrandLabels.all();
    for (let i = 0; i < 50; i++) {
      await brandLabels[i].click();
      await this.page.waitForTimeout(parseInt(process.env.largeWait));
      const productUrl = this.page.url();
      const title = await this.getProductTitle(this.productTitleLabel);
      const sizes = await this.getProductSizes(this.productSizesLabel);
      const image = await this.getImageUrl(this.imageLabel);
      const price = await this.getProductPrice(this.priceLabel);
      const desc = await this.getProductDescription(this.descriptionLabel);
      const fit = await this.getFitType(this.sizeFitLabel);
      const sub = await this.getSubCategory();
      const rating = await this.getRatingOutOfFive();
      const rev = await this.getReviewsCount();
      const occ = await this.getOccasion();
      const pat = await this.getPattern();
      const fab = await this.getFabric();
      productDetails.push({
        source: process.env.snitchURL,
        base_url: process.env.snitchURL,
        title: title,
        product_url: productUrl,
        price: price,
        currency: "INR",
        brand: "SNITCH",
        sizes: sizes,
        image_url: image,
        images_list: image || [],
        gender: ["M"],
        raw_colours: [],
        colours: [],
        master_category: masterCategory,
        category: fit || [],
        sub_category: sub,
        fabric: fab.length > 0 ? fab : sub,
        occasion: occ,
        pattern: pat,
        ratings: rating,
        review_count: rev,
        description: desc
      });
      await this.page.goBack();
      await brandLabels[i].waitFor({ state: "visible" });
    }
    await this.saveProductDetailsToFile(productDetails, category);
  };
  saveProductDetailsToFile = async (prodDetails, category) => {
    const categoryName = category.replace(/\s+/g, "_");
    const filePath = `./test_Data/snitch_${categoryName}.json`;
    fs.writeFileSync(filePath, JSON.stringify(prodDetails, null, 2));
  };
};
