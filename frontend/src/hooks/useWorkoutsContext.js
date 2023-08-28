import { WorkoutContext } from "../context/WorkoutContext";
import { useContext } from 'react';

const useWorkoutsContext = () => {
    const context = useContext(WorkoutContext)
    //where context = {state, dispatch} 
    
    /* check we our within the scope of the context we are trying to use */
    if(!context) {
        throw Error('useWorkoutsContext must be used inside an WorkoutsContextProvider')
    }
    
  return context
}

export default useWorkoutsContext