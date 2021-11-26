import Participants from "./Participants"
import CreateSS from "./CreateSS"
import PairItem from "./PairItem"
import WarningMessages from "./WarningMessages"
import React, { useState, useEffect } from 'react'
import Header from "./Header"
import Pairing from "./Pairing"
import Footer from "./Footer"
import cryptojs from 'crypto-js'
import aes from 'crypto-js/aes'

const SantaGenerator = () => {

  const startingParticipants = [
    {
      id: "1",
      name: '',
      warning: false
    },
    {
      id: "2",
      name: '',
      warning: false
    },
    {
      id: "3",
      name: '',
      warning: false
    }
  ]
  
  // people objects
  const [participants, setParticipants] = useState(startingParticipants);
  // warning messages
  const [warnings, setWarnings] = useState([]);
  // secret santa list
  const [santaList, setSantaList] = useState([]);
  // search parameters
  const [parameters, setParameters] = useState([]);

  const handleAddPersonChild = (e) => {
    const name = e.target.value;
    participants.forEach(part => {
      if (part.id === e.target.id) {
        part.name = name.toLowerCase().trim();
      }     
    });
  }

  const removePerson = (e) => {
    if (participants.length > 3) {
      const newPartList = participants.filter((person) => person.id !== e.target.id);
      setParticipants(newPartList);
    } else {  
      participants.forEach(person => {
        person.warning = true;
      });
      setWarnings(["You need at least 3 people for a Secret Santa event!"]);      
    }
  }

  const addNewPerson = () => {
    const id = Math.floor(Math.random() * 10000);
    setParticipants([...participants, {id: id.toString(), name: '', warning: false}]);    
  }

  const capitalizeName = (name) => {
    const words = name.split(" ");

    const upperCasedWords = words.map(word => {
      return word[0].toUpperCase() + word.slice(1);
    }).join(" ");

    return upperCasedWords;
  }

  const createList = () => {
    let nameCheck = true;
    let currentNames = [];
    let tempWarnings = [];

    participants.forEach((person, index) => {
      person.warning = false;
      if (person.name === '') {
        tempWarnings.push(`Person ${index + 1} is nameless :(. Please edit or remove person.`);       
        person.warning = true;
        nameCheck = false;
      } else if (currentNames.indexOf(person.name) !== -1) {
        tempWarnings.push(`Person ${index + 1} is a duplicate. Please edit, or include last initial or name.`);
        person.warning = true;
        nameCheck = false;
      } else {
        currentNames.push(person.name);
      }      
    });

    if (currentNames.length === 0) {
      setWarnings(["You need at least 3 people for a Secret Santa event!"]);
    } else {
      setWarnings(tempWarnings);
    }

    currentNames = [];

    if (nameCheck) {
      const participantsCopy = participants.slice();
      const shuffledParticipants = shuffleArray(participantsCopy);

      setSantaList(shuffledParticipants);      
    }        
  }

  const shuffleArray = (array) => {
    // Fisher-Yates shuffle: https://bost.ocks.org/mike/shuffle/
    let currentIndex = array.length,  randomIndex;

    // While there remain elements to shuffle...
    while (currentIndex != 0) {

      // Pick a remaining element...
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;

      // And swap it with the current element.
      [array[currentIndex], array[randomIndex]] = [array[randomIndex], array[currentIndex]];
        
    }

    return array;
  }

  const encryptString = (string) => {
    const key = process.env.REACT_APP_LINK_KEY;
    return aes.encrypt(string, key);
  }

  const decryptHash = (hash) => {
    const key = process.env.REACT_APP_LINK_KEY;
    const plainText = aes.decrypt(hash.toString(), key);
    return plainText.toString(cryptojs.enc.Utf8);
  }

  const getParams = () => {
    const paramStr = window.location.toString().substring(1);
    return paramStr !== null && paramStr!== "" && createParamArray(paramStr);
  }

  const createParamArray = (paramStr) => {
    let params = [];
    let paramSplit = paramStr.split("&");
    paramSplit.forEach(part => {
      let tempArray = part.split("=");
      params.push(tempArray[1]);
    });
    setParameters(params);
  }

  useEffect(() => {
    getParams();
  }, []);

  if (parameters.length > 1) {
    return ( 
      <div className="pair-container">
        <Header />
        <Pairing 
          pairs={parameters}
          decryptHash={decryptHash}
          capitalizeName={capitalizeName}
        />
      </div>
    )
  }

  return (
    <div className="generator-wrap">
      <Header />      
      <h2>Enter participants below</h2>
      <WarningMessages warnings={warnings}/>
      <Participants 
        participants={participants}
        handleAddPersonChild={handleAddPersonChild}
        removePerson={removePerson}/>
      
      <button 
        className="add-participant-btn"
        onClick={addNewPerson}><i class="fa fa-tree" aria-hidden="true"></i> Add new participant</button>
      <CreateSS createList={createList}/>
      {warnings.length === 0 && 
        santaList.map((person, index) => {
          let nextEl;

          if (index + 1 > santaList.length - 1) {
            nextEl = capitalizeName(santaList[0].name);
          } else {
            nextEl = capitalizeName(santaList[index+1].name);
          }
          return ( 
            <PairItem 
              key={person.id}
              number={index + 1}
              gifter={capitalizeName(person.name)}
              giftee={nextEl}
              encryptString={encryptString}              
            />)

        })
      }
      <Footer />
      
    </div>
  )
}

export default SantaGenerator