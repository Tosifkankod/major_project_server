// const S3 = require('aws-sdk/clients/s3');
import S3 from 'aws-sdk/clients/s3.js';
import dotenv from 'dotenv'
import { fileURLToPath } from 'url';
import path from 'path'
import fs from 'fs';
dotenv.config();

const bucketName = process.env.AWS_BUCKET_NAME;
const accessKeyId = process.env.AWS_ACCESS_KEY;
const secretAccessKey = process.env.AWS_SECRET_KEY;
const region = process.env.AWS_BUCKET_REGION;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const savefilePath = path.join(__dirname, "./Data/");


const s3 = new S3({
    region, 
    accessKeyId, 
    secretAccessKey
})
// uploads a file to s3 
export function uploadFile(file){ 
    const destination = file.originalname;
    
    console.log(savefilePath);
    const fileStream = fs.createReadStream(`${savefilePath}${destination}`);
    const uploadParams = {
        Bucket:"note-verse", 
        Body: fileStream, 
        Key: file.filename
    }

    return s3.upload(uploadParams).promise();
}


// download a file to s3
export function getFileStream(fileKey){
    const downloadParams = {
        Key: fileKey, 
        Bucket: bucketName
    }

    return s3.getObject(downloadParams).createReadStream();

}


