// import {BookingRepo} from "../repositoryes/index.js"
import axios from "axios"
import db from "../models/index.js"
import {CONFIG} from "../Config/index.js"
import Apperror from "../../../Flight-Service/SRC/Utils/Errors/app-errors.js";
import statusCodes from "http-status-codes";
import {BookingRepo} from "../repositoryes/index.js";
import {BookingStatus} from '../Utils/Common/index.js'

const{ BOOKED , CANCELLED} = BookingStatus;

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

async function makePayment(data) 
{
  const transaction =  await db.sequelize.transaction();
  try 
  {
    const bookingDetails = await bookFlight.getOne(data.bookingId,transaction);
    if(bookingDetails.status ==CANCELLED)
    {
      throw new Apperror("The Booking Has Been Cancelled",statusCodes.BAD_REQUEST);
      
    }
    
    const bookingTime = bookingDetails.createdAt;
    const currentTime = new Date();
    if(currentTime - bookingTime > 300000)
    {
      await bookFlight.update(data.bookingId,{status:CANCELLED} , transaction);
      throw new Apperror("The Booking Time Has Expired",statusCodes.BAD_REQUEST);
    }

  
    if(Number(bookingDetails.totalCost) !== Number(data.totalCost))
    {
      throw new Apperror("The Amount Of The Payment Is Not Match",statusCodes.BAD_REQUEST);
    }
    
    
    if(Number(bookingDetails.userId) !== Number(data.userId))
    {
      throw new Apperror("The User Id Is Not Match",statusCodes.BAD_REQUEST);
    }

    // We assume That The Payment Is Successfull
    await bookFlight.update(data.bookingId,{status:BOOKED } , transaction);
    
    await transaction.commit();
    


    
  } 
  catch (error) 
  {
    await transaction.rollback();
    throw error;
  } 
}

export const BookingService = {
    createBooking,
    makePayment
}
