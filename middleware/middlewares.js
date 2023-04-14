import multer from 'multer';
import { fileURLToPath } from 'url';
import path from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const savefilePath = path.join(__dirname, "../Data/");


//Middleware for Slider Image
export const uploadSlider = multer({
  storage: multer.diskStorage({
    destination: function (req, file, cb) {
      console.log(savefilePath);
      cb(null, savefilePath);
    },
    filename: function (req, file, cb) {
      console.log("slider multer log", file);  
      cb(null, file.originalname);
    },
  }),
}).single("slider_img");


// Middleware for Notes Image
export const uploadNoteData = multer({
  storage: multer.diskStorage({
    destination: function (req, file, cb) {
      console.log(req);
      cb(null, "./Data");
    },
    filename: function (req, file, cb) {
      console.log(file);
      cb(null, file.originalname);
    },
  }),
}).single("img");


// Middleware for Upload Pdf File to S3
export const uploadPdfFileS3 = multer({
  storage: multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, "./Data");
    },
    filename: function (req, file, cb) {
      console.log(file);
      cb(null, file.originalname);
    },
  }),
}).single("pdf");
