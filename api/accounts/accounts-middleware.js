
const accounts = require("./accounts-model")

function checkAccountPayload() {
  return (req, res, next) => {
    if(!req.body.name || !req.body.budget) {
      return res.status(400).json({
        message: "name and budget are required" 
      })
    }

    if (typeof req.body.name !== "string"){
      return res.status(400).json({
        message: "name of account must be a string" 
      })
    }

    if (req.body.name.length < 3 || req.body.name.length > 100){
      return res.status(400).json({
        message: "name of account must be between 3 and 100" 
      })
    }

    if (req.body.budget !== "number"){
      return res.status(400).json({
        message: "budget of account must be a number"
      })
    }

    if (req.body.budget < 0 || req.body.budget > 1000000){
      return res.status(400).json({
        message: "budget of account is too large or too small"
      })
    }
    next()
  }
}

function checkAccountNameUnique() {
  return async (req, res, next) => {
    try {
      const [accountName] = await accounts.getById({ name: req.body.name})

      if (accountName) {
        return res.status(400).json({
          message: "that name is taken" 
        })
      }

    } catch (err) {
      next(err)
    }
  }
  
}

function checkAccountId() {
  return async (req, res, next) => {

    try {
      const account = await accounts.getById(req.params.id)
      if(account) {
        req.account = account 
        next()
      } else {
        res.status(404).json({
          message: "Account not found"
        })
      }
      
    } catch (err) {
      next(err)
    }
    
  }
}

module.exports = { 
  checkAccountPayload,
  checkAccountNameUnique,
  checkAccountId

}