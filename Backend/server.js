// import express from 'express';
// import dotenv from 'dotenv';
// import cors from 'cors';
// import connectToDb from './src/Db/config.js';

// import doctorRoute from './src/Routes/doctorRoutes.js';
// import patientRoute from './src/Routes/patientRoute.js';
// import appointmentRoute from './src/Routes/appointmentRoute.js';
// import adminRoute from './src/Routes/adminRoute.js';


// dotenv.config();
// const app = express();

// app.use(cors());
// app.use(express.json());
// app.use(express.urlencoded({ extended: true}));
      
// //api mounts
// app.use('/api/v1/appointment/doctor', doctorRoute);  
// app.use('/api/v1/appointment/patient', patientRoute);
// app.use('/api/v1/appointment/appointment', appointmentRoute);
// app.use('/api/v1/appointment/admin', adminRoute);


// connectToDb();

// app.get('/', (req, res)=>{
//     res.send('Hello World')
// });

// app.listen(process.env.PORT, ()=> {
//     console.log(`Server is running on port ${process.env.PORT}`);
// });


import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import http from 'http'; 
import { Server } from 'socket.io'; 
import connectToDb from './src/Db/config.js';

import doctorRoute from './src/Routes/doctorRoutes.js';
import patientRoute from './src/Routes/patientRoute.js';
import appointmentRoute from './src/Routes/appointmentRoute.js';
import adminRoute from './src/Routes/adminRoute.js';

dotenv.config();

const app = express();


// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// HTTP server for socket.io
const server = http.createServer(app);

// Socket.io setup
const io = new Server(server, {
    cors: {
        origin: '*', 
        methods: ['GET', 'POST'],
    },
});

// WebRTC signaling server events
io.on('connection', (socket) => {
    console.log(`User connected: ${socket.id}`);

    // Join room
    socket.on('join-room', (roomId, userId) => {
        socket.join(roomId);
        console.log(`${userId} joined room ${roomId}`);

        // Notify other users in the room
        socket.to(roomId).emit('user-connected', userId);

        // Handle disconnection
        socket.on('disconnect', () => {
            console.log(`${userId} disconnected`);
            socket.to(roomId).emit('user-disconnected', userId);
        });
    });

    // WebRTC signaling events
    socket.on('offer', (roomId, offer) => {
        socket.to(roomId).emit('offer', offer);
    });

    socket.on('answer', (roomId, answer) => {
        socket.to(roomId).emit('answer', answer);
    });

    socket.on('ice-candidate', (roomId, candidate) => {
        socket.to(roomId).emit('ice-candidate', candidate);
    });
});

// API mounts
app.use('/api/v1/appointment/doctor', doctorRoute);
app.use('/api/v1/appointment/patient', patientRoute);
app.use('/api/v1/appointment/appointment', appointmentRoute);
app.use('/api/v1/appointment/admin', adminRoute);

// Connect to the database
connectToDb();

// Health check route
app.get('/', (req, res) => {
    res.send('Hello World');
});

// Start the server
const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
