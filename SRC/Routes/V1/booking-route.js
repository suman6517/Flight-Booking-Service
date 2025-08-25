import express from "express";
import {BookingController} from "../../Controllers/index.js";

const router = express.Router();

// api/v1/booking POST-Request
router.post("/", BookingController.createBooking);
router.post("/payment",BookingController.makePayment);

export default router;