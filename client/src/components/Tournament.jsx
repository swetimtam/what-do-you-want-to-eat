import React from 'react';

class Tournament extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      offset: 0,
    };
  }

  render() {
    const { final, finalOffset, pickChoice } = this.props;

    return (
      <div>
        { final[finalOffset] && final[finalOffset].name}
        <button
          onClick={() => {
            pickChoice(finalOffset + 1);
          }}
        >
          SELECT
        </button>
        { final[finalOffset + 1] && final[finalOffset + 1].name}
        <button
          onClick={() => {
            pickChoice(finalOffset);
          }}
        >
          SELECT
        </button>
      </div>
    )
  }
}

export default Tournament;