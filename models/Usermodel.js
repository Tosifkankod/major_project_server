import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name: {
        type: String, 
        required: true
    },
    email: {
        type: String, 
        required: true
    },
    cys: {
        type: String, 
        required: true
    },
    password: {
        type: String, 
        required: true
    }
});

const User = new mongoose.model("UserData", userSchema);

export default User; 