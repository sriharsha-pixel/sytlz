const { excuteSteps } = require("../../utilities/actions");
const { highlightElement } = require("../../utilities/highlight_element");
exports.LoginPage = class LoginPage {
  constructor(test, page) {
    this.test = test;
    this.page = page;
    this.loginBtn = page.locator("//div[text()='Log in']");
    this.emailInputField = page.locator("//input[@id='email']");
    this.passwordInputField = page.locator("//input[@id='password']");
    this.submitBtn = page.locator("//button[@type='submit']");
    this.hamburgerMenuIcon = page.locator("//img[@alt='toggleAccountIcon']");
    this.profileName = page.locator(
      "(//div[@class='borderNavbarProfile']/div[2])"
    );
    this.navbarBtn = page.locator("//img[@alt='toggleAccountIcon']");
    this.logoutBtn = page.locator("//div/span[text()='Logout']");
    this.accountBtn = page.locator("//span[text()='Account']");
    this.accountIdField = page.locator(
      "//div[text()='Account ID']/following-sibling::div"
    );
    this.accountStatusField = page.locator(
      "//div[text()='Account Status']/following-sibling::div"
    );
  }
  launchingApplication = async (baseUrl) => {
    await excuteSteps(
      this.test,
      await this.page,
      "navigate",
      `Launch the Joulez sign-in webpage`,
      baseUrl
    );
  };
  clickOnLoginButton = async () => {
    await excuteSteps(
      this.test,
      this.loginBtn,
      "click",
      `Click on Login button`
    );
  };
  EnterUserEmail = async (email) => {
    await excuteSteps(
      this.test,
      this.emailInputField,
      "fill",
      `Enter the user's email address in the email input field.`,
      email
    );
  };
  EnterPassword = async (pwd) => {
    await excuteSteps(
      this.test,
      this.passwordInputField,
      "fill",
      `Enter the user's password in the password input field`,
      pwd
    );
  };
  clickOnSubmitButton = async () => {
    await excuteSteps(
      this.test,
      this.submitBtn,
      "click",
      `Click on submit button`
    );
  };
  clickOnHamburgerMenuIcon = async () => {
    await excuteSteps(
      this.test,
      this.hamburgerMenuIcon,
      "click",
      `Click on the HamburgerMenuIcon`
    );
  };
  clickOnnavbarButton = async () => {
    await excuteSteps(
      this.test,
      this.navbarBtn,
      "click",
      `Click on navbar button`
    );
  };
  clickOnLogoutButton = async () => {
    await excuteSteps(
      this.test,
      this.logoutBtn,
      "click",
      `Click on logout button`
    );
  };
  clickOnAccountButton = async () => {
    await excuteSteps(
      this.test,
      this.accountBtn,
      "click",
      `Click on account button`
    );
  };
  logInWithValidCred = async (email, pwd) => {
    await this.test.step("Wait for 2 seconds for page loading", async () => {
      await this.page.waitForTimeout(parseInt(process.env.SMALL_WAIT));
    });
    await this.clickOnLoginButton();
    await this.test.step("Wait for 2 seconds for page loading", async () => {
      await this.page.waitForTimeout(parseInt(process.env.SMALL_WAIT));
    });
    
    await this.EnterUserEmail(email);
    await this.test.step("Wait for 2 seconds for page loading", async () => {
      await this.page.waitForTimeout(parseInt(process.env.SMALL_WAIT));
    });
    await this.EnterPassword(pwd);
    await this.test.step("Wait for 2 seconds for page loading", async () => {
      await this.page.waitForTimeout(parseInt(process.env.SMALL_WAIT));
    });
    await this.clickOnSubmitButton();
    await this.test.step("Wait for 2 seconds for page loading", async () => {
      await this.page.waitForTimeout(parseInt(process.env.SMALL_WAIT));
    });
  };


  logInWithValidCredentials = async (email, pwd) => {
    await this.test.step("Wait for 2 seconds for page loading", async () => {
      await this.page.waitForTimeout(parseInt(process.env.SMALL_WAIT));
    });
    await highlightElement(this.page, this.loginBtn);
    await this.clickOnLoginButton();
    await this.test.step("Wait for 2 seconds for page loading", async () => {
      await this.page.waitForTimeout(parseInt(process.env.SMALL_WAIT));
    });
    await highlightElement(this.page, this.emailInputField);
    await this.EnterUserEmail(email);
    await this.test.step("Wait for 2 seconds for page loading", async () => {
      await this.page.waitForTimeout(parseInt(process.env.SMALL_WAIT));
    });
    await highlightElement(this.page, this.passwordInputField);
    await this.EnterPassword(pwd);
    await this.test.step("Wait for 2 seconds for page loading", async () => {
      await this.page.waitForTimeout(parseInt(process.env.SMALL_WAIT));
    });
    await highlightElement(this.page, this.submitBtn);
    await this.clickOnSubmitButton();
    await this.test.step("Wait for 2 seconds for page loading", async () => {
      await this.page.waitForTimeout(parseInt(process.env.SMALL_WAIT));
    });
    await highlightElement(this.page, this.hamburgerMenuIcon);
    await this.clickOnHamburgerMenuIcon();
    await this.test.step("Wait for 2 seconds for page loading", async () => {
      await this.page.waitForTimeout(parseInt(process.env.SMALL_WAIT));
    });
    await this.clickOnHamburgerMenuIcon();
  };
  logout = async () => {
    await this.clickOnHamburgerMenuIcon();
    await this.clickOnLogoutButton();
  };
  getAccountStatus = async () => {
    await this.clickOnHamburgerMenuIcon();
    await this.clickOnAccountButton();
    let accountId = await this.accountIdField.innerText();
    let accountStatus = await this.accountStatusField.innerText();
    return { accountId, accountStatus };
  };
};
