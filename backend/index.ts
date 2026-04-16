import "dotenv/config";
import { fileURLToPath } from 'url';
import path from 'path';
import express, { type Request, type Response } from 'express';
import cors from 'cors';

const app = express();

if (process.env.NODE_ENV !== 'production') {
  app.use(cors());
}

app.use(express.json())

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const distPath = path.join(__dirname, '../client/dist');

app.use(express.static(distPath));
app.get('/{*splat}', (req, res) => {
  res.sendFile(path.join(distPath, 'index.html'));
});

app.post( '/api/symptoms' , (req : Request, res : Response) => {
console.log(req.body)
});

app.listen(3000, () => {
  console.log(`Server running at http://localhost:3000`);
});

