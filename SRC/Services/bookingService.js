// import {BookingRepo} from "../repositoryes/index.js"
import axios from "axios"
import db from "../models/index.js"
import {CONFIG} from "../Config/index.js"
import Apperror from "../../../Flight-Service/SRC/Utils/Errors/app-errors.js";
import statusCodes from "http-status-codes";
import {BookingRepo} from "../repositoryes/index.js";

const bookFlight = new BookingRepo();
 async function  createBooking(data)
{
   

    const transaction = await db.sequelize.transaction();
    try 
    {
             const flight =  await axios.get(`${CONFIG.FLIGHT_SERVICE_URL}/api/v1/flights/${data.flightId}`); // This Will give us the Flight Details
              if(data.noOfSeats >flight.data.data.totalSeates)
              {
                throw new Apperror("Not Enough Seats",statusCodes.BAD_REQUEST);
              }
              const totalBillingAmount = data.noOfSeats * flight.data.data.price;
              console.log("Total Billing Amount",totalBillingAmount);
              const bookingPayload = {...data , totalCost:totalBillingAmount};
              const booking = await bookFlight.createBooking(bookingPayload , transaction);
              const response = await axios.patch(`${CONFIG.FLIGHT_SERVICE_URL}/api/v1/flights/${data.flightId}/seats`,{
                seats:data.noOfSeats,
              });
             
             await transaction.commit();
            return booking;


        
    } 
    catch (error) 
    {
        await transaction.rollback();
        throw error;
    }
    
};

export const BookingService = {
    createBooking,

}
