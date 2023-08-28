//date-fns
import formatDistanceToNow from 'date-fns/formatDistanceToNow'
import useWorkoutsContext from '../hooks/useWorkoutsContext'

const WorkoutDetails = ({workout}) => {
  const {dispatch} = useWorkoutsContext()
  const oneWorkout = () => { 
    console.log(workout)
    dispatch({type: 'GET_ONE_WORKOUT', payload: workout})
  }
  return (
    <div className="workout-details">
      <h4>{workout.title}</h4>
      <p><strong>Load (kg): </strong>{workout.load}</p>
      <p><strong>Number of reps: </strong>{workout.reps}</p>
      <p>Original created {formatDistanceToNow(new Date(workout.createdAt), {addSuffix: true})}</p>
      <span className="material-symbols-outlined">delete</span>
      <span className="edit" onClick={oneWorkout}>Edit</span>
    </div>
  )
}

export default WorkoutDetails