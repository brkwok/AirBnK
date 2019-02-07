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
      spotLoaded: false,
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
      guests: 1,
      adults: 1,
      children: 0,
      currGuests: 1,
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
    this.guestFilterMenu = this.guestFilterMenu.bind(this);
    this.handleGuestMath = this.handleGuestMath.bind(this);
    this.applyFilter = this.applyFilter.bind(this);
    // this.changeCost = this.changeCost.bind(this);
    // this.clickSlider = this.clickSlider.bind(this);
    // this.priceFilterMenu = this.priceFilterMenu.bind(this);
    // this.handleCostInput = this.handleCostInput.bind(this);
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
    this.props.fetchSpots(this.props.bounds);
    this.props.updateBounds(this.props.bounds);
    this.timer = null;
  }

  componentDidUpdate(pP, pS) {
    if (this.props.bounds !== pP.bounds) {
      this.setState({ loading: true, spotLoaded: false });
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
    } else if (pP.bounds === this.props.bounds && this.state.loading) {
      this.setState({
        loading: false,
        spotLoaded: true,
      });
    } else {
      return;
    }
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.lat !== nextProps.lat) {
      this.setState({lat: nextProps.lat, lng: nextProps.lng});
    }
  }

  showGuestMenu(e) {
    e.preventDefault();

    this.setState( { guestFilter: true }, () => {
      document.addEventListener('click', this.closeGuestMenu);
    });
  }

  closeGuestMenu(e) {
    e.preventDefault();

    if (e.target.id !== 'guests-filter') {
      this.setState( { guestFilter: false }, () => {
        document.removeEventListener('click', this.closeGuestMenu);
      });
    }
  }

  showCostMenu(e) {
    e.preventDefault();

    this.setState( { costFilter: true }, () => {
      document.addEventListener('click', this.closeCostMenu);
    });
  }

  closeCostMenu(e) {
    e.preventDefault();

    if (e.target.id !== "costs-filter") {
      this.setState( { costFilter: false }, () => {
        document.removeEventListener('click', this.closeCostMenu);
      });
    }
  }

  guests() {
    return(
      this.state.currGuests === 1 ?
      ("1 guests") : (this.state.currGuests + " guests")
    );
  }

  handleGuestMath(e) {
    e.preventDefault;
    const sign = e.target.classList[0];
    const type = e.target.classList[1];
    let numAdults = this.state.adults;
    let numChildren = this.state.children;
    let currGuestsAdded = this.state.currGuests + 1;
    let currGuestsSubtracted = this.state.currGuests - 1;

    if (sign === 'add' && type === 'adult') {
      let added = numAdults + 1;

      this.setState( { adults: added, currGuests: currGuestsAdded } );
    } else if (sign === 'subtract' && type === 'adult') {
      let subtracted = numAdults - 1;

      this.setState( { adults: subtracted, currGuests: currGuestsSubtracted } );
    } else if (sign === 'add' && type === 'children') {
      let added = numChildren + 1;

      this.setState( { children: added, currGuests: currGuestsAdded } );
    } else if (sign === 'subtract' && type === 'children') {
      let subtracted = numChildren - 1;

      this.setState( { children: subtracted, currGuests: currGuestsSubtracted } );
    }
  }

  priceFilter() {
    return (<span>${this.state.currMinCosts} - ${this.state.currMaxCosts}</span>);
  }

  applyFilter() {
    let allSpots = this.state.allSpots;
    const currGuests = this.state.currGuests;

    let renderSpots = allSpots.filter( (spot) => {
      return (
        spot.guests >= currGuests
      );
    });

    this.setState({ renderSpots, guestFilter: false, costFilter: false });
  }

  guestFilterMenu() {
    const total = this.state.currGuests;
    return (
      this.state.guestFilter ?
      (
        <div id="guests-filter" className="guests-number-container-search">
          <div id="guests-filter" className="guests-container">
            <div
              className={
                (this.state.adults < 2) ? "guests-signs-disabled" : "subtract adult guests-signs"
              }
              id="guests-filter"
              onClick={this.handleGuestMath}>-</div>
            <div id="guests-filter" className="guests-type">
              {this.state.adults} {(this.state.adults === 1) ? 'adult' : 'adults'}
            </div>
            <div
              className={
                (this.state.maxGuests === total) ? "guests-signs-disabled" : "add adult guests-signs"
              }
              id="guests-filter"
              onClick={this.handleGuestMath}
              >+</div>
          </div>
          <div id="guests-filter" className="guests-container">
            <div
              className={
                (this.state.children < 1) ? "guests-signs-disabled" : "subtract children guests-signs"
              }
              id="guests-filter"
              onClick={this.handleGuestMath}>-</div>
            <div id="guests-filter" className="guests-type">
              {this.state.children} {(this.state.children === 1) ? 'child' : 'children'}
            </div>
            <div
              className={
                (this.state.maxGuests === total) ? "guests-signs-disabled" : "add children guests-signs"
              }
              id="guests-filter"
              onClick={this.handleGuestMath}
              >+</div>
          </div>
          <div className="guests-apply-container">
            <div onClick={this.applyFilter} id="guests-filter" className="guests-apply">apply</div>
          </div>
        </div>
      )
      :
      (
        null
      )
    );
  }

  // clickSlider(e) {
  //   e.preventDefault();
  //
  //   const cost = e.target.classList[0];
  //
  //   if (cost < this.state.currMinCosts) {
  //     this.setState({
  //       currMinCosts: cost
  //     });
  //   } else if (cost > this.state.currMinCosts) {
  //     this.setState({
  //       currMaxCosts: cost
  //     });
  //   }
  // }
  //
  // priceFilterMenu() {
  //   let costSlider = [];
  //   const currMinCosts = this.state.currMinCosts;
  //   const currMaxCosts = this.state.currMaxCosts;
  //
  //   for (let i = 0; i <= this.state.maxCosts; i++) {
  //     let part;
  //
  //     if (i === currMinCosts) {
  //       part =
  //         <div key={i} id="costs-filter" className="selector-container">
  //           <div id="costs-filter" className="costs-disp-container">
  //             <div id="costs-filter" className="costs-disp-text">${currMinCosts}</div>
  //           </div>
  //           <div id="costs-filter" className="selector-outer">
  //             <div id="costs-filter" className="selector-inner">
  //             </div>
  //           </div>
  //         </div>;
  //     } else if (i === currMaxCosts) {
  //       part =
  //         <div key={i} id="costs-filter" className="selector-container">
  //           <div id="costs-filter" className="costs-disp-container">
  //             <div id="costs-filter" className="costs-disp-text">${currMaxCosts}</div>
  //           </div>
  //           <div id="costs-filter" className="selector-outer">
  //             <div id="costs-filter" className="selector-inner">
  //             </div>
  //           </div>
  //         </div>;
  //     } else if (i >= currMinCosts && i <= currMaxCosts) {
  //       part =
  //         <div
  //           onClick={this.clickSlider}
  //           id="costs-filter"
  //           key={i}
  //           className={`${i} filter-slider filter-slider-filled`}>
  //         </div>;
  //     } else {
  //       part =
  //       <div
  //         onClick={this.clickSlider}
  //         id="costs-filter"
  //         key={i}
  //         className={`${i} filter-slider`}>
  //       </div>;
  //     }
  //
  //     costSlider.push(part);
  //   }
  //
  //   const container =
  //   <div id="costs-filter" className="costs-filter-container">
  //     <span
  //       id="costs-filter"
  //       className="costs-input-min"
  //       type="text">
  //         {this.state.currMinCosts}
  //     </span>
  //     <span
  //       id="costs-filter"
  //       className="costs-input-max"
  //       type="text">
  //         {this.state.currMaxCosts}
  //     </span>
  //     <div id="costs-filter" className="filter-slider-container">{costSlider}</div>
  //   </div>;
  //
  //   return this.state.costFilter ? container : null;
  // }

  // changeCost(e) {
  //   e.preventDefault();
  //   if (e.keyCode === 13) {
  //     if (e.target.className === "min-cost-input") {
  //       this.setState({
  //         currMinCosts: e.target.value
  //       });
  //     } else if (e.target.className === "max-cost-input") {
  //       this.setState({
  //         currMaxCosts: e.target.value
  //       });
  //     }
  //   }
  // }
  //
  // priceFilterMenu() {
  //   const priceInput =
  //   <div id="costs-filter" className="costs-filter-container">
  //     <input
  //       className="min-cost-input"
  //       onChange={this.changeCost}
  //       id="costs-filter"
  //       type="string"
  //       value={this.state.currMinCosts}>
  //     </input>
  //     <input
  //       className="max-cost-input"
  //       onChange={this.changeCost}
  //       id="costs-filter"
  //       type="string"
  //       value={this.state.currMaxCosts}></input>
  //   </div>;
  //
  //   return(
  //     this.state.costFilter ?
  //     priceInput : null
  //   );
  // }

  render () {
    const spots = this.state.renderSpots;

    const guestsFilter = this.state.guestFilter ?
      (<button onClick={this.showGuestMenu} className="filter-button filter-button-active">
        <span>{this.guests()}</span>
      </button>)
      :
      (<button onClick={this.showGuestMenu} className="filter-button">
        <span>Guests</span>
      </button>);

    // const costFilter = this.state.costFilter ?
    //   (<button onClick={this.showCostMenu} className="filter-button filter-button-active">
    //     {this.priceFilter()}
    //   </button>)
    //   :
    //   (<button onClick={this.showCostMenu} className="filter-button">
    //     <span>Price</span>
    //   </button>);

    let result;

    if (!this.state.loading && this.state.spotLoaded && this.props.spots.length === 0) {
      result = (<div className="no-result-found">
          <strong className="no-results">No results</strong>
          <span className="no-results-details">To get more results, try adjusting your search or move the map around</span>
        </div>);
    }

    const searchFound =
      <div>
        <section className="search-header-nav">
          <div className="filter-button-container">
            { guestsFilter }
            { this.guestFilterMenu() }

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
            (result)
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
