const express = require('express')
const router = express.Router();
const requireAuth = require('../middleware/requireAuth')

const {getWorkouts, createWorkout,
  getWorkout, deleteWorkout,
  updateWorkout} = require('../controller/workoutController')

// This middleware has to go before because we need to protect the routes
router.use(requireAuth)
// in order to get access to the rest of the routes, user needs to be authenticated

// Specific to General routes
router
 .route('/:id')
 .get(getWorkout)
 .delete(deleteWorkout)
 .patch(updateWorkout)

router
  .route('/')
  .get(getWorkouts)
  .post(createWorkout)


module.exports = router