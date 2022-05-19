let db = require("../database/models");
const jwt = require("jsonwebtoken");
// Consultar si el models trae todos los modelos o hay que hacer referencia al de usuario
// const User = require("../database/models/User");

// Metodo list, se genera para traer todos los datos del usuario
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
  signUp: async (req, res) => {
    const data = ({ firstname, lastname, username, password, city, country } =
      req.body);
    console.log(
      "🚀 ~ file: User_controller.js ~ line 22 ~ signUp ~ data",
      req.body
    );

    // con el codigo de abajo: Verificamos que no se ingresn usuarios repetidos
    try {
      const exists_Usuario = await db.user.findAll({
        where: {
          username: data.username,
        },
        attributes: ["firstname", "username"],
      });
      // con el codigo de abajo: si todo va bien y el usuario no esta repetido, vamos a crear un token que son creados en la funsion de la linea 52
      if (!exists_Usuario.count) {
        const user = await db.user.create(data);
        if (user) {
          const token = _createToken(user.id, user.username);
          res.set("Authorization", "Bearer " + token);
          return res.json({ status: http.StatusCodes.OK, data: user });
        }
      }

      return res.json({
        status: http.StatusCodes.BAD_REQUEST,
        data: "Existing username, enter another",
      });
    } catch (error) {
      console.log("error: ", error);
      return res.json({
        status: http.StatusCodes.INTERNAL_SERVER_ERROR,
        data: {},
      });
    }
  },

  // -----------------------------------------------------------------------------------------------------------------------//

  createToken: (id, username) => {
    return jwt.sign({ id, username }, process.env.JWT_SECRET, {
      expiresIn: "30m",
    });
  },

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
  // Inbox
  receivedMessagesById: async (req, res) => {
    const { username: id } = req.params;
    //VALIDAR ID url = ID LOGIN
    try {
      const result = await db.Message.findAll({
        where: {
          id_receiver: id,
        },
        include: {
          model: db.User,
          association: "user_message",
        },
      });

      res.json({ result });
    } catch (error) {
      console.log(error);
      res.json({ error });
    }
  },

  // -----------------------------------------------------------------------------------------------------------------------//
  // Enviados
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
