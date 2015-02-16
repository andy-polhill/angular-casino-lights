'use strict';

angular.module('casino-lights')
.service('casino.font-service', ['$q', '$injector', function($q, $injector) {

  this.fetch = function(config, callback) {
    try {
      return callback($injector.get('casino.' + config.font));
    } catch(e) {
      throw 'Font data not found for font:' + config.font +
          ',\nPlease check data file exists: http://github.com/thatguynamedandy/angular-casino-lights';
    }
  };
}]);
