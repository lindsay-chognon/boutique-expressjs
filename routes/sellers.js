// glue between the URI and the corresponding function in the services/products.js
const express = require('express');
const router = express.Router();
const sellers = require('../services/sellers');
const products = require("../services/products");

/* GET products */
router.get('/', async function(req, res, next) {
    try {
        res.json(await sellers.getMultiple(req.query.page));
    } catch (err) {
        console.error(`Error while getting sellers `, err.message);
        next(err);
    }
});

/* GET one seller */
router.get('/:id', async function(req, res, next) {
    try {
        res.json(await sellers.getOne(req.params.id));
    } catch (err) {
        console.error(`Error while getting seller`, err.message);
        next(err);
    }
});

/* POST product */
router.post('/', async function(req, res, next) {
    try {
        res.json(await sellers.create(req.body));
    } catch (err) {
        console.error(`Error while creating seller`, err.message);
        next(err);
    }
});

/* PUT product */
router.put('/:id', async function(req, res, next) {
    try {
        res.json(await sellers.update(req.params.id, req.body));
    } catch (err) {
        console.error(`Error while updating seller`, err.message);
        next(err);
    }
});

module.exports = router;
