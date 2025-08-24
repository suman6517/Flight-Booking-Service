import { BookingService } from "../Services/index.js";
import statusCodes from "http-status-codes";
import{successResponse , errorResponse} from "../Utils/Common/index.js";



async function createBooking(req,res) 
{
    try 
    {
        const response = await BookingService.createBooking({
            flightId:req.body.flightId,
            userId:req.body.userId,
            noOfSeats:req.body.noOfSeats,
            

        });

         successResponse.data = response;
         return res.status(statusCodes.CREATED).json(successResponse);
        
    } 
    catch (error) 
    {
        errorResponse.message = "Something Went Wrong in Booking Controller Create Booking";
        errorResponse.error = error;
        return res.status(statusCodes.INTERNAL_SERVER_ERROR).json(errorResponse);
    }
    
}

export const BookingController = {
    createBooking,

}