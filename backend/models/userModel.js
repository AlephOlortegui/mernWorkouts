const mongoose = require('mongoose')
const Schema = mongoose.Schema
const bcrypt = require('bcrypt')
const {isEmail, isStrongPassword} = require('validator')

const userSchema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  }
})

// Static Signup Method  .statics.whatever_name_you_want_to_put
userSchema.statics.signup = async function (email,password) {

  //validation
  if(!email || !password){
    throw Error('All fields must be filled')
  }

  if(!isEmail(email)){
    throw Error('Email is not valid')
  }

  if(!isStrongPassword(password)){
    throw Error('Password not strong enough')
  }

    //this = USer model
    const exits = await this.findOne({email})
    if(exits){
        throw Error('Email already in use')
    }
    const salt = await bcrypt.genSalt(10) //level encription
                                    //(to hash, the salt) 
    const hash = await bcrypt.hash(password, salt)
    const user = await this.create({email, password: hash})
    return user
}

userSchema.statics.login = async function(email, password){
  //validation
  if(!email || !password) throw Error('All fields must be filled')
  
  const user = await this.findOne({email})
  if(!user) throw Error('Incorrect email')
  
  const match = await bcrypt.compare(password, user.password) //booleea n
  if(!match) throw Error('Incorrect password')

  return user
}

const User = mongoose.model('User',userSchema)
module.exports = User