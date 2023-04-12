import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import bodyParser from "body-parser";
import router from './Routes/checkingroute.js';
import dotenv from 'dotenv';
dotenv.config();


const DATABASE_URL = process.env.REACT_APP_DATABASE_URL;
const PORT = process.env.PORT || 6010;

const app = express();  

app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));


app.use('/', router);



mongoose.set("strictQuery", false);
mongoose
  .connect(
    `${DATABASE_URL}`,
    { useNewUrlParser: true }
  )
  .then(() => {
    app.listen(PORT, (error) => {
      console.log(`connected to data base port ${PORT}`);
    });
  }) 
  .catch((error) => {
    console.log(error);
  });
