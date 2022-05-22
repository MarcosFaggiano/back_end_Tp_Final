let db = require("../database/models");
const bcrypt = require("bcrypt");
// Consultar si el models trae todos los modelos o hay que hacer referencia al de usuario
// const User = require("../database/models/User");

// OK Metodo list, se genera para traer todos los datos del usuario
module.exports = User_controller = {
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
 // OK crear usuario
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

  user: db.User.beforeCreate(async (user, options) => {
    const salt = await bcrypt.genSalt();
    return bcrypt
      .hash(user.password, salt)
      .then((hash) => {
        user.password = hash;
      })
      .catch((err) => console.log(err));
  }),

  // -----------------------------------------------------------------------------------------------------------------------//
  login: async (req, res) => {
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
  // Casilla Enviar

  //

  SendMessageToId: async (req, res) => {
    console.log(req.body);
    const data = ({ message, id_receiver, isRead } = req.body);
    const { username } = req.params;
    const newMessage = await db.Message.create({
      ...data,
      id_user: parseInt(username),
      isRead: 0,
    });
    res.json({ status: http.StatusCodes.OK, data: newMessage });
  },

  // deleteUser: async(req, res) => {
  //   const data =({username: id}) = req.params;
  //   try {
  //     const result = await db.username.delete({ ...data,id_user: parseInt(username), })
  //   } catch (error) {

  //   }
  // }
};
