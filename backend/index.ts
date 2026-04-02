import express from 'express';


const app = express();

app.use(express.json());

app.get('/', (req, res) => {
  res.send('AI Diagnose Server is Running!');
});

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server ready at http://localhost:${PORT}`);
});