const { Builder, By, until } = require('selenium-webdriver');
const { default: createDriver } = require('./driver');


const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));
async function taskTest(title,description) {
  // Create a new browser instance (Chrome)
//   const driver = await new Builder().forBrowser('chrome').build();
  const driver = await createDriver({headless:true});


  try {
    // Navigate to login page
    sleep(5000)
    await driver.get('http://localhost:3000/login'); // 🔁 Replace with your login page URL
    // await console.log("Arrived to login page...")

    // Wait until the email input is present
    await driver.wait(until.elementLocated(By.id('email')), 10000);
    // console.log("Login form detected...")


    // Fill in credentials
    await driver.findElement(By.id('email')).sendKeys('laboy.swe@gmail.com');
    // await sleep(1000)
    await driver.findElement(By.id('password')).sendKeys('Diego');
    // await sleep(1000)
    // console.log("Entered credentials...")
    


    // Click login button
    await driver.findElement(By.css('button[type="submit"]')).click();
    // await sleep(1000)
    // console.log("Login button pressed...")

    


    // Wait for dashboard or expected redirect
    await driver.wait(until.urlContains('/dashboard'), 10000); // Adjust to match your app
    // await sleep(1000)
    // console.log("Login Successfull, seeing dashboard page...")


    await driver.findElement(By.id('new_task')).click();
    // await sleep(1000)
    // console.log("Arrived to new task page...")


    await driver.findElement(By.id('title')).sendKeys(title);
    // await sleep(1000)
    // console.log("Entered title...")

    await driver.findElement(By.id('description')).sendKeys(description);
    // await sleep(1000)
    // console.log("Entered description...")


    // Click login button
    await driver.findElement(By.css('button[type="submit"]')).click();
    // await sleep(5000);
    // console.log("Created task...")


    // Delete task created
    await driver.findElement(By.id('delete_modal')).click();
    // await sleep(5000);
    // console.log("Am I sure I want to delete this task? Yes...")


    await driver.findElement(By.id('delete_button')).click();
    // await sleep(5000);
    // console.log("Task deleted")


    // console.log('✅ Login successful!');
  } catch (error) {
    console.error('❌', error);
  } finally {
    // Always close the browser
    await driver.quit();
  }
}

describe('Login E2E Test', () => {
  it('should log in successfully with valid credentials', async () => {
    await taskTest('Selenium Tasks','Task');
  },20000);
});


// taskTest('','Task');
// loginTest('perezjanet6858@yahoo.com','Janet');
