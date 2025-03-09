import axios from "axios";
import React, { useState } from "react";
import { backendUrl } from "../App";
import { toast } from "react-toastify";
import { EyeIcon, EyeOffIcon } from "lucide-react";

const Login = ({ setToken }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const onSubmitHandler = async (e) => {
    try {
      e.preventDefault();
      const response = await axios.post(backendUrl + "/api/user/admin", { email, password });
      if (response.data.success) {
        setToken(response.data.token);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.error(error);
      toast.error(error.message);
    }
  };

  return (
    <div className="font-sans text-gray-900 antialiased min-h-screen flex flex-col sm:justify-center items-center pt-6 sm:pt-0 bg-[#f8f4f3]">
      <div className="w-full sm:max-w-md mt-6 px-6 py-4 bg-white shadow-md overflow-hidden sm:rounded-lg">
        <form onSubmit={onSubmitHandler}>
          <div className="py-8 text-center">
            <span className="text-2xl font-semibold">Admin Login</span>
          </div>
          <div>
            <label className="block font-medium text-sm text-gray-700">Email Address</label>
            <input
              type="email"
              name="email"
              placeholder="your@email.com"
              className="w-full rounded-md py-2.5 px-4 border text-sm outline-[#f84525]"
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              required
            />
          </div>
          <div className="mb-3 min-w-72 relative">
            <p className="text-sm font-medium text-gray-700 mb-2">Password</p>
            <input
              onChange={(e) => setPassword(e.target.value)}
              value={password}
              className="w-full rounded-md py-2.5 px-4 pr-12 border text-sm outline-[#f84525]"
              type={showPassword ? "text" : "password"}
              placeholder="Enter your password"
              required
            />
            {/* Eye Icon Button - Perfectly Aligned */}
            <button
              type="button"
              className="absolute right-4 top-[68%] transform -translate-y-1/2 text-gray-500"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <EyeOffIcon size={22} /> : <EyeIcon size={22} />}
            </button>
          </div>
          <div className="flex items-center justify-between mt-4">
            <label className="flex items-center text-sm text-gray-600">
              <input type="checkbox" className="rounded border-gray-300" />
              <span className="ml-2">Remember Me</span>
            </label>
            <a className="text-sm text-gray-600 hover:text-gray-900" href="/forgot-password">
              Forgot your password?
            </a>
          </div>
          <button
            className="mt-4 w-full inline-flex items-center justify-center px-4 py-2 bg-[#f84525] border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest hover:bg-red-800 transition ease-in-out duration-150"
            type="submit"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
