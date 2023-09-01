//date-fns
import formatDistanceToNow from 'date-fns/formatDistanceToNow'
import useWorkoutsContext from '../hooks/useWorkoutsContext'
import { useAuthContext } from '../hooks/useAuthContext'
import { FaTrash, FaEdit  } from 'react-icons/fa';

const WorkoutDetails = ({workout}) => {
  const {dispatch, state: {workoutToEdit}} = useWorkoutsContext()
  const {user} = useAuthContext()

  const handleClick = async () => { 

    if(!user) return

    const res = await fetch(`/api/workouts/${workout._id}`,{
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${user.token}`
      }
    })
    //getting the doc we've just deleted
    const json = await res.json()
    //console.log(json)
    if(res.ok){
      dispatch({type: 'DELETE_WORKOUT', payload: json})
    }
  }

  const oneWorkout = () => { 
    //console.log(workout)
    if(!user){
      console.log('user is not authenticated YOU CANNOT DO ANYTHING')
      return
    }
    dispatch({type: 'GET_ONE_WORKOUT', payload: workout})
  }
  return (
    <div className="workout-details">
      <h4>{workout.title}</h4>
      <p><strong>Load (kg): </strong>{workout.load}</p>
      <p><strong>Number of reps: </strong>{workout.reps}</p>
      <p>Original created {formatDistanceToNow(new Date(workout.createdAt), {addSuffix: true})}</p>
      {!workoutToEdit && 
      <span className="material-symbols-outlined" onClick={handleClick}>
        <FaTrash />
      </span> }
      <span className="edit" onClick={oneWorkout}><FaEdit /></span>
    </div>
  )
}

export default WorkoutDetails