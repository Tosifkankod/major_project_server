import express from 'express';
import {getSliderData,deleteSlide, postSliderData} from '../controllers/SliderController.js';
import { downloadPdfFromS3, getNoteData, postNoteData, uploadPdfToS3 } from '../controllers/NoteController.js';
import { uploadNoteData, uploadPdfFileS3, uploadSlider } from '../middleware/middlewares.js';


const router = express.Router();


// Uploading and Downloading from S3
router.post('/uploadpdfs3',uploadPdfFileS3, uploadPdfToS3);
router.get('/getpdf/:key', downloadPdfFromS3);


// Slider Data
router.get('/getsliderdata', getSliderData); 
router.post('/postsliderdata',uploadSlider, postSliderData);
router.post('/deleteslider', deleteSlide);


// Uploading and Accessing Metadata about Notes
router.post('/postnotedata',uploadNoteData, postNoteData);
router.get('/getnotedata', getNoteData);





export default router; 