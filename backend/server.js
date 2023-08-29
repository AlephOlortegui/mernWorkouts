const express = require('express')
const workoutRoutes = require('./routes/workoutRoutes')
const userRoutes = require('./routes/userRoutes')
const connectDB = require('./db/db')

require('dotenv').config()
// the config method it's going to attach those enviornment variables for us to the process object

const app = express();

connectDB(app)

// sets up middleware for parsing JSON data in incoming HTTP requests.
app.use(express.json())

app.use((req,res,next) => {
  console.log(req.path, req.method)
  next()
})

//app.use(myRoute, routesFile)
app.use('/api/workouts', workoutRoutes)
app.use('/api/user', userRoutes)
/* when we fire a request to 'myRoute' 
  then I want to use xRoutes
*/