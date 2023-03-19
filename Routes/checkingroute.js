import express from 'express';
import {getSliderData,deleteSlide, postSliderData} from '../controllers/SliderController.js';
import multer from 'multer';
import { getNoteData, postNoteData, uploadpdffile } from '../controllers/NoteController.js';
import { downloadPdf } from '../controllers/Downloadpdf.js';



const router = express.Router();

const uploadSlider = multer({
  storage: multer.diskStorage({ 
    destination: function (req, file, cb) {
      cb(null, "./Data");
    }, 
    filename: function (req, file, cb) {
      console.log(file); 
      cb(null, file.originalname);
    },
  }),
}).single("slider_img");

 

const uploadNoteData = multer({   
  storage: multer.diskStorage({
    destination: function (req, file, cb) {
      console.log(req ); 
      cb(null, "./Data"); 
    },
    filename: function (req, file, cb) {  
      console.log(file);
      cb(null, file.originalname);
    },
  }),
}).single("img");

const upload = multer({
  storage: multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, "./Data");
    },
    filename: function (req, file, cb) {
      cb(null, file.originalname);
    },
  }),
}).single("pdf");


// ROUTES ==================================================

// sliderRoute
router.get('/getsliderdata', getSliderData); 
router.post('/postsliderdata',uploadSlider, postSliderData);
router.post('/deleteslider', deleteSlide);
// noteRoute
router.post('/postnotedata',uploadNoteData, postNoteData);
router.post('/pdfFileUpload',upload, uploadpdffile);
router.get('/getnotedata', getNoteData);
router.get('/downloadpdf', downloadPdf);

// router.post('/signup', signup)
// router.post('/signin', signin)


export default router; 