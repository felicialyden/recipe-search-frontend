import { SyntheticEvent, useContext } from "react";
import { AuthContext } from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { Response } from "../types"
import { RecipeContext } from "../contexts/RecipeContext";

const LoginForm = () => {
    const { updateLoginState, loginUser } = useContext(AuthContext)
    const { getSavedRecipes } = useContext(RecipeContext)
    const navigate = useNavigate()

    const handleLogin = async(e: SyntheticEvent) => {
      e.preventDefault()
      const form = e.target as HTMLFormElement
      const username = (form.elements.namedItem('login-username') as HTMLInputElement).value
      const password = (form.elements.namedItem('login-password') as HTMLInputElement).value
      try {
        const response = await loginUser(username, password) as Response
        console.log(response)
        if(!response.success) {
          throw response.error
        }
        form.reset()
        toast.success("Successfully logged in")
        getSavedRecipes(response.userId as string)
        navigate('/')
      } catch (error) {
        console.log(error)
        toast.error(`${error}`)
      }
    }

  return (
    <form onSubmit={handleLogin} className="flex flex-col gap-2 max-w-xs self-center w-full">
      <h1>Log in</h1>
      <input
        type="text"
        placeholder="Username"
        className="input input-bordered w-full w-xs"
        name="login-username"
      />
      <input
        type="password"
        placeholder="Password"
        className="input input-bordered w-full max-w-xs"
        name="login-password"
      />
      <button className="btn btn-primary max-w-xs">Log in</button>
      <p className=" mt-4">Don't have an account yet? <span className="cursor-pointer underline" onClick={() => updateLoginState('signup')}>Sign up</span></p>
    </form>
  );
};

export default LoginForm;
