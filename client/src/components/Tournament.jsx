import React from 'react';
import Card from './Card';

const Tournament = ({ finalists, finalOffset, pickChoice, round }) => {
  if (finalists[finalOffset + 1]) {
    return (
      <div>
        <h1>Tournament: Round {round}</h1>
        <div className="tournament">
          <div>
            <Card
              restaurant={finalists[finalOffset]}
            />
            <button
              onClick={() => {
                pickChoice(finalOffset + 1);
              }}
            >
              CHOOSE
          </button>
          </div>
          <div>
            <Card
              restaurant={finalists[finalOffset + 1]}
            />
            <button
              onClick={() => {
                pickChoice(finalOffset);
              }}
            >
              CHOOSE
            </button>
          </div>
        </div>
      </div>
    )
  } else {
    return null;
  }
}

export default Tournament;