import dotenv from "dotenv";
dotenv.config();

import express, { Application } from "express";

const app: Application = express();

// Your config function
require("./config")(app);

// Routes
import indexRoutes from "./routes/index.routes";
app.use("/api", indexRoutes);

// Error handling
require("./error-handling")(app);

module.exports = app;
