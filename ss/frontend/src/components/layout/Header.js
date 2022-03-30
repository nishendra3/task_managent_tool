import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { logout } from '../../actions/auth';

export class Header extends Component {
  static propTypes = {
    auth: PropTypes.object.isRequired,
    logout: PropTypes.func.isRequired,
  };
  
  render() {
    const { isAuthenticated, user } = this.props.auth;
    //console.log(user)
    const ssLinks = (
      <ul className="navbar-nav mr-auto mt-2 mt-lg-0 ">
        <li className="nav-item">
          <Link to="/adddetails" className="nav-link">
            Add Vendor Details 
          </Link>
        </li>
        {/* <li className="nav-item">
          <Link to="/uc" className="nav-link">
            Approvals
          </Link>
        </li> */}
        <li className="nav-item">
          <Link to="/addtimelines" className="nav-link">
            Add Timelines
          </Link>
        </li>
        <li className="nav-item">
          <Link to="/gantt" className="nav-link">
            Gantt Charts
          </Link>
        </li>
        <li className="nav-item">
          <Link to="/reports" className="nav-link">
            Reports
          </Link>
        </li>
      </ul>
    )

    const authLinks = (
      <>
      {/* <ul className="navbar-nav ml-auto mt-2 mt-lg-0"> */}
      <div>
      <ul className="nav nav-tabs card-header-tabs ml-auto mt-2 mt-lg-0">
        <span className="navbar-text mr-3">
          <strong>{user ? `Welcome ${user.first_name} ${user.last_name} !` : ''}</strong>
        </span>
        <li className="nav-item">
          <button onClick={this.props.logout} className="nav-link btn btn-info btn-sm text-light">
            Logout
          </button>
        </li>
      </ul>
      </div>
      </>
    );

    const guestLinks = (
      <ul className="navbar-nav ml-auto mt-2 mt-lg-0">
        {/* <li className="nav-item">
          <Link to="/register" className="nav-link">
            Register
          </Link>
        </li> */}
        <li className="nav-item">
          <Link to="/login" className="nav-link">
            Login
          </Link>
        </li>
      </ul>
    );

    return (
      <nav className="navbar navbar-expand-sm navbar-light bg-light">
        <div className="container">
          <button
            className="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#navbarTogglerDemo01"
            aria-controls="navbarTogglerDemo01"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon" />
          </button>
          <div className="collapse navbar-collapse" id="navbarTogglerDemo01">
            <a className="navbar-brand" href="#">
              <h3>Second Sourcing</h3>
            </a>
            {isAuthenticated ? ssLinks : ''}
          </div>
          {isAuthenticated ? authLinks : guestLinks}
        </div>
      </nav>
    );
  }
}

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, { logout })(Header);