import { useContext } from "react"
import LoginForm from "../components/LoginForm"
import { AuthContext } from "../contexts/AuthContext"
import SignupForm from "../components/SignupForm"

const Login = () => {
    const { loginState } = useContext(AuthContext)

  return (
    <div className="flex flex-col">
        {loginState === 'login' ?
         <LoginForm /> :
         <SignupForm />
        }
    </div>
  )
}

export default Login