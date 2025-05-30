import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import authRoutes from './routes/auth.js';
import transactionRoutes from './routes/transactionRoutes.js'
import path from 'path';


dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());

const _dirname = path.resolve();

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error(err));

app.use('/api/auth', authRoutes);
app.use('/api/transactions', transactionRoutes);

app.use(express.static(path.join(_dirname, 'client/dist')));

app.get('/*splat', (req, res) => {
  const indexPath = path.join(_dirname, 'client', 'dist', 'index.html');
  console.log('Serving index.html from:', indexPath);
  res.sendFile(indexPath);
});


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
