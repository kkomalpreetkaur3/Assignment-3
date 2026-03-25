import express from "express";
import healthRoutes from "./api/v1/routes/healthRoutes";
import eventRoutes from "./api/v1/routes/eventRoutes";
import dotenv from "dotenv";

dotenv.config();

import cors from "cors";
import { getHelmetConfig } from "../config/helmetConfig";
import { getCorsOptions } from "../config/corsConfig";
import { setupSwagger } from "config/swagger";

const app = express();

app.use(express.json());
app.use(getHelmetConfig());
app.use(cors(getCorsOptions()));

app.use("/api/v1/health", healthRoutes);
app.use("/api/v1/events", eventRoutes);

setupSwagger(app);

export default app;
