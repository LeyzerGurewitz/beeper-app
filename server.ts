import express, { Application } from "express";
import dotenv from "dotenv";
import beeperRoutes from "./routes/beeperRout.js"


dotenv.config();

const PORT: number | string = process.env.PORT || 3000;
const app: Application = express();

app.use(express.json());
app.use("/api", beeperRoutes); 

app.listen(PORT, () => {
    console.log("server is on");
})