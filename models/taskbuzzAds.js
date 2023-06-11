const { Sequelize, DataTypes, Model, TEXT } = require('sequelize');
const sequelize = require("../config/database");
class TaskbuzzAds extends Model{
   
}
TaskbuzzAds.init({
    // Model attributes are defined here
    id:{
        type:DataTypes.INTEGER,
        autoIncrement:true,
        primaryKey:true
    },
    adSize: {
      type: DataTypes.STRING,
      defaultValue:''
    },
    adUnitID: {
      type: DataTypes.STRING,
      defaultValue:''
    },
    imageUrl:{
        type:TEXT,
        allowNull: true
    },
    status: {
      type: DataTypes.ENUM('active', 'inactive'),
      defaultValue:'active'
    },
    isDeleted: {
      type: DataTypes.ENUM('Y','N'),
      defaultValue:'N'
    }
}, {
    // Other model options go here
    sequelize, // We need to pass the connection instance
    modelName: 'taskbuzzAds', // We need to choose the model name
    tableName:'taskbuzz_ads',
    timestamps:true,
});


/*
AgentDetials.hasOne(User,{
  foreignKey: {
    name: 'agentId'
  }
});*/
module.exports=TaskbuzzAds;