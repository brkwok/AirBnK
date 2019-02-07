import React, { Component } from 'react';

class UserSpots extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: true
    };

    this.redirectToSpot = this.redirectToSpot.bind(this);
  }

  componentDidMount() {
    this.props.fetchSpots();
  }

  componentDidUpdate(pP) {
    if (Object.values(pP.spots).length !== Object.values(this.props.spots).length) {
      this.setState({
        loading: false
      });
    } else if (pP.spots === this.props.spots && this.state.loading === true) {
      this.setState({
        loading: false
      });
    } else if (this.state.loading === true && Object.values(pP.spots).length === 0) {
      this.setState({
        loading: false
      });
    }
  }

  redirectToSpot(e) {
    e.preventDefault();

    this.props.history.push(`/spots/${e.target.id}`);
  }

  render() {
    const loading = this.state.loading ?
      <div className="users-spots-loading">
        <div className="lds-ellipsis">
          <div></div>
          <div></div>
          <div></div>
          <div></div>
        </div>
      </div>
      :
      <div></div>;

    let spots = Object.values(this.props.spots);
    let renderSpots;

    if (spots.length === 0) {
      renderSpots =
        <div>You do not have your own listings</div>;
    } else {
      renderSpots = spots.map( (spot, i) => {
        return(
          <div onClick={this.redirectToSpot} className="users-spots-each-spot" key={i} id={i}>
            <div id={i} className="users-spots-spot-img-container">
              <img id={i} className="users-spots-spot-img" src={spot.photoUrl} />
            </div>
            <div id={i} className="users-spots-title-location">
              <div id={i} className="users-spots-title">{spot.title}</div>
              <div id={i} className="users-spots-location">{spot.location}</div>
            </div>
          </div>
        );
      });
    }

    // if (this.props.spots.length === 0 && this.state.loading === false) {
    //   spots = <div>You do have your own listings</div>;
    // } else {
    //   debugger
    //   spots = this.props.spots.map( (spot) => {
    //     return(
    //       <div key={spot.id}>
    //         <img className="profile-picture" src={ `${spot.phoroUrl}` }  alt={`${spot.title}'s picture`}/>
    //       </div>
    //     );
    //   });
    // }

    return(
      <div className="user-spots-container">
        { this.state.loading ? loading : renderSpots }
      </div>
    );
  }
}

export default UserSpots;
