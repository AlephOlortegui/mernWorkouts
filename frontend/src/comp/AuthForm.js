import { useState } from 'react'

const AuthForm = ({type, mthd, isLoading, error}) => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()

    console.log(email, password)
    await mthd(email, password)
  }

  return (
     <form className={type} onSubmit={handleSubmit}>
      <h3>{type === "login" ? "Log In" : "Sign Up"}</h3>
      
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

      <button disabled={isLoading}>{type === "login" ? "Log In" : "Sign Up"}</button>
      {error && <div className="error">{error}</div>}
    </form>
  )
}

export default AuthForm