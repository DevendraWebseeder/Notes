import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  notes: JSON.parse(localStorage.getItem("notes")) || [],
  selectedTag: "All",
};

const notesSlice = createSlice({
  name: "notes",
  initialState,
  reducers: {
    addNote: (state, action) => {
      state.notes.push(action.payload);
    },

    deleteNote: (state, action) => {
      state.notes = state.notes.filter((n) => n.id !== action.payload);
    },

    updateNote: (state, action) => {
      const { id, title, content, tags } = action.payload;
      const note = state.notes.find((n) => n.id === id);
      if (note) {
        note.title = title;
        note.content = content;
        note.tags = tags;
      }
    },

    setSelectedTags: (state, action) => {
      state.selectedTag = action.payload;
    },
  },
});

export const { addNote, deleteNote, updateNote, setSelectedTags } =
  notesSlice.actions;

export default notesSlice.reducer;
