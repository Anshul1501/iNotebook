import React, { useContext, useState } from "react";
import NoteContext from "../context/notes/NoteContext";

const AddNote = (props) => {
  const { addNote } = useContext(NoteContext); // Corrected function name

  const [note, setNote] = useState({ title: "", description: "", tag: "" });

  const handleOnSubmit = (e) => {
    e.preventDefault(); // Prevent default form submission behavior
    addNote(note); // Call addNote function from context
    setNote({ title: "", description: "", tag: "" }); // Clear input fields after adding note
   // props.showAlert("Addes succesfully", "success");
  };

  const onChange = (e) => {
    setNote({ ...note, [e.target.name]: e.target.value });
  };

  return (
    <div className="container my-5">
      <form onSubmit={handleOnSubmit}>
        {" "}
        {/* Use onSubmit event to handle form submission */}
        <div className="mb-3">
          <label htmlFor="title" className="form-label">
            Title
          </label>
          <input
            type="text"
            className="form-control"
            id="title"
            name="title" // Add name attribute to match state key
            value={note.title} // Bind value to state
            onChange={onChange}
            minLength={5} required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="description" className="form-label">
            Description
          </label>
          <input
            type="text"
            className="form-control"
            id="description"
            name="description" // Add name attribute to match state key
            value={note.description} // Bind value to state
            onChange={onChange}
            minLength={5} required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="tag" className="form-label">
            Tag
          </label>
          <input
            type="text"
            className="form-control"
            id="tag"
            name="tag" // Add name attribute to match state key
            value={note.tag} // Bind value to state
            onChange={onChange}
            minLength={5} required
          />
        </div>
        <button type="submit" className="btn btn-primary" onClick={handleOnSubmit} disabled={note.title.length < 5 || note.description.length < 5}>
          Add Note
        </button>
      </form>
    </div>
  );
};

export default AddNote;
