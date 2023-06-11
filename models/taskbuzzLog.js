
const { Sequelize, DataTypes, Model } = require('sequelize');
const sequelize = require("../config/database");
//import TaskBuzzTask from './taskBuzzTask';
const TaskBuzzTask=require('./taskBuzzTask');
class TaskbuzzLog extends Model{
   
}
TaskbuzzLog.init({
    // Model attributes are defined here
    id:{
        type:DataTypes.INTEGER,
        autoIncrement:true,
        primaryKey:true
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    taskId: {
      type: DataTypes.INTEGER
    },
    status: {
      type: DataTypes.ENUM('pending','claimed', 'approved', 'declined'),
      defaultValue:'pending'
    },
    amount: {
      type: DataTypes.FLOAT(5,2),
      allowNull: true
    },
    note:{
      type:DataTypes.TEXT,
      defaultValue:''
    },
    isDeleted: {
      type: DataTypes.ENUM('Y','N'),
      defaultValue:'N'
    }
}, {
    // Other model options go here
    sequelize, // We need to pass the connection instance
    modelName: 'TaskbuzzLog', // We need to choose the model name
    tableName:'taskbuzz_log',
    timestamps:true,
});
//TaskbuzzLog.hasOne(TaskBuzzTask, {foreignKey: 'taskId', as: 'taskId'})

TaskbuzzLog.belongsTo(TaskBuzzTask,{
  foreignKey: {
    name: 'taskId'
  }
});
module.exports=TaskbuzzLog;