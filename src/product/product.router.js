const express = require('express');
const { eq } = require('drizzle-orm');
const db = require('../db');
const { users, products } = require('../db/schema');

const router = express.Router();

router.get('/users/:id/products', async (request, response) => {
   const { id } = request.params;
   const userProdusts = await db.query.products.findMany({
       where: eq(products.userId, +id)
   });
   return response.json(userProdusts);
});

module.exports = router;