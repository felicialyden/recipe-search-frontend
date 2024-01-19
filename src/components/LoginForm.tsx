import { useContext } from "react";
import { AuthContext } from "../contexts/AuthContext";

const LoginForm = () => {
    const { updateLoginState } = useContext(AuthContext)
  return (
    <form className="flex flex-col gap-2 max-w-xs self-center w-full">
      <h1>Log in</h1>
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
      <button className="btn btn-primary max-w-xs">Log in</button>
      <p className=" mt-4">Don't have an account yet? <span className="cursor-pointer underline" onClick={() => updateLoginState('signup')}>Sign up</span></p>
    </form>
  );
};

export default LoginForm;
