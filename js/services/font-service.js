'use strict';

angular.module('casino-lights')
.service('casino.font-service', ['$q', '$http', '$injector', '$log', function($q, $http, $injector, $log) {

  this.fetch = function(config, callback) {
    try {
      return callback($injector.get('casino.' + config.font));
    } catch(e) {

      $log.info('Asyncronously Loading data for ' + config.font + ': Recommended that you bootstrap data into page');

      $http({
        method: 'GET',
        url: config.dataPath + config.font + '.json',
        cache: true
      })
      .success(callback)
      .error(function() {
        throw 'Font data not found for font:' + config.font +
            ',\nPlease check data file exists: http://github.com/thatguynamedandy/angular-casino-lights';
      });
    }
  };
}]);
