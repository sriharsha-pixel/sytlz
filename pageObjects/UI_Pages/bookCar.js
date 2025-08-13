const { excuteSteps } = require("../../utilities/actions");
const { test, expect } = require("@playwright/test");

exports.BookCar = class BookCar {

constructor(test,page){
this.test=test;
this.page=page;
this.pickupLocation=page.locator("//input[@placeholder='Location']");
this.location=page.locator("//p[text()='Long Island City']");
this.location1=page.locator("(//p[text()='Franklin Avenue'])");
this.saveBtn=page.locator("//button[text()='Save']");
this.searchBtn=page.locator("//img[@class='searchIcon']");
this.selectCar=page.locator("(//div[contains(@class, 'carsCardContainer')]//div[contains(@class, 'card')])[1]");
this.paynowBtn=page.locator("//div[text()='Pay Now']");
this.iunderstandBtn=page.locator("//button[text()='I Understand']");
this.noWalkthrBtn=page.locator("//button[text()='No']");
this.selectCardBtn=page.locator("(//div[contains(text(), 'Card Number')]/ancestor::div[contains(@class, 'cursorPointer')])[1]");
this.confirmPaymentBtn=page.locator("//button[text()='Confirm Payment']");
this.gotomyTripsBtn=page.locator("//button[text()='Go to My Trips']");
this.myTrips=page.locator("//div[text()='My Trips']");
this.noCars=page.locator("//p[contains(text(),'No cars available')]");
this.durationField=page.locator("//p[contains(@class, 'text-truncate') and contains(., 'AM')]");
this.availableFirstCar=page.locator("(//div[contains(@class,'carsCardContainer ')]/div)[1]")
}

clickOnAvailCar = async()=>{
    excuteSteps(this.test,this.availableFirstCar,"click",`Clicking on available car`);
};
scrollTillPaynow = async()=>{
    excuteSteps(this.test,this.paynowBtn,"scroll",`Scroll till the element if needed`);
};

scrollTillMyTrip = async()=>{
    excuteSteps(this.test,this.gotomyTripsBtn,"scroll",`Scroll till the element if needed`);
};
clickOnPickUpLocation = async ()=>{
    excuteSteps(this.test,this.pickupLocation,"click",`Click on Pick up location`);
};
clickOnLocation = async()=>{
    excuteSteps(this.test,this.location,"click",`Select Location pickup date and time`);
};

clickOnLocation1 = async()=>{
    excuteSteps(this.test,this.location1,"click",`Select Location pickup date and time`);
};

clickOnSaveBtn= async()=>{
    excuteSteps(this.test,this.saveBtn,"click",`Click on Save Button`);
};

clickOnSearchBTn=async()=>{
    excuteSteps(this.test,this.searchBtn,"click",`Click on Search button to check availability of cars`);
};

clickOnPayNowBtn=async()=>{
    excuteSteps(this.test,this.paynowBtn,"click",`Click on pay now button for booking`);
};

clickOnAckBtn=async()=>{
    excuteSteps(this.test,this.iunderstandBtn,"click",`Click on Acknowledge button`);
};

clickOnNoWalkthrBtn=async()=>{
    excuteSteps(this.test,this.noWalkthrBtn,"click",`Click on No walkthough`);
};

clickOnCard=async()=>{
    excuteSteps(this.test,this.selectCardBtn,"click",`Click on card for payment`);
};

clickOnConfirmPayBtn=async()=>{
    excuteSteps(this.test,this.confirmPaymentBtn,"click",`Click on card for payment`);
};

clickOnMyTrips=async()=>{
    excuteSteps(this.test,this.gotomyTripsBtn,"click",`Click on Go to My Trips Button`);
};

clickOnDuration = async()=>{
    excuteSteps(this.test,this.durationField,"click",`Click on duration field to select date`);
};

clickOnCar= async()=>{
    await this.page.waitForTimeout(parseInt(process.env.SMALL_WAIT));
    const status=await this.noCars.isVisible();
    if(status){
                for (let i = 2; i <= 30; i += 2) { 
                await this.clickOnDuration();
                const today = new Date();
                const date = new Date(today);
                date.setDate(today.getDate() + i);
                const formattedDate = date.toLocaleString('en-US', {
                    month: 'long',
                    day: 'numeric',
                    year: 'numeric'
                });
                console.log(formattedDate);
                const dateAriaLabel = `${formattedDate}`; 
                const dateButton = this.page.locator(`//abbr[@aria-label='${dateAriaLabel}']`);
                console.log(dateButton);
                await this.page.waitForTimeout(parseInt(process.env.SMALL_WAIT));
                const isVisible = await dateButton.isVisible();
                if (isVisible) {
                    await this.page.waitForTimeout(parseInt(process.env.SMALL_WAIT));
                    await dateButton.click();
                    await expect(this.saveBtn,"Verifing Save button is visible").toBeVisible();
                    await this.clickOnSaveBtn();
                    await this.page.waitForTimeout(parseInt(process.env.SMALL_WAIT));
                    await this.clickOnSearchBTn();
                    await this.page.waitForTimeout(parseInt(process.env.SMALL_WAIT));
                    const nocarAvailable = await this.noCars.isVisible().catch(() => false);
                    if (nocarAvailable) {
                    console.log(`Clicked on ${formattedDate}, but no cars available`);
                    continue;
                    } else {
                    await this.clickOnAvailCar();
                    break;
                    }
                }
                }
        }
        else{
         await this.clickOnAvailCar();   
        }
}

bookingCar = async()=>{
        await this.clickOnPickUpLocation();
        await this.page.waitForTimeout(parseInt(process.env.SMALL_WAIT));
        await expect(this.pickupLocation,"Verifying pickup location is visible").toBeVisible();
        await this.page.waitForTimeout(parseInt(process.env.SMALL_WAIT));
        await this.clickOnLocation();
        await this.page.waitForTimeout(parseInt(process.env.SMALL_WAIT));
        await expect(this.saveBtn,"Verifying save button is visible").toBeVisible();
        await this.clickOnSaveBtn();
        await this.page.waitForTimeout(parseInt(process.env.SMALL_WAIT));
        await this.clickOnSearchBTn();
        await this.clickOnCar();
        await this.page.waitForTimeout(parseInt(process.env.SMALL_WAIT));
        await this.scrollTillPaynow();
        await expect(this.paynowBtn,"Verifying pay now button is visible").toBeVisible();
        await this.clickOnPayNowBtn();
        await this.page.waitForTimeout(parseInt(process.env.SMALL_WAIT));
        await expect(this.iunderstandBtn,"Verifying I understand button is visible").toBeVisible();
        await this.clickOnAckBtn();
        await this.page.waitForTimeout(parseInt(process.env.SMALL_WAIT));
        await expect(this.noWalkthrBtn,"Verifying no walkthrough button is visible").toBeVisible();
        await this.clickOnNoWalkthrBtn();
        await this.page.waitForTimeout(parseInt(process.env.SMALL_WAIT));
        await expect(this.selectCardBtn,"Verify card is visible").toBeVisible();
        await this.clickOnCard();
        await expect(this.confirmPaymentBtn,"Verifying confirm payment button is visible").toBeVisible();
        await this.clickOnConfirmPayBtn();
        await this.scrollTillMyTrip();
        await expect(this.gotomyTripsBtn,"Verifying go to my trips button is visible").toBeVisible();
        await this.clickOnMyTrips();
        await this.page.waitForTimeout(parseInt(process.env.MEDIUM_WAIT));
        await expect(this.myTrips,"Verifying my trips button is visible").toContainText("My Trips");
}
}