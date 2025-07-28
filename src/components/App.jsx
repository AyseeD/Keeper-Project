import React, { useState, useEffect } from "react";
import Header from "./Header";
import Footer from "./Footer";
import Note from "./Note";
import CreateArea from "./CreateArea";
import axios from "axios";

function App() {
  const [notes, setNotes] = useState([]);

  useEffect(()=>{
    axios.get("http://localhost:5000/api/notes")
    .then(res=> setNotes(res.data))
    .catch(err=> console.log(err));
  }, []); //[] allows it useEffect to run only on the firt render, if no [] it will run every render

  function addNote(newNote) {
    axios.post("http://localhost:5000/api/notes", newNote)
    .then(res=>{
      setNotes(prevNotes => [res.data, ...prevNotes]); //res data is the data sent from the backend when the note gets added (res.json)
    })
    .catch(err => console.error(err));
  }

  function deleteNote(id) {
    axios.delete(`http://localhost:5000/api/notes/${id}`)
    .then(()=>{
      setNotes(prevNotes => prevNotes.filter(note => note.id !== id));
    })
    .catch(err=> console.error(err));
  }

  return (
    <div>
      <Header />
      <CreateArea onAdd={addNote} />
      {notes.map(noteItem => {
        return (
          <Note
            key={noteItem.id}
            id={noteItem.id}
            title={noteItem.title}
            content={noteItem.content}
            onDelete={deleteNote}
          />
        );
      })}
      <Footer />
    </div>
  );
}

export default App;
