import { createServer } from 'vite';
import express from 'express';
import path from 'path';

const app = express();
const port = process.env.PORT || 4173;

app.use(express.static(path.resolve('dist')));

app.get('*', (req, res) => {
  res.sendFile(path.resolve('dist/index.html'));
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
