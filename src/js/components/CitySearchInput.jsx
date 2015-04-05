const React = require('react');
const cac = require('../actions/cityActionCreator');

let CitySearchInput = React.createClass({
	getDefaultProps(){
		return{
			city:''
		}
	},
	setCity(){
		this.props.city = this.refs.input.getDOMNode().value;
	},
	handleSubmit(e){
		e.preventDefault();
		cac.getCity(this.props.city);
	},
	render(){
		return(
			<div>
					<h4>Search City</h4>
					<form className="form" onSubmit={this.handleSubmit}>
					<div className='form-group'>
						<input type='text' ref='input' name='city' onChange={this.setCity} className='form-control' />
					</div>
					<div className="form-group">
						<button className='btn btn-primary'>Search City</button>
					</div>
				</form>
			</div>
		)
	}
});

module.exports = CitySearchInput;