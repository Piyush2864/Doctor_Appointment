import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import connectToDb from './src/Db/config.js';


dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true}));

//api mounts



connectToDb();

app.get('/', (req, res)=>{
    res.send('Hello World')
});

app.listen(process.env.PORT, ()=> {
    console.log(`Server is running on port ${process.env.PORT}`);
});