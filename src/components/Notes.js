import React, { useContext } from 'react';
import NoteContext from '../context/notes/NoteContext';


const Notes = () => {
 
  const { notes } =  useContext(NoteContext);
 
  // Check if notes is undefined
  if (!notes) {
     console.log("Notes is undefined");
  }

  return (
    <div className='container my-3'>
      <h2>Your Notes</h2>
      {notes.map((note) => {
        return <div key={note._id}>{note.title}</div>;
      })}
    </div>
  );
};

export default Notes;
