import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    // _id: { type: String, required: true }, // removed unique: true
    _id: { type: String, required: true},
    name: { type: String, required: true },
    email: { type: String, required: true },
    resume: { type: String },
    image: { type: String},
});

const User = mongoose.model("User", userSchema);

export default User;