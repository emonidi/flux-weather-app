const React = require('react');
const ImageStore = require('../stores/ImageStore');
const cac = require('../actions/cityActionCreator');

let CityImage = React.createClass({
 clName:'hidden',
 getState(){
      return {
        url:ImageStore.getLastImage(),
      };
  },
  _onChange(){
    this.setState(this.getState())
  },
  componentDidMount() {
      this.clName = '';
      ImageStore.addChangeListener(this._onChange);
  },
  handleClick(){
    this.clName = 'hidden';
    this.forceUpdate();
    cac.changePic();
  },
  componentWillUpdate(){
     this.clName = '';
  },

  componentDidUpdate(){
    this.clName = '';
  },  

  render() {
    return (
      !this.state ? null :
      <div className={this.clName}>
        <div className="panel panel-default">
          <div className="panel-body">
            <img ref="image" className="city-image" onClick={this.handleClick} src={this.state.url}/>
          </div>
        </div>
      </div>
    );
  }
});

module.exports = CityImage;
