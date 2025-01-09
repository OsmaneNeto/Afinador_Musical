import express, { Request, Response } from "express";
import cors from "cors";

const app = express();
const port = 8081;

app.use(cors()); // Habilitar CORS

const turnerData = [
  { frequencia: 261.63, title: 'C' },
  { frequencia: 277.18, title: 'C#' },
  { frequencia: 293.66, title: 'D' },
  { frequencia: 311.13, title: 'D#' },
  { frequencia: 329.63, title: 'E' },
  { frequencia: 349.23, title: 'F' },
  { frequencia: 369.99, title: 'F#' },
  { frequencia: 392.00, title: 'G' },
  { frequencia: 415.30, title: 'G#' },
  { frequencia: 440.00, title: 'A' },
  { frequencia: 466.16, title: 'A#' },
  { frequencia: 493.88, title: 'B' }
];

app.get("/turner", (req: Request, res: Response) => {
  console.log("Requisição recebida no endpoint /turner"); // Log para validação
  res.json(turnerData);
});

app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});
