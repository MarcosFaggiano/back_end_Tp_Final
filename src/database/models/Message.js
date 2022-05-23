module.exports = (sequelize, DataTypes) => {
  let alias = "Message";
  let cols = {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    message: {
      type: DataTypes.STRING(144),
      allowNull: false,
    },
    id_user: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    id_receiver: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    isRead: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
    },
  };

  let config = {
    tableName: "messages",
    timestamps: true,
  };

  const Message = sequelize.define(alias, cols, config);

  Message.associate = (models) => {
    Message.belongsTo(models.User, {
      foreignKey: "id_user",
      as: "user_message",
    });

  Message.belongsTo(models.User, {
    foreignKey: "id_receiver",
    as: "user_message2",
  });


    
  };
//----------------------------------------------
// Message.associate = (models) => {


  return Message;
};
