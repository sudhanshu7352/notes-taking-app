'use client';
import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import api from "../../../services/axios";

export default function EditNote() {
  const router = useRouter();
  const params = useParams();
  const noteid = params.noteid;
  const [notetitle, setNoteTitle] = useState("");
  const [notecontent, setNoteContent] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchNote() {
      try {
        const res = await api.get(`/notes/${noteid}/`);
        setNoteTitle(res.data.notetitle);
        setNoteContent(res.data.notecontent);
        setLoading(false);
      } catch {
        alert("Failed to fetch note");
        router.push("/");
      }
    }
    if (noteid) fetchNote();
  }, [noteid, router]);

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await api.put(`/notes/${noteid}/`, { notetitle, notecontent });
      router.push("/");
    } catch {
      alert("Failed to update note");
    }
  };

  if (loading) return <div className="text-center mt-20">Loading...</div>;

  return (
    <form className="max-w-lg mx-auto mt-16 p-8 bg-white shadow rounded" onSubmit={handleUpdate}>
      <h2 className="text-2xl font-semibold mb-4">Edit Note</h2>
      <input
        className="w-full mb-2 p-2 border rounded"
        type="text"
        placeholder="Title"
        value={notetitle}
        onChange={e => setNoteTitle(e.target.value)}
        required
      />
      <textarea
        className="w-full mb-4 p-2 border rounded"
        placeholder="Content"
        value={notecontent}
        onChange={e => setNoteContent(e.target.value)}
        required
      />
      <button className="w-full p-2 bg-orange-400 text-white rounded hover:bg-orange-500" type="submit">
         {loading ? "Saving..." : "Save"}
      </button>
    </form>
  );
}
