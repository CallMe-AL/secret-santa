const WarningMessages = (props) => {
  return (
    <div className="warning-messages-container">
      {props.warnings.map((warning, index) => {
        return (
          <p 
            key={index + Math.floor(Math.random() * 10000)} 
            className="warning-message"
            >
            {warning}
          </p>
        )
      })}
    </div>
  )
}

export default WarningMessages
