import NoteModel from "../models/Notemodel.js";
import fs from 'fs';
import { fileURLToPath } from 'url';
import path from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const savefilePath = path.join(__dirname, "../Data/");
console.log(savefilePath);




export const postNoteData = async (req, res) => {
    const data = req.body;     
    const file = req.file.originalname;
    data.Path = `${savefilePath}${data.Documentname}`;


    try {
        const OneNote = new NoteModel({
            Course: data.Course,
            Year: data.Year,
            Semister: data.Semister, 
            Path: data.Path, 
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

export const getNoteData = async (req, res) => {
    const data = req.query; 
    // console.log(req.query);
    try {
        const notedata = await NoteModel.find(data);
        res.send(notedata);

    } catch (error) { 
        console.log(error);
    }
}

export const uploadpdffile = (req, res) => {
    res.send("uploaded successfully");
    return; 
}