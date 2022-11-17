const express = require('express')
const puppeteer = require('puppeteer')

const app = express()
const PORT = process.env.PORT || 8000

app.use(express.json())
app.get('/', (req, res) => res.send("Welcome to the default landing page. Use /products/<product id> to choose a produc to scrape"))

app.get('/products/:productId', (req, res) => {
    const { productId } = req.params

    async function grabProduct(productId) {
        const browser = await puppeteer.launch()
        const page = await browser.newPage()
        await page.goto(`https://www.amazon.com/products/dp/${productId}/`)
        const data = {
            title: "",
            price: '',
            reviews: '',
            reviewRating: '',
            image: '',
            url: `https://www.amazon.com/products/dp/${productId}/`
        }
        data.title = await page.$eval("#productTitle", element => element.textContent)

        data.price = await page.$eval(".a-price .a-offscreen", element => element.textContent)
        data.reviews = await page.$eval("#acrCustomerReviewText", element => element.textContent)
        data.reviewRating = await page.$eval("#averageCustomerReviews .a-icon-alt", element => element.textContent)
        data.image = await page.$eval("#landingImage", element => element.src)
        res.send(data)
        await browser.close()
    }
    grabProduct(productId)
})

app.listen(PORT, () => console.log(`Server running on port ${PORT}`))