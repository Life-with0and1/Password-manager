import { useEffect, useState } from "react";
import Creds from "./Creds";
import Input from "./Input";
import Navbar from "./Navbar";
import { toast } from "react-toastify";
import axios from "axios";

const Home = () => {
  const url = "http://localhost:4000/api/credential";
  const [credentils, setCredentials] = useState([]);

  const fetchCredentials = async () => {
    try {
      const newUrl = `${url}/get`;
      const token = localStorage.getItem("token");
      const response = await axios.get(newUrl, { headers: { token } });
      if (response.data.success) {
        setCredentials(response.data.creds);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error("Error while fetching data.");
    }
  };

  useEffect(() => {
    fetchCredentials();
  }, []);

  return (
    <div className="">
      <Navbar />
      <Input url={url} fetchCredentials={fetchCredentials} />
      <Creds url={url}  fetchCredentials={fetchCredentials} credentils={credentils}/>
    </div>
  );
};

export default Home;
