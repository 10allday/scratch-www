const SeleniumHelper = require('./selenium-helpers.js');

const {
    clickText,
    findByXpath,
    clickXpath,
    clickButton,
    buildDriver
} = new SeleniumHelper();

let username = process.env.SMOKE_USERNAME;
let password = process.env.SMOKE_PASSWORD;
let rootUrl = process.env.ROOT_URL || 'https://scratch.ly';
let url = rootUrl + '/users/' + username;

let driver;

describe('www-smoke my-stuff', () => {
    beforeAll(() => {
        driver = buildDriver('www-smoke my-stuff');
    });

    beforeEach(() => {
        return driver.get(url)
            .then(() => clickText('Sign in'))
            .then(() => findByXpath('//input[@id="login_dropdown_username"]'))
            .then((element) => element.sendKeys(username))
            .then(() => findByXpath('//input[@name="password"]'))
            .then((element) => element.sendKeys(password))
            .then(() => clickButton('Sign in'));
    });

    afterEach(() => {
        return clickXpath('//span[@class="user-name dropdown-toggle"]')
            .then(() => clickXpath('//li[@id="logout"] '))
            .then(() => findByXpath('//div[@class="title-banner intro-banner"]'));
    });

    afterAll(() => {
        driver.quit();
    });


    test('Sign into Scratch using scratchr2 navbar', () => {
        findByXpath('//li[contains(@class, "logged-in-user")' +
            'and contains(@class, "dropdown")]/span')
            .then((element) => element.getText('span'))
            .then((text) => expect(text.toLowerCase()).toEqual(username.toLowerCase()));
    });
});
