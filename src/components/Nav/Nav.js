import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import './Nav.css';

const Nav = props => (
  <div className="nav">
    {/* Show navigation links if the user is logged in */}
    {props.user.id && (
      <div className="nav-display">
        <Link className="nav-link" to="/discover">
          Discover
        </Link>
        <Link className="nav-link" to="/search">
          Search
        </Link>
        <Link className="nav-link" to="/queue">
          Queue
        </Link>
        <Link className="nav-link" to="/profile">
          Profile
        </Link>
        <Link className="nav-link" to="/friends">
          Friends
        </Link>
      </div>
    )}
  </div>
);

// Instead of taking everything from state, we just want the user
// object to determine if they are logged in
// if they are logged in, we show them a few more links
// if you wanted you could write this code like this:
// const mapStateToProps = ({ user }) => ({ user });
const mapStateToProps = state => ({
  user: state.user
});

export default connect(mapStateToProps)(Nav);
