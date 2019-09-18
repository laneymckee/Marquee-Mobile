import React, { Component } from 'react';
import { connect } from 'react-redux';

//STYLING IMPORTS
import './Discover.css';

//MATERIAL-UI IMPORTS
import { AddCircle } from '@material-ui/icons';

class Discover extends Component {
  //Load Discover on page load
  componentDidMount() {
    this.getDiscover();
  }

  getDiscover() {
    this.props.dispatch({
      type: 'FETCH_DISCOVER'
    });
  }

  addWatch = (event, watch) => {
    event.preventDefault();
    console.log('Adding recommendation to Queue...');
    this.props.dispatch({
      type: 'ADD_WATCH',
      payload: watch
    });
  };

  render() {
    let recommendations = this.props.discover.map((watch, i) => {
      return (
        <div className="recommendation" key={watch.id}>
          <h3 className="discover-title">{watch.title}</h3>
          <img
            alt={watch.title}
            src={`https://image.tmdb.org/t/p/original/${watch.backdrop}`}
          />
          <AddCircle
            onClick={event => this.addWatch(event, watch)}
            fontSize="large"
            className="add-button"
          />
        </div>
      );
    });

    return <div className="Discover">{recommendations}</div>;
  }
}

const mapStateToProps = state => ({
  discover: state.discover
});

export default connect(mapStateToProps)(Discover);
