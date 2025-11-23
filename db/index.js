import mongoose from "mongoose";

const connectDb = async () => {
    try {
        await mongoose.connect(`${process.env.CONNECTDB}`);
        console.log('database connected')
    } catch (error) {
        process.exit(1)
    }
}

export default connectDb;