import express from 'express';
import itemsRoutes from './routes/itemRoutes';
import path from 'path';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const url = process.env.FRONTEND_URL
// Configuración de CORS
app.use(cors({
  origin: url, // Permite solo tu frontend
  methods: ['GET'], // Métodos permitidos
}));

// Configuración de vistas (SSR)
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Middleware para parsear JSON
app.use(express.json());

// Router
app.use('/api/items', itemsRoutes);

export default app;