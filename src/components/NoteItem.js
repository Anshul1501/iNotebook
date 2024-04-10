import React from "react";

const NoteItem = ({ note }) => {
  return (
    <div className="col-md-3" key={note._id} >
      <div className="card my-3">
        <div className="card-body">
          <h5 className="card-title">{note.title}</h5>
          <p className="card-text">
            {note.description} 
          </p>
                
          <i className="fa-solid fa-pen-to-square"></i>
          <i className="fa-solid fa-trash-can mx-2"></i>
        </div>
      </div>
    </div>

  );
};

export default NoteItem;
