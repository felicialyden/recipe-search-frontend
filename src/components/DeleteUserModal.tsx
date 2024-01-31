import { useContext } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext";
import { Response } from "../types";

const DeleteUserModal = () => {
    const { deleteUser } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleDeleteUser = async () => {
        try {
          const response = (await deleteUser()) as Response;
          if (!response.success) {
            throw response.error;
          }
          toast.success("Account was successfully deleted");
          navigate("/");
        } catch (error) {
          toast.error(`${error}`);
        }
      };
      
  return (
    <dialog id="deleteUserModal" className="modal modal-middle">
    <div className="modal-box">
      <h3 className="font-bold text-lg">Warning</h3>
      <p className="py-4">Are you sure you want to delete your account?</p>
      <div className="modal-action">
        <form method="dialog">
          <button className="btn btn-sm btn-ghost mr-2">Cancel</button>
          <button onClick={handleDeleteUser} className="btn btn-sm">Delete account</button>
        </form>
      </div>
    </div>
  </dialog>
  )
}

export default DeleteUserModal