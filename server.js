import dotenv from 'dotenv/config';
import http from 'http';
import app from './app.js';

const port=process.env.PORT || 3000

const server=http.createServer(app);

server.listen(port,()=>{
    console.log('Server on http://localhost:3000')
})