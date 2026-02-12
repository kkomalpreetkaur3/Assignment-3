import express from "express";
import { healthHandler } from "../controllers/healthController";

const router = express.Router();
router.get("/", healthHandler);

export default router;
