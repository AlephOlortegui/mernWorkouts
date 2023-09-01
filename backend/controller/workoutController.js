const Workout = require('../models/Workout')

const mongoose = require('mongoose')

const getWorkouts = async (req,res) => { 
  try {
      //from the requireAuth.js middleware
      const user_id = req.user._id
      const workouts = await Workout.find({user_id}).sort({createdAt: -1}) 
      //.find().sort({createdAt: -1}) //NEW to oldest
      return res.status(200).json(workouts)

  } catch (err) {
      return res.status(500).json({
          success: false,
          error: err.message
      })
  }
}

const getWorkout = async (req,res) => { 
  try {
      const {id} = req.params

      if(!mongoose.Types.ObjectId.isValid(id)){
          return res.status(404).json({
              success: false,
              error: 'Not valid ID'
          });
      }

      const workout = await Workout.findById(id)

      if(!workout) {
          return res.status(404).json({
              success: false,
              error: 'No workout found'
          });
      }

      return res.status(200).json(workout)

  } catch (err) {
      return res.status(500).json({
          success: false,
          error: err.message
      })
  }
}

const createWorkout = async (req,res) => { 
  let emptyFields = []
  //console.log(req.body)
  if (!req.body.title) {
      emptyFields.push('title')
  }
  if (!req.body.load) {
      emptyFields.push('load')
  }
  if (!req.body.reps) {
      emptyFields.push('reps')
  }
  if (emptyFields.length > 0) {
      return res.status(400).json({ error: 'Please fill in all fields', emptyFields })
  }

  try {
      const {title, load, reps} = req.body;
      //from the requireAuth.js middleware  req.user = await User.findOne({_id}).select('_id')
      const user_id = req.user._id;
      const newWorkout = await Workout.create({title, load, reps, user_id})//create(req.body)
      return res.status(201).json(newWorkout)

  } catch (err) {
      return res.status(500).json({
          success: false,
          error: err.message
      })
  }
}

const deleteWorkout = async (req,res) => { 
  try {
      const { id } = req.params

      if(!mongoose.Types.ObjectId.isValid(id)){
          return res.status(404).json({
              success: false,
              error: 'Not valid ID'
          });
      }

      const workout = await Workout.findOneAndDelete({_id: id})

      if(!workout){
          return res.status(400).json({
            success: false,
            error: 'No workout found'
          })
      }

      return res.status(200).json(workout);

  } catch (err) {
      return res.status(500).json({
          success: false,
          error: err.message
      })
  }
}

const updateWorkout = async (req,res) => { 
      let emptyFields = []
      //console.log(req.body)
      if (!req.body.title) {
          emptyFields.push('title')
      }
      if (!req.body.load) {
          emptyFields.push('load')
      }
      if (!req.body.reps) {
          emptyFields.push('reps')
      }
      if (emptyFields.length > 0) {
          return res.status(400).json({ error: 'Please fill in all fields', emptyFields })
      }

  try {
      const { id } = req.params

      if (!mongoose.Types.ObjectId.isValid(id)) {
          return res.status(400).json({error: 'No such workout ID'})
      }
  
      // spread operator going to overwrite any other property
      // Model.findOneAndUpdate(filter, update);
      const workout = await Workout.findOneAndUpdate({_id: id}, {...req.body}, {new:true})
  
      if (!workout) {
          return res.status(400).json({error: 'No such workout'})
      }
  
      res.status(200).json(workout)

  } catch (err) {
      return res.status(500).json({
          success: false,
          error: err.message
      })
  }
}

module.exports = {getWorkouts,getWorkout, 
  createWorkout, deleteWorkout, updateWorkout}