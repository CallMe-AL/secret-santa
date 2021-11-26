const CreateSS = (props) => {
  return (
    <>
      <h2>All set?</h2>
      <button 
        className="create-ss-list"
        onClick={props.createList}><i class="fas fa-gift"></i> Create Secret Santa list</button>
    </>
  )
}

export default CreateSS
