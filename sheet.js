const { GoogleSpreadsheet } = require('google-spreadsheet');
const { promisify } = require('util');
const puppeteer = require('puppeteer');

require('dotenv').config();
const creds = require('./creds.json');

(async () => {

    // const doc = new GoogleSpreadsheet(process.env.SHEET_ID);

    // await doc.useServiceAccountAuth(creds);

    // await doc.loadInfo(); // loads document properties and worksheets
    // const sheet = doc.sheetsByIndex[1];
    // const rows = await sheet.getRows();

    const address_list = ['6109 Starlight Dr,Las Vegas,NV,89130', '2333 Sterling Heights Dr,Las Vegas,NV,89134', '6244 Downpour Ct,Las Vegas,NV,89110', '2731 Lawrencekirk Ct,Henderson,NV,89044'];

    // rows.forEach(row => address_list.push(row['Full Address']));

    console.log(address_list);

    const browser = await puppeteer.launch({ headless: false });
    const page = await browser.newPage();
    // page.on('console', consoleObj => console.log(consoleObj.text()));

    const my_data = [];

    for (let i = 1; i < address_list.length; i++) {

        let url = `https://www.zillow.com/homes/${address_list[i]}_rb/`;

        await page.goto(url, { waitUntil: 'networkidle0' });

        let data = await page.evaluate(() => {

            let title = document.body.innerText;

            // console.log(document.getElementById('ds-container').innerText);

            return [title];
        });

        my_data.push(...data);
    }

    console.log(my_data);

    await browser.close();
})();