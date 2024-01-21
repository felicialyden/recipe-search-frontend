import { SyntheticEvent, useContext } from "react";
import { AuthContext } from "../contexts/AuthContext";

const SignupForm = () => {
  const { updateLoginState, signUpUser } = useContext(AuthContext)

  const handleSignup = async(e: SyntheticEvent) => {
    e.preventDefault()
    const form = e.target as HTMLFormElement
    const username = (form.elements.namedItem('signup-username') as HTMLInputElement).value
    const password = (form.elements.namedItem('signup-password') as HTMLInputElement).value
    const response = await signUpUser(username, password)
    console.log(response)
    form.reset()
  }

  return (
    <form onSubmit={(e) => handleSignup(e)} className="flex flex-col gap-2 max-w-xs self-center w-full">
      <h1>Sign up</h1>
      <input
        type="text"
        name="signup-username"
        placeholder="Username"
        className="input input-bordered w-full w-xs"
      />
      <input
        type="password"
        name="signup-password"
        placeholder="Password"
        className="input input-bordered w-full max-w-xs"
      />
      <button type="submit" className="btn btn-primary max-w-xs">Sign up</button>
      <p className=" mt-4">Already have an account? <span className="cursor-pointer underline" onClick={() => updateLoginState('login')}>Log in</span></p>
    </form>
  );
};

export default SignupForm;
