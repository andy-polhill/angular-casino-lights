'use strict';

angular.module('casino.services').
  service('fontService', function($q, $http, _) {

    this.fetch = function(font, word, callback) {

      var deferred = $q.defer();

      $http({
        method: 'GET',
        url: 'data/' + font + '.json',
        cache: true,
        params: {
          word: word
        }
      }).success(function(data, status, headers, config) {
        deferred.resolve({
          letters:data,
          word:config.params.word
        });
      });

      deferred.promise
        .then(this.parse)
        .then(this.flatten)
        .then(this.setHighest)
        .then(this.setLowest)
        .then(callback);
    };

    //create a flat version of the data
    this.flatten = function(data) {
      data.flat = _.flatten(_.values(data.all), true);
      return data;
    };

    //find the highest light and keep a record
    this.setLowest = function(data) {
      var lowest = _.min(data.flat, function(data){
        return parseInt(data.pos.bottom, 10);
      });

      data.lowest = parseInt(lowest.pos.bottom, 10);
      return data;
    };

    //find the highest light and keep a record
    this.setHighest = function(data) {
      var highest = _.max(data.flat, function(data){
        return parseInt(data.pos.bottom, 10);
      });

      data.highest = parseInt(highest.pos.bottom, 10);
      return data;
    };

    //transform the data into a more suitable format
    this.parse = function(data) {

      var fontData = {all:[]};

      _.each(data.word, function(letter) {
        fontData.all[letter] = [];
        _.each(data.letters[letter], function(light) {
          fontData.all[letter].push({'pos': light});
        }, this);
      }, this);

      return fontData;
    };
  }
);
