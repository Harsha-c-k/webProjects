 import sequelize from './db';   
import { Sequelize } from 'sequelize';

 
const Image = sequelize.define('imagefiles', {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  carName: {
    primaryKey: true,
    type: Sequelize.STRING,
    allowNull: false,   
    unique:true
  },
  filename: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  path: {
    type: Sequelize.STRING,
    allowNull: false,
  },
}, {
  timestamps: true,
  tableName: 'images',  
});

sequelize.sync()
  .then(() => console.log("Database synced successfully"))
  .catch((err) => console.error('Error synchronizing the database:', err));
  
  export default Image;
