'use strict';

angular.module('casino-lights')
.service('fontService', ['$q', '$injector', function($q, $injector) {

  this.fetch = function(font, callback) {
    try {
      return callback($injector.get('casino.' + font));
    } catch(e) {
      throw 'Font data not found for font:' + font +
          ',\nPlease check data file exists: http://github.com/thatguynamedandy/angular-casino-lights';
    }
  };
}]);
