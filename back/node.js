const express = require('express');
const cors = require('cors');

const app = express();
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

const app = express();
app.use(cors());
app.use(express.json());

// Connexion BDD
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB connecté'))
  .catch(err => console.error('Erreur BDD :', err));

// Modèle
const Client = mongoose.model('Client', new mongoose.Schema({
  nom: String,
  email: String
}));

// Routes
app.get('/api/clients', async (req, res) => {
  res.json(await Client.find());
});

app.post('/api/clients', async (req, res) => {
  const client = await Client.create(req.body);
  res.status(201).json(client);
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Serveur sur le port ${PORT}`));