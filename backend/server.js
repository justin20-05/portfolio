import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import projectRoutes from './routes/projectRoutes.js';
import contactRoutes from './routes/contactRoutes.js';

dotenv.config();

const app = express();

app.use(cors({ origin: true }));
app.use(express.json());

// API Routes
app.use('/api/projects', projectRoutes);
app.use('/api/contact', contactRoutes);

// Healthcheck
app.get('/api/health', (req, res) => {
  res.json({ status: 'online', database: 'Firestore Connected' });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});