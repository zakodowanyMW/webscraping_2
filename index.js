const express = require('express');
const getData = require('./getData');
const fs = require('fs');
const app = express();

app.use(express.static('public'));

app.set('view engine', 'ejs');

// Pobranie danych z pliku links.json
const linksData = JSON.parse(fs.readFileSync('links.json', 'utf-8'));

app.get('/', (req, res) => {
  res.render('index', { links: linksData });
});

app.get('/getData', async (req, res) => {
    try {
        const url = req.query.url;
        const grabData = await getData(url);
        res.json(grabData);
    } catch (error) {
        console.error(error);
        res.status(500).send('Wystąpił błąd');
    }
});

app.listen(3000, () => {
  console.log('Aplikacja działa na http://localhost:3000');
});
