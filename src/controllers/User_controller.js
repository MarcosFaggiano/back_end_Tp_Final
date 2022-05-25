let db = require("../database/models");
const bcrypt = require("bcrypt");
const http = require("http-status-codes");


module.exports = User_controller = {

// -----------------------------------------------------------------------------------------------------------------------//
// OK Metodo list, se genera para traer todos los datos del usuario
  list: async (req, res) => {
    try {
      let allUsers = await db.User.findAll();
      console.log(allUsers);
      res.json({
        status: 200,
        user: allUsers,
      });
    } catch (error) {
      res.send(error);
    }
  },
  // -----------------------------------------------------------------------------------------------------------------------//
// OK Crear Usuario
  signUp: async (req, res) => {
    const data = ({ firstname, lastname, username, password, city, country}= req.body)
    try {
      let createUser = await db.User.create(data);
      console.log(createUser);
      res.json({
        status: 200,
        user: createUser,
      });
    } catch (error) {
      res.send(error);
    }
  },
// -----------------------------------------------------------------------------------------------------------------------//
//ok hasheo de pass
  user: db.User.beforeCreate(async (user, options) => {
    const salt = await bcrypt.genSalt();
    return bcrypt
      .hash(user.password, salt)
      .then((hash) => {
        user.password = hash;
      })
      .catch((err) => console.log(err));
  }),

//ok Compara el password que esta ingresando el usuario con guardado y hasheado en la db ,
// lo desencripta y si coincide le da acceso.

  User: db.User.prototype.comparePassword = async (passaword, user) => {
    return await bcrypt.compare(passaword, user.password);
  },

// -----------------------------------------------------------------------------------------------------------------------//
  login: async (req, res) => {
    const { username, password } = req.body;

    const user = await db.User.findOne({
      where: {
        username,
      },
    });
    console.log(user);
    // Si el usuario existe debemos comparar la contraseña
    if (user) {
      const result = await user.comparePassword(password, user);
      if (result) {
        return res.json({
          status: http.StatusCodes.OK,
          data: "Autheticated",
          msg: "OK credentials",
        });
      }
    }
    return res.json({
      status: http.StatusCodes.OK,
      data: "Unautheticated",
      msg: "Bad credentials",
    });
  },

// -----------------------------------------------------------------------------------------------------------------------//
// ok Inbox
  receivedMessagesById: async (req, res) => {
    //VALIDAR ID url = ID LOGIN
    try {
      const username = req.params.username;
      console.log("username", username);
      const result = await db.User.findAll({
        where: {
          username: username,
        },
        include: [
          {
            association: "message_user2",
          },
        ],
      });
      res.json({ result });
    } catch (error) {
      console.log(error);
      res.json({ error });
    }
  },

// -----------------------------------------------------------------------------------------------------------------------//
// OK Enviados
  sentMessagesById: async (req, res) => {
    //VALIDAR ID url = ID LOGIN
    try {
      const username = req.params.username;
      console.log("username", username);
      const result = await db.User.findAll({
        where: {
          username: username,
        },
        include: [
          {
            association: "message_user",
          },
        ],
      });
      res.json({ result });
    } catch (error) {
      console.log(error);
      res.json({ error });
    }
  },

// -----------------------------------------------------------------------------------------------------------------------//
// Casilla de Enviar

SendMessageToId : async (req, res) => {
  console.log(req.body);
  const data = ({ message, id_receiver, isRead } = req.body);
  const username  = req.params.username;
  const newMessage = await db.Message.create({
    ...data,
    id_user: username,
    isRead: 0
  });
  res.json({ status: http.StatusCodes.OK, data: newMessage });
},

};
