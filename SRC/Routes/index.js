import expresss, { Router } from "express";
import v1Routes from "./V1/index.js";

const router = expresss.Router();

router.use('/v1' , v1Routes);

export default router; 