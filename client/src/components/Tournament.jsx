import React from 'react';
import Card from './Card';

class Tournament extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      offset: 0,
    };
  }

  render() {
    const { final, finalOffset, pickChoice } = this.props;

    if (final[finalOffset + 1]) {
      return (
        <div>
          <h1>CHOOSE BETWEEN</h1>
          <div className="tournament">
            <div>
              <Card
                restaurant={final[finalOffset]}
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
                restaurant={final[finalOffset + 1]}
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
}

export default Tournament;