const express = require('express');
const path = require('path');
const app = express();
const PORT = 3000;

// Statischer Pfad zu den Bildern
app.use(express.static(path.join(__dirname, 'public')));

// Middleware zur Protokollierung von Anfragen
app.use((req, res, next) => {
  console.log(`Received request for ${req.url}`);
  next();
});

// Route zum Anzeigen des Bildes
app.get('/image/:id', (req, res) => {
    const imageId = req.params.id;
    const imagePath = path.join(__dirname, 'public', 'images', `${imageId}.jpg`);
  
    // Überprüfen, ob das Bild existiert
    res.sendFile(imagePath, (err) => {
      if (err) {
        console.error(`Error: Image with ID ${imageId}.jpg not found at path ${imagePath}`);
        res.status(404).send('Image not found');
      } else {
        console.log(`Sending image with ID ${imageId}.jpg`);
      }
    });
  });

// Server starten
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});