import express from "express";
import { healthHandler } from "../controllers/healthController";

const router = express.Router();

/**
 * @openapi
 * /health:
 *   get:
 *     summary: Health check endpoint
 *     description: Checks if the API server is running properly
 *     tags: [Health]
 *     responses:
 *       '200':
 *         description: API is running successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: "OK"
 */

router.get("/", healthHandler);

export default router;
