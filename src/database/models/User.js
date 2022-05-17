const bcrypt = require("bcrypt");
module.exports = (sequelize, DataTypes) => {
  
  
  let alias= "User";
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
  tableName:"user",
  timestamps: false,
};

const Usuario = sequelize.define(alias, cols, config); 


Usuario.associate = (models) => {

Usuario.hasMany(models.Message,{
  foreignKey: "id" ,
  as: "sender"
})


Usuario.hasMany(models.Message,{
  foreignKey: "id" ,
  as: "receiver"
})


}

// hasMany = tiene muchos
// belongTo= Pertenece a

Usuario.beforeCreate(async (user, options) => {
  const salt = await bcrypt.genSalt();
  return bcrypt
    .hash(user.password, salt)
    .then((hash) => {
      user.password = hash;
    })
    .catch((err) => console.log(err));
});


return Usuario

}


