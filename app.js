import mongoose from "mongoose";
import 'dotenv/config';
import Server from "./models/server.js";

mongoose.set('strictQuery', false);

const server = new Server();

server.listen();