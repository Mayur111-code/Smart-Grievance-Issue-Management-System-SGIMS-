import app from './app.js';
import dotenv from 'dotenv';
import { connectMongoDatabase } from './config/db.js';

dotenv.config({ path: './config/config.env' });

connectMongoDatabase()
const port = process.env.PORT || 3000;
const host = process.env.HOST



app.listen(port,()=>{
    console.log(`http://${host}:${port}`);

})