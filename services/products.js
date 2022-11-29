const db = require('./db');
const helper = require('../helper');
const config = require('../config');


// Get all products already paginated by 10
async function getMultiple(page = 1){
    const offset = helper.getOffset(page, config.listPerPage);
    const rows = await db.query(
        `SELECT id, name 
    FROM products LIMIT ${offset},${config.listPerPage}`
    );
    const data = helper.emptyOrRows(rows);
    const meta = {page};

    return {
        data,
        meta
    }
}

// Post new product
async function create(product){
    const result = await db.query(
        `INSERT INTO products 
    (name)
    VALUES 
    ('${product.name}')`
    );

    let message = 'Error in creating product';

    if (result.affectedRows) {
        message = 'Product created successfully';
    }

    return {message};
}

module.exports = {
    getMultiple,
    create
}