module.exports = (sequelize, DataTypes) => {
  let alias = "User";
  let cols = {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    firstname: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    lastname: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    username: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    country: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    city: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  };

  let config = {
    tableName: "user",
    timestamps: true,
  };

  const Usuario = sequelize.define(alias, cols, config);

  Usuario.associate = (models) => {
    Usuario.hasMany(models.Message, {
      foreignKey: "id_user",
      as: "message_user",
    });

  Usuario.hasMany(models.Message, {
    foreignKey: "id_receiver",
    as: "message_user2",
  });



  };
//----------------------------------------------
// Usuario.associate = (models) => {
//   Usuario.hasMany(models.Message, {
//     foreignKey: "id_receiver",
//     as: "message_user2",
//   });
// };

  return Usuario;
};
