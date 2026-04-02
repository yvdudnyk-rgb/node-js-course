const express = require('express');
const products = require('../products');
const { blockSpecialBrand } = require('./middleware');

const router = express.Router();

// handle get request for path /products
router.get('/products', (request, response) => {
    return response.json(products);
});

// handle get request for path /products/:brand
router.get('/products/:brand', blockSpecialBrand, (request, response) => {
   const { brand } = request.params; // Access the brand parameter from the URL

// Filter products based on the brand parameter
    const filteredProducts = products.filter(product => product.brand === brand);

   response.json(filteredProducts); // Send the filtered products as a JSON response
});

// handle get request for path /products/id/:id
router.get('/products/id/:id', (req, res) => {
// 1. Отримуємо id з параметрів та перетворюємо його на число
// (в URL параметри завжди приходять як рядки, а в products.js id - це числа)
    const id = parseInt(req.params.id);

// 2. Шукаємо конкретний продукт
// Використовуємо .find(), бо id унікальний і нам потрібен один об'єкт, а не масив
    const product = products.find(product => product.id === id);

// 3. Якщо продукт не знайдено - викидаємо помилку
    if (!product) {
        let err = new Error("Product not found");
        err.statusCode = 404;
       throw err; // Цю помилку спіймає ваш errorResponder
    }

// 4. Відправляємо знайдений продукт
    res.json(product);
});

router.get('/productswitherror', (request, response) => {
    let err = new Error("processing error ")
    err.statusCode = 400
    throw err
});


module.exports = router;