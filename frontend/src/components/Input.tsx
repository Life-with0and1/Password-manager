import axios from "axios";
import { useState } from "react";
import { toast } from "react-toastify";

const Input = ({
  url,
  fetchCredentials,
}: {
  url: string;
  fetchCredentials: () => void;
}) => {
  const [type, setType] = useState("");
  const [cred, setCred] = useState("");

  const handleCredSubmit = async () => {
    try {
      const newUrl = `${url}/add`;
      const token = localStorage.getItem("token");
      if (!token) {
        toast.error("Not Authorized");
      }
      const response = await axios.post(
        newUrl,
        {
          type,
          cred,
        },
        {
          headers: {
            token,
          },
        }
      );
      if (response.data.success) {
        setType("");
        setCred("");
        toast.success(response.data.message);
        fetchCredentials();
      } else {
        toast.error(response.data.message);
      }
    } catch (error: any) {
      if (error.response) {
        toast.error(error.response.data.message || "Something went wrong");
      } else {
        toast.error("Error while adding cred");
      }
    }
  };

  return (
    <div className="flex flex-col mt-5 items-center gap-y-3">
      <input
        onChange={(e) => setType(e.target.value)}
        value={type}
        placeholder="Title for your credential..."
        className="home-input"
        type="text"
      />
      <input
        onChange={(e) => setCred(e.target.value)}
        value={cred}
        type="password"
        placeholder="Password of your credential..."
        className="home-input"
      />
      <button
        onClick={handleCredSubmit}
        type="submit"
        className=" bg-zinc-800 truncate p-2 text-white w-[50%] font-semibold rounded-lg py-2 mt-3 hover:bg-zinc-900"
      >
        Add Credential
      </button>
    </div>
  );
};

export default Input;
