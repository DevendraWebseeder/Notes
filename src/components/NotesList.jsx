import { useSelector, useDispatch } from "react-redux";
import { deleteNote, setSelectedTags } from "../features/notesSlice";

const tagsList = ["All", "Work", "Personal", "Urgent"];

export default function NotesList({ setEditNote }) {
  const dispatch = useDispatch();
  const { notes, selectedTag } = useSelector((state) => state.notes);

  const filteredNotes =
    selectedTag === "All"
      ? notes
      : notes.filter((note) => note.tags === selectedTag);
  return (
    <div className="bg-gray-300 m-5 rounded-2xl">
      <div className="flex items-center justify-center">
        {tagsList.map((tag) => (
          <button
            className={`${selectedTag === tag ? "bg-white text-black" : "bg-blue-400 text-white"} py-2 mt-10 px-4 rounded-2xl outline-white md:mx-4 mx-1 text-center border border-white `}
            key={tag}
            onClick={() => dispatch(setSelectedTags(tag))}
          >
            {tag}
          </button>
        ))}
      </div>
      {filteredNotes.length === 0 ? (
        <div className="flex flex-col items-center justify-center mt-16 text-center">
          <div className="bg-gray-100 p-10 rounded-2xl shadow-sm">
            <h2 className="text-2xl font-semibold text-gray-700">
              No Notes Found 
            </h2>

            <p className="text-gray-500 mt-2">
              Click on "Add Note" to create your note
            </p>
          </div>
        </div>
      ) : (
        filteredNotes.map((note) => (
          <div
            key={note.id}
            className="outline-none bg-white inline-block w-80 p-5 m-5 mt-4 rounded-2xl"
          >
            <span className="flex items-center justify-between">
              <h4 className="font-bold">{note.title}</h4>
              <p className="p-2 outline rounded-full">{note.tags}</p>
            </span>
            <p classname="mt-2 p-1">{note.content}</p>
            <div className="w-full h-px my-1 bg-black"></div>
            <button
              className="bg-blue-400 text-white mt-2 py-2 px-8 rounded-2xl"
              onClick={() => setEditNote(note)}
            >
              Edit
            </button>
            <button
              className="bg-red-400 text-white mt-2 mx-2 py-2 px-8 rounded-2xl"
              onClick={() => dispatch(deleteNote(note.id))}
            >
              Delete
            </button>
          </div>
        ))
      )}
    </div>
  );
}
