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
      guests: 1
    };

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  guests() {
    if (this.state.guests === 1) {
      return "1 guest";
    } else {
      return this.state.guests + "guests";
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
          () => this.props.history.push('/bookings')
        );
      } else {
        alert("Dates required");
      }
    } else {
      this.props.openModal('login');
    }
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


  render() {
    return (
      <section className="booking-form-container">
        <div className="booking-form-wrap">
          <div className="booking-cost-rating">
            <span className="booking-cost">${this.props.spot.cost} <span className="booking-cost-per-night"> per night</span></span>
            <span className="booking-rating">{this.props.spot.rating || "No reviews yet"}</span>
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
          <div className="booking-num-guests">{this.guests()}</div>
        </div>
        {this.renderErrors()}
        <button className="booking-request" onClick={this.handleSubmit}>Request to Book</button>
        <div className="not-charged">You won't be charged yet</div>
      </section>
    );
  }
}

export default withRouter(SpotBookingForm);
