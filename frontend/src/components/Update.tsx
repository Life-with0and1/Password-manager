import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

const Update = ({
  type,
  cred,
  id,
  url,
  setShowUpdate,
  fetchCredentials,
}: {
  type: string;
  cred: string;
  id: string;
  url: string;
  setShowUpdate: Boolean;
  fetchCredentials: () => void;
}) => {
  const [updateCred, setUpdateCred] = useState(cred);

  const handleUpdate = async () => {
    try {
      const newUrl = `${url}/update/${id}`;
      const token = localStorage.getItem("token");
      if (!token) return toast.error("Not Authorized");
      const response = await axios.patch(
        newUrl,
        { cred: updateCred },
        { headers: { token } }
      );
      if (response.data.success) {
        toast.success(response.data.message);
        setShowUpdate(false);
        fetchCredentials();
      } else {
        toast.error(response.data.message);
      }
    } catch (error: any) {
      if (error.response) {
        return toast.error(
          error.response.message || "Error while updating cred"
        );
      } else return toast.error("Something went wrong");
    }
  };

  return (
    <div className="fixed top-0 flex items-center justify-center  w-full h-screen bg-zinc-900/70">
      <div className="relative flex flex-col bg-slate-50 py-10 p  w-[30%] h-[60%] items-center rounded shadow-lg gap-y-3">
        <div className="absolute  right-3 top-3 bg-black rounded-full flex items-center justify-center w-7 h-7">
          <span onClick={()=>setShowUpdate(false)} className="cursor-pointer text-white text-sm font-thin">X</span>
        </div>
        <h1 className="text-2xl text-black font-semibold mb-7">Update Cred</h1>
        <div className="flex flex-col gap-5">
          <input
            title="Title"
            value={type}
            disabled={true}
            className="update-input"
            type="text"
          />
          <input
            onChange={(e) => setUpdateCred(e.target.value)}
            value={updateCred}
            type="password"
            placeholder="Password of your credential..."
            className="update-input"
          />
        </div>

        <button
          onClick={handleUpdate}
          type="submit"
          className=" bg-zinc-800 hover:bg-zinc-700 truncate p-2 text-white w-[50%] font-semibold rounded-lg py-2 mt-3 hover:bg-zinc-900"
        >
          Update Credential
        </button>
      </div>
    </div>
  );
};

export default Update;
