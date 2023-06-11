
const { Sequelize, DataTypes, Model } = require('sequelize');
const sequelize = require("../config/database");
class TaskBuzzTask extends Model{
   
}
TaskBuzzTask.init({
    // Model attributes are defined here
    id:{
        type:DataTypes.INTEGER,
        autoIncrement:true,
        primaryKey:true
    },
    type: {
      type: DataTypes.STRING,
      allowNull: false
    },
    subType: {
      type: DataTypes.STRING
    },
    title: {
      type: DataTypes.STRING
    },
    description: {
      type: DataTypes.STRING,
      allowNull: true
    },
    taskUrl:{
      type: DataTypes.STRING,
      allowNull: true
    },
    image: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    noOfUser:{
      type:DataTypes.INTEGER,
      defaultValue:0
    },
    amount: {
      type: DataTypes.FLOAT(5,2),
      allowNull: true
    },
    actualRate: {
      type: DataTypes.FLOAT(5,2),
      allowNull: true
    },
    userClickRate: {
      type: DataTypes.FLOAT(5,2),
      allowNull: true
    },
    status:{
      type:DataTypes.ENUM('pending','active','completed','cancelled'),
      defaultValue:'active'
    },
    isDeleted: {
      type: DataTypes.ENUM('Y','N'),
      defaultValue:'N'
    }
}, {
    // Other model options go here
    sequelize, // We need to pass the connection instance
    modelName: 'TaskBuzzTask', // We need to choose the model name
    tableName:'taskbuzz_task',
    timestamps:true,
});


/*
AgentDetials.hasOne(User,{
  foreignKey: {
    name: 'agentId'
  }
});*/
module.exports=TaskBuzzTask;