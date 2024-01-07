import mongoose from 'mongoose';
import validator from 'validator';

interface IUser extends Document {
    _id: string;
    name: string;
    email: string;
    gender: "male" | "female";
    dob: Date;
    photo: string;
    role: "admin" | "user";
    createdAt: Date;
    updatedAt: Date;
    // Virtual Attribute
    age: number;
}

const schema = new mongoose.Schema({
    _id: {
        type: String,
        required: [true, "Please enter ID"]
    },
    name: {
        type: String,
        required: [true, "Please enter Name"]
    },
    email: {
        type: String,
        unique: [true, "Email already exists"],
        required: [true, "Please enter Email"],
        validate: validator.default.isEmail
    },
    gender: {
        type: String,
        enum: ["male", "female"],
        required: [true, "Please enter Gender"]
    },
    dob: {
        type: Date,
        required: [true, "Please enter DOB"]
    },
    photo: {
        type: String,
        required: [true, "Please add Photo"]
    },
    role: {
        type: String,
        enum: ["admin", "user"],
        default: "user"
    },
}, {
    timestamps: true
});

schema.virtual("age").get(function () {
    const today = new Date();
    const dob: Date = this.dob;
    let age: number = today.getFullYear() - dob.getFullYear();
    if (today.getMonth() < dob.getMonth() || today.getMonth() === dob.getMonth() && today.getDate() < dob.getDate()) {
        age--;
    }

    return age;
});

export const UserModel = mongoose.model<IUser>("User", schema);
