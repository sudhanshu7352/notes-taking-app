"use client"
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { deleteNote, fetchNotes, type AppDispatch }  from "../store/noteSlice";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function Home() {
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();
  const { notes } = useSelector((state: any) => state.note);

  useEffect(() => {
    dispatch(fetchNotes());
  }, [dispatch]);

  return (
    <div className="flex flex-col justify-center items-center min-h-screen bg-[#f5f3e7]">
      <div className="bg-[#fdfcf8] border-2 border-[#d1cfcf] rounded-lg shadow-lg p-6 w-[90%] md:w-[70%]">
        {/* Header */}
        <h1 className="text-3xl font-bold text-center mb-6 text-[#333]">
          Keep Notes
        </h1>

        {/* Add Note Button */}
        <div className="flex justify-center mb-6">
          <Link href="/add-note">
            <button className="px-4 py-2 bg-[#5a9bd4] hover:bg-[#4682b4] text-white font-semibold rounded-lg shadow-md">
              + Add Note
            </button>
          </Link>
        </div>

        {/* Notes Grid */}
        {notes.length === 0 ? (
          <p className="text-center text-gray-600">No notes yet. Add one!</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {notes.map((note: any) => (
              <div
                key={note.id}
                className="bg-[#fffefb] border border-[#e0dfdb] rounded-lg p-5 shadow-md hover:shadow-lg transition"
              >
                <h2 className="text-xl font-semibold mb-2 text-[#2f4f4f]">
                  {note.notetitle}
                </h2>
                <p className="mb-3 text-gray-700">{note.notecontent}</p>
                <span className="block text-xs text-gray-500 mb-3">
                  Last Modified: {new Date(note.lastupdate).toLocaleString()}
                </span>
                <div className="flex space-x-3">
                  <Link href={`/edit-note/${note.id}`}>
                    <button className="px-3 py-1 bg-[#5a9bd4] hover:bg-[#4682b4] text-white rounded shadow">
                      Edit
                    </button>
                  </Link>
                  <button onClick={() => {
                      if (confirm("Are you sure you want to delete this note?")) {
                        dispatch(deleteNote(note.id));
                      }
                    }}                 
                  className="px-3 py-1 bg-[#e57373] hover:bg-[#d32f2f] text-white rounded shadow">
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
