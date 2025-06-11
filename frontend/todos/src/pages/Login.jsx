// src/pages/Login.jsx
import { useState } from "react";
import axios from 'axios'
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
const Login = () => {
  const [form, setForm] = useState({ email: "", password: "" });
  const navigate = useNavigate();
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleLogin = async () => {
  if (!form.email || !form.password) {
    toast.error("Please enter email and password");
    return;
  }

  try {
    const res = await axios.post("http://localhost:5000/api/login", form);
    localStorage.setItem("token", res.data.token);
    toast.success("Login successfully!",{
      icon:"🔓"
    });
    navigate("/");
  } catch (err) {
    console.log(err)
    toast.error(err.response?.data?.message || "Login failed");
    setError(err.response?.data?.message || "Login failed");
  }
};

  const isValidEmail = form.email.includes("@");

  return (
    <div className="flex justify-center mt-16">
      <div className="bg-white shadow-2xl p-8 rounded-md w-[350px]">
        <h2 className="text-2xl font-semibold mb-6">Login</h2>
        <input
          name="email"
          type="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
          className="w-full p-2 border mb-3 rounded"
        />
        {!isValidEmail && form.email.length > 0 && (
          <p className="text-red-600 text-sm mb-2">Please enter a valid email address.</p>
        )}
        <input
          name="password"
          type="password"
          placeholder="Password"
          value={form.password}
          onChange={handleChange}
          className="w-full p-2 border mb-4 rounded"
        />
        <button
          onClick={handleLogin}
          className="w-full bg-blue-600 text-white py-2 rounded"
        >
          Login
        </button>

        <p className="text-sm mt-5">
          Not registered yet?{" "}
          <a href="/signup" className="text-blue-600 underline">
            Create an Account
          </a>
        </p>
      </div>
    </div>
  );
};

export default Login;
