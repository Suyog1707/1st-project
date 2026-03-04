import dns from "node:dns";
import dotenv from "dotenv";
import connectDB from "./db/db.js";

dns.setServers(['8.8.8.8', '8.8.4.4']);

dotenv.config({
    path: "./.env"
});

connectDB()