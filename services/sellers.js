const db = require('./db');
const helper = require('../helper');
const config = require('../config');


// Get all sellers already paginated by 10
async function getMultiple(page = 1){
    const offset = helper.getOffset(page, config.listPerPage);
    const rows = await db.query(
        `SELECT * 
    FROM sellers LIMIT ${offset},${config.listPerPage}`
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
        `SELECT * FROM sellers
            WHERE id=${id}`
    );

    return {result};
}

// Post new seller
// TODO : hash password
async function create(seller){
    const result = await db.query(
        `INSERT INTO sellers 
    (login, password)
    VALUES 
    ('${seller.login}', '${seller.password}')`
    );

    let message = 'Error in creating seller';

    if (result.affectedRows) {
        message = 'Seller created successfully';
    }

    return {message};
}

// update a product
async function update(id, seller){
    const result = await db.query(
        `UPDATE sellers
    SET login = '${seller.login}', password = '${seller.password}'
    WHERE id=${id}`
    );

    let message = 'Error in updating seller';

    if (result.affectedRows) {
        message = 'Seller updated successfully';
    }

    return {message};
}

// delete a seller
async function remove(id){
    const result = await db.query(
        `DELETE FROM sellers WHERE id=${id}`
    );

    let message = 'Error in deleting seller';

    if (result.affectedRows) {
        message = 'Seller deleted successfully';
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