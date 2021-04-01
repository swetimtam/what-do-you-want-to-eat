import React from 'react';

class Form extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      location: '',
    };

    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(e) {
    this.setState({
      [e.target.name]: e.target.value,
    })
  }

  render() {
    const { submitSearch } = this.props;
    const { location } = this.state;

    return (
      <div>
        <h1>What do you want to eat?</h1>
        <h3>Fill out the fields below and search for hot local restaurants near you!</h3>
        <input
          onChange={this.handleChange}
          name="location"
          value={location}
          placeholder="Enter location"
        />
        <button
          onClick={() => {
            submitSearch(location);
          }}
        >
          Search
        </button>
      </div>
    )
  }
}

export default Form;