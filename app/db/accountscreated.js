import sequelize from './db';   
import { Sequelize } from 'sequelize';

const Signup = sequelize.define('accountscreated', {
   id: {
    type: Sequelize.INTEGER,
    primaryKey: true,   
    autoIncrement: true,  
    allowNull: false,  
  },

   username: {
    type: Sequelize.STRING,
    allowNull: false,   
  },

   email: {
    type: Sequelize.STRING,
    allowNull: false,
    unique: true,   
  },

   password: {
    type: Sequelize.STRING,
    allowNull: false,
  },
});

sequelize.sync()
.then(() => console.log("Database synced successfully"))
.catch((err) => console.error('Error synchronizing the database:', err));

module.exports = Signup;
