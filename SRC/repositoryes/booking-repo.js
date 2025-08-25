import db from "../models/index.js";
import CrudRepo from "./crud-repo.js";
import {Op} from "sequelize";
import {BookingStatus} from '../Utils/Common/index.js'

const{ CANCELLED , BOOKED} = BookingStatus;
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
    };


     async getOne (data ,transaction)
    {
            const response = await this.model.findByPk(data  ,  {transaction:transaction});
            if(!response) 
            {
                throw new Apperror("Not Able To Find The Resource With The Given Id",StatusCodes.NOT_FOUND);
            }
            return response;      
    };

     async update (id,data,transaction) //(Data -> Object)
    {
        
            const [response] = await db.Booking.update(data , {
               where:{
                      id:id
                    }
        },  {transaction:transaction});
        if (response === 0) 
        {
            throw new Apperror("Not Able To Find The Resource With The Given Id",StatusCodes.NOT_FOUND);
        };
      
       
            return response;     
    };

    async cancelOldBookings(timestamp)
    {
        const response = await db.Booking.update({
            status:CANCELLED 
        },{
            where:
            {
                 [Op.and]:[
                {
                    createdAt:
                    {
                        [Op.lt]:timestamp
                    }
                },
                {
                    status:
                    {
                        [Op.ne]:BOOKED
                    }
                },
                {
                    status:
                    {
                        [Op.ne]:CANCELLED
                    }
                },
                

            ]}
        });
        return response;
    };


}

export default BookingRepo;