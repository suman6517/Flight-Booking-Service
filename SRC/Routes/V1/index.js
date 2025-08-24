import expres from "express";
import controllers from '../../Controllers/index.js';
import bookingRoutes from "./booking-route.js";
const router = expres.Router();



router.get("/info", controllers.info_Controller);
router.use("/bookings" , bookingRoutes);

export default router;