const React = require('react');
const d3 = require('d3rrc');
const CityStore = require('../stores/CityStore');
let VBarChart = d3.VBarChart;

let WeatherChart = React.createClass({
  getInitialState() {
    return {};
  },
  getState(){
      return CityStore.getCity();
  },
  _onChange(){
    this.setState(this.getState())
  },
  componentDidMount() {
      CityStore.addChangeListener(this._onChange);
  },
  getTime(){

  },
  render() {
    let list = this.state.list;
    if(!list){
      return(<div></div>);
    }
    let data =[];
    for(var i in list){
        
       //data.push(l)
       data.push({
        temp:list[i].temp.day,  
        time:list[i].dt
       });
    }
     let names = function(d){
         var date = moment(d.time * 1000).format('ddd');
         return date;
     };
     let values = function(d){
        return  d.temp;
     }

      var styles={
        '.bar':'fill:#67b7dc;shape-rendering: crispEdges;',
        'text':'dy:1px;x:-10'
      };

    return (
       <div className="panel panel-default">
        <div className="panel-body">
            <VBarChart
          chart-height="240"
          chart-names={names}
          chart-values={values}
          chart-style = {styles}
          chart-x={-15}
          data={data}/>
        </div>
       </div>
    );
  }
});

module.exports = WeatherChart;
