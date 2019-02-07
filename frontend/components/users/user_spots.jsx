import React, { Component } from 'react';

class UserSpots extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: true
    };
  }

  componentDidMount() {
    this.props.fetchSpots();
  }

  componentDidUpdate(pP) {
    if (Object.values(pP.spots).length === 0 && pP.spots !== this.props.spots) {
      this.setState({
        loading: false
      });
    }
  }



  render() {
    const loading = this.state.loading ?
      <div className="loading">
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
          <div key={i}>
            <div className="users-spots-spot-img-container">
              <img className="users-spots-spot-img" src={spot.photoUrl} />
            </div>
            <div className="">
              <div>{spot.title}</div>
              <div>{spot.location}</div>
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
