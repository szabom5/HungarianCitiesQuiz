function Quiz() {
    this.markers = [];

    this.origMarkers = [];

    this.origCircles = [];

    this.polys = [];

    this.randCities = [];
    
    this.difficulty_ = 'easy';
    
    this.count_ = 0;

    this.correctAnswers = 0;
    
    this.pieceDiv_ = null;
   
    this.timeDiv_ = null;
  }
  
  var city =  $('#NameOfCity');

  Quiz.NUM_PIECES_ = 5;

  Quiz.ACCEPTKM = 40;
  
  Quiz.START_COLOR_ = '#3c79de';
  
  Quiz.RIGHT_COLOR_ = '#037e29';

  Quiz.MEDIUM_COLOR_ = '#ffda6d'

  Quiz.WRONG_COLOR_ = '#cc1e1e';
  
  Quiz.prototype.init = function(map) {
    this.map_ = map;
    this.createMenu_(map);
    this.setDifficultyStyle_();
    
    this.getRandomCities_();
    this.loadDataComplete_();
   
  };
  
  Quiz.prototype.getRandomCities_ = function () {
      // Shuffle cities
      this.randCities = hunCities;
      this.randCities.sort(function() {
        return Math.round(Math.random()) - 0.5;
      });
    
      this.randCities = this.randCities.slice(0, Quiz.NUM_PIECES_);
      
  };

  Quiz.prototype.createMenu_ = function(map) {
    var menuDiv = document.createElement('div');
    menuDiv.style.cssText =
        'margin: 40px 10px; border-radius: 8px; height: 320px; width: 180px;' +
        'background-color: white; font-size: 14px; font-family: Roboto;' +
        'text-align: center; color: grey;line-height: 32px; overflow: hidden';
    var titleDiv = document.createElement('div');
    titleDiv.style.cssText =
        'width: 100%; background-color: #4285f4; color: white; font-size: 20px;' +
        'line-height: 40px;margin-bottom: 24px';
    titleDiv.innerText = 'City Quiz';
    var pieceTitleDiv = document.createElement('div');
    pieceTitleDiv.innerText = 'CORRECT ANSWERS:';
    pieceTitleDiv.style.fontWeight = '800';
    var pieceDiv = this.pieceDiv_ = document.createElement('div');
    pieceDiv.innerText = '0 / ' + Quiz.NUM_PIECES_;
    var timeTitleDiv = document.createElement('div');
    timeTitleDiv.innerText = 'TIME:';
    timeTitleDiv.style.fontWeight = '800';
    var timeDiv = this.timeDiv_ = document.createElement('div');
    timeDiv.innerText = '0.0 seconds';
    var difficultyTitleDiv = document.createElement('div');
    difficultyTitleDiv.innerText = 'DIFFICULTY:';
    difficultyTitleDiv.style.fontWeight = '800';
    var difficultySelect = document.createElement('select');
    ['Easy', 'Moderate', 'Hard', 'Extreme'].forEach(function(level) {
      var option = document.createElement('option');
      option.value = level.toLowerCase();
      option.innerText = level;
      difficultySelect.appendChild(option);
    });
    difficultySelect.style.cssText =
        'border: 2px solid lightgrey; background-color: white; color: #4275f4;' +
        'padding: 6px;';
    difficultySelect.onchange = function() {
      this.setDifficulty_(difficultySelect.value);
      this.resetGame_();
    }.bind(this);
    var resetDiv = document.createElement('div');
    resetDiv.innerText = 'Start New Game';
    resetDiv.style.cssText =
        'cursor: pointer; border-top: 1px solid lightgrey; margin-top: 18px;' +
        'color: #4275f4; line-height: 40px; font-weight: 800';
    resetDiv.onclick = this.resetGame_.bind(this);
    menuDiv.appendChild(titleDiv);
    menuDiv.appendChild(pieceTitleDiv);
    menuDiv.appendChild(pieceDiv);
    menuDiv.appendChild(timeTitleDiv);
    menuDiv.appendChild(timeDiv);
    menuDiv.appendChild(difficultyTitleDiv);
    menuDiv.appendChild(difficultySelect);
    menuDiv.appendChild(resetDiv);
    map.controls[google.maps.ControlPosition.TOP_LEFT].push(menuDiv);
  };
  
  Quiz.prototype.placeMarker = function (pos) {
    if(this.count_== Quiz.NUM_PIECES_){
      return;
    }
    if(this.count_== 0){
        this.startClock_();
    }

    var marker = new google.maps.Marker({
        map: this.map_,
        position: pos,
        title: ("Tipp: "+this.randCities[this.count_].city)
    });

    this.markers.push(marker);
    this.handleNewMarker();
    
};

Quiz.prototype.handleNewMarker = function() {

    // Marker's pos
    var pos1 = this.markers[this.count_].getPosition();
    //Original pos of city
    var pos2 = {lat:parseFloat(this.randCities[this.count_].lat), lng:parseFloat(this.randCities[this.count_].lng)};

    var circleColor;
    if(this.closeEnough(pos1,pos2)){
        this.markers[this.count_].setIcon('http://maps.google.com/mapfiles/ms/icons/green-dot.png');
        this.correctAnswers++;
        circleColor = Quiz.RIGHT_COLOR_;
    
    }else{
        //city.css('background-color',Quiz.WRONG_COLOR_);
        circleColor = Quiz.WRONG_COLOR_;
        this.markers[this.count_].setIcon('http://maps.google.com/mapfiles/ms/icons/red-dot.png');
    }

    var correctMarker = new google.maps.Marker({
        map: this.map_,
        position: {lat: parseFloat(this.randCities[this.count_].lat), lng: parseFloat(this.randCities[this.count_].lng)},
        title: this.randCities[this.count_].city,
        icon: 'http://maps.google.com/mapfiles/ms/icons/blue-dot.png'
    });

    radius = (Quiz.ACCEPTKM / 6371) * 6378100;


    var cityCircle = new google.maps.Circle({
      strokeColor: circleColor,
      strokeOpacity: 0.8,
      strokeWeight: 1,
      fillColor: circleColor,
      fillOpacity: 0.35,
      map: this.map_,
      center: correctMarker.position,
      radius: radius
    });

    google.maps.event.addListener(cityCircle, 'click', function(event) {
      this.placeMarker(event.latLng);
    }.bind(this));

    var poly = new google.maps.Polyline({
      strokeColor: Quiz.START_COLOR_,
      strokeOpacity: 1.0,
      strokeWeight: 3,
      map: this.map_
    });

    poly.setVisible(false);

    var path = [correctMarker.getPosition(), this.markers[this.count_].getPosition()];
    poly.setPath(path);

    polyLengthInMeters = google.maps.geometry.spherical.computeLength(poly.getPath().getArray());
    
    this.markers[this.count_].title = "Tipp: "+this.randCities[this.count_].city+"\nEltérés: "+Math.round(polyLengthInMeters)/1000+" km";


    this.polys.push(poly);
    this.origMarkers.push(correctMarker);
    this.origCircles.push(cityCircle);
    this.pieceDiv_.innerText = this.correctAnswers + ' / ' + Quiz.NUM_PIECES_;
    this.count_++;
    if(this.count_==Quiz.NUM_PIECES_){
        this.stopClock_();
        if(this.correctAnswers == Quiz.NUM_PIECES_){
          city.text('Well Done!');
          city.css('background-color',Quiz.RIGHT_COLOR_);
        }else if(this.correctAnswers >= Quiz.NUM_PIECES_/2){
          city.text('Almost perfect!');
          city.css('background-color',Quiz.MEDIUM_COLOR_);
        }else{
          city.text('Try again!');
          city.css('background-color',Quiz.WRONG_COLOR_);
        }
        
        
    }else{
        city.text(this.randCities[this.count_].city);
        city.css('background-color',Quiz.START_COLOR_);
    }
}

function getDistanceFromLatLonInKm(lat1,lon1,lat2,lon2) {
    var R = 6371; // Radius of the earth in km
    var dLat = deg2rad(lat2-lat1);  // deg2rad below
    var dLon = deg2rad(lon2-lon1); 
    var a = 
      Math.sin(dLat/2) * Math.sin(dLat/2) +
      Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) * 
      Math.sin(dLon/2) * Math.sin(dLon/2)
      ; 
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
    var d = R * c; // Distance in km
    return d;
  }
  
  function deg2rad(deg) {
    return deg * (Math.PI/180)
  };

Quiz.prototype.closeEnough = function (pos1,pos2) {
    return getDistanceFromLatLonInKm(pos1.lat(),pos1.lng(),pos2.lat,pos2.lng)<Quiz.ACCEPTKM;
};

Quiz.prototype.removeMarkers = function (){
    this.setMapOnAllMarkers(null); 
    this.markers = [];
    this.origMarkers = [];
    this.origCircles = [];
    this.polys = [];
    }

Quiz.prototype.setMapOnAllMarkers = function (map) {
    for (var i = 0; i < this.markers.length; i++) {
    this.markers[i].setMap(map);
    this.origMarkers[i].setMap(map);
    this.origCircles[i].setMap(map);
    this.polys[i].setMap(map);
    }
}

  Quiz.prototype.loadDataComplete_ = function() {
    this.dataLoaded_ = true;
    this.start_();
  };
  
  Quiz.prototype.setDifficulty_ = function(difficulty) {
    this.difficulty_ = difficulty;
  
    if (this.map_) {
      this.setDifficultyStyle_();
    }
  };
  
  Quiz.prototype.setDifficultyStyle_ = function() {
     
    this.map_.setMapTypeId(mapTypes[this.difficulty_]);
    this.map_.set('styles', styles[this.difficulty_]);
    if(this.difficulty_ == 'easy' || this.difficulty_ == 'moderate') {
      var transitLayer = new google.maps.TransitLayer();
      transitLayer.setMap(this.map_);
    }
  };
  

  Quiz.prototype.resetGame_ = function() {
    //this.removeCountries_();
    this.removeMarkers();
    this.count_ = 0;
    this.correctAnswers = 0;
    this.setCount_();
    this.stopClock_();
    this.timeDiv_.textContent = '0.0 seconds';
    this.getRandomCities_();
    city.text(this.randCities[0].city);
    city.css('background-color',Quiz.START_COLOR_);
   
  };
  
  Quiz.prototype.setCount_ = function() {
    this.pieceDiv_.innerText = this.count_ + ' / ' + Quiz.NUM_PIECES_;
  
    if (this.count_ == Quiz.NUM_PIECES_) {
      this.stopClock_();
    }
  };
  
  Quiz.prototype.stopClock_ = function() {
    window.clearInterval(this.timer_);
  };
  
  Quiz.prototype.startClock_ = function() {
    this.stopClock_();
  
    var timeDiv = this.timeDiv_;
    if (timeDiv) timeDiv.textContent = '0.0 seconds';
    var t = new Date;
  
    this.timer_ = window.setInterval(function() {
      var diff = new Date - t;
      if (timeDiv) timeDiv.textContent = (diff / 1000).toFixed(2) + ' seconds';
    }, 100);
  };
  
  Quiz.prototype.start_ = function() {
    this.setDifficultyStyle_();

    city.text(this.randCities[0].city);
    city.css('background-color',Quiz.START_COLOR_);

    this.resetGame_();
  }; 

  function initMap() {
      var HunCenter = {lat: 47.107048, lng: 19.247032};
    var map = new google.maps.Map(document.getElementById('map'), {
      disableDefaultUI: true,
      center: HunCenter,
      zoom: 7,
      zoomControl: true,
      scaleControl: true
    });
 
    var src = 'www.visualtravelguide.com/Hungary.kml';
    var kmlLayer = new google.maps.KmlLayer(src, {
      suppressInfoWindows: true,
      preserveViewport: false,
      map: map
    });
    kmlLayer.addListener('click', function(event) {
      var content = event.featureData.infoWindowHtml;
      var testimonial = document.getElementById('kmlInfo');
      testimonial.innerHTML = content;
    });

    var demo = new Quiz();
    demo.init(map);
    google.maps.event.addListener(map, 'click', function(event) {
        demo.placeMarker(event.latLng);
      });
  }

