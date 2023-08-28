import { createContext, useReducer } from "react"

const initialState = {
  workouts: []
}

export const WorkoutContext = createContext()

const WorkoutReducer = (state, action) => { 
  switch (action.type) {
    case 'SET_WORKOUTS':
      return {
        ...state,
        workouts: action.payload
      }  
    case 'CREATE_WORKOUT':
      return {
          ...state,
          workouts: [action.payload, ...state.workouts]
      }
    default:
      return state
  }
 }

export const WorkoutProvider = ({children}) => { 
  const [state, dispatch] = useReducer(WorkoutReducer, initialState)
  return(
    <WorkoutContext.Provider value={{state, dispatch}}>
      {children}
    </WorkoutContext.Provider>
  )
 }