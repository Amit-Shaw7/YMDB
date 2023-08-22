import bcrypt from 'bcryptjs';
import { UserModel } from '../models/UserModel.js';
import jwt from "jsonwebtoken";
import { client } from '../posthog.js';

export const register = async (req, res, next) => {
    const { email, password, name, phone } = req.body;
    console.log(req.body)
    if (!email || !password || !name || !phone) { return res.status(202).json({ msg: "All Fields are mandatory" }); }
    try {
        const exists = await UserModel.findOne({ email });
        if (exists) { return res.status(202).json({ msg: "User Already Exists" }); }

        const salt = await bcrypt.genSalt(10);
        const hash = await bcrypt.hash(req.body.password, salt);
        const createdUser = await UserModel.create({ email, name, phone, password: hash });
        if (createdUser) {
            const { password, ...others } = createdUser._doc;
            return res.status(200).json({
                msg: "Sign up Sucesfull",
                user: others,
            });
        }
        else { return res.status(500).json({ msg: error.response.data.msg }); }
    } catch (error) {
        return res.status(500).json({ msg: "Internal Server Error" });
    }
}

export const login = async (req, res, next) => {
    const { email, password: enteredPassword } = req.body;
    if (!email || !enteredPassword) { return res.status(401).json({ msg: "Empty Field Recieved" }) }
    try {
        const exists = await UserModel.findOne({ email });
        if (!exists) { return res.status(401).json({ msg: "Invalid Credentials" }) }

        const verified = await bcrypt.compare(enteredPassword, exists.password);
        if (!verified) { return res.status(401).json({ msg: "Invalid Credentials" }) }

        const { password, ...others } = exists._doc;
        const token = jwt.sign({ id: others._id }, process.env.JWT_SECRET);
        await client.capture({
            distinctId: others._id,
            event: 'loggedIn'
        });
        console.log("Captured");
        return res.status(200).json({
            msg: "Logged in Succesfully",
            user: others,
            token
        })
    } catch (error) {
        return res.status(500).json({ msg: "Internal Server Error" });
    }
}

export const isLoggedIn = async (req, res, next) => {
    try {
        const user = await UserModel.findById(req.userId);
        if (!user) { return res.status(401).json({ msg: "User Not Found" }) }

        const { password, ...others } = user._doc;
        return res.status(200).json({
            user: others
        })
    } catch (error) {
        return res.status(500).json({ msg: "Internal Server Error" });
    }
}