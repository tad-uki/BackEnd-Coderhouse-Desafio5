import mongoose from "mongoose";

export const connectDB = async() =>{
    try {
        await mongoose.connect("mongodb+srv://tadeojab:lospapus@coderhousecluster.uw2hsqx.mongodb.net/backend-coderhouse?retryWrites=true&w=majority")
        console.log("Succesfully linked with database")
    } catch (error) {
        throw new Error(`Error connecting with database: ${error}`)
    }
}