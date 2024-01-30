import { SyntheticEvent } from "react";
import toast from "react-hot-toast";
import { createClient } from "@supabase/supabase-js";
import { useNavigate } from "react-router-dom";

const ResetPasswordForm = () => {
  const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || "";
  const supabaseAnonKey = import.meta.env.VITE_SUPABASE_KEY || "";
  const supabase = createClient(supabaseUrl, supabaseAnonKey);
  const navigate = useNavigate()
  
  const handleResetPassword = async (e: SyntheticEvent) => {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    const newPassword = (
      form.elements.namedItem("change-password-new") as HTMLInputElement
    ).value;
    const confirmedPassword = (
      form.elements.namedItem("change-password-confirm") as HTMLInputElement
    ).value;

    if (newPassword !== confirmedPassword) {
      toast.error("New password not matching");
      return;
    }
    try {
      const { data, error } = await supabase.auth.updateUser({
        password: newPassword,
      });
      if (error) {
        throw error;
      }
      localStorage.setItem("loggedInUser", JSON.stringify(data.user.id));
      form.reset();
      toast.success("Successfully changed password");
      navigate('/')
    } catch (error) {
      toast.error(`${error}`);
    }
  };

  return (
    <form onSubmit={(e) => handleResetPassword(e)} className="flex flex-col gap-2 max-w-xs self-center w-full">
      <h1>Set a new password below</h1>
      <input
        type="password"
        name="change-password-new"
        placeholder="New password"
        className="input input-bordered w-full w-xs"
      />
      <input
        type="password"
        name="change-password-confirm"
        placeholder="Confirm new password"
        className="input input-bordered w-full w-xs"
      />
      <button className="btn btn-primary">
        Change password
      </button>
    </form>
  );
};

export default ResetPasswordForm;
