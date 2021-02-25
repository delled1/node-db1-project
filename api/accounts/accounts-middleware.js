
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

    if (typeof req.body.budget !== "number"){
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
      const allNames = await accounts.getAll()
      const names = allNames.map(account => account.name)
      let name
      if(req.params.id){
        const result = await accounts.getById(req.params.id)
        name = result.name
      } 
      if(name === req.body.name){
        return next()
      }
      if(names.includes(req.body.name)){
        res.status(400).json({
          message: 'that name is taken'
        })
      } else {
        next()
      }
    } catch (err) {
        next(err)
    }
  }
  }

function checkAccountId() {
  return (req,res,next) => {
    accounts.getById(req.params.id)
    .then((action) => {
        if (action) {
            req.action = action
            next()
        } else {
            res.status(404).json({
                message: "Action not found"
            })
        }
    })
    .catch((err) => {
        console.log(err)
        res.status(500).json({
            message: "Error rerieving action"
        })
    })
}
}

module.exports = { 
  checkAccountPayload,
  checkAccountNameUnique,
  checkAccountId

}