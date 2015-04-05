const React = require('react');
const Map = require('map');
const CityStore = require('../stores/CityStore');
let CityMap = React.createClass({
 lastCity:'',
 map:{},
 getState(){
    return CityStore.getCity();
 },
 _onChange(){
     let state = this.getState();
     this.setState(state);
     state.city.name !== this.lastCity && this.initialize();
     this.lastCity = state.city.name;
  },
  componentDidMount() {
    CityStore.addChangeListener(this._onChange);
  },

  initialize(){
    let coords = this.state.city.coord;
    var mapOptions = {
          center: { lat: coords.lat, lng: coords.lon},
          zoom: 9
        };
    this.map = new google.maps.Map(document.getElementById('map-canvas'),mapOptions);
  },

  render() {
    return(
      !this.state ? null :
      <div className="panel panel-default">
        <div className="panel-body">
          <div id='map-canvas'></div>
        </div>
      </div>
    )
  }
});

module.exports = CityMap;
