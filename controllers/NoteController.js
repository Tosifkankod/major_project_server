import NoteModel from "../models/Notemodel.js";
import fs from 'fs';
import { fileURLToPath } from 'url';
import path from "path";
import { getFileStream, uploadFile } from "../s3.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const savefilePath = path.join(__dirname, "../Data/");
console.log(savefilePath);



// This Below Controller is for uploading Meta data of pdf files in mongodb atlas
export const postNoteData = async (req, res) => {
    const data = req.body;   
    console.log(data)  
    const file = req.file.originalname;
    data.Path = `/opt/render/project/src/Data/${data.Documentname}`;


    try {
        const OneNote = new NoteModel({
            Course: data.Course,
            Year: data.Year,
            Semister: data.Semister, 
            Pdfkey: data.Pdfkey, 
            Documentname: data.Documentname,             
            Image: fs.readFileSync(`${savefilePath}${file}`, "base64")
        })

        OneNote.save().then((value) => {
            res.send('successfully uploaded data');  
            fs.unlinkSync(`${savefilePath}${file}`);
        }).catch((err) => {
            console.log(err);
        })

    } catch (error) {
        console.log(error);
    }
}


//This below controller returns All Pdf file according to the request i.e sem,year 
export const getNoteData = async (req, res) => {
    const data = req.query; 
    console.log(req.query);
    try {
        const notedata = await NoteModel.find(data);
        res.send(notedata);

    } catch (error) { 
        console.log(error);
    }
}

// This below controller is for uploading pdf file to s3
export const uploadPdfToS3 = async(req, res ) => {
    const file = req.file;
    const result = await uploadFile(file)
    res.json({key : `${result.key}`});
    fs.unlinkSync(`${savefilePath}${result.key}`);
}


// This below controller is for downloading pdf file from s3
export const downloadPdfFromS3 = async(req, res) => {
    const key = req.params.key; 
    const readStream = getFileStream(key);    
    // console.log(readStream);
    readStream.pipe(res);
}