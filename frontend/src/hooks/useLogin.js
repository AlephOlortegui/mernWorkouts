import { useState } from 'react';
import { useAuthContext } from './useAuthContext';

const useLogin = () => {
    const [error, setError] = useState(null)
    const [isLoading, setIsLoading] = useState(null)
    const {dispatch} = useAuthContext()


    const login = async (email,password) => { 
        setIsLoading(true)
        setError(null)

                        // not using the base URL localhost:4000 due to proxy was created at package.json
        const response = await fetch('/api/user/login',{
            method: "POST",
            headers: {"Content-Type":"application/json"},
            body: JSON.stringify({email,password})
        })

        const json = await response.json()
        if(!response.ok){
            setIsLoading(false)
            setError(json.error)
        }

        if(response.ok){
            // JWT al LocalStorage so if the user closes the browser and they open it up again, users will be logged in! :v
            localStorage.setItem('user', JSON.stringify(json))
            dispatch({
                type: 'LOGIN',
                payload: json
            })
            setIsLoading(false)
        }

    }

  return {login, isLoading, error}
}

export default useLogin