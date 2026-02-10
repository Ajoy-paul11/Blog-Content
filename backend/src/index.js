import { app } from './app.js';
import dotenv from 'dotenv';
import connectDB from "./db/index.js";

dotenv.config(
    { path: "./.env" }
)

connectDB()
    .then(() => {
        app.listen(process.env.PORT || 5001, () => {
            console.log(`App is running on port ${process.env.PORT}`);
        })
    }).catch((err) => {
        console.log("Failed connecting to the database: ", err.message);
        console.error("Connection failed", err);
    });


app.get("/", (req, res) => {
    return res.send("Welcome to the Blog-Content Application");
})