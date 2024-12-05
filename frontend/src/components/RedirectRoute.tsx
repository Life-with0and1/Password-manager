import { Navigate } from "react-router-dom";

const RedirectRoute = ({ children }: { children: JSX.Element }) => {
  const token = localStorage.getItem("token");

  if (token) {
    return <Navigate to="/" replace />;
  }
  return children;
};

export default RedirectRoute;
