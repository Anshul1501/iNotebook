import React, { useContext, useEffect, useRef, useState } from "react";
import NoteContext from "../context/notes/NoteContext";
import NoteItem from "./NoteItem";
import AddNotes from "./AddNotes";
import { useNavigate } from "react-router-dom";

const Notes = (props) => {

  let navigate = useNavigate();
  const { notes, getNotes, editNote } = useContext(NoteContext); //destructring 

  useEffect(() => {
    if(localStorage.getItem('token')){
      getNotes();
    }
    else {
      navigate("/login");
    }
  }, []);  // Add getNotes to the dependency array

  const [note, setNote] = useState({id: "", etitle: "", edescription: "", etag: "" });

  const onChange = (e) => {
    setNote({ ...note, [e.target.name]: e.target.value });
  };

  const ref = useRef(null);
  const refClose = useRef(null);

   const saveChangeNote = (e) => {
    console.log("Changing the Note...", note);
    e.preventDefault(); // Prevent default form submission behavior
    console.log("id ", note.id);
    setNote({etitle: " ", edescription: " ", etag: " " }); // Clear input fields after adding note
    console.log("id ", note.id);
    editNote(note.id, note.etitle, note.edescription, note.etag);
    refClose.current.click();
  }

  const updateNote = (currentNote) => {
    setNote({
      id: currentNote.id,
      etitle: currentNote.title,
      edescription: currentNote.description,
      etag: currentNote.tag
    });
  }

  return (
    <>
      <AddNotes />

      <div ref={ref} className="modal fade" id="exampleModal" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">Modal Title</h5>

            </div>
            <div className="modal-body">
              <form onSubmit={saveChangeNote}>
                {" "}
                {/* Use onSubmit event to handle form submission */}
                <div className="mb-3">
                  <label htmlFor="etitle" className="form-label">
                    Title
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="etitle"
                    name="etitle" // Add name attribute to match state key
                    value={note.etitle} // Bind value to state
                    onChange={onChange}
                    minLength={5} required
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="edescription" className="form-label">
                    Description
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="edescription"
                    name="edescription" // Add name attribute to match state key
                    value={note.edescription} // Bind value to state
                    onChange={onChange}
                    minLength={5} required
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="etag" className="form-label"> 
                    Tag
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="etag"
                    name="etag" // Add name attribute to match state key
                    value={note.etag} // Bind value to state
                    onChange={onChange}
                    minLength={5} required
                  />
                </div>
              </form>
            </div>

            <div className="modal-footer">
              <button ref={refClose} type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
              <button type="button" className="btn btn-primary" onClick={()=>{saveChangeNote(); props.showAlert("Updated successfully", "success")}}>Update Note</button>
            </div>
          </div>
        </div>
      </div>


      <div className="row my-3">
        <h2>Your Notes</h2>
        <div className="container mx-1">
          {notes.length===0 && 'No notes to display'}
        </div>
        {notes.map((note) => (
          <NoteItem key={note._id} note={note} updateNote={updateNote} />
        ))}
      </div>
    </>
  );
};

export default Notes;
