import React, { Component } from 'react';
import { connect } from 'react-redux';

//MATERIAL-UI IMPORTS
import { AddCircle } from '@material-ui/icons';

//DIALOG BOX ON ADD SHOW
import Swal from 'sweetalert2';

class SearchItem extends Component {
  state = {
    watch: {
      title: this.props.watch.title,
      poster: this.props.watch.poster_path,
      backdrop: this.props.watch.backdrop_path
    }
  };

  componentDidMount() {
    let title = '';
    if (this.props.watch.title) {
      title = this.props.watch.title;
    } else {
      title = this.props.watch.name;
    }
    this.setState({
      watch: {
        ...this.state.watch,
        title: title
      }
    });
  }

  addWatch = event => {
    console.log('Adding to Queue...');
    //dialog box confirmation: success!
    this.addAlert();
    //send dispatch for POST
    this.props.dispatch({
      type: 'ADD_WATCH',
      payload: this.state.watch
    });
    //clear search reducer to reset page
    this.props.dispatch({
      type: 'CLEAR_SEARCH',
      payload: this.state.searchTerm
    });
  };

  addAlert() {
    Swal.fire({
      type: 'success',
      title: 'Successfully added!',
      showConfirmButton: false,
      timer: 1000
    });
  }

  render() {
    return (
      <div key={this.props.watch.title} className="Poster">
        {this.props.watch.poster_path ? (
          <img
            alt={this.props.watch.title}
            src={`https://image.tmdb.org/t/p/original/${this.props.watch.poster_path}`}
          />
        ) : (
          <div className="posterPlaceholder">
            <p>
              {this.props.watch.title
                ? this.props.watch.title
                : this.props.watch.name}
              <br />
              <span className="poster-missing">(Unavailable)</span>
            </p>
          </div>
        )}
        <br />
        <AddCircle onClick={this.addWatch} fontSize="small" />
      </div>
    );
  }
}

export default connect()(SearchItem);
