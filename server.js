const express = require('express');
const path = require('path');
const app = express();
const port = 3000;

// Servir des fichiers statiques à partir du dossier racine
app.use(express.static(path.join(__dirname))); // Assurez-vous que cela pointe vers le bon dossier

// Route principale
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// Démarrer le serveur
app.listen(port, () => {
    console.log(`Serveur à l'écoute sur http://localhost:${port}`);
});
