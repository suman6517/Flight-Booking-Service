import { BookingService } from "../Services/index.js";
import statusCodes from "http-status-codes";
import{successResponse , errorResponse} from "../Utils/Common/index.js";

const InMemoryDB = [];

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
    
};

async function makePayment(req,res) 
{
    try 
    {
        
        const IdempotencyKey = req.headers['idempotency-key'];
        if(!IdempotencyKey)
        {
            return res.status(statusCodes.BAD_REQUEST).json(
                {
                    message:"Idempotency Key Not Found"
                }
             );
        }
        if(!IdempotencyKey || InMemoryDB[IdempotencyKey])
        {
             return res.status(statusCodes.BAD_REQUEST).json(
                {
                    message:"Can Not Retry On a Successful Payment"
                }
             );
        }

           const response = await BookingService.makePayment({
            totalCost:req.body.totalCost,
            userId:req.body.userId,
            bookingId:req.body.bookingId,
            

        });
        InMemoryDB[IdempotencyKey] = IdempotencyKey;

         successResponse.data = response;
         return res.status(statusCodes.CREATED).json(successResponse);
        
    } 
    catch (error) 
    {
        errorResponse.message = "Something Went Wrong in Booking Controller Update Booking";
        errorResponse.error = error;
        return res.status(statusCodes.INTERNAL_SERVER_ERROR).json(errorResponse);
    }
    
}



export const BookingController = {
    createBooking,
    makePayment
}