import express, { Application } from 'express';
import mongoose from 'mongoose';
import userRoutes from './routes/userRoutes';

const app: Application = express();
const PORT = process.env.PORT || 5000;

mongoose.connect('mongodb://localhost:27017/user-management')
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.log(err));

app.use(express.json());
app.use('/api', userRoutes);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
