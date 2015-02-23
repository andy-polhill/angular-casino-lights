describe('Letter filter', function() {

  var letterFilter,
      word;

  beforeEach(module('casino-lights'));

  beforeEach(inject(function(_letterFilter_) {
    letterFilter = _letterFilter_;
  }));

  beforeEach(function() {
    word = [{
      char: 'A',
      lights: [
        {x:0, y:0, power: false},
        {x:50, y:50, power: false}
      ]
    },{
      char: 'B',
      lights: [
        {x:0, y:0, power: false},
        {x:50, y:50, power: false}
      ]
    },{
      char: 'C',
      lights: [
        {x:0, y:0, power: false},
        {x:50, y:50, power: false}
      ]
    }];
  });

  function expectAll(letter, isOn) {
    var i = 0; l = letter.lights.length;
    for(; i < l; i++) {
      expect(letter.lights[i].power).toEqual(isOn);
    }
  }

  describe('letter by letter', function() {
    it('should start with all first letter lights on', function() {
      letterFilter(word, 0);
      expectAll(word[0], true);
    });

    it('should start with all non first letter lights off', function() {
      letterFilter(word, 0);
      expectAll(word[1], false);
      expectAll(word[2], false);
    });

    it('should switch one letter at a time', function() {
      letterFilter(word, 0);
      expectAll(word[0], true);
      expectAll(word[1], false);
      expectAll(word[2], false);
      letterFilter(word, 8);
      expectAll(word[0], false);
      expectAll(word[1], true);
      expectAll(word[2], false);
      letterFilter(word, 16);
      expectAll(word[0], false);
      expectAll(word[1], false);
      expectAll(word[2], true);
    });

    it('should go back to the beginning after a full cycle', function() {
      letterFilter(word, 16);
      expectAll(word[0], false);
      expectAll(word[1], false);
      expectAll(word[2], true);
      letterFilter(word, 24);
      expectAll(word[0], true);
      expectAll(word[1], false);
      expectAll(word[2], false);
    });
  });

  describe('throttling', function() {
    it('should only change which letter is lit on frames divisble by 8', function() {
      letterFilter(word, 0);
      expectAll(word[0], true);
      letterFilter(word, 1);
      expectAll(word[0], true);
      letterFilter(word, 8);
      expectAll(word[0], false);
    });

  });

});
