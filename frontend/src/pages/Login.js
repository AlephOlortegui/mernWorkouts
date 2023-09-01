import useLogin from "../hooks/useLogin"
import AuthForm from "../comp/AuthForm"

const Login = () => {
  const {login, isLoading, error} = useLogin()

  return <AuthForm type='login' mthd={login} isLoading={isLoading} error={error}/>
}

export default Login
