import mongoose from "mongoose";
import bcrypt from "bcrypt";

const SALT_ROUNDS = 10;

const adminSchema = new mongoose.Schema({
    email: { type: String, required: true, unique: true, lowercase: true, trim: true },
    password: { type: String, required: true }, // hashed
    name: { type: String, default: "Admin" },
    role: { type: String, default: "admin" }, // keep for clarity
}, { timestamps: true });

// hash password before saving
adminSchema.pre("save", async function (next) {
    if (!this.isModified("password")) return next();
    try {
        const hash = await bcrypt.hash(this.password, SALT_ROUNDS);
        this.password = hash;
        next();
    } catch (err) {
        next(err);
    }
});

// helper to compare plain password
adminSchema.methods.comparePassword = function (plain) {
    return bcrypt.compare(plain, this.password);
};

export const Admin = mongoose.model("Admin", adminSchema);