import santaImg from "./santa-claus-christmas-clipart.svg"

const Header = () => {
  return (
    <>
      <img className="main-img" src={santaImg} alt="santa"></img>
      <h1>Secret Santa Generator</h1>
    </>
  )
}

export default Header
