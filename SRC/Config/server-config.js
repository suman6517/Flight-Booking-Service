import dotenv from "dotenv";
dotenv.config();
const PORT=process.env.PORT || 3000;
const FLIGHT_SERVICE_URL =process.env.FLIGHT_SERVICE_URL;
export const CONFIG=
{
    PORT,
    FLIGHT_SERVICE_URL,
    
}