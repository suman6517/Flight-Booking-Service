import express from "express";
import {logger , CONFIG} from "./Config/index.js";
import apiRoutes from "./Routes/index.js";
const app = express();



app.use(express.json());
app.use(express.urlencoded({extended : true}));
app.use("/api", apiRoutes);


app.listen(CONFIG.PORT, () => {
    console.log(`Server is running on port ${CONFIG.PORT}`);
    logger.info("Succesfully started the server " , {});
});

