import express from 'express';
import morgan from 'morgan';
import connect from './db/db.js';
import userRoutes from './routes/user.routes.js'
import cookieParser from 'cookie-parser';
import cors from 'cors'
import projectRoutes from './routes/project.routes.js'
import roomRoutes from './routes/room.routes.js';

connect();

const app=express();

// app.use(morgan('dev'));
app.use(cors({
    origin: 'http://localhost:5174' // Allow only this origin
  }));
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