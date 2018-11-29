import React from 'react';
// import ReactDOM from 'react-dom';
import SpotIndex from './spot_index';
import SpotMap from './spot_map';
import { withRouter } from 'react-router-dom';

class Search extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      activePage: 1,
      itemsPerPage: 12,
      loading: true,
      allSpots: [],
      renderSpots: [],
      maxCosts: null,
      minCosts: null,
      currMaxCosts: null,
      currMinCosts: null,
      maxGuests: null,
      minGuests: null,
      currMinGuests: null,
      currMaxGuests: null,
      guestFilter: false,
      costFilter: false,
      guestActive: false,
      costActive: false,
      guests: 1,
      adults: 1,
      children: 0
    };

    this.handleClickNextButton = this.handleClickNextButton.bind(this);
    this.handleClickPrevButton = this.handleClickPrevButton.bind(this);
    this.handleClickPage = this.handleClickPage.bind(this);
    this.showGuestMenu = this.showGuestMenu.bind(this);
    this.closeGuestMenu = this.closeGuestMenu.bind(this);
    this.showCostMenu = this.showCostMenu.bind(this);
    this.closeCostMenu = this.closeCostMenu.bind(this);
    this.guests = this.guests.bind(this);
    this.priceFilter = this.priceFilter.bind(this);
  }


  handleClickNextButton(page) {
    const nextPage = page + 1;
    return (e) => {
      this.setState({ activePage: nextPage});
    };
  }

  handleClickPrevButton(page) {
    const prevPage = page - 1;

    return (e) => {
      this.setState({ activePage: prevPage});
    };
  }

  handleClickPage(page) {
    return (e) => {
      this.setState({activePage: page});
    };
  }

  pages() {
    const { activePage } = this.state;
    const numPages = Math.ceil(this.props.spots.length / this.state.itemsPerPage);


    let firstPage =
      [
        <li key="1">
          <button className={ activePage === 1 ? 'selected' : 'not-selected'} onClick={this.handleClickPage(1)}><span>1</span></button>
        </li>
      ];
    let lastPage =
      [
        <li key={numPages}>
          <button className={ activePage === numPages ? 'selected' : 'not-selected'} onClick={this.handleClickPage(numPages)}><span>{numPages}</span></button>
        </li>
      ];

    const overflow1 = <li className='overflow' key={'overflow1'}>...</li>;
    const overflow2 = <li className='overflow' key={'overflow2'}>...</li>;

    let startIdx;
    let lastIdx;

    if (numPages <= 5) {
      firstPage = [];
      lastPage = [];
      startIdx = 1;
      lastIdx = numPages + 1;
    } else if ( activePage >= 4 && activePage <= numPages - 3) {
      startIdx = activePage - 1;
      lastIdx = activePage + 2;

      firstPage.push(overflow1);
      lastPage.unshift(overflow2);
    } else if ( activePage < 5 ) {
      startIdx = 2;
      lastIdx = 5;

      lastPage.unshift(overflow2);
    } else if (activePage > numPages - 4) {
      startIdx = numPages - 3;
      lastIdx = numPages;

      firstPage.push(overflow1);
    } else if (activePage <= numPages - 4 && activePage >= 7) {
      startIdx = activePage - 1;
      lastIdx = activePage + 2;

      firstPage.push(overflow1);
      lastPage.push(overflow2);
    }

    const dispPages = [];

    for (let i = startIdx; i < lastIdx; i++) {
      dispPages.push(
        <li key={i}>
          <button className={ activePage === i ? 'selected' : 'not-selected' } onClick={this.handleClickPage(i)}><span>{i}</span></button>
        </li>
      );
    }

    let next = [];
    let prev = [];

    if ( numPages > 1 && activePage < numPages && activePage > 1) {
      next = [
        <li key={ numPages + 1}>
          <button className='next-prev' onClick={this.handleClickNextButton(activePage)}>&gt;</button>
        </li>
      ];

      prev = [
        <li key="0" >
          <button className='next-prev' onClick={this.handleClickPrevButton(activePage)}>&lt;</button>
        </li>
      ];
    } else if ( numPages > 1 && activePage === 1) {
      next = [
        <li key={ numPages + 1}>
          <button className='next-prev' onClick={this.handleClickNextButton(activePage)}>&gt;</button>
        </li>
      ];
      prev = [];
    } else if ( numPages > 1 && activePage === numPages) {
      prev = [
        <li key="0" >
          <button className='next-prev' onClick={this.handleClickPrevButton(activePage)}>&lt;</button>
        </li>
      ];

      next = [];
    }

    return prev.concat(firstPage).concat(dispPages).concat(lastPage).concat(next);
  }

  componentDidMount() {
    this.props.updateBounds(this.props.bounds);
  }

  componentDidUpdate(pP, pS) {
    if (this.props.bounds !== pP.bounds) {
      this.setState({ loading: true});
      this.props.fetchSpots(this.props.bounds);
      this.setState({
        activePage: 1,
      });
    } else if ((JSON.stringify(pP.spots) !== JSON.stringify(this.props.spots))
      || this.state.allSpots.length !== this.props.spots.length) {
      const spots = Object.values(this.props.spots);
      let costs = [];
      let guests = [];

      spots.forEach( (spot) => {
        costs.push(spot.cost);
        guests.push(spot.guests);
      });

      const [maxCosts, minCosts, maxGuests, minGuests] =
      [Math.max(...costs), Math.min(...costs), Math.max(...guests), Math.min(...guests)];

      const { activePage, itemsPerPage } = this.state;
      const spotsStartIdx = itemsPerPage * (activePage - 1);
      const spotsEndIdx = itemsPerPage * (activePage);
      const renderSpots = this.props.spots.slice(spotsStartIdx, spotsEndIdx);

      this.setState({
        maxCosts,
        minCosts,
        currMaxCosts: maxCosts,
        currMinCosts: minCosts,
        maxGuests,
        minGuests,
        currMaxGuests: maxGuests,
        currMinGuests: minGuests,
        allSpots: this.props.spots,
        renderSpots,
        loading: false,
      });
    } else if ((pS.loading !== this.state.loading) && this.props.spots.length === 0) {
      this.setState( { loading: false } );
    }
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.lat !== nextProps.lat) {
      this.setState({lat: nextProps.lat, lng: nextProps.lng});
    }
  }

  showGuestMenu(e) {
    e.preventDefault();

    this.setState( { guestFilter: true, guestActive: true }, () => {
      document.addEventListener('click', this.closeGuestMenu);
    });
  }

  closeGuestMenu(e) {
    e.preventDefault();

    this.setState( { guestFilter: false, guestActive: false }, () => {
      document.removeEventListener('click', this.closeGuestMenu);
    });
  }

  showCostMenu(e) {
    e.preventDefault();

    this.setState( { costFilter: true, costActive: true }, () => {
      document.addEventListener('click', this.closeCostMenu);
    });
  }

  closeCostMenu(e) {
    e.preventDefault();

    this.setState( { costFilter: false, costActive: false }, () => {
      document.removeEventListener('click', this.closeCostMenu);
    });
  }

  guests() {
    if (this.state.guests === 1) {
      return "1 guest";
    } else {
      return this.state.guests + " guests";
    }
  }

  priceFilter() {
    return (<span>${this.state.currMinCosts} - ${this.state.currMaxCosts}</span>);
  }

  render () {
    const spots = this.state.renderSpots;
    const guestsFilter = this.state.guestActive ?
      (<button onClick={this.showGuestMenu} className="filter-button filter-button-active">
        <span>{this.guests()}</span>
      </button>)
      :
      (<button onClick={this.showGuestMenu} className="filter-button">
        <span>Guests</span>
      </button>);

    const costFilter = this.state.costActive ?
      (<button onClick={this.showCostMenu} className="filter-button filter-button-active">
        {this.priceFilter()}
      </button>)
      :
      (<button onClick={this.showCostMenu} className="filter-button">
        <span>Price</span>
      </button>);

    const searchFound =
      <div>
        <section className="search-header-nav">
          <div className="filter-button-container">
            { guestsFilter }
            {this.state.guestFilter ? <div>hello</div> : null}
            { costFilter }
            {this.state.costFilter ? <div>hello</div> : null}
          </div>
        </section>
        <div className="spots-container">
          <SpotIndex
            spots={spots}
            updateBounds={this.props.updateBounds}
            bounds={this.props.bounds}
            />
          <SpotMap
            onClick={window.scrollTo(0, 0)}
            spots={spots}
            updateBounds={this.props.updateBounds}
            bounds={this.props.bounds}
            lat={this.props.lat}
            lng={this.props.lng}
            history={this.props.history}
            />
        </div>

        <ul className="pages-buttons">
          {this.pages()}
        </ul>
      </div>;

    const noSearchFound =
        <div>
          <section className="search-header-nav">
            <div className="filter-button-container">
              <button className="filter-button filter-disabled">
                <span>Guests</span>
              </button>
              <button className="filter-button filter-disabled">
                <span>Price</span>
              </button>
            </div>
          </section>
          <div className="spots-container">
            {
            this.state.loading
            ?
            (
            <div className="loading">
              <div className="lds-ellipsis">
                <div></div>
                <div></div>
                <div></div>
                <div></div>
              </div>
            </div>)
            :
            (<div className="no-result-found">
                <strong className="no-results">No results</strong>
                <span className="no-results-details">To get more results, try adjusting your search or move the map around</span>
              </div>)
            }
            <SpotMap
              onClick={window.scrollTo(0, 0)}
              spots={spots}
              updateBounds={this.props.updateBounds}
              bounds={this.props.bounds}
              lat={this.props.lat}
              lng={this.props.lng}
              history={this.props.history}
              />
          </div>
          <ul className="pages-buttons">
            {this.pages()}
          </ul>
        </div>;

    return spots.length === 0 ? noSearchFound : searchFound;
  }
}

export default withRouter(Search);
