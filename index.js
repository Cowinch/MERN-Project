const express = require('express')
const puppeteer = require('puppeteer')

const app = express()
const PORT = process.env.PORT || 8000

app.use(express.json())

app.get('/products/:productId', (req, res) => {
    const { productId } = req.params

    async function grabProduct(productId) {
        const browser = await puppeteer.launch()
        const page = await browser.newPage()
        await page.goto(`https://www.amazon.com/products/dp/${productId}/`)
        const data = {
            title: "",
            price: ''
        }
        data.title = await page.$eval("#productTitle", element => element.textContent)
        console.log(data.title)

        data.price = await page.$eval(".a-price .a-offscreen", element => element.textContent)
        console.log(data.price)
        res.send(data)
        await browser.close()
    }
    grabProduct(productId)
})

app.listen(PORT, () => console.log(`Server running on port ${PORT}`))