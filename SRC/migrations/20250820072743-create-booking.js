'use strict';
/** @type {import('sequelize-cli').Migration} */

import {BookingStatus} from '../Utils/Common/index.js'

const{PENDING , INTIATED , CANCELLED , BOOKED} = BookingStatus;

  export async function up(queryInterface, Sequelize) {
    await queryInterface.createTable('Bookings', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      flightId: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      userId: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      status: {
        type: Sequelize.ENUM,
        values:[PENDING , INTIATED , CANCELLED , BOOKED], 
        defaultValue: INTIATED,
        allowNull: false
      },
      noOfSeats : {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 1
      },
      totalCost: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  };
  export async function down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Bookings');
  };
