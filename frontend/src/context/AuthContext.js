import { useEffect, createContext, useReducer } from 'react';

const initialState ={
  user: null
}

export const AuthContext = createContext()

const AuthReducer = (state,action) => { 
  switch (action.type) {
    case "LOGIN":
      return {user: action.payload}
    default:
      return state
  }
 }

export const AuthProvider = ({children}) => {
  const [state, dispatch] = useReducer(AuthReducer, initialState)
  console.log('Auth context state ', state)
  return (
    <AuthContext.Provider value={{...state, dispatch}}>
      {children}
    </AuthContext.Provider>
  )
}
