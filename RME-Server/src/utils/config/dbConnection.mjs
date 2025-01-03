import mongoose from "mongoose";

export const connectDB = (url) => {
    mongoose
	.connect(url)
	.then(() => console.log("Connected to Database"))
	.catch((err) => console.log(`Error: ${err}`));
}