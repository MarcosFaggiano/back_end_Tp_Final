module.exports = (sequelize, DataTypes) => {


  let alias= "users";
  let cols = {
    id_message: {
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
      type: DataTypes.BOOLEAN,
      allowNull: false,
    },
  };

  

let config = {
  tableName:"messages",
  timestamps: false,
};

const Usuario = sequelize.define(alias, cols, config);

return Usuario

}