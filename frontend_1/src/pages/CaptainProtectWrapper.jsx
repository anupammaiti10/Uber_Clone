import React from "react";
import { useNavigate } from "react-router-dom";

function CaptainProtectWrapper({ children }) {
  const token = localStorage.getItem("token");
  const navigate = useNavigate();
  // console.log(token);
  // console.log("hi");
  useEffect(() => {
  if (!token) {
    navigate("/login");
  }
  }, [token]);
  // if (!token) {
  //   navigate("/login");
  // }
  return <>{children}</>;
}

export default CaptainProtectWrapper;
