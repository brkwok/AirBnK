import React from 'react';
// import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
// import { updateBounds } from '../../actions/filter_actions';


class SearchBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {search: ""};
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleUpdate = this.handleUpdate.bind(this);
    this.handleClear = this.handleClear.bind(this);
  }

  componentDidMount() {
    const input = document.getElementById("search-bar-nav");
    const options = { types: ['(regions)'] };
    const autocomplete = new google.maps.places.Autocomplete(input, options);

    autocomplete.addListener('place_changed', () => {
      let address = autocomplete.getPlace().formatted_address;
      this.handleSubmit(address);
      this.setState({search: address});
    });
  }

  handleSubmit(search) {
    search = this.state.search;
    const geocoder = new google.maps.Geocoder();
    geocoder.geocode({address: search}, (results, status) => {
      if (status == google.maps.GeocoderStatus.OK) {
        const lat = results[0].geometry.location.lat();
        const lng = results[0].geometry.location.lng();
        this.props.history.push(`/spots?latitude=${lat}&longitude=${lng}`);
      }
    });
  }

  handleEnter(e) {
    if (e.keyCode === 13 && e.shiftKey === false) {
      e.preventDefault();
      this.handleSubmit(this.state.search);
    }
  }

  handleUpdate(e) {
    this.setState({search: e.target.value});
  }

  handleClear() {
    this.setState({search: ""});
  }
   // onSubmit={this.handleEnter}
  render() {
    let clear;
    if (this.state.search !== "") {
      clear = (
        <div className='clear-input-nav' onClick={this.handleClear}>&times;</div>
      );
    }

    return (
      <div className="search-bar-container-nav">
        <div className="search-nav" onSubmit={this.handleSubmit}>
          <i className="fas fa-search search-nav-icon"></i>
          <input id='search-bar-nav' onChange={this.handleUpdate}
            type="text" className="search-bar-nav-class"  value={this.state.search}
            placeholder='Try "Manhattan"' />
          {clear}
        </div>
      </div>
    );
  }
}

export default withRouter(SearchBar);
