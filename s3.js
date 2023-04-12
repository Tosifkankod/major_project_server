// const S3 = require('aws-sdk/clients/s3');
import S3 from 'aws-sdk/clients/s3.js';
import dotenv from 'dotenv'
import fs from 'fs';
dotenv.config();

const bucketName = process.env.AWS_BUCKET_NAME;
const accessKeyId = process.env.AWS_ACCESS_KEY;
const secretAccessKey = process.env.AWS_SECRET_KEY;
const region = process.env.AWS_BUCKET_REGION;


const s3 = new S3({
    region, 
    accessKeyId, 
    secretAccessKey
})
// uploads a file to s3 
export function uploadFile(file){
    const fileStream = fs.createReadStream(file.path);
    const uploadParams = {
        Bucket:bucketName, 
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

