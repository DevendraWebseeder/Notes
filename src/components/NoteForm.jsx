import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { addNote, updateNote } from "../features/notesSlice";
import { v4 as uuid } from "uuid";

const tagsList = ["Work", "Personal", "Urgent"];

export default function NoteForm({ editNote, setEditNote }) {
  const dispatch = useDispatch();

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [tags, setTags] = useState([]);

  useEffect(() => {
    if (editNote) {
      setTitle(editNote.title);
      setContent(editNote.content);
      setTags(editNote.tags);
    }
  }, [editNote]);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (editNote) {
      dispatch(updateNote({ id: editNote.id, title, content, tags }));
      setEditNote(null);
    } else {
      dispatch(addNote({ id: uuid(), title, content, tags }));
    }

    setTitle("");
    setContent("");
    setTags([]);
  };

  return (
    <div className="bg-gray-300 m-10 rounded-2xl"> 
    <h1 className="text-center text-4xl font-semibold pt-5">Create Your Note</h1>
      <form
        onSubmit={handleSubmit}
        className=" flex flex-col gap-3 items-center justify-center "
      >
        <input
          className="rounded-2xl p-2 mt-5 w-50 md:w-99 border border-black text-black outline-none "
          placeholder="Enter note title..."
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <textarea
          className=" rounded-2xl p-2 border w-60 md:w-99 text-black border-blaxck outline-none"
          placeholder="Enter note...."
          value={content}
          rows={3}
          onChange={(e) => setContent(e.target.value)}
        />
        <div>
          {tagsList.map((t) => (
            <label
              key={t}
              className="outline-none rounded-2xl p-3 mt-1 md:mt-2 m-1 md:m-2 bg-gray-300 text-black"
            >
              <input
                className="md:mx-2 md:mt-5"
                type="radio" // 👈 IMPORTANT CHANGE
                name="tag"
                value={t}
                checked={tags === t}
                onChange={(e) => setTags(e.target.value)}
              />
              {t}
            </label>
          ))}
        </div>

        <button
          className="bg-blue-600 py-2 px-4 rounded-2xl outline-none mt-2 mb-6 text-white"
          type="submit"
        >
          {editNote ? "Update Note" : "Add Note"}
        </button>
      </form>
    </div>
  );
}
