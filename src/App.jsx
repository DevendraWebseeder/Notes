import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import NoteForm from "./components/NoteForm";
import NotesList from "./components/NotesList";
import Header from "./components/Header";

function App() {
  const [editNote, setEditNote] = useState(null);
  const notes = useSelector((state) => state.notes.notes);
  useEffect(() => {
    localStorage.setItem("notes", JSON.stringify(notes));
  }, [notes]);

  return (
    <div>
      <Header />
      <NoteForm editNote={editNote} setEditNote={setEditNote} />
      <NotesList setEditNote={setEditNote} />
    </div>
  );
}

export default App;
