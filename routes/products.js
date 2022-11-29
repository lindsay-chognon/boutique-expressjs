// glue between the URI and the corresponding function in the services/products.js
const express = require('express');
const router = express.Router();
const products = require('../services/products');

/* GET products */
router.get('/', async function(req, res, next) {
    try {
        res.json(await products.getMultiple(req.query.page));
    } catch (err) {
        console.error(`Error while getting products `, err.message);
        next(err);
    }
});

/* POST product */
router.post('/', async function(req, res, next) {
    try {
        res.json(await products.create(req.body));
    } catch (err) {
        console.error(`Error while creating product`, err.message);
        next(err);
    }
});

/* PUT product */
router.put('/:id', async function(req, res, next) {
    try {
        res.json(await products.update(req.params.id, req.body));
    } catch (err) {
        console.error(`Error while updating product`, err.message);
        next(err);
    }
});

module.exports = router;
