import { useDispatch, useSelector } from "react-redux";
import { logout } from "../redux/authSlice";
import { useNavigate } from "react-router-dom";

export default function Navbar() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
  };

  return (
    <div className="w-[98%] items-center justify-start flex justify-between px-4 py-4 ">
      <p className="text-3xl font-bold text-gray-700">logo</p>
      <button
        onClick={handleLogout}
        className="px-4 py-2 bg-red-400 rounded-md text-lg font-medium"
      >
        logout
      </button>
    </div>
  );
}
