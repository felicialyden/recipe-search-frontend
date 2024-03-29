import { Trash2 } from "lucide-react";
import ChangePassword from "../components/ChangePassword";
import DeleteUserModal from "../components/DeleteUserModal";

const Profile = () => {

  return (
    <div className="p-2 mt-6">
      <div className="collapse collapse-arrow join-item border bg-secondary">
        <input type="checkbox" name="my-accordion-2" />
        <div className="collapse-title text-lg font-medium">
          Change password
        </div>
        <div className="collapse-content">
          <ChangePassword />
        </div>
      </div>
      <button
        onClick={() => (document.getElementById('deleteUserModal') as HTMLDialogElement).showModal()}
        className="btn btn-sm btn-secondary mt-4"
      >
        <Trash2 size={16} />
        Delete account
      </button>
      <DeleteUserModal />
    </div>
  );
};

export default Profile;
