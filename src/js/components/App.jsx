const React = require('react');
const TodoStore = require('../stores/TodoStore');
const CityStore = require('../stores/CityStore');
const ImageStore = require('../stores/ImageStore');
const ActionCreator = require('../actions/TodoActionCreators');
const Button = require('react-bootstrap/lib/Button');
const Jumbotron = require('react-bootstrap/lib/Jumbotron');
const Navbar = require('react-bootstrap/lib/Navbar');
const Nav = require('react-bootstrap/lib/Nav');
const TaskList = require('./TaskList.jsx');
const CitySearchInput = require('./CitySearchInput.jsx');
const CityList = require('./CityList.jsx');
const CityMap = require('./CityMap.jsx');
const WeatherIcon = require('./WeatherIcon.jsx');
const WeatherChart = require('./WeatherChart.jsx');
const CityImage = require('./CityImage.jsx');
const ContainerImage = require('./Container.jsx');
let App = React.createClass({

  render() {
    return(
        <div>
          <Navbar brand='React-Weather' inverse ></Navbar>
          <div className="container">

            <div className="row">
                <div className="col-md-3 left-col">
                  <CitySearchInput/>
                  <CityList cities = {CityStore.getCityList()}/>
                </div>
                <div className='col-md-9'>
                  <div className="row">
                    <div className="col-md-5">
                      <CityMap/>
                    </div>
                    <div className="col-md-7">
                       <CityImage/>
                       
                    </div>
                  </div>
                  <div className="row">

                      <div className="col-md-12">
                        <WeatherIcon/>  
                      
                        <WeatherChart/>
                        
                      </div>
                  </div>
                </div>
            </div>
          </div>
        </div>
      )
  }

});

module.exports = App;
