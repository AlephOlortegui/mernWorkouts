import { useEffect } from 'react'
import useWorkoutsContext from '../hooks/useWorkoutsContext'
import Empty from '../comp/Empty'
import WorkoutForm from '../comp/WorkoutForm'
import WorkoutDetails from '../comp/WorkoutDetails'

/* const Home = () => {
    const [workouts, setWorkouts] = useState(null)

    useEffect(() => {
      const fetchWorkouts = async () => { 
        http://localhost:4000 ya no usa eso
        porque ya lo declaramos en el package.json ese proxy 
            const res = await fetch('/api/workouts')
            const json = await res.json()
            console.log(json)
            if(res.ok){
                setWorkouts(json)
            }
       }

       fetchWorkouts()
    }, [])
    
  return (
    <div className="home">
        <div className="workouts">
            {workouts && workouts.map(workout => (
                <WorkoutDetails key={workout._id} workout={workout}/>
            ))}
        </div>
        <WorkoutForm />
    </div>
  )
} */

const Home = () => { 
  const {dispatch, state: {workouts}} = useWorkoutsContext()

  useEffect(() => {
    const fetchWorkouts = async () => { 
      const res = await fetch('/api/workouts')
      const json = await res.json() //  = [{},{}...]

      if(res.ok){
          dispatch({
              type:'SET_WORKOUTS',
              payload: json
          })
      }
     }
  
    fetchWorkouts()
  }, [])

  return(
    <div className="home">
        <div className="workouts">
            {workouts.length > 0 ? (
              workouts.map(workout => (
                <WorkoutDetails key={workout._id} workout={workout}/>
              ))
            ) : (<Empty />)}
        </div>
        <WorkoutForm />
    </div>
  )

}

export default Home