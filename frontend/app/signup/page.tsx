"use client"
import { useState } from "react";
import api from "../../services/axios";
import { useRouter } from "next/navigation";
import Loader from "@/components/loader";

export default function Signup() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confPassword, setConfPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    if (password !== confPassword) return alert("Passwords do not match");
     setLoading(true);
    try {
      await api.post("/register/", { username, useremail: email, password });
      router.push("/login");
    } catch (error) {
      console.log(error)
      alert("Error creating user");
    }finally {
      setLoading(false);
    }

  };

  return (
    <div className="flex justify-center mt-16">
      <div className="w-96 bg-[#fdf5e6] border-2 border-gray-400 rounded shadow-lg">
        <div className="bg-[#8fd694] text-center py-2 border-b border-gray-400">
          <h2 className="text-lg font-bold">Sign Up</h2>
        </div>
        <form onSubmit={handleSignup} className="p-6">
          <input
            className="w-full mb-2 p-2 border rounded"
            type="text"
            placeholder="Username"
            value={username}
            onChange={e => setUsername(e.target.value)}
            required
          />
          <input
            className="w-full mb-2 p-2 border rounded"
            type="email"
            placeholder="Email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            required
          />
          <input
            className="w-full mb-2 p-2 border rounded"
            type="password"
            placeholder="Password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            required
          />
          <input
            className="w-full mb-4 p-2 border rounded"
            type="password"
            placeholder="Confirm Password"
            value={confPassword}
            onChange={e => setConfPassword(e.target.value)}
            required
          />
          <button
            className="w-full p-2 bg-green-500 text-white rounded hover:bg-green-600"
            type="submit"
            disabled={loading}
          >
            {loading ? "Registering..." : "Register"}
          </button>
          {loading && <Loader />}
          <button
            type="button"
            onClick={() => router.push("/login")}
            className="w-full mt-2 p-2 bg-orange-400 text-white rounded hover:bg-orange-500"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
}
