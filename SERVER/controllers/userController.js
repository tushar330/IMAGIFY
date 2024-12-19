import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken'; 
import userModel from '../models/userModel.js';


export const registerUser = async (req,res)=>{
    try {
        const {name,email,password} = req.body;
    
        if(!name || !email || !password){
            return res.json({success:false , message:'Missing Details'})
        }

        const existingUser = await userModel.findOne({email});

        if(existingUser){
            return res.json({success:false , message : "Email already registered"});
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password,salt);

        const user = new userModel({
            name,
            email, 
            password:hashedPassword
        });

        await user.save();

        //generate token for user
        const token = jwt.sign({id:user._id},process.env.JWT_SECRET)

        res.json({success:true, token, user: {name:user.name}})



    } catch (error) {
        res.json({success:false , message:error.message})
    }
}


export const loginUser = async (req,res)=>{
    try {
        
        const {email,password} = req.body;

        const user = await userModel.findOne({email});

        if(!user){
            return res.json({success:false, message : 'User does not exist'})
        }

        //now match the password
        const isMatch = await bcrypt.compare(password, user.password)

        if(isMatch){
            //details matched from db so generate token for user for authentication and loggout
            const token = jwt.sign({id:user._id},process.env.JWT_SECRET)

            res.json({success:true, token, user: {name: user.name}})

        }else{
            return res.json({success:false, message : 'Invalid credentials'})
        }

    } catch (error) {
        res.json({success:false , message:error.message});
    }
}


export const userCredits = async (req,res)=>{
    try {
        const {userId} = req.body  //user id will be added in the body from token using middle ware

        const user = await userModel.findById(userId);
        res.json({success:true, credits: user.creditBalance, user:{name:user.name}})

    } catch (error) {
        res.json({success:false , message:error.message});
    }
}