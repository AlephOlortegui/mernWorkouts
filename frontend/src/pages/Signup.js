import useSignup from '../hooks/useSignup'
import AuthForm from '../comp/AuthForm'

const Signup = () => {
  const {signup, isLoading, error} = useSignup()

  return <AuthForm type='signup' mthd={signup} isLoading={isLoading} error={error}/>
}

export default Signup