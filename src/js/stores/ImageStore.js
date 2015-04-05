const AppDispatcher = require('../dispatchers/AppDispatcher');
const Constants = require('../constants/AppConstants');
const BaseStore = require('./BaseStore');
const CityStore = require('./CityStore');
const assign = require('object-assign');
const API_KEY = 'f0fccd16ae7a56c1b9f785cfe45a6179';

// data storage
let _data = {};
let _lastImage= '';
let _lastName = '';

function getRandomPic(){
    let cityName = CityStore.getCity().city.name;
    let index = generateRandon(_data[cityName].photos.photo.length);
    return makeUrl(_data[cityName].photos.photo[index]);
}

function generateRandon(length){
  return length !== 0 ? Math.floor((Math.random() * length) + 1) : null;
}

// add private functions to modify data
function _getPhoto(city,callback){
  console.log(city.city.nme)
  let coord = city.city.coord

  $.get('https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=4331e79bea39d5eb0455f880071e0fec&sort=interestingness-desc&text='+city.city.name+'%20landmar&lat='+coord.lat+'&lon='+coord.lon+'&format=json&nojsoncallback=1',function(d){
    _data[city.city.name] =  d;
    d.photos.photo.length > 0 && callback(d.photos.photo[generateRandon(d.photos.photo.length)]);
  }).fail(function(err) {
    console.log(err);
  })
}

function makeUrl(photo){
  let url = 'https://farm'+photo.farm+'.staticflickr.com/'+photo.server+'/'+photo.id+'_'+photo.secret+'.jpg';
  return url;
}

// Facebook style store creation.
let ImageStore = assign({}, BaseStore, {

  // public methods used by Controller-View to operate on data
  getLastImage(city){
    if(!city){
      return _lastImage
    };
  },

  // register store with dispatcher, allowing actions to flow through
  dispatcherIndex: AppDispatcher.register(function(payload) {
    let action = payload.action;
    console.log(action)
    if(payload.source === 'SERVER_ACTION'){
       let interval = setInterval(function(){
      
          if(CityStore.getCity() && CityStore.getCity().city.name !== _lastName){
            clearInterval(interval);
            _lastName = CityStore.getCity().city.name;
            _getPhoto(CityStore.getCity(),function(photo){
               let photoUrl = makeUrl(photo);
               
               _lastImage = photoUrl;
               ImageStore.emitChange();
            })
          }
       },10)
    }else if(payload.source === 'VIEW_ACTION'){
        switch(action.actionName){
          case 'getCity':
              _lastImage = _lastImage = getRandomPic();
              
          break;
          case 'changePic':
              _lastImage = getRandomPic();
          break;
        }
        ImageStore.emitChange();
    }
  })

});

module.exports = ImageStore;
