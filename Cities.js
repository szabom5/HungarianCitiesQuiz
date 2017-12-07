var cities = [

    {name: 'Eger', lat: 47.902535, lng: 20.377228 },
    {name: 'Miskolc',lat: 48.103478, lng: 20.778438},
    {name: 'Debrecen', lat : 47.531605, lng: 21.627312},
    {name: 'Győr', lat: 47.6874569, lng: 17.6503974},
    {name: 'Esztergom',lat: 47.7883949, lng: 18.7434451},
    {name: 'Pécs', lat: 46.0727345, lng: 18.232266},
    {name: 'Szeged', lat: 46.25301, lng: 20.141425},
    {name: 'Nyíregyháza',lat: 47.9495324, lng: 21.7244053},
    {name: 'Balatonfüred', lat: 46.9599039, lng: 17.8851202},
    {name: 'Budapest', lat: 47.4979, lng: 19.0402}
];

var styles = {
    'easy': [
      {
        stylers: [
          { visibility: 'off' }
        ]
      },{
        featureType: 'water',
        stylers: [
            { visibility: 'on' },
            { color: '#3182d8' }
        ]
      },{
        featureType: 'landscape',
        stylers: [
          { visibility: 'on' },
          { color: '#e5e3df' }
        ]
      }, {
        featureType: 'road.highway',
        elementType: 'geometry',
        stylers: [{ visibility: 'on' },{color: '#8c8c93'}]
      }, {
        featureType: 'administrative.province',
        elementType: 'geometry',
        stylers: [
         { visibility: 'on' },
         { weight: 3.3 },
         {color: '#2d6d29'}
        ]
      }, {
        featureType: 'administrative.locality',
        elementType: 'any',
        stylers: [
         { visibility: 'on' },{ "color": "#102d4c" }
        ]
      }, {
        featureType: 'administrative.locality',
        elementType: 'labels.text',
        stylers: [
         { visibility: 'off' },{ "color": "#102d4c" }
        ]
      }, {
        featureType: 'administrative.country',
        elementType: 'geometry',
        stylers: [
         { visibility: 'on' },
         { weight: 5.3 },
         {color: '#010102'}
        ]
      }
    ],
    'moderate': [
      {
        stylers: [
          { visibility: 'off' }
        ]
      },{
        featureType: 'water',
        stylers: [
            { visibility: 'on' },
            { color: '#d4d4d4' }
        ]
      },{
        featureType: 'landscape',
        stylers: [
          { visibility: 'on' },
          { color: '#e5e3df' }
        ]
      }, {
        featureType: 'road.highway',
        elementType: 'geometry',
        stylers: [{ visibility: 'on' },{color: '#8c8c93'}]
      }, {
        featureType: 'administrative.country',
        elementType: 'labels',
        stylers: [
         { visibility: 'off' }
        ]
      }, {
        featureType: 'administrative.country',
        elementType: 'geometry',
        stylers: [
         { visibility: 'on' },
         { weight: 5.3 },
         {color: '#010102'}
        ]
      }
    ],
    'hard': [
      {
        stylers: [
          { visibility: 'off' }
        ]
      },{
        featureType: 'water',
        stylers: [
            { visibility: 'on' },
            { color: '#d4d4d4' }
        ]
      },{
        featureType: 'landscape',
        stylers: [
          { visibility: 'on' },
          { color: '#e5e3df' }
        ]
      }, {
        featureType: 'administrative.country',
        elementType: 'geometry',
        stylers: [
         { visibility: 'on' },
         { weight: 2.3 }
        ]
      }
    ],
    'extreme': [
      {
        stylers: [
          { visibility: 'on' }
        ]
      },{
        featureType: 'water',
        stylers: [
            { visibility: 'on' },
            { color: '#d4d4d4' }
        ]
      },{
        featureType: 'landscape',
        stylers: [
          { visibility: 'on' },
          { color: '#e5e3df' }
        ]
      }, {
        featureType: 'administrative.country',
        elementType: 'labels',
        stylers: [
         { visibility: 'on' }
        ]
      }, {
        featureType: 'administrative.country',
        elementType: 'geometry',
        stylers: [
         { visibility: 'on' },
         { weight: 1.3 }
        ]
      }
    ]
  };

  var mapTypes = {
    'easy': "terrain",
    'moderate':"terrain",
    'hard': "roadmap",
    'extreme': "satellite"
  };

  var HunCities = '{"cities":[["a1","a2"],["b1","b2"]]}';