import React,{useContext, useEffect, useRef, useState} from 'react'
import noteContext from '../Context/notes/NoteContext'
import NoteItem from './noteItem'
import AddNote from "./AddNote";
import{useNavigate} from 'react-router-dom'

const Notes = (props) => {

    const {notes,getNote,editNote} = useContext(noteContext)
    const [note, setNote] = useState({id:"",etitle:"",edescription:"",etag:"default"})
    const history = useNavigate();

    useEffect(()=>{
      if(localStorage.getItem('token')){
      getNote()
      } else{
        history('/Login')
      }
    },[getNote,history])

    const ref = useRef(null)
    const refClose = useRef(null)

    const updateNote= async (currentNote)=>{
      ref.current.click();
      setNote({id: currentNote._id, etitle: currentNote.title,edescription: currentNote.description, etag:currentNote.tag})
    }

    const onChange=(e)=>{
      setNote({...note,[e.target.name]: e.target.value})
    }

    const handleClick= (e)=>{
      refClose.current.click();
      try {
        editNote(note.id, note.etitle, note.edescription, note.etag);
        props.showAlert("Note updated successfully", "success")
      } catch (error) {
        props.showAlert("failed to update Note", "danger")
      }
    }

  return (
    <div className="container my-3 md-3">
       <AddNote showAlert={props.showAlert}/>
       <button ref={ref} type="button" className="btn btn-primary hide" data-bs-toggle="modal" data-bs-target="#exampleModal" >
          Launch demo modal
        </button>

        {/* <!-- Modal --> */}
        <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h1 className="modal-title fs-5" id="exampleModalLabel">Update Note</h1>
                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
              </div>
              <div className="modal-body">
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
                      id="etitle"
                      aria-describedby="emailHelp"
                      name="etitle"
                      value={note.etitle}
                      onChange={onChange}
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="edesc" className="form-label">
                      Discription
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="edescription"
                      name='edescription'
                      onChange={onChange}
                      value={note.edescription}  
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="tag" className="form-label">
                      tag
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="etag"
                      name='etag'
                      onChange={onChange}
                      value={note.etag}
                    />
                  </div>
                </form>
              </div>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" data-bs-dismiss="modal" ref={refClose}>Close</button>
                <button type="button" className="btn btn-primary" onClick={handleClick}  disabled={note.etitle.length<5 || note.edescription.length<5}>Update Note</button>
              </div>
            </div>
          </div>
        </div>
        <div className="row my-3">
        <h1>your notes</h1>
        <div className="container mx-2">
        {notes.length===0?'No Notes to display':""}
        </div>
        {notes.map((note)=>{
          return <NoteItem showAlert={props.showAlert} note={note} updateNote={updateNote} key={note._id}  />
        })}
        </div>
      </div>
    
  )
}

export default Notes
