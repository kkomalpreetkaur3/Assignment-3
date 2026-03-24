import express from "express";
import healthRoutes from "./api/v1/routes/healthRoutes";
import eventRoutes from "./api/v1/routes/eventRoutes";
import dotenv from "dotenv";

dotenv.config();

import { getHelmetConfig } from "../config/helmetConfig";

const app = express();

app.use(express.json());
app.use(getHelmetConfig());

app.use("/api/v1/health", healthRoutes);
app.use("/api/v1/events", eventRoutes);

export default app;
