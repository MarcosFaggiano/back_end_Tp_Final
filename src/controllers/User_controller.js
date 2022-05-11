let db = require ('../database/models');
// Consultar si el models trae todos los modelos o hay que hacer referencia al de usuario
// const User = require("../database/models/User");

const signUp = async (req, res) => {
  const data = ({ firstname, lastname, username, password, city, country } = req.body);
  console.log(req.body);
  // con el codigo de abajo: Verificamos que no se ingresen usuarios repetidos
  try {
    const exists_user = await db.findAndCountAll({
      where: {
        username: data.username,
      },
      attributes: ["firstname", "username"],
    })
    console.log('exists_user:', exists_user);
    if (!exists_user.count) {
      const user = await db.create(data);
      
        return res.json({ status: http.StatusCodes.OK, data: user });
      }
    return res.json({
      status: http.StatusCodes.OK,
      data: "Existing username, enter another",
    });
  }
  catch (error) {
      console.log("error: ", error);
      return res.json({
        status: http.StatusCodes.INTERNAL_SERVER_ERROR,
        data: {},
      });
    };
  }


  const login = async (req, res) => {
    const { username, password } = req.body;
  
    const user = await db.findOne({
      where: {
        username,
      },
    });
    console.log(user);
// Si el usuario existe debemos comparar la contraseña
    if (user) {
      const result = await user.comparePassword(password, user);
    
      if (result){
      return res.json({
        status: http.StatusCodes.OK,
        data: "Autheticated",
        msg: "OK credentials",
      });
    }

  };
  return res.json({
    status: http.StatusCodes.OK,
    data: "Unautheticated",
    msg: "Bad credentials",
  });
  }

  module.exports = {
    login,
    signUp,
  };