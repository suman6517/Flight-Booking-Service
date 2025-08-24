import db from "../models/index.js";
import CrudRepo from "./crud-repo.js";

class BookingRepo extends CrudRepo
{
    constructor(model)
    {
        super(db.Booking);
    }
    async createBooking(data , transaction)
    {
        const response = await db.Booking.create(data , {transaction:transaction});
        return response;
    }
}

export default BookingRepo;