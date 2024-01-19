const LoginForm = () => {
  return (
    <form className="flex flex-col gap-2 max-w-xs self-center w-full">
      <h1>Log in</h1>
      <input
        type="text"
        placeholder="Username"
        className="input input-bordered w-full w-xs"
        required
      />
      <input
        type="email"
        placeholder="Email"
        className="input input-bordered w-full max-w-xs"
        required
      />
      <button className="btn btn-primary max-w-xs">Log in</button>
      <p className=" mt-4">Don't have an account yet? Sign up</p>
    </form>
  );
};

export default LoginForm;
