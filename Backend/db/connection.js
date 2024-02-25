import dotenv from "dotenv";
import mongoose from "mongoose";

dotenv.config();

const connection = async () => {
    const conn = await mongoose.connect("mongodb+srv://pulak2020p:123123123@cluster0.cpkimdw.mongodb.net/db1?retryWrites=true&w=majority").then(() => {
        console.log("Connected to database");
    }).catch((error) => {
        console.log("Failed to connect to database", error);
    })
}

export default connection;
