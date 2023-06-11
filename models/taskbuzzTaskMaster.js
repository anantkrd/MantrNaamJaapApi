

const { Sequelize, DataTypes, Model } = require('sequelize');
const sequelize = require("../config/database");
class TaskbuzzTaskMaster extends Model{
   
}
TaskbuzzTaskMaster.init({
    // Model attributes are defined here
    id:{
        type:DataTypes.INTEGER,
        autoIncrement:true,
        primaryKey:true
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false
    },
    description: {
      type: DataTypes.STRING
    },
    image: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    amount: {
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
    modelName: 'TaskbuzzTaskMaster', // We need to choose the model name
    tableName:'taskbuzz_task_master',
    timestamps:true,
});


/*
AgentDetials.hasOne(User,{
  foreignKey: {
    name: 'agentId'
  }
});*/
module.exports=TaskbuzzTaskMaster;