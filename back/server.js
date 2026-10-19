require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

const app = express();
app.use(cors());
app.use(express.json());

// Connexion BDD (réutilisée entre les appels)
let connected = false;
async function connectDB() {
  if (connected) return;
  await mongoose.connect(process.env.MONGO_URI);
  connected = true;
}

app.use(async (req, res, next) => {
  try {
    await connectDB();
    next();
  } catch (err) {
    console.error('Erreur BDD :', err);
    res.status(500).json({ error: 'Connexion BDD impossible' });
  }
});

const Client = mongoose.models.Client || mongoose.model('Client', new mongoose.Schema({
  nom: String,
  email: String
}));

app.get('/', (req, res) => res.send('API CRM OK'));

app.get('/api/clients', async (req, res) => {
  res.json(await Client.find());
});

app.post('/api/clients', async (req, res) => {
  const client = await Client.create(req.body);
  res.status(201).json(client);
});

// En local seulement
if (require.main === module) {
  const PORT = process.env.PORT || 3000;
  app.listen(PORT, () => console.log(`Serveur sur le port ${PORT}`));
}

// Pour Vercel
module.exports = app;