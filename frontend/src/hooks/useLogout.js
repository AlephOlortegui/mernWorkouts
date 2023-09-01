import { useAuthContext } from "./useAuthContext"
import useWorkoutsContext from "./useWorkoutsContext"
 
 const useLogout = () => {
  const {dispatch} = useAuthContext()
  const {dispatch: workoutsDispatch} = useWorkoutsContext()

  const logout = () => { 
    //remove user from storage
    localStorage.removeItem('user')
    //dispatch
    dispatch({
      type:'LOGOUT'
    })
    // To show only the workouts of an specific user
    // see backend/wourkoutController/getWorkouts
    workoutsDispatch({type: 'SET_WORKOUTS', payload: null})
  }

  return {logout}
 }
 
 export default useLogout