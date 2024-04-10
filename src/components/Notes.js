import React, { useContext } from "react";
import NoteContext from "../context/notes/NoteContext";
import NoteItem from "./NoteItem";
import AddNotes from "./AddNotes"

const Notes = () => {
 const { notes } = useContext(NoteContext);

  // Check if notes is undefined
  if (!notes) {
    console.log("Notes is undefined");
  }

  return (
    <>
      <AddNotes/>
      <div className="container row my-3">
        <h2>Your Notes</h2>
        {notes.map((note) => {
          return <NoteItem key={note._id} note={note} />;
        })}
      </div>
    </>
  );
};

export default Notes;
