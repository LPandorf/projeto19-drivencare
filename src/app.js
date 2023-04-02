import express, { json } from 'express';
import helmet from 'helmet';
import cors from 'cors';
import dotenv from 'dotenv';

import patientAuthRouter from './routes/patientAuthRoutes.js';
import doctorAuthRouter from './routes/doctorAuthRoutes.js';
import searchRoute from './routes/searchRoute.js';
import appointmentRoutes from './routes/appointmentRoutes.js';

dotenv.config();

const app = express();

app.use(json());
app.use(cors());
app.use(helmet());

app.use(patientAuthRouter);
app.use(doctorAuthRouter);
app.use(searchRoute);
app.use(appointmentRoutes);

const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
