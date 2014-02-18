'use strict';

angular.module('casino.services').
  service('fontService', function($q, $http, _) {

    this._fetch = function(font, word, callback) {

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

      return deferred.promise;
    };


    this.fetch = function(font, word, callback) {
      //Fetch the font data (you could/should cache the response)
      var promise = this._fetch.apply(this, arguments);

      promise
        .then(this.parse)
        .then(callback);
    };

    //transform the data into a more suitable format
    //and create meta data for the filters
    //a bit on the heavy side so only do it once
    this.parse = function(data) {

      var fontData = {all:[]};

      _.each(data.word, function(letter) {
        fontData.all[letter] = [];
        _.each(data.letters[letter], function(light) {
          fontData.all[letter].push({'pos': light});
        }, this);
      }, this);

      var values = _.values(fontData.all);
      fontData.flat = _.flatten(values, true);

      return fontData;
    };
  }
);
