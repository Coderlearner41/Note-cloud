import React from 'react'
import "../App.css";

function Alert(props) {
  return (
    props.alert && <div className={`alert alert-${props.alert.type} alert-dismissible fade show`} role="alert">
        {props.alert.msg}
    </div>
  )
}

export default Alert