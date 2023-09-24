const puppeteer = require('puppeteer');

// https://www.ceneo.pl/98318687 

async function getData(url) {
    const browser = await puppeteer.launch({headless: false, defaultViewport: null});
    const page = await browser.newPage();
    await page.goto(url, {
        waitUntil: "domcontentloaded",
    });

    const grabData = await page.evaluate(() => {
        const data = document.querySelectorAll(".product-offer__store-with-product");
        let processedData = [];
        data.forEach((item, index)=> {
            const companyName = item.querySelector(".store-logo.go-to-shop img") ? item.querySelector(".store-logo.go-to-shop img").alt : "brak nazwy sklepu";
            const description = item.querySelector(".short-name__txt").textContent;
            const value = item.querySelector(".product-offer__product__price .price-format.nowrap .price .value").innerHTML;
            const penny = item.querySelector(".product-offer__product__price .price-format.nowrap .price .penny").innerHTML;
            const noItemPromo = (index > -1 && index < 3) ? (index + 1 ): "nie";
            const position = index + 1;
            let myShop = "no";
            if(companyName === "komputronik.pl") {
                myShop = "yes";
            }
            processedData.push({
                companyName,
                price: value + penny,
                description,
                noItemPromo,
                position,
                myShop
            });
        })
        return processedData;
    })

    await browser.close();
    return grabData;
}

module.exports = getData;
