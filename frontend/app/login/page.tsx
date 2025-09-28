"use client"
import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import api from "../../services/axios";
import Link from "next/link";
import Loader from "@/components/loader";
export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await api.post("/login/", { username, password });
      console.log("res", res);
      // localStorage.setItem("access", res.data.access);
      // localStorage.setItem("refresh", res.data.refresh);
      router.push("/");
    } catch (error) {
      console.log(error);
      alert("Invalid login credentials");
    }
    finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center mt-16">
      <div className="w-96 bg-[#fdf5e6] border-2 border-gray-400 rounded shadow-lg">
        <div className="bg-[#f9a875] text-center py-2 border-b border-gray-400">
          <h2 className="text-lg font-bold">Login</h2>
        </div>
        <form onSubmit={handleLogin} className="p-6">
          <input
            className="w-full mb-2 p-2 border rounded"
            type="text"
            placeholder="Email"
            value={username}
            onChange={e => setUsername(e.target.value)}
            required
          />
          <input
            className="w-full mb-4 p-2 border rounded"
            type="password"
            placeholder="Password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            required
          />
          <button
            className="w-full p-2 bg-orange-400 text-white rounded hover:bg-orange-500"
            type="submit"
            disabled={loading}
          >
            {loading ? "Logging in..." : "Login"}
          </button>
          {loading && <Loader />}
          <button
            type="button"
            onClick={() => router.push("/signup")}
            className="w-full mt-2 p-2 bg-green-500 text-white rounded hover:bg-green-600"
          >
            Register
          </button>
        </form>
      </div>
    </div>
  );
}
