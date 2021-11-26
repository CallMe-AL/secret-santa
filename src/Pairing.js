import present from "./xmas02.svg"

const Pairing = (props) => {
  const giftee = props.decryptHash(props.pairs[1]);
  return (
    <div className="inner-pair-container">      
      <h2>Psst, <span>{props.capitalizeName(props.pairs[0].replace("%20", " "))}</span>!</h2>
      <h3>You're gifting <span>{props.capitalizeName(giftee)}</span> this year.</h3>
      <img className="pairing-img" src={present} alt="christmas-present"></img>
      <h3>Have fun! Make sure it's good!</h3>
    </div>
  )
}

export default Pairing
