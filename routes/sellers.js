// glue between the URI and the corresponding function in the services/products.js
const express = require('express');
const router = express.Router();
const products = require('../services/sellers');

/* GET products */
router.get('/', async function(req, res, next) {
    try {
        res.json(await products.getMultiple(req.query.page));
    } catch (err) {
        console.error(`Error while getting sellers `, err.message);
        next(err);
    }
});


module.exports = router;
