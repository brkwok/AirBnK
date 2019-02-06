import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';

class SpotForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      address1: "",
      address2: "",
      location: "",
      state: "",
      zipcode: "",
      title: "",
      cost: "",
      typeOfSpot: "Entire House",
      guests: "",
      bedroom: "",
      beds: "",
      bath: "",
      details: "",
      photo: null,
      photoUrl: null,
    };

    this.handleNumberChange = this.handleNumberChange.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleFile = this.handleFile.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.renderErrors = this.renderErrors.bind(this);
  }

  handleNumberChange(field) {
    return e => {
      if (isNaN(parseInt(e.target.value)) || parseInt(e.target.value) < 1) {
        this.setState({
          [field]: ""
        });
      } else {
        this.setState({
          [field]: e.target.value
        });
      }
    };
  }

  handleInputChange(field) {
    return e => {
      this.setState({
        [field]: e.target.value
      });
    };
  }

  handleFile(e) {
    const photo = e.currentTarget.files[0];

    let fileReader = new FileReader();

    fileReader.onloadend = () => {
      this.setState({
        photo,
        photoUrl: fileReader.result
      });
    };

    if (photo) {
      fileReader.readAsDataURL(photo);
    }
  }

  handleSubmit(e) {
    e.preventDefault();

    const spotParams = ["title", "details", "location", "guests", "cost", "bath", "lat", "lng", "beds", "bedroom", "photo", "typeOfSpot"];

    if (this.state.photoUrl === null) {
      alert("You must attach a photo");
    }

    const geocoder = new google.maps.Geocoder();
    const address = [this.state.address1, this.state.address2,this.state.location, this.state["state"], this.state.zipcode].join(" ");

    let lat = null, lng = null;
    const data = new FormData();

    geocoder.geocode({ address: address }, (results, status) => {
      if (status == google.maps.GeocoderStatus.OK) {
        lat = results[0].geometry.location.lat();
        lng = results[0].geometry.location.lng();

        debugger
        spotParams.forEach( (input) => {
          if (input === "beds" || input === "bedroom" || input === "bath" || input === "cost" || input === "guests") {
            return data.append(`spot[${input}]`, parseInt(this.state[input]));
          } else if (input === "lat") {
            return data.append(`spot[${input}]`, parseInt(lat));
          } else if (input === "lng") {
            return data.append(`spot[${input}]`, parseInt(lng));
          } else if (input === "typeOfSpot") {
            return data.append('spot[type_of_spot]', this.state.typeOfSpot);
          } else {
            return data.append(`spot[${input}]`, this.state[input]);
          }
        });

        this.props.createSpot(data).then(() => {
          this.props.history.push(`/users/${this.props.currentUser.id}/spots`);
        });
      }
    });



  }

  renderErrors() {
    return(
      <ul className="spot-form-errors">
        {this.props.errors.map((err, i) => {
          return <li key={i}>{err}</li>;
        })}
      </ul>
    );
  }

  render() {
    const preview = this.state.photoUrl ?
      <div className="img-attach-container-spot">
        <img className="img-attach" src={this.state.photoUrl}></img>
      </div>
      :
      null;

    const stateSelect =
    <select onChange={this.handleInputChange('state')}>
      <option value="AL">AL</option>
      <option value="AK">AK</option>
      <option value="AR">AR</option>
      <option value="AZ">AZ</option>
      <option value="CA">CA</option>
      <option value="CO">CO</option>
      <option value="CT">CT</option>
      <option value="DC">DC</option>
      <option value="DE">DE</option>
      <option value="FL">FL</option>
      <option value="GA">GA</option>
      <option value="HI">HI</option>
      <option value="IA">IA</option>
      <option value="ID">ID</option>
      <option value="IL">IL</option>
      <option value="IN">IN</option>
      <option value="KS">KS</option>
      <option value="KY">KY</option>
      <option value="LA">LA</option>
      <option value="MA">MA</option>
      <option value="MD">MD</option>
      <option value="ME">ME</option>
      <option value="MI">MI</option>
      <option value="MN">MN</option>
      <option value="MO">MO</option>
      <option value="MS">MS</option>
      <option value="MT">MT</option>
      <option value="NC">NC</option>
      <option value="NE">NE</option>
      <option value="NH">NH</option>
      <option value="NJ">NJ</option>
      <option value="NM">NM</option>
      <option value="NV">NV</option>
      <option value="NY">NY</option>
      <option value="ND">ND</option>
      <option value="OH">OH</option>
      <option value="OK">OK</option>
      <option value="OR">OR</option>
      <option value="PA">PA</option>
      <option value="RI">RI</option>
      <option value="SC">SC</option>
      <option value="SD">SD</option>
      <option value="TN">TN</option>
      <option value="TX">TX</option>
      <option value="UT">UT</option>
      <option value="VT">VT</option>
      <option value="VA">VA</option>
      <option value="WA">WA</option>
      <option value="WI">WI</option>
      <option value="WV">WV</option>
      <option value="WY">WY</option>
    </select>;

    console.log(this.state);
    return(
      <div className="spot-form">
        {this.renderErrors()}
        <div>
          <div>Select an Image for Spot</div>
          {preview}
          <input
            onChange={this.handleFile}
            className="spot-create-img-attach"
            type="file"
          />
        </div>
        <div>Name of Spot</div>
          <input
            onChange={this.handleInputChange('title')}
            className="spot-create-input spot-create-title"
            type="text"
            value={this.state.title}
            placeholder="Name"
          />
        <div>
          <div>Type of Spot</div>
          <select onChange={this.handleInputChange('typeOfSpot')} name="Type of Spot">
            <option value="Entire House">Entire House</option>
            <option value="Private Room">Private Room</option>
            <option value="Entire Apartment">Entire Apartment</option>
          </select>
        </div>
        <div className="spot-create-full-address">
          <div>
            <div
              className="spot-create-address-holder"
              >Street Address
              <input
                onChange={this.handleInputChange('address1')}
                className="spot-create-input spot-create-address"
                type="text"
                value={this.state.address1}
                placeholder="Address Line 1"
                />
              <input
                onChange={this.handleInputChange('address2')}
                className="spot-create-input spot-create-address"
                type="text"
                value={this.state.address2}
                placeholder="Address Line 2"
                />
            </div>
            <div>City</div>
            <input
              onChange={this.handleInputChange('location')}
              className="spot-create-input spot-create-city"
              type="text"
              value={this.state.location}
              placeholder="City"
              />
          </div>
          <div className="spot-create-state-zipcode">
            <div>
              <div>State</div>
              {stateSelect}
            </div>
            <div>
              <div>Zipcode</div>
              <input
                onChange={this.handleInputChange('zipcode')}
                className="spot-create-input"
                type="text"
                value={this.state.zipcode}
                placeholder="Zipcode"
                />
            </div>
          </div>
        </div>
        <div>Other</div>
        <input
          onChange={this.handleNumberChange('cost')}
          className="spot-create-input spot-create-numbers"
          type="text"
          value={this.state.cost}
          placeholder="Cost"
        />
        <input
          onChange={this.handleNumberChange('guests')}
          className="spot-create-input spot-create-numbers"
          type="text"
          value={this.state.guests}
          placeholder="Max Guests"
        />
        <input
          onChange={this.handleNumberChange('bedroom')}
          className="spot-create-input spot-create-numbers"
          type="text"
          value={this.state.bedroom}
          placeholder="Bedrooms"
        />
        <input
          onChange={this.handleNumberChange('beds')}
          className="spot-create-input spot-create-numbers"
          type="text"
          value={this.state.beds}
          placeholder="Beds"
        />
        <input
          onChange={this.handleNumberChange('bath')}
          className="spot-create-input spot-create-numbers"
          type="text"
          value={this.state.bath}
          placeholder="Bath"
        />
        <div>Details</div>
        <input
          className="spot-create-detail"
          type="textarea"
          value={this.state.details}
          onChange={this.handleInputChange("details")}
        />
        <div
          className="spot-create-submit"
          onClick={this.handleSubmit}
        >Create Spot</div>
      </div>
    );
  }
}

export default withRouter(SpotForm);
