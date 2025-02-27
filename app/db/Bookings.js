import sequelize from './db';   
import { Sequelize } from 'sequelize';

const Bookings = sequelize.define('Bookings', {  
  Booking_id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
  },
  userName:{
    type: Sequelize.STRING,
    allowNull: false, 
  },
  email:{
    type: Sequelize.STRING,
    allowNull: false, 
  },
  carID: {
    type: Sequelize.INTEGER,
    allowNull: false, 
  },
  CarName: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  path: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  pickupArea: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  pickupLocation: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  pincode: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  pickupDate:{
    type: Sequelize.STRING,
    allowNull: false,
  },
  Rented_Days: {
    type: Sequelize.INTEGER,
    allowNull: false, 
    defaultValue: 0,
  },
  Rented_Weeks: {
    type: Sequelize.INTEGER,
    allowNull: false, 
    defaultValue: 0,
  },
  Rented_Months: {
    type: Sequelize.INTEGER,
    allowNull: false, 
    defaultValue: 0,
  },
  TotalAmount: {
    type: Sequelize.FLOAT,
    allowNull: false,
    defaultValue: 0,
  },
  delFlag: {
    type: Sequelize.INTEGER,
    allowNull: false,
    defaultValue: 0,
  },
}, {
  timestamps: true,   
  createdAt: 'Booked At',   
  updatedAt: 'updatedAt',   
}); 

sequelize.sync()
  .then(() => console.log("Database synced successfully"))
  .catch((err) => console.error('Error synchronizing the database:', err));

export default Bookings;
