import React from 'react';

import { Link } from 'react-router-dom';
import SearchBarNav from '../search_bar/search_bar_nav';

class ShowNav extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      showMenu: false
    };

    this.handleLogout = this.handleLogout.bind(this);
    this.showMenu = this.showMenu.bind(this);
    this.closeMenu = this.closeMenu.bind(this);
    this.redirectBookings = this.redirectBookings.bind(this);
    this.redirectProfile = this.redirectProfile.bind(this);
    this.redirectMyListings = this.redirectMyListings.bind(this);
  }

  componentDidMount() {
    if (this.props.currentUser) {
      this.props.fetchUser(this.props.currentUser.id);
    }
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

  redirectProfile() {
    this.props.history.push(`/users/${this.props.currentUser.id}`);
  }

  redirectMyListings() {
    this.props.history.push(`/users/${this.props.currentUser.id}/spots`);
  }

  render() {
    const sessionLinks = () => (
      <nav className="header-wrap-show">
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
      </nav>
    );

    const greetingLink = () => (
      <nav className="header-wrap-show">
        <div className="header-nav-other">
          <div className="search-logo-container">
            <Link className="header-logo" to='/' >
              <img className="localhost-logo" src={window.logoURL} />
            </Link>
            <SearchBarNav />
          </div>
        <section className="login-signup">
          <div onClick={() => this.props.openModal("createSpot")} className="spot-create-button spot-create-shownav">Become a host</div>
          <div className="login-signup-button-prof-other" onClick={this.showMenu}>
            <img className='profile-picture' src={this.props.currentUser.photoUrl} />
          </div>

          {
            this.state.showMenu
            ? (
              <div className="dropdown">
                <div className="dropdown-comp" onClick={this.redirectProfile}>My Profile</div>
                <div className="dropdown-comp" onClick={this.redirectMyListings}>My Listings</div>
                <div className="dropdown-comp" onClick={this.redirectBookings}>Manage Bookings</div>
                <div className="dropdown-comp" onClick={this.handleLogout}> Log Out </div>
              </div>
            )
            : (
              null
            )
          }
        </section>
        </div>
      </nav>
    );
    return this.props.currentUser ? greetingLink() : sessionLinks();
  }
}

export default ShowNav;
