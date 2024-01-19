import { useContext } from "react";
import { AuthContext } from "../contexts/AuthContext";

const SignupForm = () => {
  const { updateLoginState } = useContext(AuthContext)
  return (
    <form className="flex flex-col gap-2 max-w-xs self-center w-full">
      <h1>Sign up</h1>
      <input
        type="text"
        placeholder="Username"
        className="input input-bordered w-full w-xs"
      />
      <input
        type="password"
        placeholder="Password"
        className="input input-bordered w-full max-w-xs"
      />
      <button className="btn btn-primary max-w-xs">Sign up</button>
      <p className=" mt-4">Already have an account? <span className="cursor-pointer underline" onClick={() => updateLoginState('login')}>Log in</span></p>
    </form>
  );
};

export default SignupForm;
