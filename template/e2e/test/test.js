var assert = require('assert');
var moment = require('moment');
var axios = require('axios');
const {Builder, By, until} = require('selenium-webdriver');
const {allCTAs} = require('./ctas');

const args = process.argv;

let ctas = allCTAs.android;
let isIos = false;
let isLocal = false;
let passed = true;
let reason = 'Test passed';

if (args.includes('--ios')) {
  isIos = true;
  ctas = allCTAs.ios;
}

if (args.includes('--local')) {
  isLocal = true;
}

var buildDriver = function () {
  var capabilities = {
    autoGrantPermissions: 'true',
    autoAcceptAlerts: 'true',
    autoGrantPermissions: 'true',
    'appium:options': {
      autoGrantPermissions: true,
    },
  };

  return new Builder()
    .usingServer('http://127.0.0.1:4723/wd/hub')
    .withCapabilities(capabilities)
    .build();
};

async function bstackLocalTest() {
  let driver = buildDriver();

  const details = await driver.executeScript(
    'browserstack_executor: {"action": "getSessionDetails"}',
  );

  const {public_url, created_at, device, build_name, os_version} =
    JSON.parse(details) || {};

  driver.executeScript(
    `browserstack_executor: {"action": "annotate", "arguments": {"data": "Args: ${args}","level": "<info>"}}`,
  );
  /*
  driver.executeScript(
    `browserstack_executor: {"action": "annotate", "arguments": {"data": "Details: ${details}","level": "<info>"}}`
  );
  */
  driver.executeScript(
    `browserstack_executor: {"action": "annotate", "arguments": {"data": "public_url: ${public_url}","level": "<info>"}}`,
  );
  driver.executeScript(
    `browserstack_executor: {"action": "annotate", "arguments": {"data": "created_at: ${created_at.substring(
      13,
      15,
    )}","level": "<info>"}}`,
  );

  try {
    if (!isIos) {
      try {
        await driver.sleep(3000);
        await driver
          .wait(until.elementLocated(By.xpath(ctas.allowBtn)), 5000)
          .click();
        await driver.sleep(1000);
      } catch (error) {}
    }

    if (isIos) {
      /*
      await driver.executeScript(
        `browserstack_executor: {"action": "updateIosDeviceSettings", "arguments": {"customTime" : "${moment().format(
          "HH:mm"
        )}"}}`
      );
      */
    } else {
      await driver.executeScript(
        `browserstack_executor: {"action": "updateAndroidDeviceSettings", "arguments": {"customTime" : "${moment().format(
          'HH:mm',
        )}"}}`,
      );
    }

    await driver.sleep(2000);

    await driver.wait(until.elementLocated(By.xpath(ctas.logo)), 5000).click();

    //const img = await driver.findElement(By.xpath(ctas.logo));
    //img.click();
    //await driver.sleep(200);
    //img.click();

    var pinInput = await driver.wait(
      until.elementLocated(By.xpath(ctas.pinInput), 30000),
    );
    await pinInput.sendKeys(
      isIos
        ? `${moment().format('mm')}${created_at.substring(11, 13)}`
        : `${moment().format('mmHH')}`,
    );
    await driver.sleep(2000);

    await driver
      .wait(until.elementLocated(By.xpath(ctas.developmentBtn)), 5000)
      .click();
    await driver.sleep(2000);
    await driver
      .wait(until.elementLocated(By.xpath(ctas.patientBtn)), 15000)
      .click();

    await driver.sleep(2000);
    await driver
      .wait(until.elementLocated(By.xpath(ctas.loginBtn)), 5000)
      .click();
    await driver.sleep(2000);

    var emailInput = await driver.wait(
      until.elementLocated(By.xpath(ctas.emailInput), 5000),
    );
    await emailInput.sendKeys('email');
    await driver.sleep(2000);

    var passwordInput = await driver.wait(
      until.elementLocated(By.xpath(ctas.passwordInput), 30000),
    );
    await passwordInput.sendKeys('password');
    await driver.sleep(2000);

    await driver
      .wait(until.elementLocated(By.xpath(ctas.loginBtn2)), 30000)
      .click();

    await driver.sleep(5000);

    let title = await driver.wait(
      until.elementLocated(By.xpath(ctas.welcomeTitle)),
      30000,
    );

    if (title === null) {
      passed = false;
      reason = "Can't find welcome message after login";
    } else {
      let titleText = await title.getText();

      driver.executeScript(
        `browserstack_executor: {"action": "annotate", "arguments": {"data": "Text: ${titleText}","level": "<info>"}}`,
      );

      if (!isIos && titleText !== 'Welcome, Marko') {
        passed = false;
        reason = `Welcome message wrong: ${titleText}`;
      } else {
        await driver
          .wait(until.elementLocated(By.xpath(ctas.menuProfile)), 30000)
          .click();
        await driver.sleep(2000);
        await driver
          .wait(until.elementLocated(By.xpath(ctas.menuSettings)), 30000)
          .click();
        await driver.sleep(2000);
        await driver
          .wait(until.elementLocated(By.xpath(ctas.menuHome)), 30000)
          .click();
        await driver.sleep(2000);
        await driver
          .wait(until.elementLocated(By.xpath(ctas.menuDocs)), 30000)
          .click();
        await driver.sleep(2000);

        await driver.actions().sendKeys('1').perform();
        await driver.actions().sendKeys('2').perform();
        await driver.actions().sendKeys('3').perform();
        await driver.actions().sendKeys('4').perform();

        await driver
          .wait(until.elementLocated(By.xpath(ctas.docsPinSubmit)), 30000)
          .click();

        await driver.sleep(5000);
        await driver
          .wait(until.elementLocated(By.xpath(ctas.menuBtnAdd)), 30000)
          .click();
        await driver.sleep(5000);
      }
    }
  } catch (e) {
    passed = false;
    reason = 'Something wen wrong';
  } finally {
    let screenshot = await driver.takeScreenshot();

    /*
    await axios.post(
      'https://slack.com/api/chat.postMessage',
      {
        channel: 'chanel ID',
        text: `${
          passed ? 'PASSED:' : 'FAILED:'
        } ${device} ${os_version} ${build_name} ${public_url}`,
      },
      {
        headers: {
          Authorization: `Bearer token`,
          'Content-Type': 'application/json; application/x-www-form-urlencoded',
        },
      },
    );
    */

    await driver.executeScript(
      `browserstack_executor: {"action": "setSessionStatus", "arguments": {"status":"${
        passed ? 'passed' : 'failed'
      }","reason": "${reason}"}}`,
    );

    if (driver) {
      await driver.quit();
    }
  }
}

bstackLocalTest();
