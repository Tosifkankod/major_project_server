import mongoose from "mongoose";


const SliderSchema = new mongoose.Schema({
    image:{
        type: String, 
        required: true
    },
})

const SliderModel = new mongoose.model('Sliderdata', SliderSchema);

export default SliderModel;