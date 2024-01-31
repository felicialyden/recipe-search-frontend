import { SyntheticEvent, useContext, useState } from "react";
import toast from "react-hot-toast";
import { AuthContext } from "../contexts/AuthContext";
import { Response } from "../types";

const ChangePassword = () => {
  const [loading, setLoading] = useState(false);
  const { changePassword } = useContext(AuthContext);

  const handleChangePassword = async (e: SyntheticEvent) => {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    const currentPassword = (
      form.elements.namedItem("change-password-current") as HTMLInputElement
    ).value;
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
      setLoading(true)
      const response = (await changePassword(
        currentPassword,
        newPassword
      )) as Response;
      if (!response.success) {
        throw response.error;
      }
      setLoading(false)
      form.reset();
      toast.success("Successfully changed password");
    } catch (error) {
      setLoading(false)
      toast.error(`${error}`);
    }
  };

  return (
    <form onSubmit={(e) => handleChangePassword(e)} className="space-y-2">
      <input
        type="password"
        name="change-password-current"
        placeholder="Current password"
        className="input input-sm input-bordered w-full w-xs"
      />
      <input
        type="password"
        name="change-password-new"
        placeholder="New password"
        className="input input-sm input-bordered w-full w-xs"
      />
      <input
        type="password"
        name="change-password-confirm"
        placeholder="Confirm new password"
        className="input input-sm input-bordered w-full w-xs"
      />
      <button className="btn btn-primary btn-sm max-w-xs">
      {loading && <span className="loading loading-spinner h-4 w-4"></span>}
      {loading? 'Saving password': 'Change password'}
      </button>
    </form>
  );
};

export default ChangePassword;
