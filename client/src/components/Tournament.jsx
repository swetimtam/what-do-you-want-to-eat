import React from 'react';

class Tournament extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      offset: 0,
    };

    this.pickChoice = this.pickChoice.bind(this);
  }

  pickChoice(index) {
    const { pickFinalist } = this.props;

    this.setState((prevState) => ({
      offset: prevState.offset + 1,
    }), () => {
      pickFinalist(index);
    });
  }

  render() {
    const { final } = this.props;
    const { offset } = this.state;

    return (
      <div>
        { final[offset] && final[offset].name}
        <button
          onClick={() => {
            this.pickChoice(offset + 1);
          }}
        >
          SELECT
        </button>
        { final[offset + 1] && final[offset + 1].name}
        <button
          onClick={() => {
            this.pickChoice(offset);
          }}
        >
          SELECT
        </button>
      </div>
    )
  }
}

export default Tournament;