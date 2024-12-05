import validator from 'validator';
import UserModal from '../models/user.model.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';


export const signUp = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        if (!name || !email || !password) {
            return res.status(404).json({ success: false, message: "Incomplete details" })
        }

        if (name.length < 2) return res.status(401).json({ success: false, message: "Name must contains 3 character" })
        if (password.length < 6) return res.status(401).json({ success: false, message: "Password can't be shorter than 6 character" })
        if (!validator.isEmail(email)) return res.status(401).json({ success: false, message: "Invalid Email" })

        const existingUser = await UserModal.findOne({ email })

        if (existingUser) {
            return res.status(401).json({ success: false, message: "Email already exist" })
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const createdUser = await UserModal.create({ name, email, password: hashedPassword });

        const token = jwt.sign({ _id: createdUser._id }, process.env.JWT_SCRET);

        if (!createdUser) {
            return res.status(404).json({ success: false, message: "Error while creating user" });
        }

        return res.status(200).json({ success: true, message: "User registered successfully", token });

    } catch (error) {
        console.log(error)
        return res.status(500).json({ success: false })
    }
}

export const signIn = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(404).json({ success: false, message: "Incomplete details" })
        }


        const user = await UserModal.findOne({ email })

        if (!user) {
            return res.status(401).json({ success: false, message: "Invalid credentials" })
        }

        const isPasswordCorrect = await bcrypt.compare(password, user.password);

        if (!isPasswordCorrect) {
            return res.status(401).json({ success: false, message: "Invalid credentials" })
        }

        const token = jwt.sign({ _id: user._id }, process.env.JWT_SCRET);

        return res.status(200).json({ success: true, message: "Login successfully", token });

    } catch (error) {
        console.log(error)
        return res.status(500).json({ success: false })
    }
}