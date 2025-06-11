// src/pages/Signup.jsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";

const Signup = () => {
  const [form, setForm] = useState({ name: "", email: "", password: "", otp: "" });
  const [showOtp, setShowOtp] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSignup = async () => {
    setLoading(true);
    try {
      const res = await axios.post("http://localhost:5000/user/signup", {
        name: form.name,
        email: form.email,
        password: form.password,
      });

      if (res.data.message === "OTP sent") {
        toast.loading("OTP sent to your email", {
          duration: 3000
        });
        setShowOtp(true);
      }
    } catch (err) {
      toast.error("Signup failed");
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyOtp = async () => {
    try {
      const res = await axios.post("http://localhost:5000/user/verify", {
        email: form.email,
        otp: form.otp,
      });

      if (res.data.msg === "user registered successfully!") {
        toast.success("Account verified and created successfully!");
        navigate("/");
      }
    } catch (err) {
      toast.error(err.response?.data?.msg || "OTP verification failed");
    }
  };

  return (
    <div className="flex justify-center mt-16">
      <div className="bg-white shadow-2xl p-8 rounded-md w-[350px]">
        <h2 className="text-2xl font-semibold mb-6">SignUp</h2>

        <input
          name="name"
          type="text"
          placeholder="Name"
          value={form.name}
          onChange={handleChange}
          className="w-full p-2 border mb-3 rounded"
        />
        <input
          name="email"
          type="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
          className="w-full p-2 border mb-3 rounded"
        />
        <input
          name="password"
          type="password"
          placeholder="Password"
          value={form.password}
          onChange={handleChange}
          className="w-full p-2 border mb-4 rounded"
        />

        {!showOtp ? (
          <button
            onClick={handleSignup}
            disabled={loading}
            className="w-full bg-blue-600 text-white py-2 rounded"
          >
            {loading ? "Sending OTP..." : "Create Account"}
          </button>
        ) : (
          <>
            <input
              name="otp"
              type="text"
              placeholder="Enter OTP"
              value={form.otp}
              onChange={handleChange}
              className="w-full p-2 border mb-2 rounded"
            />
            <button
              onClick={handleVerifyOtp}
              className="w-full bg-green-600 text-white py-2 rounded"
            >
              Verify OTP
            </button>
          </>
        )}

        <p className="text-sm mt-4">
          Already have an account?{" "}
          <a href="/" className="text-blue-600 underline">
            Login
          </a>
        </p>
      </div>
    </div>
  );
};

export default Signup;
