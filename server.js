const express = require('express');
const app = express();
const fs = require('fs');

// Lisää CORS-asetukset
app.use(function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});

// Reitti vastaa GET-pyyntöön osoitteessa localhost:3000/questions
app.get('/questions', function(req, res) {
  // Lue questions.json-tiedosto
  fs.readFile('questions.json', function(err, data) {
    if (err) {
      // Jos tiedoston lukeminen epäonnistui, lähetä virheilmoitus
      res.status(500).send('Tiedoston lukeminen epäonnistui');
      return;
    }

    // Muunna JSON-data JavaScript-objektiksi
    const questions = JSON.parse(data);

    // Lähetä questions-objekti HTTP-pyynnön vastauksena
    res.json(questions);
  });
});

// Aloitetaan kuuntelu portissa 3000
app.listen(3000, function() {
  console.log('Serveri kuuntelee porttia 3000');
});