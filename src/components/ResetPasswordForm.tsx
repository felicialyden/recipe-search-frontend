import { SyntheticEvent, useContext } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext";
import { Response } from "../types";

const ResetPasswordForm = () => {
  const { resetPassword } = useContext(AuthContext)
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
    } else if(!newPassword || !confirmedPassword) {
      toast.error("Please enter a new password");
      return;
    }

    try {
      const response = resetPassword(newPassword) as unknown as Response
      if (response.error) {
        throw response.error;
      }
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
      <button className="btn btn-primary btn-sm mt-2 max-w-xs">
        Change password
      </button>
    </form>
  );
};

export default ResetPasswordForm;
