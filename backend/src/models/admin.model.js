import mongoose from "mongoose";
import bcrypt from "bcrypt";

const SALT_ROUNDS = 10;

const adminSchema = new mongoose.Schema({
    email: { type: String, required: true, unique: true, lowercase: true, trim: true },
    password: { type: String, required: true },
    name: { type: String, default: "Admin" },
    role: { type: String, default: "admin" },
}, { timestamps: true });


adminSchema.pre("save", async function () {
    if (!this.isModified("password")) return;

    try {
        const hash = await bcrypt.hash(this.password, SALT_ROUNDS);
        this.password = hash;
    } catch (err) {
        throw err;
    }
});


adminSchema.methods.comparePassword = function (plain) {
    return bcrypt.compare(plain, this.password);
};

export const Admin = mongoose.model("Admin", adminSchema);