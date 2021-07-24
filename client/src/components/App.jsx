import React from 'react';
import axios from 'axios';
import Alert from 'react-bootstrap/Alert';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button'
import Card from 'react-bootstrap/Card';
import 'bootstrap/dist/css/bootstrap.min.css';

import Tournament from './Tournament'
import Tinder from './Tinder';
import Cardy from './Card';
import Formy from './Form';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      businesses: [],
      offset: 0,
      finalists: [],
      finalOffset: 0,
      tourniReady: false,
      isComplete: false,
      hasLocation: false,
      doneWaiting: false,
      round: 1,
      longitude: 0,
      latitude: 0,
      location: "",
      yelpOffset: 0,
    };

    this.getYelpData = this.getYelpData.bind(this);
    this.addToFinalists = this.addToFinalists.bind(this);
    this.checkTourniStatus = this.checkTourniStatus.bind(this);
    this.toggleTourniStatus = this.toggleTourniStatus.bind(this);
    this.pickChoice = this.pickChoice.bind(this);
    this.cutRestaurant = this.cutRestaurant.bind(this);
    this.checkEndRound = this.checkEndRound.bind(this);
    this.submitSearch = this.submitSearch.bind(this);
    this.getNextRestaurant = this.getNextRestaurant.bind(this);
    this.addRestaurant = this.addRestaurant.bind(this);
    this.checkOffset = this.checkOffset.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  componentDidMount() {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition((position) => {
        this.setState({
          hasLocation: true,
          doneWaiting: true,
          longitude: position.coords.longitude,
          latitude: position.coords.latitude,
        }, () => {
          this.getYelpData(position.coords);
        })
      }, (error) => {
        this.setState({
          doneWaiting: true,
        });
      });
    } else {
      console.log("Geolocation Not Available");
      this.setState({
        doneWaiting: true,
      });
    }
  }

  getYelpData() {
    const { longitude, latitude, location, yelpOffset } = this.state;
    console.log("Searching using this location: " + location);

    axios('/businesses/search', { params: { longitude, latitude, location, yelpOffset } })
      .then((results) => {
        console.log(results.data);
        this.setState({
          businesses: results.data.businesses,
        })
      })
      .catch((error) => {
        console.error(error);
      });
  }

  addToFinalists(restaurant) {
    const { finalists } = this.state;

    this.setState((prevState) => ({
      finalists: [...prevState.finalists, restaurant],
    }), () => {
      this.checkTourniStatus();
    });
  }

  checkTourniStatus() {
    const { finalists } = this.state;

    if (finalists.length === 8) {
      this.toggleTourniStatus();
    }
  }

  toggleTourniStatus() {
    this.setState({
      tourniReady: true,
    });
  }

  pickChoice(index) {
    this.setState((prevState) => ({
      finalOffset: prevState.finalOffset + 1,
    }), () => {
      this.cutRestaurant(index);
    });
  }

  cutRestaurant(index) {
    const { finalists, finalOffset } = this.state;

    this.setState((prevState) => ({
      finalists: prevState.finalists.filter((restaurant, i) => i !== index),
    }), () => {
      this.checkEndRound();
    });
  }

  checkEndRound() {
    const { finalists, finalOffset } = this.state;

    if (finalists.length === finalOffset) {
      this.setState((prevState) => ({
        finalOffset: 0,
        round: prevState.round + 1,
      }), () => {
        this.checkFinalistFound();
      })
    }
  }

  checkFinalistFound() {
    const { finalists, finalOffset } = this.state;

    if (finalists.length === 1) {
      this.setState({
        isComplete: true,
      })
    }
  }

  submitSearch(location) {
    console.log(location);

    axios('/businesses/search', { params: { location } })
      .then((results) => {
        console.log(results.data);
        this.setState({
          businesses: results.data.businesses,
          hasLocation: true,
          location,
        })
      })
      .catch((error) => {
        console.error(error);
      });
  }

  getNextRestaurant() {
    this.setState((prevState) => ({
      offset: prevState.offset + 1,
    }), () => {
      this.checkOffset();
    });
  }

  addRestaurant(restaurant) {
    this.setState((prevState) => ({
      offset: prevState.offset + 1,
    }), () => {
      this.addToFinalists(restaurant);
    });
  }

  checkOffset() {
    const { offset } = this.state;

    if (offset === 50) {
      this.setState((prevState) => ({
        offset: 0,
        yelpOffset: prevState.yelpOffset + 50,
        businesses: [],
      }), () => {
        this.getYelpData();
      });
    }
  }

  handleChange(e) {
    this.setState({
      [e.target.name]: e.target.value,
    })
  }

  render() {
    const { businesses, offset, finalists, finalOffset, tourniReady, isComplete, hasLocation, doneWaiting, location, round } = this.state;

    if (isComplete) {
      const business = finalists[finalOffset];
      const categories = [];

      for (let i = 0; i < business.categories.length; i++) {
        categories.push(business.categories[i].title);
      }

      return (
        <div>
          <Alert variant="success">
            <strong>WINNER WINNER THIS IS YOUR DINNER</strong>
          </Alert>
          <Card style={{ width: '400px' }}>
            <Card.Img
              variant="top"
              src={business.image_url}
              alt="Card image"
              style={{
                height: '400px',
                objectFit: 'cover',
              }}
            />
            <Card.Body>
              <Card.Title>{business.name}</Card.Title>
              <Card.Subtitle>
                {`${business.rating}★ · ${business.price} · ${(business.distance / 1609).toFixed(1) + 'mi'}`}
              </Card.Subtitle>
              <Card.Text>
                {categories.join(', ')}
                <br />
                {`${business.location.address1}, ${business.location.city}, ${business.location.state} ${business.location.zip_code}`}
                <br />
                {business.phone}
                <br />
                {`${business.review_count} reviews`}
              </Card.Text>
            </Card.Body>
          </Card>
        </div>
      )
    }
    else if (tourniReady) {
      return (
        <Tournament
          finalists={finalists}
          finalOffset={finalOffset}
          pickChoice={this.pickChoice}
          round={round}
        />
      )
    } else if (hasLocation) {
      return (
        <Tinder
          businesses={businesses}
          offset={offset}
          finalists={finalists}
          addToFinalists={this.addToFinalists}
          getNextRestaurant={this.getNextRestaurant}
          addRestaurant={this.addRestaurant}
        />
      )
    } else if (doneWaiting) {
      return (
        <>
          <Alert variant="info">
            Search for hot local restaurants near you!
          </Alert>
          <Form>
            <Form.Group className="mb-3">
              <Form.Control
                type="text"
                placeholder="Address or Zip Code"
                // controlId={location}
                name="location"
                value={location}
                onChange={this.handleChange}
              />
            </Form.Group>
            <Button
              variant="primary"
              onClick={() => {
                this.submitSearch(location);
                this.setState({
                  hasLocation: true,
                })
              }}
            >
              Search
            </Button>
          </Form>
        </>
      )
    } else {
      return (
        <Alert variant="warning">
          Stalking your location...
        </Alert>
      )
    }
  }
}

export default App;
// heroku