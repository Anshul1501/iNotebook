import react, { useState } from 'react';
import noteContext from './noteContext';

const noteState = (props) => {

    const notesInitial = {
        note: [
            {
              "_id": "66092cbde5c5b823f6f0e01b",
              "user": "65b7a013a1f0aef215fad245",
              "title": "newtitle-2s",
              "description": "this is a new description asdfasd. adf ",
              "tag": "newsasdf",
              "date": "1711877309728",
              "__v": 0
            },
            {
              "_id": "66093afbb45dc677bbe96b1d",
              "user": "65b7a013a1f0aef215fad245",
              "title": "newtitle-2s",
              "description": "this is a new description asdfasd. adf ",
              "tag": "newsasdf",
              "date": "1711880955332",
              "__v": 0
            },
            {
              "_id": "66093b11b45dc677bbe96b20",
              "user": "65b7a013a1f0aef215fad245",
              "title": "newtitle-2s",
              "description": "this is a new way to add desc ",
              "tag": "newsasdf",
              "date": "1711880977246",
              "__v": 0
            }
          ]
    };
      

    
  const [notes, setNotes] = useState(notesInitial);

     return(
        <noteContext.Provider value={{notes, setNotes}}>    {/* export notes and setNotes from note state */}
            {props.children}
        </noteContext.Provider>
     );
};

export default noteState;