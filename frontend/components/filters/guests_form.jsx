import React from 'react';
import { withRouter } from 'react-router-dom';

class guestsForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      minGuests: 1,
      maxNumGuests: props.maxNumGuests,
      active: false;
    }
  }

  openModal() {
    return this.props.openModal();
  }

  decreaseGuest() {

  }

  increaseGuest(guests) {

    this.setState({minGuests:})
  }

  render() {

    return(
      <div className='guests-form'>
        <form onSubmit={this.handleSubmit}>
          <button className="guests-filter-button"  onClick={this.decreaseGuest} />
          <div className="guests-filter-guests">Guests</div>
          <button className="guests-filter-button" onClick={this.increaseGuest} />

          <input className="guests-filter-apply" type="submit" value="Apply" />
        </form>
      </div>
    )
  }
}
