import mongoose from "mongoose";
import fs from 'fs';
 
export const downloadPdf = (req, res) => {
    const path = req.query.data;    
    
    try {
        res.download(path);
    } catch (error) {
        console.log(error);
    }
}