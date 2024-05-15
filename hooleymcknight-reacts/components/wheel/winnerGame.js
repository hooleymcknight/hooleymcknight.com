import { useState } from 'react';

const WinnerGame = (props) => {
    const [declared, setDeclared] = useState(props.winningGame.length ? true : false);
    const [declaring, setDeclaring] = useState(false);

    if (props.winningGame.length > 0 && !declared) {
        if (!declaring && !declared) {
            setDeclaring(true);
            setTimeout(() => {
                setDeclaring(false);
            }, 5000);
        }
        setDeclared(true);
    }
    else if (props.winningGame.length === 0 && declared) {
        setDeclared(false);
    }

    return (
      <div
        className={props.className}
        data-declared={props.winningGame.length ? 'true' : 'false'}
        data-declaring={declaring}
      >
        <div className="confetti-container" data-allow-confetti={props.confettiAllowed}></div>
        <p>{typeof(props.winningGame) === 'string' ? props.winningGame : ''}</p>
      </div>
    );
  }
  
  export default WinnerGame;