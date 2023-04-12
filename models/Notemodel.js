import mongoose from "mongoose";

const NoteSchema = new mongoose.Schema({
    Course:{
        type: String, 
        required: true, 
    },
    Year:{
        type: Number, 
        required: true
    },
    Semister:{
        type: Number,
        required: true
    },
    Pdfkey: {
        type: String, 
        required: true
    },
    Documentname: {
        type: String, 
        required: true
    },
    Image: {
        type: String, 
        required: true
    }

})

const NoteModel = new mongoose.model('NoteModel', NoteSchema);

export default NoteModel;