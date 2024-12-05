import mongoose from "mongoose";
import { CredentialsModal } from "../models/credentials.model.js";
import UserModal from "../models/user.model.js"


export const add = async (req, res) => {
    try {
        const userId = req.userId;
        const { type, cred } = req.body;

        if (!type || !cred) {
            return res.status(400).json({ success: false, message: "Fill all details" });
        }

        const user = await UserModal.findById(userId);

        if (!user) {
            return res.status(404).json({ success: false, message: "User not found" });
        }

        const existingCredential = await CredentialsModal.findOne({ type, users: userId });

        if (existingCredential) {
            return res.status(401).json({
                success: false,
                message: `Credential for type '${type}' already exists for this user.`,
            });
        }

        let credential = await CredentialsModal.create({
            type,
            cred,
            users: [userId],
        });


        await credential.save();

        return res.status(200).json({ success: true, message: "Creds Added Successfully" });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ success: false, message: "Internal Server Error" });
    }
};



export const get = async (req, res) => {

    try {
        const userId = req.userId;
        const user = await UserModal.findById(userId);

        if (!user) {
            return res.status(404).json({ success: false, message: "User not found" });
        }
        const creds = await CredentialsModal.find({ users: userId })

        return res.status(201).json({ success: true, creds })
    } catch (error) {
        console.log(error);
        return res.status(500).json({ success: false, message: "Internal Server Error" })
    }
}


export const update = async (req, res) => {
    try {
        const userId = req.userId;
        const credId = req.params.id;
        const { cred } = req.body;
        const user = await UserModal.findById(userId);

        if (!user) {
            return res.status(404).json({ success: false, message: "Not Authorized" });
        }

        const userObjectId = new mongoose.Types.ObjectId(userId);

        const updatedCredential = await CredentialsModal.findOneAndUpdate(
            { _id: credId, users: userObjectId },
            { cred },
            { new: true }
        )

        return res.status(200).json({ success: true, message: "Creds Updated Successfully" });


    } catch (error) {
        console.log(error);
        return res.status(500).json({ success: false, message: "Internal Server Error" })
    }
}


export const remove = async (req, res) => {

    try {
        const userId = req.userId;
        const credId = req.params.id;

        const user = await UserModal.findById(userId)
        if (!user) {
            return res.status(404).json({ success: false, message: "User not found" });
        }
        const creds = await CredentialsModal.findByIdAndDelete(credId);

        return res.status(201).json({ success: true, message: "Cred Deleted Successfully" })
    } catch (error) {
        console.log(error);
        return res.status(500).json({ success: false, message: "Internal Server Error" })
    }
}
