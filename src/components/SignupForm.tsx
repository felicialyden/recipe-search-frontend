import { SyntheticEvent, useContext, useState } from "react";
import { AuthContext } from "../contexts/AuthContext";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { Response } from "../types"

const SignupForm = () => {
  const [loading, setLoading] = useState(false)
  const { updateLoginState, signUpUser } = useContext(AuthContext)
  const navigate = useNavigate()

  const handleSignup = async(e: SyntheticEvent) => {
    e.preventDefault()
    const form = e.target as HTMLFormElement
    const email = (form.elements.namedItem('signup-email') as HTMLInputElement).value
    const password = (form.elements.namedItem('signup-password') as HTMLInputElement).value
    const confirmPassword = (form.elements.namedItem('signup-confirm') as HTMLInputElement).value
    const emailRegex = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/g
    if (!email.match(emailRegex)){
      document.querySelector('input[name="email"]')?.classList.add('input-error')
      toast.error('Please enter a valid email address')
      return
    } else if (!email || !password || !confirmPassword) {
      toast.error('Please fill out all fields')
      return 
    } else if(password !== confirmPassword) {
      toast.error('Passwords not matching')
      return 
  }
    try {
      setLoading(true)
      const response = await signUpUser(email, password) as Response
      if(!response.success) {
        throw response.error
      }
      form.reset()
      toast.success("Successfully signed up")
      navigate('/')
    } catch (error) {
      toast.error(`${error}`)
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={(e) => handleSignup(e)} className="flex flex-col gap-2 max-w-xs self-center w-full">
      <h1>Sign up</h1>
      <input
        type="text"
        name="signup-email"
        placeholder="Email address"
        className="input input-bordered w-full w-xs"
      />
      <input
        type="password"
        name="signup-password"
        placeholder="Password"
        className="input input-bordered w-full max-w-xs"
      />
      <input
        type="password"
        name="signup-confirm"
        placeholder="Confirm password"
        className="input input-bordered w-full max-w-xs"
      />
      <button type="submit" className="btn btn-primary btn-sm max-w-xs mt-2">
      {loading && <span className="loading loading-spinner h-4 w-4"></span>}
      {loading? 'Creating account': 'Sign up'}
        </button>
      <p className=" mt-4">Already have an account? <span className="cursor-pointer underline" onClick={() => updateLoginState('login')}>Log in</span></p>
    </form>
  );
};

export default SignupForm;
