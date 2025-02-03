import express from 'express';
import morgan from 'morgan';
import connect from './db/db.js';
import userRoutes from './routes/user.routes.js'
import cookieParser from 'cookie-parser';
import cors from 'cors'
import projectRoutes from './routes/project.routes.js'
import roomRoutes from './routes/room.routes.js';


const app=express();
app.use(cors({
    origin:process.env.FRONTEND_URL || 'http://localhost:5173',
    credentials:true
}));

connect();
// app.use(morgan('dev'));
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({extended:true}))
app.use('/users',userRoutes);
app.use('/projects',projectRoutes);
app.use('/rooms',roomRoutes);

app.get('/',(req,res)=>{
    res.send('Hello')
})

export default app;