'use strict';

angular.module('casino-lights')
.service('casino.font-service', ['$q', '$http', '$injector', '$log', function($q, $http, $injector, $log) {

  this.fetch = function(font, letters, callback) {
    try {
      return callback($injector.get('casino.' + font));
    } catch(e) {

      $log.info('Asyncronously Loading data for ' + font + ': Recommended that you bootstrap data into page');

      $http({
        method: 'GET',
        url: 'bower_components/angular-casino-lights/js/data/' + font + '.json',
        cache: true
      })
      .success(callback)
      .error(function() {
        throw 'Font data not found for font:' + font +
            ',\nPlease check data file exists: http://github.com/thatguynamedandy/angular-casino-lights';
      });
    }
  };
}]);
