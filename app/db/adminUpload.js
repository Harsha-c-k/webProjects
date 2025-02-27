import sequelize from './db';   
import { Sequelize } from 'sequelize';

const AdminUpload = sequelize.define('AdminUpload', {  
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
  },
   carName: {
    primaryKey: true,
    type: Sequelize.STRING,
    allowNull: false, 
    unique:true  
  },

  yearOfManufacture: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },

  mileage: {
    type: Sequelize.STRING,
    allowNull: false,
  },

  fuelType: {
    type: Sequelize.STRING,
    allowNull: false,
  },

  carCategory: {
    type: Sequelize.STRING,
    allowNull: false,
  },

  emissionStandard: {
    type: Sequelize.STRING,
    allowNull: false,
  },

  transmissionType: {
    type: Sequelize.STRING,
    allowNull: false,
  },

  seatCapacity: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },

  pricePerDay: {
    type: Sequelize.FLOAT,
    allowNull: false,
  },

  pricePerWeek: {
    type: Sequelize.FLOAT,
    allowNull: false,
  },

  pricePerMonth: {
    type: Sequelize.FLOAT,
    allowNull: false,
  },

 });

 sequelize.sync()
  .then(() => console.log("Database synced successfully"))
  .catch((err) => console.error('Error synchronizing the database:', err));

export default AdminUpload;
