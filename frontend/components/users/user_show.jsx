import React from 'react';

class UserShow extends React.Component {
  componentDidMount() {
    this.props.fetchUser(this.props.userId);
  }

  render() {
    const user = this.props.user;
    return(
      <section>
        <img src={user.img_url} />
        <div>{user.name}</div>
      </section>
    );
  }
}

export default UserShow;
