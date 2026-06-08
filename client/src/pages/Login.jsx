import React from "react";
import { useState } from "react";
import { useLoginMutation } from "../lib/api";
import { useNavigate } from "react-router";

const Login = () => {
  const navigate = useNavigate();
  const [loginUser] = useLoginMutation();
  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });

  const handelLogin = async (e) => {
    e.preventDefault();
    console.log(loginData);
    try {
      const res = await loginUser(loginData);
      if (res.error) {
        return console.log(res.error.data.message);
      }
      console.log(res.data.message);
      setTimeout(() => {
        navigate("/");
      }, 0);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="h-screen flex items-center justify-center">
      <div className="w-80 rounded-lg shadow h-auto p-6 bg-white relative overflow-hidden">
        <div className="flex flex-col justify-center items-center space-y-2">
          <h2 className="text-2xl font-medium text-slate-700">Login</h2>
          <p className="text-slate-500">Enter details below.</p>
        </div>
        <form onSubmit={handelLogin} className="w-full mt-4 space-y-3">
          <div>
            <input
              className="outline-none border-2 rounded-md px-2 py-1 text-slate-500 w-full focus:border-blue-300"
              placeholder="Email"
              id="email"
              name="email"
              type="email"
              onChange={(e) =>
                setLoginData((prev) => ({ ...prev, email: e.target.value }))
              }
            />
          </div>
          <div>
            <input
              className="outline-none border-2 rounded-md px-2 py-1 text-slate-500 w-full focus:border-blue-300"
              placeholder="Password"
              id="password"
              name="password"
              type="password"
              onChange={(e) =>
                setLoginData((prev) => ({ ...prev, password: e.target.value }))
              }
            />
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <input
                className="mr-2 w-4 h-4"
                id="remember"
                name="remember"
                type="checkbox"
              />
              <span className="text-slate-500">Remember me </span>
            </div>
            <a className="text-blue-500 font-medium hover:underline" href="#">
              Forgot Password
            </a>
          </div>
          <button
            className="w-full justify-center py-1 bg-blue-500 hover:bg-blue-600 active:bg-blue-700 rounded-md text-white ring-2"
            id="login"
            name="login"
            type="submit"
          >
            login
          </button>
          <p className="flex justify-center space-x-1">
            <span className="text-slate-700"> Have an account? </span>
            <a className="text-blue-500 hover:underline" href="#">
              Sign Up
            </a>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;
