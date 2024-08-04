import { Link, useNavigate } from "react-router-dom";
import { LayoutDashboard, LogIn, LogOut } from "lucide-react";
import { toast } from "react-toastify";
import "../index.css";
import { FaRegUserCircle } from "react-icons/fa";
import { HiOutlineLogin } from "react-icons/hi";

export const Navbar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userid");
    localStorage.removeItem("username");
    navigate("/login");
    toast.success("Logout successfully");
  };

  const isLoggedIn = !!localStorage.getItem("token") ||'';
  const username = localStorage.getItem("username");

  return (
    <nav className="bg-[#FFFFFF] shadow-md border-b border-gray-500 sticky lg:relative w-full top-0 left-0">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center space-x-4 lg:space-x-6">
            <Link to="/" className="flex items-center group">
              <span className="font-bold text-xl  sm:text-3xl colorMix group-hover:colorMixBlue transition">
                Resume Builder
              </span>
            </Link>
          </div>
          <div className="flex items-center space-x-4">
            {isLoggedIn ? (
              <>
                <Link
                  to="/"
                  className="text-black hover:animate-pulse hover:text-black px-3 py-2 rounded-md text-xl font-medium flex items-center transition duration-150 ease-in-out"
                >
                  <LayoutDashboard className="h-5 w-5 mr-1 block sm:hidden" />
                  <span className="ml-1 hidden sm:block">Dasboard</span>
                </Link>
                <LogOut onClick={handleLogout} className="block sm:hidden" />
                <button
                  onClick={handleLogout}
                  className="hidden sm:block text-violet-700 hover:text-red-500 p-2 font-medium text-xl transition duration-500 ease-in-out"
                >
                  Logout
                </button>
              </>
            ) : (
              <Link
                to="/login"
                className="flex justify-center items-center gap-2 px-3 py-2 text-blue-500 text-2xl font-medium transition duration-150 ease-in-out  "
              >
                <HiOutlineLogin  className="block sm:hidden" />
                <span className="hidden sm:block" >
                  Login
                </span>
              </Link>
            )}
            {isLoggedIn && (
              <div className="flex justify-center items-center space-x-4">
                <FaRegUserCircle className="block sm:hidden text-2xl text-gray-500" />
                <span className="hidden sm:block font-medium text-2xl text-gray-600">
                  {username ? username : "user"}
                </span>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
