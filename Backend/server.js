import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import connectToDb from './src/Db/config.js';

import doctorRoute from './src/Routes/doctorRoutes.js';
import patientRoute from './src/Routes/patientRoute.js';
import appointmentRoute from './src/Routes/appointmentRoute.js';
import adminRoute from './src/Routes/adminRoute.js';


dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true}));

//api mounts
app.use('/api/v1/appointment/doctor', doctorRoute);
app.use('/api/v1/appointment/patient', patientRoute);
app.use('/api/v1/appointment/appointment', appointmentRoute);
app.use('/api/v1/appointment/admin', adminRoute);


connectToDb();

app.get('/', (req, res)=>{
    res.send('Hello World')
});

app.listen(process.env.PORT, ()=> {
    console.log(`Server is running on port ${process.env.PORT}`);
});