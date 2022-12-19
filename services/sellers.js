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


module.exports = {
    getMultiple,
    getOne,
    create
}