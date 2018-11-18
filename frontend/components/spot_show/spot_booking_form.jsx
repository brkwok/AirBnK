import React from 'react';
import { DateRangePicker } from 'react-dates';
import { withRouter } from 'react-router-dom';

class SpotBookingForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      startDate: null,
      endDate: null,
      focusedInput: null,
      maxGuests: null,
      adults: 1,
      children: 0,
      infants: 0,
      guests: 1,
      showMenu: false,
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.showMenu = this.showMenu.bind(this);
    this.handleGuestMath = this.handleGuestMath.bind(this);
    this.closeMenu = this.closeMenu.bind(this);
  }

  componentDidUpdate(pP, pS) {
    if (this.props.spot !== pP.spot) {
      let spot = this.props.spot;

      this.setState({
        maxGuests: spot.guests
      });
    } else if ( (pS.adults !== this.state.adults) || (pS.children !== this.state.children)) {
      let total = this.state.adults + this.state.children;

      this.setState({
        guests: total
      });
    }
  }

  handleGuestMath(e) {
    e.preventDefault;
    const sign = e.target.classList[0];
    const type = e.target.classList[1];
    let numAdults = this.state.adults;
    let numChildren = this.state.children;

    if (sign === 'add' && type === 'adult') {
      let added = numAdults + 1;

      this.setState( { adults: added} );
    } else if (sign === 'subtract' && type === 'adult') {
      let subtracted = numAdults - 1;

      this.setState( { adults: subtracted} );
    } else if (sign === 'add' && type === 'children') {
      let added = numChildren + 1;

      this.setState( { children: added} );
    } else if (sign === 'subtract' && type === 'children') {
      let subtracted = numChildren - 1;

      this.setState( { children: subtracted} );
    }
  }

  guests() {
    if (this.state.guests === 1) {
      return "1 guest";
    } else {
      return this.state.guests + " guests";
    }
  }

  handleSubmit(e) {
    e.preventDefault();

    if (typeof this.props.currentUserId === 'number') {
      if (Boolean(this.state.startDate) && Boolean(this.state.endDate)) {
        this.props.createBooking({
          booking: {
            user_id: this.props.currentUserId,
            spot_id: this.props.spot.id,
            check_in: this.state.startDate._d,
            check_out: this.state.endDate._d
          }
        }).then(
          () => this.props.history.push(`/bookings`)
        );
      } else {
        alert("Dates required");
      }
    } else {
      this.props.openModal('login');
    }
  }

  showMenu(e) {
    e.preventDefault();

    this.setState( { showMenu: true } );
  }

  closeMenu(e) {
    e.preventDefault();

    this.setState( { showMenu: false } );
  }

  renderErrors() {
    let bookingErrors = this.props.errors || [];
    return (
      <ul>
        {bookingErrors.map((error, i) => {
          return <li key={`error${i}`} className='booking-errors'>
            {error}
          </li>;
        })}
      </ul>
    );
  }

  renderStars() {
    let rating = this.props.spot.avg_ratings;
    let ratingPercentage = rating / 5 * 100;
    let width = {width: `${ratingPercentage}%`};
    return (
      rating ? (
        <div className="stars-wrapper">
          <div className="stars-outer"><i className="far fa-star"></i><i className="far fa-star"></i><i className="far fa-star"></i><i className="far fa-star"></i><i className="far fa-star"></i>
          <div className="stars-inner" style={width}><i className="fas fa-star"></i><i className="fas fa-star"></i><i className="fas fa-star"></i><i className="fas fa-star"></i><i className="fas fa-star"></i></div>
          </div>
        </div>
      )
      :
      (<div className="stars-wrapper"></div>)
    );
  }


  render() {
    let total = this.state.adults + this.state.children;

    return (
      <section className="booking-form-container">
        <div className="booking-number-modal"></div>
        <div className="booking-form-wrap">
          <div className="booking-cost-rating">
            <span className="booking-cost">${this.props.spot.cost} <span className="booking-cost-per-night"> per night</span></span>
            <div className="rating-wrap">
              {this.renderStars()}
              <span className="booking-rating">{this.props.spot.avg_ratings || "No reviews yet"}</span>
            </div>
          </div>

          <div className="booking-calendar">
            <div className="booking-dates">Dates</div>
            <DateRangePicker
              onDatesChange={ ({ startDate, endDate }) => {
                this.setState({ startDate, endDate });
              }}
              focusedInput={this.state.focusedInput}
              onFocusChange={ focusedInput => {
                this.setState({ focusedInput });
              }}
              numberOfMonths={1}
              enableOutsideDays={false}
              startDateId="startDate"
              startDate={this.state.startDate}
              endDateId="endDate"
              endDate={this.state.endDate}
              startDatePlaceholderText="Check In"
              endDatePlaceholderText="Check Out"
              showClearDates={true}
              />
          </div>
        </div>
        <div className="booking-form-guests-container">
          <div className="booking-form-guests">Guests</div>
          <div className="booking-num-guests" onClick={this.showMenu}>
            { this.guests() }
          </div>
            {this.state.showMenu ? (
              <div className="guests-number-container">
                <div className="guests-container">
                  <div
                    className={
                      (this.state.adults < 2) ? "guests-signs-disabled" : "subtract adult guests-signs"
                    }
                    onClick={this.handleGuestMath}>-</div>
                  <div className="guests-type">
                    {this.state.adults} {(this.state.adults === 1) ? 'adult' : 'adults'}
                  </div>
                  <div
                    className={
                      (this.state.maxGuests === total) ? "guests-signs-disabled" : "add adult guests-signs"
                    }
                    onClick={this.handleGuestMath}
                    >+</div>
                </div>
                <div className="guests-container">
                  <div
                    className={
                      (this.state.children < 1) ? "guests-signs-disabled" : "subtract children guests-signs"
                    }
                    onClick={this.handleGuestMath}>-</div>
                  <div className="guests-type">
                    {this.state.children} {(this.state.children === 1) ? 'child' : 'children'}
                  </div>
                  <div
                    className={
                      (this.state.maxGuests === total) ? "guests-signs-disabled" : "add children guests-signs"
                    }
                    onClick={this.handleGuestMath}
                    >+</div>
                </div>
              </div>
            ) : (
              null
            )}
        </div>
        {this.renderErrors()}
        <button className="booking-request" onClick={this.handleSubmit}>Request to Book</button>
        <div className="not-charged">You won't be charged yet</div>
      </section>
    );
  }
}

export default withRouter(SpotBookingForm);
