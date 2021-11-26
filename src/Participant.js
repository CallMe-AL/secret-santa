const Participant = (props) => {

  return (
    <div className="participant-container">
      <span className="participant-number">{props.number}</span>
      <input 
        type="text"
        placeholder="Enter participant name"
        onChange={props.handleAddPerson}
        id={props.id}
        className={props.displayWarning}
      />
      <button 
        className="remove-btn" 
        id={props.id}
        onClick={props.removePerson}
        >        
        Remove</button>
    </div>
  )
}

export default Participant
