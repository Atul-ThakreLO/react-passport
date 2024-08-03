import React, { useEffect } from "react";
import { useAuth } from "./Hooks/useAuth";
import { Navigate } from "react-router-dom";
import Login from "./components/Login";
import { useQuery } from "@tanstack/react-query";

function MainPage() {
  const auth = useAuth()
  if(auth.data === 200) {
    return (
        <div>
          <h1>hello main</h1>
        </div>
      );
  } else {
    return  <Navigate to="/login" replace={true} />
  }
}

export default MainPage;
