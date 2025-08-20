'use strict';
import { Model } from 'sequelize';
import {BookingStatus} from '../Utils/Common/index.js'

const{PENDING , INTIATED , CANCELLED , BOOKED} = BookingStatus;
export default(sequelize, DataTypes) => {
  class Booking extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Booking.init({
    flightId: {
      type:DataTypes.INTEGER,
      allowNull: false,

    },
    userId: {
      type:DataTypes.INTEGER,
      allowNull: false
    },
    status:{ 
      type:DataTypes.ENUM,
      values:[PENDING , INTIATED , CANCELLED , BOOKED], 
      defaultValue: INTIATED,
      allowNull: false
    },
    noOfSeats : {
      type:DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 1
    },
    totalCost:{ 
      type:DataTypes.INTEGER,
      allowNull:false
    }
  }, {
    sequelize,
    modelName: 'Booking',
  });
  return Booking;
};