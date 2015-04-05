var AppDispatcher = require('../dispatchers/AppDispatcher');
var Constants = require('../constants/AppConstants');

module.exports = {
	getCity(city){
		AppDispatcher.handleServerAction({
			actionName:'getCity',
			city:city
		})
	},
	getLastCity(city){
		AppDispatcher.handleViewAction({
			actionName:'lastCity'
		})
	},
	city(city){
		AppDispatcher.handleViewAction({
			actionName:'getCity',
			city:city
		})
	},
	changePic(){
		AppDispatcher.handleViewAction({
			actionName:'changePic'
		})
	}
};
