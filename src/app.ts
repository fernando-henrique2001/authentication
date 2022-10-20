require('dotenv/config');
import express from "express";
import { router } from "./routes";
import cors from "cors";
import errorHandler from './middleware/error/errorHandler';



const app = express();
app.use(express.json());
app.use(cors());


app.use("/", router);
app.use(errorHandler);

export { app }