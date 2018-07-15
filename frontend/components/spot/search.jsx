import React from 'react';
import SpotIndex from './spot_index';
import SpotMap from './spot_map';

class Search extends React.Component{
  constructor(props) {
    super(props);

    this.state = {
      activePage: 1,
      itemsPerPage: 21,
    };

    this.handleClickNextButton = this.handleClickNextButton.bind(this);
    this.handleClickPrevButton = this.handleClickPrevButton.bind(this);
    this.handleClickPage = this.handleClickPage.bind(this);
  }

  handleClickNextButton() {
    const nextPage = this.state.activePage + 1;
    return (e) => {
      this.setState({ activePage: nextPage});
    };
  }

  handleClickPrevButton() {
    const prevPage = this.state.activePage - 1;

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
      [ firstPage, lastPage ] = [ [], [] ];
      startIdx = 1;
      lastIdx = numPages;
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
    } else if (activePage <= numPages - 4 && activePage <= 7) {
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
          <button className='next-prev' onClick={this.handleClickNextButton}>&gt;</button>
        </li>
      ];

      prev = [
        <li key="0" >
          <button className='next-prev' onClick={this.handleClickPrevButton}>&lt;</button>
        </li>
      ];
    } else if ( numPages > 1 && activePage === 1) {
      next = [
        <li key={ numPages + 1}>
          <button className='next-prev' onClick={this.handleClickNextButton}>&gt;</button>
        </li>
      ];
      prev = [];
    } else if ( numPages > 1 && activePage === numPages) {
      prev = [
        <li key="0" >
          <button className='next-prev' onClick={this.handleClickPrevButton}>&lt;</button>
        </li>
      ];

      next = [];
    }

    return prev.concat(firstPage).concat(dispPages).concat(lastPage).concat(next);
  }

  componentDidMount() {
    this.props.fetchSpots();
  }

  render () {
    const allSpots = this.props.spots || [];
    const { activePage, itemsPerPage } = this.state;
    const spotsStartIdx = itemsPerPage * (activePage - 1);
    const spotsEndIdx = itemsPerPage * (activePage);
    const spots = allSpots.slice(spotsStartIdx, spotsEndIdx);

    return(
      <div>
        <div className="spots-container">
          <SpotIndex spots={spots} fetchSpots={this.props.fetchSpots} />
          <SpotMap spots={spots} />
        </div>

        <ul className="pages-buttons">
          {this.pages()}
        </ul>
      </div>
    );
  }
}

export default Search;
