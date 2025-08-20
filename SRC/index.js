import express from "express";
import { PORT , logger } from "./Config/index.js";
import apiRoutes from "./Routes/index.js";

const app = express();

app.use("/api", apiRoutes);
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
    logger.info("Succesfully started the server " , {});
});

