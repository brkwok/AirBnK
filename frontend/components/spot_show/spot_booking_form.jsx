import React from 'react';


class BookingForm extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <section>
        <div className="booking-cost-rating">
          <div>Cost<span>per night</span></div>
          <div>rating + numRating</div>
        </div>
        <form>
          <label>Dates
            <input type="date"></input>
            <input type="date"></input>
          </label>
          <label>Guests
            <input type="text"></input>
          </label>

          <input type="submit" value="Request to Book"></input>
        </form>
      </section>
    );
  }
}

export default BookingForm;
