const puppeteer = require('puppeteer');
const fs = require('fs');
const createCsvWriter = require('csv-writer').createObjectCsvWriter;


(async () => {

    const browser = await puppeteer.launch();
    const page = await browser.newPage();

    await page.goto('https://www.imdb.com/title/tt4154796/fullcredits?ref_=tt_cl_sm#cast', { waitUntil: 'networkidle0' });

    let data = await page.evaluate(() => {

        let table = document.querySelector("table[class='cast_list']");

        return Array.from(table.querySelectorAll('tbody > tr > td:nth-child(2)'), element => element.innerText);
    });

    const csvWriter = createCsvWriter({
        header: [
            { id: 'name', title: 'Name' },
        ],
        path: 'output.csv'
    });

    let dd = [];

    for (let i = 0; i < data.length; i++) {
        dd.push({ name: data[i] });
    }

    csvWriter.writeRecords(dd)
        .then(() => {
            console.log('...Done')
        }).catch(err => console.log(err));


    await browser.close();
})();