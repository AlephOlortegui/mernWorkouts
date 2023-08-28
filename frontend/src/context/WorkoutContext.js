import { createContext, useReducer } from "react"

const initialState = {
  workouts: [],
  workoutToEdit: null
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
    case 'GET_ONE_WORKOUT':
      return {
          ...state,
          workoutToEdit: action.payload
      }
    case "CANCEL_EDIT":
      return { 
        ...state,
        workoutToEdit: null
      }
    case "PATCH_WORKOUT":
      return {
        ...state,
        workoutToEdit: null,
        workouts: state.workouts.map(w => {
          if(w._id === action.payload._id){
              return {
                  ...w,
                  title:action.payload.title, 
                  reps:action.payload.reps, 
                  load:action.payload.load
              }
          }
          return w
        })
      }
    case 'DELETE_WORKOUT':
      return{
          ...state,
          workouts: state.workouts.filter(w => w._id !== action.payload._id)
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