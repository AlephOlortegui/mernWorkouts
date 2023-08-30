import { useState } from "react"
import useLogin from "../hooks/useLogin"

const Login = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const {login, isLoading, error} = useLogin()

  const handleSubmit = async (e) => {
    e.preventDefault()

    console.log(email, password)
    await login(email, password)
  }

  return (
    <form className="login" onSubmit={handleSubmit}>
      <h3>Log In</h3>
      
      <label>Email address:</label>
      <input 
        type="email" 
        onChange={(e) => setEmail(e.target.value)} 
        value={email} 
      />
      <label>Password:</label>
      <input 
        type="password" 
        onChange={(e) => setPassword(e.target.value)} 
        value={password} 
      />

      <button disabled={isLoading}>Log in</button>
      {error && <div className="error">{error}</div>}
    </form>
  )
}

export default Login
/*
  the problem is if we refresh the page React says user:null
  but in the browser we still have our localStorage so technically we are logged in
  so we need to tell React
  Hey check if there is something in the LS
  if so ... then change the state to logged in becasue there is information
  otherwise just dont.

  BUT WHERE DO WE CHECK THAT?
  in the AuthContext.js - with LS useEffect
*/