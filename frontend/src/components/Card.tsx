import axios from "axios";
import { useState } from "react";
import { BiCopy, BiPencil, BiTrash } from "react-icons/bi";
import { toast } from "react-toastify";
import Update from "./Update";

interface Cred {
  _id: string;
  cred: string;
  type: string;
  users: string[];
  __v: number;
}

const Card = ({
  url,
  credential,
  fetchCredentials,
}: {
  url: string;
  credential: Cred;
  fetchCredentials: () => void;
}) => {
  const [showUpdate, setShowUpdate] = useState<boolean>(false);



  const handleDeleteCred = async () => {
    try {
      const newUrl = `${url}/remove/${credential._id}`;
      const token = localStorage.getItem("token");

      const response = await axios.delete(newUrl, { headers: { token } });

      if (response.data.success) {
        toast.success(response.data.message);
        fetchCredentials();
      } else {
        toast.error(response.data.message);
      }
    } catch (error: any) {
      if (error.response) {
        toast.error(error.response.message || "Error while deleting cred.");
      } else {
        toast.error("Something went wrong.");
      }
    }
  };
  return (
    <>
      {showUpdate && <Update type={credential.type} cred={credential.cred} id={credential._id} url={url} setShowUpdate={setShowUpdate} fetchCredentials={fetchCredentials} />}
      <div className="bg-[#5d5d5e31] min-w-[300px] flex  flex-col gap-y-5 px-5 py-7 rounded">
        <div className="flex items-center max-w-[250px] gap-2 justify-between">
          <h1 className="text-white text-lg truncate">{credential.type}</h1>
          <div className="flex gap-1">
            <BiPencil
              onClick={() => setShowUpdate(!showUpdate)}
              className="text-orange-700 cursor-pointer"
            />
            <BiTrash
              onClick={() => handleDeleteCred()}
              className="text-red-500 cursor-pointer"
            />
          </div>
        </div>
        <div className="flex gap-2 max-w-[250px] items-center justify-between">
          <input
            className="cred-input"
            title="Credential"
            type="password"
            value={credential.cred}
            disabled={true}
          />
          <BiCopy
            onClick={() => {
              navigator.clipboard.writeText(credential.cred);
              toast.success("Credential copied to clipboard");
            }}
            className="text-white cursor-pointer"
          />
        </div>
      </div>
    </>
  );
};

export default Card;
