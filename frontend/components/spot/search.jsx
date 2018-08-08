import React from 'react';
import ReactDOM from 'react-dom';
import SpotIndex from './spot_index';
import SpotMap from './spot_map';
import { withRouter } from 'react-router-dom';

class Search extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
      activePage: 1,
      itemsPerPage: 6,
    };

    this.handleClickNextButton = this.handleClickNextButton.bind(this);
    this.handleClickPrevButton = this.handleClickPrevButton.bind(this);
    this.handleClickPage = this.handleClickPage.bind(this);
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
    // const overflow3 = <li key={'overflow3'}>...</li>;
    // const overflow4 = <li key={'overflow4'}>...</li>;

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

  componentDidUpdate(prevProps) {
    if (this.props.bounds !== prevProps.bounds) {
      this.props.fetchSpots(this.props.bounds);
      this.setState({activePage: 1});
    }
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.lat !== nextProps.lat) {
      this.setState({lat: nextProps.lat, lng: nextProps.lng});
    }
  }

  render () {
    const allSpots = this.props.spots || [];
    const { activePage, itemsPerPage } = this.state;
    const spotsStartIdx = itemsPerPage * (activePage - 1);
    const spotsEndIdx = itemsPerPage * (activePage);
    const spots = allSpots.slice(spotsStartIdx, spotsEndIdx);

    const searchFound = () => (
      <div>
        <div className="spots-container">
          <SpotIndex spots={spots}
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
            />
        </div>

        <ul className="pages-buttons">
          {this.pages()}
        </ul>
      </div>
    );

    const noSearchFound = () => (
      <div>
        <div className="spots-container">
          <div className="no-result-found">
            <strong className="no-results">No results</strong>
            <span className="no-results-details">To get more results, try adjusting your search or move the map around</span>
          </div>
          <SpotMap
            onClick={window.scrollTo(0, 0)}
            spots={spots}
            updateBounds={this.props.updateBounds}
            bounds={this.props.bounds}
            lat={this.props.lat}
            lng={this.props.lng}
            />
        </div>

        <ul className="pages-buttons">
          {this.pages()}
        </ul>
      </div>
    );

    return spots.length === 0 ? noSearchFound() : searchFound();
  }
}

export default withRouter(Search);
