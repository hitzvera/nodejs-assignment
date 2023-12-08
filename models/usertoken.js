"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class userToken extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      userToken.belongsTo(models.User, {
        foreignKey: "userId",
        as: "user",
      });
    }
  }
  userToken.init(
    {
      id: {
        primaryKey: true,
        allowNull: false,
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
      },
      userId: {
        type: DataTypes.UUID,
        allowNull: false,
      },
      token: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "userToken",
    }
  );
  return userToken;
};
