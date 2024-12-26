const knex = require("knex")(require("../../knexfile").development);

async function saveMessage(called) {
  return await knex("messages").insert({
    number: called.number,
    firstMessage: called.first,
    nameMessage: called.name,
    unitMessage: called.unit,
    typeMessage: called.type,
    optionMessage: called.option,
    detailMessage: called.detail,
    situation: called.situation
  });
}

async function getAllMessages() {
  return await knex("messages").select("*");
}

async function getMessagesByUser(number) {
  return await knex("messages").where({ number: number }).select("*");
}

async function getMessagesByType(type) {
  return await knex("messages").where({ typeMessage: type }).select("*");
}

async function getMessagesByDay() {
  const now = new Date();
  const dateOnly = now.toISOString().split("T")[0];
  console.log(dateOnly); // Saída: "AAAA-MM-DD"
  return await knex("messages").whereRaw('DATE(timestamp) = ?', [dateOnly]).select("*");
}

async function updateMessageSituation(id) {
  return await knex('messages').where({ id: id }).update({ situation: 'solved' })
}

async function deleteMessageById(id){
  return await knex('messages').where({ id: id }).del()
}


module.exports = {
  saveMessage,
  getMessagesByUser,
  getAllMessages,
  getMessagesByType,
  getMessagesByDay,
  updateMessageSituation,
  deleteMessageById
};
