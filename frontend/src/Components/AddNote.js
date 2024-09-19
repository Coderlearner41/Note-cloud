import React, { useContext,useState } from 'react'
import noteContext from '../Context/notes/NoteContext'
// import {addNote} from "../Context/notes/NotesState"

const AddNote = (props) => {
    const {addNote} = useContext(noteContext);
    const [note, setNote] = useState({title:"",description:"",tag:"default"})
    const handleClick= async (e)=>{
      e.preventDefault();
      await addNote(note.title,note.description,note.tag);
      setNote({title:"",description:"",tag:"default"})
      props.showAlert("Note added successfully","success")
    }
    const onChange=(e)=>{
      setNote({...note,[e.target.name]: e.target.value})
    }
  return (
    <div>
      <div className="container my-3">
        <h1>Add a note</h1>
        <form className="my-3">
          <div className="mb-3">
            <label htmlFor="title" className="form-label">
              Title
            </label>
            <input
              type="text"
              className="form-control"
              id="title"
              aria-describedby="emailHelp"
              name="title"
              onChange={onChange}
              value={note.title}
              minLength={5}
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="desc" className="form-label">
              Discription
            </label>
            <input
              type="text"
              className="form-control"
              id="description"
              name='description'
              onChange={onChange}
              value={note.description}
              minLength={5}
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="tag" className="form-label">
              tag
            </label>
            <input
              type="text"
              className="form-control"
              id="tag"
              name='tag'
              onChange={onChange}
              value={note.tag==="default"?"":note.tag}
              minLength={5}
              required
            />
          </div>
          <button disabled={note.title.length<5 || note.description.length<5} type="submit" className="btn btn-primary" onClick={handleClick}>
            Add Note
          </button>
        </form>
      </div>
    </div>
  )
}

export default AddNote
