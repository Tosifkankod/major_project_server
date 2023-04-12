import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import bodyParser from "body-parser";
// import multer from "multer";
// import pdf from "./models/Usermodel.js";
// import fs from "fs";
import router from './Routes/checkingroute.js'
import path from "path";
import dotenv from 'dotenv'
dotenv.config();


const DATABASE_URL = process.env.REACT_APP_DATABASE_URL;
const PORT = 6010;

const app = express();

app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

// const __filename = fileURLToPath(import.meta.url);
// const __dirname = path.dirname(__filename);
// console.log(path.join(__dirname, "./Data/"))



app.use('/', router)






// const upload = multer({
//   storage: multer.diskStorage({
//     destination: function (req, file, cb) {
//       cb(null, "controllers");
//     },
//     filename: function (req, file, cb) {
//       cb(null, file.fieldname + "-" + Date.now() + ".pdf");
//     },
//   }),
// }).single("user_file");



// app.get("/", (req, res) => {
//   console.log("hi");
//   res.status(200).end("hi");
// });

 

// app.get("/getpdf", (req, res) => {
//   pdf
//     .findOne({ filename: "Syllabus BCA.pdf" })
//     .then((data) => {
//       res.send(data);
//     })
//     .catch((err) => {
//       console.log(err);
//     });
// });



// app.post("/addpdf", (req, res) => {
//   upload(req, res, (err) => {
//     if (err) { 
//           console.log(err);
//     } else { 
//         console.log(req);
//         const newPdf = new pdf({
//         filename: req.file.originalname,
//         mimetype: req.file.mimetype,
//         fileobject: {
//           data: fs.readFileSync(req.file.path,"base64", req.file.filename),
//         },
//       });

//       newPdf
//         .save()
//         .then(() => {
//           res.send("successfully uploaded");
//         })
//         .catch((err) => {
//           console.log(err);
//         }); 
//     } 
//   });
// }); 

// app.listen(8000, (error) => {
//     console.log("connected to data base port 5000");
// })

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
