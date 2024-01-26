import { Trash2 } from "lucide-react";
import ChangePassword from "../components/ChangePassword";

const Profile = () => {
  return (
    <>
      {/* <div className="collapse collapse-arrow join-item border bg-secondary">
        <input type="checkbox" name="my-accordion-2" />
        <div className="collapse-title text-lg font-medium">Add collection</div>
        <div className="collapse-content">
          <p>hello</p>
        </div>
      </div> */}
      <div className="collapse collapse-arrow join-item border bg-secondary">
        <input type="checkbox" name="my-accordion-2" />
        <div className="collapse-title text-lg font-medium">
          Change password
        </div>
        <div className="collapse-content">
          <ChangePassword />
        </div>
      </div>
      <button className="btn btn-sm btn-secondary mt-4">
          <Trash2 size={16}/>
            Delete account
          </button>
    </>
  );
};

export default Profile;
