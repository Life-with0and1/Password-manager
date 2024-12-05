import { CgLogOut } from "react-icons/cg";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Navbar = () => {
  const navigate = useNavigate();
  return (
    <div className=" flex  py-2 items-center justify-end">
      <button
        onClick={() => {
          localStorage.removeItem("token");
          toast.success("Logged out successfully");
          navigate("/auth");
        }}
        className="text-white flex bg-zinc-900 hover:bg-slate-800 items-center gap-1 border-2 mr-5 rounded-lg border-white p-2"
      >
        <CgLogOut /> Logout
      </button>
    </div>
  );
};

export default Navbar;
