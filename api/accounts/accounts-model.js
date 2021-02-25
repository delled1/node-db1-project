const db = require("../../data/db-config")

const getAll = () => {
  return db.select("*")
    .from("accounts")
}

const getById = id => {
  return db.select("*")
    .from("accounts")
    .where("id", id)
    .limit(1)
}

const create = async account => {
  const [id] = await db
      .insert({
        name: account.name,
        budget: account.budget
      })
      .into("accounts")

  const created = await db("accounts")
      .where("id", id)
      .first()

  return created
}

const updateById = async (id, account) => {

  await db("accounts")
    .where("id", id)
    .update({
      name: account.name,
      budget: account.budget
    })

  const updated = await db("accounts")
    .where("id", id)
    .first()

  return updated
}

const deleteById = async id => {
  await db("accounts")
    .where("id", id)
    .delete()
}

module.exports = {
  getAll,
  getById,
  create,
  updateById,
  deleteById,
}
