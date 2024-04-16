import React, { useContext, useEffect} from "react";
import NoteContext from "../context/notes/NoteContext";
import NoteItem from "./NoteItem";
import AddNotes from "./AddNotes";

const Notes = ({ isOpen, closeModal }) => {
  const { notes, getNotes } = useContext(NoteContext);

  useEffect(() => {
    getNotes();
  },[]); // Add getNotes to the dependency array
 
  return (
    <>
      <AddNotes />
 
<div className="modal fade" id="exampleModal" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div className="modal-dialog" role="document">
    <div className="modal-content">
      <div className="modal-header">
        <h5 className="modal-title" id="exampleModalLabel">Modal Title</h5>

      </div>
      <div className="modal-body">
        Update Description here...
      </div>
      <div className="modal-footer">
      <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
        <button type="button" className="btn btn-primary">Save changes</button>
      </div>
    </div>
  </div>
</div> 


      <div className="row my-3">
        <h2>Your Notes</h2>
        {notes.map((note) => (
          <NoteItem key={note._id} note={note}/>
        ))}
      </div>
      </>
  );
};

export default Notes;
