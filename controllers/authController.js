import userModel from "../models/userModel.js";
import { hashPassword } from "./../helpers/authHelper.js";

export const registerController = async (req,res) => {
    try {
        const { name, email, password, phone, address } = req.body;
        //validation
        if (!name) {
            return res.send({ error: 'name is required' });
        }
        if (!email) {
            return res.send({ error: 'email is required' });
        }
        if (!password) {
            return res.send({ error: 'password is required' });
        }
        if (!phone) {
            return res.send({ error: 'phone no is required' });
        }
        if (!address) {
            return res.send({ error: 'address is required' });
        }
        //existing user
        const existingUser = await userModel.findOne({ email });
        if (existingUser) {
            return res.status(200).send({
                success: true,
                message: 'already  registered please login'
            })
        }
        //register user
        const hashedPassword = await hashPassword(password)
        //save
        const user = await new userModel({ name, email, phone, address, password: hashedPassword,}).save();
        res.status(200).send({
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
    