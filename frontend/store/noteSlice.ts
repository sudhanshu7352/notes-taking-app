import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../services/axios";

export const fetchNotes = createAsyncThunk("note/fetchNotes", async () => {
  const res = await api.get("/notes/");
  console.log("notes get", res.data);
  return res.data;
});

export const addNote = createAsyncThunk("note/addNote", async (note) => {
  const res = await api.post("/notes/", note);
  return res.data;
});

export const updateNote = createAsyncThunk("note/updateNote", async ({ noteid, payload }) => {
  const res = await api.put(`/notes/${noteid}/`, payload);
  return res.data;
});

export const deleteNote = createAsyncThunk("note/deleteNote", async (noteid) => {
  await api.delete(`/notes/${noteid}/`);
  return noteid;
});

const noteSlice = createSlice({
  name: "note",
  initialState: { notes: [], status: null },
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(fetchNotes.fulfilled, (state, { payload }) => {
        state.notes = payload;
      })
      .addCase(addNote.fulfilled, (state, { payload }) => {
        state.notes.push(payload);
      })
      .addCase(updateNote.fulfilled, (state, { payload }) => {
        const idx = state.notes.findIndex(n => n.noteid === payload.noteid);
        if (idx !== -1) state.notes[idx] = payload;
      })
      .addCase(deleteNote.fulfilled, (state, { payload }) => {
        state.notes = state.notes.filter(n => n.noteid !== payload);
      });
  },
});

export default noteSlice.reducer;
