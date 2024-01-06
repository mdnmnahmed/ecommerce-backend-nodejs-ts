import express from 'express';
import { config } from "dotenv";
// import cors from "cors";

config({ path: "./.env" });

const app = express();



const port = process.env.PORT || 5000;
app.listen(port, () => {
    console.log(`Server stared on http://localhost:${port}`);
});