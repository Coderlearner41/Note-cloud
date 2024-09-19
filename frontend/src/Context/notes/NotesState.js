import React,{useState} from 'react'
import noteContext from './NoteContext'


const NoteState = (props) =>{
  const host = "http://localhost:5000"
  const notesInitial =[]

  // get all notes
  const getNote = async ()=>{
    try {
      // Make sure to replace this with your actual API endpoint
      const response = await fetch(`${host}/api/notes/fetchallnotes`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'auth-token': localStorage.getItem('token')
        }
      });

      // Check if the response is ok (status code 200-299)
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      setNotes(data); // Update state with fetched notes

    } catch (error) {
      console.error("Failed to fetch notes:", error);
    }
  }

  //add a note
  const addNote = async (title,description,tag)=>{
    const request = new Request(`${host}/api/notes/addnote`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem('token')
      },
      body: JSON.stringify({title,description,tag}),
    });
    
    const response = await fetch(request);
    const data = await response.json();
    //Api call
    setNotes(notes.concat(data))
  }

  //delete a note
  const deleteNote =async (id)=>{
    try {
      // Make sure to replace this with your actual API endpoint
      const response = await fetch(`${host}/api/notes/deletenote/${id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'auth-token': localStorage.getItem('token')
        }
      });

      // Check if the response is ok (status code 200-299)
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }


    } catch (error) {
      console.error("Failed to delete note:", error);
    }
    //TODO Api call
    const newNotes = notes.filter((note) => {return note._id !== id})
    setNotes(newNotes)
    console.log(`deleting note with id ${id}`)
  }

  //edit a note
  const editNote = async (id,title,description,tag)=>{
    const response = new fetch(`${host}/api/notes/updatenote/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem('token')
      },
      body: JSON.stringify({title,description,tag}),
    });
    
      const json = response.json() 
      console.log(json)
      // API call

      // Logic to edit in client
      setNotes(notes.map(note => note._id === id ? json : note));
}

  const [notes, setNotes] = useState(notesInitial)
  return(
      <noteContext.Provider value ={{notes, getNote,addNote, deleteNote,editNote}}>
          {props.children}
      </noteContext.Provider>

  )
}

export default NoteState;

