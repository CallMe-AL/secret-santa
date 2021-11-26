import React, { useState } from 'react';
import { CopyToClipboard } from 'react-copy-to-clipboard';

const PairItem = (props) => {

  // copied boolean
  const [copied, setCopied] = useState(false);
  // copied text
  const [copyText, setCopyText] = useState('Copy');

  const showCopied = () => {
    setCopied(true);
    setCopyText('Copied!');
    
    setTimeout(() => {
      setCopied(false);
      setCopyText('Copy');
    }, 1000);
  }

  return (
    <ul className="pair-item">
      <li>
        <span className="pair-number">
{props.number}</span>
        <div>
          <span>{props.gifter}</span> is gifting <span>{props.giftee}</span> <i class="fas fa-glass-cheers"></i>
        </div>
        {<CopyToClipboard 
          text={window.location.origin.toString() + window.location.pathname.toString() + "/?name=" + props.gifter.split(" ").join("%20") + "&key=" + props.encryptString(props.giftee)}
          onCopy={() => showCopied()}
          >
          
          <button className="copy-btn">
            {copyText}
          </button>
        </CopyToClipboard>}
      </li>
      
    </ul>
  )
}

export default PairItem
