import React from 'react';
import Alert from 'react-bootstrap/Alert';
// import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

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
        <Alert variant="warning">
          Search for hot local restaurants near you!
        </Alert>
        {/* <Form>
          <Form.Group>
            <Form.Label>
              Address or Zip Code
            </Form.Label>
            <Form.Control />
          </Form.Group>
        </Form> */}
        <input
          onChange={this.handleChange}
          name="location"
          placeholder="Enter location"
        />
        <Button
          variant="primary"
          onClick={() => {
            submitSearch(location);
          }}
        >
          Search
        </Button>
      </div>
    )
  }
}

export default Form;