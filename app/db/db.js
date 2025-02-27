import { Sequelize } from "sequelize";

const sequelize=new Sequelize('carrentalsystem','root','rudy',{
    host: 'localhost',
  dialect: 'mysql',
  dialectModule: require('mysql2'),
  timezone: '+05:30',
})

 
module.exports=sequelize