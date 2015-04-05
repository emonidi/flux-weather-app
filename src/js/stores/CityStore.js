const AppDispatcher = require('../dispatchers/AppDispatcher');
const Constants = require('../constants/AppConstants');
const BaseStore = require('./BaseStore');
const assign = require('object-assign');

let _data = [];
var _city;

let CityStore = assign({},BaseStore,{

	getCityList(){
		return _data;
	},
	getCity(cityName,callback){		
		return _city;
	},
	distpatcherIndex:AppDispatcher.register(function(payload){
		var self = this;
		let action = payload.action;
		let source = payload.source;
		
		if(source === 'SERVER_ACTION'){
			$.get('http://api.openweathermap.org/data/2.5/forecast/daily?q='+payload.action.city+'&mode=json&units=metric&cnt=7&lang=bg',function(d){
				_data.push(d);
				_city = d;
				CityStore.emitChange();
			});
		}else if(source === 'VIEW_ACTION'){
			console.log(action)
			switch(action.actionName){
				case 'lastCity':
					
				break;
				case 'getCity':
					_data.forEach(function(c){
						if(c.city.name === action.city){
							_city = c;
							setTimeout(function(){
								$.get('http://api.openweathermap.org/data/2.5/forecast/daily?q='+payload.action.city+'&mode=json&units=metric&cnt=7&lang=bg',function(d){
									_city = d;
									CityStore.emitChange();
								});
							},1)
						}
					})
					
				break
			}
			
		}
	}),
});

module.exports = CityStore