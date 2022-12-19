const db = require('./db');
const helper = require('../helper');
const config = require('../config');


// Get all products already paginated by 10
async function getMultiple(page = 1){
    const offset = helper.getOffset(page, config.listPerPage);
    const rows = await db.query(
        `SELECT * 
    FROM products LIMIT ${offset},${config.listPerPage}`
    );
    const data = helper.emptyOrRows(rows);
    const meta = {page};

    return {
        data,
        meta
    }
}

// get one product
async function getOne(id){
    const result = await db.query(
        `SELECT * FROM products
            WHERE id=${id}`
    );

    return {result};
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

// update a product
async function update(id, product){
    const result = await db.query(
        `UPDATE products
    SET name='${product.name}'
    WHERE id=${id}`
    );

    let message = 'Error in updating product';

    if (result.affectedRows) {
        message = 'Product updated successfully';
    }

    return {message};
}

// delete a product
async function remove(id){
    const result = await db.query(
        `DELETE FROM products WHERE id=${id}`
    );

    let message = 'Error in deleting product';

    if (result.affectedRows) {
        message = 'Product deleted successfully';
    }

    return {message};
}

module.exports = {
    getMultiple,
    getOne,
    create,
    update,
    remove
}