// configuration for information like database credentials or the rows I want to show per page

const config = {
    db: {
        /* don't expose password or any sensitive info, done only for demo */
        host: "localhost",
        user: "lindsay",
        password: "root",
        database: "music-products",
    },
    listPerPage: 10,
};
module.exports = config;