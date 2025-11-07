const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = 3000;

app.use(bodyParser.json());
app.use(express.static('public'));

let users = []; // armazenamento em memória

app.post('/register', (req, res) => {
  const { username, password } = req.body;
  if (users.find(u => u.username === username)) {
    return res.status(400).json({ error: 'Usuário já existe' });
  }
  users.push({ username, password });
  res.json({ message: 'Usuário cadastrado com sucesso' });
});

app.post('/login', (req, res) => {
  const { username, password } = req.body;
  const user = users.find(u => u.username === username && u.password === password);
  if (user) res.json({ success: true });
  else res.status(401).json({ error: 'Credenciais inválidas' });
});

app.get('/users', (req, res) => {
  res.json(users);
});

app.listen(port, () => console.log(`🚀 Rodando em http://localhost:${port}`));
