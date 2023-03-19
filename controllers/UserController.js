import User from '../models/Usermodel.js';
import bycrpt from 'bcryptjs';
import jwt from 'jsonwebtoken';
const JWT_SECRET_KEY = "MyKey";

export const signup = async (req, res) => {
    const signupData = req.body; 
    console.log(signupData);    
    const email = signupData.email; 
    const password = signupData.password;
    let existingUser;
    try {
        existingUser = await User.findOne({email});
    } catch (error) {
        console.log(error);
    }
    
    if(existingUser){
        return res.status(400).json({error: "User Already Exist! Login Instead"});
    }

    const hashedPassword = bycrpt.hashSync(password);
    try {
        const newUser = new User({
            name: signupData.name, 
            email: signupData.email, 
            cys: signupData.cys, 
            password: hashedPassword
        })

        await newUser.save();
        return res.status(201).json({message: newUser});
     } catch (error) {
        console.log(error);
    }
}

export const signin = async(req,res) => {
    const email = req.body.email; 
    const password = req.body.password;
    console.log(req.body);
    let existingUser; 
    try {
        existingUser = await User.findOne({email});
    } catch (error) {
        console.log(error)
    }

    if(!existingUser){
        return res.status(404).json({ message: "User Not Registered"});
    }

    const isPasswordCorrect = bycrpt.compareSync(password, existingUser.password);

    if(!isPasswordCorrect){
        return res.status(400).json({message: "Incorrect Credentials"});
    }    

    const token = jwt.sign({id:existingUser._id}, JWT_SECRET_KEY, {
        expiresIn: "1d",
    })
    let responsedata = {
        name: existingUser.name, 
        cys: existingUser.cys, 
        email: existingUser.email
    }

    res.status(200).json({message: "Login Successful", user: responsedata, token});

}