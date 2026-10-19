const API = 'http://localhost:3000/api/clients';

async function charger() {
  const res = await fetch(API);
  const clients = await res.json();
  document.getElementById('liste').innerHTML =
    clients.map(c => `<li>${c.nom} - ${c.email}</li>`).join('');
}

document.getElementById('clientForm').addEventListener('submit', async (e) => {
  e.preventDefault();
  await fetch(API, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      nom: document.getElementById('nom').value,
      email: document.getElementById('email').value
    })
  });
  e.target.reset();
  charger();
});

charger();