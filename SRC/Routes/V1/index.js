import expres from "express";
import controllers from '../../Controllers/index.js';
const router = expres.Router();

// router.get("/info", (req, res) => {
//     return res.json({
//         "name": "Flight-Tickets",
//         "version": "1.0.0"
//     });
// });
router.get("/info", controllers.info_Controller);

export default router;