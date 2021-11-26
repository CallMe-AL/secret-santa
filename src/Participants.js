import Participant from "./Participant"
import React, { useState } from 'react'

const Participants = (props) => {

  // input warning
  const [nameWarning, setNameWarning] = useState(false);
  return (
    <div className="participants-container">
      {props.participants.map((person, index) => {
        return ( 
        <Participant 
          key={person.id} 
          number={index + 1}
          handleAddPerson={props.handleAddPersonChild}
          id={person.id}
          removePerson={props.removePerson}
          // showWarning={props.showWarning ? 'input warning' : 'input'}
          displayWarning={person.warning ? 'input warning' : 'input'}
          />)
      })}
    </div>
  )
}

export default Participants
