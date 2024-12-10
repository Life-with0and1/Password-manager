import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { toast } from "react-toastify";

const Auth = () => {
  const navigate = useNavigate();
  const [auth, setAuth] = useState("login");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    if (password.length < 6) {
      return toast.error("Password must be more than of 5 character");
    }
    if (auth == "login") {
      const response = await fetch("https://pass-manager-backend.onrender.com/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });
      const responseData = await response.json();
      if (responseData.success) {
        localStorage.setItem("token", responseData.token);
        toast.success(responseData.message);
        navigate("/");
      } else {
        toast.error(responseData.message);
      }
    } else {
      const response = await fetch("https://pass-manager-backend.onrender.com/api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name: username, email, password }),
      });
      const responseData = await response.json();
      if (responseData.success) {
        localStorage.setItem("token", responseData.token);
        toast.success(responseData.message);
        navigate("/");
      } else {
        toast.error(responseData.message);
      }
    }
  };

  return (
    <div className="bg-black flex items-center justify-center text-white w-full h-screen">
      <form
        onSubmit={handleSubmit}
        className="bg-[#ffffff10]   rounded-sm flex flex-col text-center gap-y-5 px-10 py-5"
      >
        <h1 className="text-2xl text-[#ffffffec] font-bold mb-3">
          {auth === "login" ? "Sign In" : "Sign Up"}
        </h1>
        {auth === "Sign Up" && (
          <input
            onChange={(e) => setUsername(e.target.value)}
            className="auth-input"
            placeholder="username"
            type="text"
            value={username}
            name="name"
          />
        )}

        <input
          onChange={(e) => setEmail(e.target.value)}
          className="auth-input"
          placeholder="email"
          type="email"
          value={email}
          name="email"
        />
        <input
          onChange={(e) => setPassword(e.target.value)}
          className="auth-input"
          placeholder="password"
          value={password}
          type="password"
          name="password"
        />
        <button
          type="submit"
          className="w-full bg-black text-white font-semibold rounded-lg py-2 mt-3 hover:bg-zinc-900"
        >
          {auth === "login" ? "Login" : "Register"}
        </button>
        <p className="text-sm ">
          {auth === "login"
            ? "Don't have an account? "
            : "Already have an account? "}

          <span
            onClick={() => setAuth(auth === "login" ? "Sign Up" : "login")}
            className="text-blue-500  font-semibold cursor-pointer"
          >
            {auth === "login" ? "Sign Up" : "Login"}
          </span>
        </p>
      </form>
    </div>
  );
};

export default Auth;
