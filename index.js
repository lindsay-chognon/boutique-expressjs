// intégration de la librairie express

const express = require('express')
const app = express()

// pour pouvoir lancer le serveur

app.listen(8080, () => {  console.log('Serveur à l\'écoute')})