import express from "express";
import dotenv from "dotenv";
import beeperRoutes from "./routes/beeperRout.js";
dotenv.config();
const PORT = process.env.PORT || 3000;
const app = express();
app.use(express.json());
app.use("/api", beeperRoutes);
app.listen(PORT, () => {
    console.log("server is on");
});
