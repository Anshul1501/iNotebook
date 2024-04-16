import React, { useContext} from "react";
import noteContext from "../context/notes/NoteContext";

const NoteItem = (props) => {
  const { deleteNote } = useContext(noteContext);
  const {note} = props;
  
  return (
    <div className="col-md-3" key={note._id}>
      <div className="card my-3">
        <div className="card-body">
          <h5 className="card-title">{note.title}</h5>
          <p className="card-text">{note.description}</p>

          <i
            className="fa-solid fa-pen-to-square"
            data-bs-toggle="modal" data-bs-target="#exampleModal"
          ></i>
          <i
            className="fa-solid fa-trash-can mx-2"
            onClick={() => {
              deleteNote(note._id);
            }}
          ></i>
        </div>
      </div>
    </div>
  );
};

export default NoteItem;
