import userModel from "../models/userModel.js";
import { comparePassword, hashPassword } from "./../helpers/authHelper.js";
import JWT from 'jsonwebtoken'


//register
export const registerController = async (req, res) => {
    try {
        const { name, email, password, phone, address ,answer} = req.body;
        //validation
        if (!name) {
            return res.send({ message: 'name is required' });
        }
        if (!email) {
            return res.send({ message: 'email is required' });
        }
        if (!password) {
            return res.send({ message: 'password is required' });
        }
        if (!phone) {
            return res.send({ message: 'phone no is required' });
        }
        if (!address) {
            return res.send({ message: 'address is required' });
        }
        if (!answer) {
            return res.send({ message: 'answer is required' });
        }
        //existing user
        const existingUser = await userModel.findOne({ email });
        if (existingUser) {
            return res.status(200).send({
                success: false,
                message: "already  registered please login"
            })
        }
        //register user
        const hashedPassword = await hashPassword(password)
        
        //save
        const user = await new userModel({ name, email, phone, address, password: hashedPassword,answer }).save();

        res.status(201).send({
            success: true,
            message: 'user registered successfully',
            user,
        })
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: 'error in registeration',
            error
        })
    }
}


// login
export const loginController = async (req, res) => {
    try {
        const { email, password } = req.body;
        //validation
        if (!email || !password) {
            return res.status(404).send({
                success: false,
                message: 'invalid email or password',
            })
        }
        //check user
        const user = await userModel.findOne({ email });
        if (!user) {
            return res.status(404).send({
                success: false,
                message: 'email is not registered',
            })
        }
        const match = await comparePassword(password, user.password)
        if (!match) {
            return res.status(200).send({
                success: false,
                message: 'invalid password',
            })
        }
        //token
        const token = await JWT.sign({ _id: user._id }, process.env.JWT_SECRET, {
            expiresIn: "7d",
        });
        res.status(200).send({
            success: true,
            message: 'login successfully',
            user: {
                name: user.name,
                email: user.email,
                phone: user.phone,
                address: user.address,
                role:user.role,
            },
            token,
        })
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success: false,
            message: 'error in login',
            error
        })
    }
}

//forgot Password
export const forgotPasswordController=async(req,res)=>{
    try{
      const {email,answer,newPassword}=req.body;
      if(!email){
        res.status(404).send({message:'email is required'})
      }
      if(!answer){
        res.status(404).send({message:'answer is required'})
      }
      if(!newPassword){
        res.status(404).send({message:'newPassword is required'})
      }
      //check
      const user=await userModel.findOne({email,answer})
      //validation
      if(!user){
        return res.status(404).send({
            success:false,
            message:'wrong email or answer'
        })
      }
      const hashed=await hashPassword(newPassword);
      await userModel.findByIdAndUpdate(user._id,{password:hashed});
      res.status(200).send({
        success:true,
        message:'password reset successfully',
      })
    }catch(error){
        console.log(error)
        res.status(500).send({
            success:false,
            message:'something went wrong',
            error
        })
    }
 }


//testController
export const testController = (req, res) => {
    try {
        res.send("protected route");
    } catch (error) {
        console.log(error)
        res.send({ error })
    }
}
