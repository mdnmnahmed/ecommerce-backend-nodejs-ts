import express from 'express';
import { config } from "dotenv";
// import cors from "cors";

// import Routes ---
import userRoute from './routes/userRoute.js';
import { connectDB } from './utils/connectDB.js';
import { errorMiddleware } from './middlewares/errorMiddleware.js';

config({ path: "./.env" });

const app = express();
app.use(express.json());

const MONGODB_URI = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.qzgcd.mongodb.net/${process.env.DB_DATABASE}?retryWrites=true&w=majority`;
connectDB(MONGODB_URI);

// Use Routes ---
app.use("/api/v1/user", userRoute);


app.get("/", (req, res) => {
    res.send("Welcome to E-commerce API's")
});

app.use(errorMiddleware);

const port = process.env.PORT || 5000;
app.listen(port, () => {
    console.log(`Server stared on http://localhost:${port}`);
});