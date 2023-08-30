const jwt = require('jsonwebtoken')
const User = require('../models/userModel')

const requireAuth = async (req,res,next) => { 
  //verify if that user is authenticated
  const {authorization} = req.headers; 
  //that will contains our jwt

  if(!authorization){
    return res.status(401).json({error: 'Authorization token required'}) 
  }

  // authorization is a string: "Bearer J.W.T"
  const token = authorization.split(" ")[1]
  try {
    console.log(jwt.verify(token, process.env.SECRET))
    const {_id} = jwt.verify(token, process.env.SECRET)
    // use the _id to try to find it in the DB
    req.user = await User.findOne({_id}).select('_id') //just returning the _id, nothing else
    next();
  } catch (err) {
      console.log(err)
      res.status(401).json({error: 'Request is not authorized'})
  }
}

module.exports = requireAuth