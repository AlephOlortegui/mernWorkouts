//date-fns
import formatDistanceToNow from 'date-fns/formatDistanceToNow'

const WorkoutDetails = ({workout}) => {
  return (
    <div className="workout-details">
      <h4>{workout.title}</h4>
      <p><strong>Load (kg): </strong>{workout.load}</p>
      <p><strong>Number of reps: </strong>{workout.reps}</p>
      <p>Original created {formatDistanceToNow(new Date(workout.createdAt), {addSuffix: true})}</p>
      <span className="material-symbols-outlined">delete</span>
      <span className="edit">Edit</span>
    </div>
  )
}

export default WorkoutDetails