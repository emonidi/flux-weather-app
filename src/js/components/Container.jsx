const React = require('react');
const ImageStore = require('../stores/ImageStore');
let Container = React.createClass({
 
  getState(){
    return{
      imageUrl:ImageStore.getLastImage()
    };
  },
  _onChange(){
      this.setState(this.getState());
      let $parent = $(this.getDOMNode()).parents('.container');
      $parent.css({
        'background-image':'url('+this.state.imageUrl+')',
        'background-size':'cover'
      });
      console.log($parent[0])
  },
  componentDidMount() {
    ImageStore.addChangeListener(this._onChange);
  },

  render() {
    console.log(this.state);
    return (
      <div></div>
    ); 
  }
});

module.exports = Container;
