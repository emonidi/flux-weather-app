const React = require('react');
const CityStore = require('../stores/CityStore');
let WeatherIcon = React.createClass({
  
  getState(){ 
    return CityStore.getCity();
  },
  _onChahge(){
    this.setState(this.getState());
  },
  componentDidMount() {
    CityStore.addChangeListener(this._onChahge);
  },

  render() {
    let icon = !this.state ? null : this.state.list[0].weather[0].icon 
    let description = !this.state ? '' : this.state.list[0].weather[0].description;
    let temp = !this.state ? '' : (this.state.list[0].temp.day).toFixed(1);
    let isHidden = !this.state ? 'hidden' : '';
    console.log(temp);
    return (
     <div className = {isHidden}>
      <div className="panel panel-default">
        <div className="panel-header">

        </div>
        <div className="panel-body">
            <span>
              <img src={'http://openweathermap.org/img/w/'+icon+'.png'} />
              <span><strong>{temp} &#8451;</strong> - {description}</span>
            </span>
        </div>
      </div>
     </div>
    );
  }
});

module.exports = WeatherIcon;
