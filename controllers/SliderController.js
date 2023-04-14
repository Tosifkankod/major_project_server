import SliderModel from '../models/Slidermodel.js'
import fs from 'fs'
import path from 'path';
import { log } from 'console';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const savefilePath = path.join(__dirname, "../Data/");
console.log(savefilePath)

export const getSliderData = async (req, res) => {  
    
    
    try {
        let data = await SliderModel.find();
        res.send(data);
        return;
    } catch (error) {
        console.log(error);
    }


} 


export const postSliderData = async (req, res) => {
    try {
        const destination = req.file.originalname; 
        console.log(req.file);      
        const sliderimage = new SliderModel({
            image: fs.readFileSync(`${savefilePath}${destination}`, "base64")
        })
        
        sliderimage.save().then((value) => {
            fs.unlinkSync(`${savefilePath}${destination}`);
            res.send('success')
        }).catch((error) => {
            res.send(error);
        })

    } catch (error) {
        console.log(error)
    }
}

export const deleteSlide = async (req, res) => {
    const id = req.body.id;
    console.log(id);
    try {
        await SliderModel.deleteOne({_id: id});vl
        res.send("deleted");
    } catch (error) {
        res.send('No slider found');
    }
}


