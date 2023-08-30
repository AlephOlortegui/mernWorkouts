import { useEffect, createContext, useReducer } from 'react';

const initialState ={
  user: null
}

export const AuthContext = createContext()

const AuthReducer = (state,action) => { 
  switch (action.type) {
    case "LOGIN":
      return {user: action.payload}
    case "LOGOUT":
      return {user: null}
    default:
      return state
  }
 }

export const AuthProvider = ({children}) => {
  const [state, dispatch] = useReducer(AuthReducer, initialState)

  // See the Login.js for the reason of using useEffect Hook here
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'))
    if(user) {
      dispatch({
          type: 'LOGIN',
          payload: user
      })
    } 
  }, [])

  console.log('Auth context state ', state)
  return (
    <AuthContext.Provider value={{...state, dispatch}}>
      {children}
    </AuthContext.Provider>
  )
}
