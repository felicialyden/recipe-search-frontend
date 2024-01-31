import { Bookmark, CircleUserRound } from "lucide-react";
import { useContext } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext";
import toast from "react-hot-toast";
import { Response } from "../types"
import { closeDropdown } from "../utils";

const Navbar = () => {
  const { loggedInUser, logoutUser } = useContext(AuthContext);
  const location = useLocation();
  const navigate = useNavigate()

  const handleLogout = async() => {
    try {
      const response = await logoutUser(loggedInUser as string) as Response
      if(!response.success) {
        throw response.error
      }
      toast.success("Successfully logged out")
      if(location.pathname === '/saved') {
        navigate('/')
      }
    } catch (error) {
      toast.error(`${error}`)
    }
  }

  return (
    <div className="navbar pb-5 pt-7 px-7 bg-neutral">
      <div className="flex-1">
        <Link to={"/"}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-7 w-7"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
            />
          </svg>
        </Link>
      </div>
      <div className="flex gap-2">
        {loggedInUser && 
                <Link to={"/saved"}>
                <Bookmark strokeWidth={2.25} />
              </Link>
        }
        <div className="dropdown dropdown-end" id="profileDropdown">
          <div tabIndex={0} role="button">
            <CircleUserRound size={32} strokeWidth={1.5} />
          </div>
          <ul
            onClick={closeDropdown}
            tabIndex={0}
            className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52"
          >
            {loggedInUser ? (
              <>
              <Link to={"/profile"}>
                <li>
                  <p className="justify-between">Profile</p>
                </li>
                </Link>
                <li onClick={() => handleLogout()}>
                  <p>Logout</p>
                </li>
              </>
            ) : (
              <Link to={"/login"}>
              <li>
                <p>Log in</p>
              </li>
              </Link>
            )}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
