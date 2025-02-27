 import sequelize from './db';   
import { Sequelize } from 'sequelize';

 
const ContactUs = sequelize.define('contactus_feedback', {
  C_id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  email: {
     type: Sequelize.STRING,
    allowNull: false,   
   },
  phone: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  message: {
    type: Sequelize.TEXT,
    allowNull: false,
  },
  LoggedUsername:{
    type: Sequelize.STRING,
    allowNull: false,
  },
   LoggedEmail:{
    type: Sequelize.STRING,
    allowNull: false,
   }
}, {
  timestamps: true,
 });

sequelize.sync()
  .then(() => console.log("Database synced successfully"))
  .catch((err) => console.error('Error synchronizing the database:', err));
  
  export default ContactUs;
