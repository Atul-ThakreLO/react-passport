import React, { useState, useEffect } from "react";
import { useLogin } from "../Hooks/useLogin";
import { Navigate, redirect, redirectDocument } from "react-router-dom";

function Login() {
  const [email, setEmail] = useState("");
  const [passsword, setPassword] = useState("");
  const mutation = useLogin();
  function handleSubmit(e) {
    e.preventDefault();
    const newUser = {
      email: email,
      password: passsword,
    };
    mutation.mutate(newUser);
  }
  if (mutation.isSuccess) {
    console.log("success");
    
    return <Navigate to="/main" replace={true} />
  }
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label htmlFor="email">Email</label>
        <br />
        <input
          type="email"
          name="email"
          id="email"
          onChange={(e) => setEmail(e.target.value)}
        />
        <br />
        <label htmlFor="passsword">Password</label>
        <br />
        <input
          type="passsword"
          name="passsword"
          id="passsword"
          onChange={(e) => setPassword(e.target.value)}
        />
        <br />
        <button>Login</button>
      </form>
    </div>
  );
}

export default Login;
