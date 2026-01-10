import dotenv from "dotenv";
dotenv.config();

import { app } from "./app.js";
import { connectDB } from "./config/db.js";
import { startPreventIdle } from "./config/preventIdle.js";

connectDB();

app.listen(5000, () => {
  console.log("🚀 Server running on port 5000");
  // Start the keep-alive pings
  // startPreventIdle();
});
