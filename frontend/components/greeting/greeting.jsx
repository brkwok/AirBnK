import React from 'react';

import { Link } from 'react-router-dom';

class Greeting extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      showMenu: false
    };

    this.handleLogout = this.handleLogout.bind(this);
    this.showMenu = this.showMenu.bind(this);
    this.closeMenu = this.closeMenu.bind(this);
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

  render() {
    debugger
    const sessionLinks = () => (
      <div className="login-signup">
        <Link to='/signup'>Sign up</Link>
        <Link to='/login'>Log in</Link>
      </div>
    );

    const greetingLink = () => (
      <section>
        <div onClick={this.showMenu}>
          Show Menu
        </div>

        {
          this.state.showMenu
          ? (
            <div className="dropdown">
              <div className="dropdown-comp" onClick={this.handleLogout}> Log Out </div>
            </div>
          )
          : (
            null
          )
        }
      </section>
    );
    return this.props.currentUser ? greetingLink() : sessionLinks();
  }

}

export default Greeting;
