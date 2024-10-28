const express = require('express');
const path = require('path');
const app = express();
const PORT = 3000;

// Statischer Pfad zu den Bildern
app.use(express.static(path.join(__dirname, 'public')));
app.set('view engine', 'ejs');
// Middleware zur Protokollierung von Anfragen
app.use((req, res, next) => {
  console.log(`Received request for ${req.url}`);
  next();
});

// Route zum Anzeigen des Bildes
app.get('/image/:id', (req, res) => {
    const imageId = req.params.id;
    const url = `${req.protocol}://${req.get('host')}/image/${imageId}`;
  
    // Überprüfen, ob das Bild existiert und das Template rendern
    res.render('image', { imageId: imageId, url: url });
  });

// Server starten
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});