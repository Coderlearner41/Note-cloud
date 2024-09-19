import React,{useContext} from 'react';
import noteContext from '../Context/notes/NoteContext'


const NoteItem = (props) => {
  const {deleteNote} = useContext(noteContext);
  const handleClick=()=>{
    deleteNote(note._id);
    props.showAlert("Note deleted","success")
  }
  const {note,updateNote} = props
  return (
    <div className="card text-center my-3">
      <div className="card-header">
        Featured
      </div>
      <div className="card-body">
        <h5 className="card-title">{note.title}</h5>
        <p className="card-text">{note.description}.</p>
      </div>
      <div className="card-footer text-body-secondary">
      <div className="d-flex justify-content-end p-3">
        <i className="fa-solid fa-trash mx-2 " onClick={handleClick}></i>
        <i className="fa-regular fa-pen-to-square mx-2" onClick={()=>{updateNote(note)}}></i>
        </div>
      </div>
    </div>
  )
}

export default NoteItem