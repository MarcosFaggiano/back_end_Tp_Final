let db = require ('../database/models');
const http = require("http-status-codes");

module.exports = Message_controllers ={

// -----------------------------------------------------------------------------------------------------------------------//
// Eliminar mensaje
  deleteMessage : async (req, res) => {

try {
  const { id: id } = req.params;
  const message = await db.Message.findOne({where: {id}})
  await message.destroy()
  res.json({ status: http.StatusCodes.OK, data: "Message deleted successfully"});
} catch (e) {
  res.send(e)
}
},
  
  readMessage : async (req, res) => {
    try { // este controller lo analizamos posterior al final del proyecto.
      console.log(req.body);
      const body =  req.body;
      const { id: id } = req.params;
      let message = await db.Message.findOne({where: {id}})
      message = await message.update(body)
      console.log("Entro en el read")
      res.json({ status: http.StatusCodes.OK, data: "Message update successfully", message: message});
    } catch (e) {
      res.send(e)  
    }
  },
  









}