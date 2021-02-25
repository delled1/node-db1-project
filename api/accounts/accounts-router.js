const router = require('express').Router()
const accounts = require("./accounts-model")
const { checkAccountPayload, checkAccountNameUnique, checkAccountId} = require ("./accounts-middleware")

router.get('/', async (req, res, next) => {
  try{
    const account = await accounts.getAll()
    res.json(account)
  }
  catch(err){
    next(err)
  }
})

router.get('/:id', async  (req, res, next) => {
  try{

    const [account] = await accounts.getById(req.params.id)
    res.json(account)
  }
  catch(err){
    next(err)
  }
})

router.post('/', checkAccountNameUnique(), checkAccountPayload(), async (req, res, next) => {
  try{

    const account = await accounts.create(req.body)
    res.status(201).json(account)

  }
  catch(err){
    next(err)
  }
})

router.put('/:id', checkAccountPayload(), checkAccountId(), async (req, res, next) => {
  try{
    const account = await accounts.updateById(req.params.id, req.body)
    res.status(201).json(account)
  }
  catch(err){
    next(err)
  }
});

// router.delete('/:id', (req, res, next) => {
//   try{

//   }
//   catch(err){
//     next(err)
//   }
// })

router.use((err, req, res, next) => { // eslint-disable-line
  // CALL next(err) IF THE PROMISE REJECTS INSIDE YOUR ENDPOINTS
  res.status(500).json({
    message: 'something went wrong inside the accounts router',
    errMessage: err.message,
  })
})

module.exports = router;
