// intégration de la librairie express

const express = require('express')
const app = express()

const port = 8080;
const productsRouter = require('./routes/products');
const sellersRouter = require('./routes/sellers');

// pour parser en json
app.use(express.json());

// pour parser l'url body encodé
app.use(
    express.urlencoded({
        extended: true,
    })
);

app.get("/", (req, res) => {
    res.json({ message: "ok" });
});

// to connect with products routing
app.use("/products", productsRouter);

// to connect with sellers routing
app.use("/sellers", sellersRouter);

/* Error handler middleware */
app.use((err, req, res, next) => {
    const statusCode = err.statusCode || 500;
    console.error(err.message, err.stack);
    res.status(statusCode).json({ message: err.message });
    return;
});

// pour pouvoir lancer le serveur sur le port spécifié
app.listen(port, () => {
    console.log(`App API boutique en ligne listening at http://localhost:${port}`);
});