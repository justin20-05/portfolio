import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import rateLimit from 'express-rate-limit';
import projectRoutes from './routes/projectRoutes.js';
import contactRoutes from './routes/contactRoutes.js';
import { isEmailConfigured } from './services/mailer.js';
import { db } from './config/firebase.js';

const app = express();

const allowedOrigins = (process.env.FRONTEND_ORIGIN || 'http://localhost:5173,http://localhost:5174')
  .split(',')
  .map((origin) => origin.trim())
  .filter(Boolean);

app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
        return;
      }
      callback(new Error('Origin not allowed'));
    },
  })
);
app.use(express.json({ limit: '32kb' }));

const contactLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 5,
  standardHeaders: true,
  legacyHeaders: false,
  message: { error: 'Too many messages. Please try again in a few minutes.' },
});

app.use('/api/projects', projectRoutes);
app.use('/api/contact', contactLimiter, contactRoutes);

app.get('/api/health', (_req, res) => {
  res.json({
    status: 'online',
    email: isEmailConfigured() ? 'configured' : 'missing',
    database: db ? 'connected' : 'unavailable',
  });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
  if (!isEmailConfigured()) {
    console.warn('SMTP_USER / SMTP_PASS are not set. Contact emails will not send until they are.');
  }
});
