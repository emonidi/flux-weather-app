const React = require('react');
const CityStore = require('../stores/CityStore')
const ListGroup  = require('react-bootstrap/lib/ListGroup');
const ListGroupItem = require('react-bootstrap/lib/ListGroupItem');
const cityActionCreator = require('../actions/cityActionCreator')

let CityList = React.createClass({
  getState(){
    return CityStore.getCity();
  },
  _onChange(){
    this.setState(this.getState());
  },
  componentDidMount(){
    CityStore.addChangeListener(this._onChange);
  },
  handleClick(e){
    e.preventDefault();
    cityActionCreator.city(e.target.innerText);
  },
  render() {
    let cities = this.props.cities;
    let self = this;
    return(
      <ListGroup>
        {cities.map(function(city){
          return(
            <ListGroupItem key={city.city.id}>
              <div className='panel panel-default'>
                <div className='panel-body'>
                  <a href='#' ref='cityHref' onClick={self.handleClick}>{city.city.name}</a>
                </div>
              </div>
            </ListGroupItem>
          )
        })}
      </ListGroup>
    )
  }
});

module.exports = CityList;
