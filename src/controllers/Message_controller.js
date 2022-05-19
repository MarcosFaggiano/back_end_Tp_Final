let db = require ('../database/models');
const http = require("http-status-codes");


module.exports = Message_controllers ={

  deleteMessage : async (req, res) => {
    const { id: id } = req.params;
    const message = await db.Message.findOne({where: {id}})
    await message.destroy()
    res.json({ status: http.StatusCodes.OK, data: "Message deleted successfully"});
  },
  
  readMessage : async (req, res) => {
    console.log(req.body);
    const body =  req.body;
    const { id: id } = req.params;
    let message = await db.Message.findOne({where: {id}})
    message = await message.update(body)
  
    console.log("Entro en el read")
    res.json({ status: http.StatusCodes.OK, data: "Message update successfully", message: message});
  },









}