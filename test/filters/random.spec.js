describe('Random filter', function() {

  var randomFilter,
      word;

  beforeEach(module('casino-lights'));

  beforeEach(inject(function(_randomFilter_) {
    randomFilter = _randomFilter_;
  }));

  beforeEach(function() {
    word = [{
      lights: [
        {left:0, bottom:0, power: false},
        {left:50, bottom:50, power: false}
      ]
    }];
  });

  describe('throttle', function() {
    it('should only run on frame numbers divisible by 8', function() {
      expect(randomFilter(word, 6)).toEqual(false);
      expect(randomFilter(word, 8)).toEqual(true);
    });
  });

  describe('light switching', function() {
    it('it should switch lights on and off randomly', function() {
      Math.random = jasmine.createSpy('random').and.callThrough();
      randomFilter(word, 0);
      expect(Math.random.calls.count()).toEqual(word[0].lights.length);
    });
  });

});
