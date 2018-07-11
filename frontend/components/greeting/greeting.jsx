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
  }

  showMenu(e) {
    e.preventDefault();

    this.setState({
      showMenu: true
    });
  }

  handleLogout() {
    this.props.logout();
  }

  render() {
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
              <button className="dropdown-comp" onClick={this.handleLogout}> Log Out </button>
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
