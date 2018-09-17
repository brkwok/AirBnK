import React from 'react';

import { Link } from 'react-router-dom';
import SearchBarNav from '../search_bar/search_bar_nav';

class SearchNav extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      showMenu: false
    };

    this.handleLogout = this.handleLogout.bind(this);
    this.showMenu = this.showMenu.bind(this);
    this.closeMenu = this.closeMenu.bind(this);
    this.redirectBookings = this.redirectBookings.bind(this);
  }

  showMenu(e) {
    e.preventDefault();

    this.setState({ showMenu: true }, () => {
      document.addEventListener('click', this.closeMenu);
    });
  }

  closeMenu() {
    this.setState({ showMenu: false }, () => {
      document.removeEventListener('click', this.closeMenu);
    });
  }

  handleLogout() {
    this.props.logout();
  }

  redirectBookings() {
    this.props.history.push("/bookings");
  }

  render() {
    const sessionLinks = () => (
      <nav className="header-wrap-other">
        <div className="header-nav-other">
          <div className="search-logo-container">
            <Link className="header-logo" to='/' >
              <img className="localhost-logo" src={window.logoURL} />
            </Link>
            <SearchBarNav />
          </div>
          <div className="login-signup">
            <div className="login-signup-button-other" onClick={() => this.props.openModal('signup')}>Sign up</div>
            <div className="login-signup-button-other" onClick={() => this.props.openModal('login')}>Log in</div>
          </div>
        </div>
        <div className="search-header-nav">
          <button className="filter-button">
            <span>Dates</span>
          </button>
          <button className="filter-button">
            <span>Guests</span>
          </button>
          <button className="filter-button">
            <span>Price</span>
          </button>
        </div>
      </nav>
    );

    const greetingLink = () => (
      <nav className="header-wrap-other">
        <div className="header-nav-other">
          <div className="search-logo-container">
            <Link className="header-logo" to='/' >
              <img className="localhost-logo" src={window.logoURL} />
            </Link>
            <SearchBarNav />
          </div>
        <section className="login-signup">
          <div className="login-signup-button-prof-other" onClick={this.showMenu}>
            <img className='profile-picture' src={this.props.currentUser.img_url} />
          </div>

          {
            this.state.showMenu
            ? (
              <div className="dropdown">
                <div className="dropdown-comp">Edit Profile</div>
                <div className="dropdown-comp" onClick={this.redirectBookings}>Manage Bookings</div>
                <div className="dropdown-comp" onClick={this.handleLogout}>Log Out</div>
              </div>
            )
            : (
              null
            )
          }
        </section>
        </div>
        <section className="search-header-nav">
          <div className="filter-button-container">
            <button className="filter-button">
              <span>Dates</span>
            </button>
            <button className="filter-button">
              <span>Guests</span>
            </button>
            <button className="filter-button">
              <span>Price</span>
            </button>
          </div>
        </section>
      </nav>
    );
    return this.props.currentUser ? greetingLink() : sessionLinks();
  }
}

export default SearchNav;
