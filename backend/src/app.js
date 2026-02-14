import express from "express";
import cors from "cors";


const app = express();

app.use(express.json());
app.use(cors({ origin: "*", credentials: true }));
app.use(express.urlencoded({ extended: true }));

// Routes declaration
import postRoutes from "./routes/post.routes.js";
import authRoutes from "./routes/auth.routes.js";


app.use("/api/v1/admin", authRoutes);
app.use("/api/v1/posts", postRoutes);

export { app };
