"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import api from "../../services/axios";
import { isLoggedIn } from "../../utils/auth";

export default function AddNote() {
  const [notetitle, setNoteTitle] = useState("");
  const [notecontent, setNoteContent] = useState("");
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleAdd = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      setLoading(true);
      await api.post("/notes/", { notetitle, notecontent });
      router.push("/");
    } catch {
      alert("Failed to add note, please login again.");
      router.push("/login");
    }
    finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center mt-16">
      <div className="w-96 bg-[#fdf5e6] border-2 border-gray-400 rounded shadow-lg">
        <div className="bg-[#f9a875] text-center py-2 border-b border-gray-400">
          <h2 className="text-lg font-bold">Add Note</h2>
        </div>
        <form className="p-6" onSubmit={handleAdd}>
          <input className="w-full mb-2 p-2 border rounded" type="text" placeholder="Title" value={notetitle} onChange={e => setNoteTitle(e.target.value)} required />
          <textarea className="w-full mb-4 p-2 border rounded" placeholder="Content" value={notecontent} onChange={e => setNoteContent(e.target.value)} required />
          <button className="w-full p-2 bg-orange-400 text-white rounded hover:bg-orange-500" type="submit" disabled={loading}>
            {loading ? "Saving..." : "Save"}</button>
        </form>
    </div>
    </div>
  );
}
