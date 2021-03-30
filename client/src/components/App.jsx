import React from 'react';
import axios from 'axios';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      businesses: [],
    };

    this.getYelpData = this.getYelpData.bind(this);
  }

  componentDidMount() {
    this.getYelpData();
  }

  getYelpData() {
    axios('/businesses/search')
      .then((results) => {
        console.log(results.data);
        this.setState({
          businesses: results.data,
        })
      })
      .catch((error) => {
        console.error(error);
      });
  }

  render() {
    return (
      <div>React is connected</div>
    )
  }
}

export default App;