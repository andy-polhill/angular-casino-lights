describe('Vertical filter', function() {

  var verticalFilter,
      word,
      downstepOffset,
      step; //steps up 3% at a time

  beforeEach(module('casino-lights'));

  beforeEach(inject(function(_verticalFilter_) {
    verticalFilter = _verticalFilter_;
  }));

  beforeEach(function() {
    step = 3;
    downstepOffset = Math.ceil(100 / step);
    word = [{
      char: 'I',
      lights: [
        {x:50, y:0, power: false},
        {x:50, y:50, power: false},
        {x:50, y:100, power: false}
      ]
    }];
  });

  function expectAll(letter, isOn) {
    var i = 0; l = letter.lights.length;
    for(; i < l; i++) {
      expect(letter.lights[i].power).toEqual(isOn);
    }
  }

  describe('bottom to top', function() {
    it('should increase the amount of powered lights from bottom to top', function() {
      verticalFilter(word, 0);
      expect(word[0].lights[0].power).toEqual(true);
      expect(word[0].lights[1].power).toEqual(false);
      verticalFilter(word, Math.ceil(word[0].lights[1].y / step));
      expect(word[0].lights[0].power).toEqual(true);
      expect(word[0].lights[1].power).toEqual(true);
      expect(word[0].lights[2].power).toEqual(false);
      verticalFilter(word, Math.ceil(word[0].lights[2].y / step));
      expect(word[0].lights[0].power).toEqual(true);
      expect(word[0].lights[1].power).toEqual(true);
      expect(word[0].lights[2].power).toEqual(true);
    });

    it('should decrease the amount of powered lights from top to bottom when top is reached', function() {
      verticalFilter(word, Math.ceil(100 / step));
      expect(word[0].lights[0].power).toEqual(true);
      expect(word[0].lights[1].power).toEqual(true);
      expect(word[0].lights[2].power).toEqual(true);
      verticalFilter(word, downstepOffset + Math.floor(word[0].lights[1].y / step));
      //console.log(downstepOffset + Math.floor(word[0].lights[1].y / step));
      expect(word[0].lights[0].power).toEqual(true);
      expect(word[0].lights[1].power).toEqual(true);
      expect(word[0].lights[2].power).toEqual(false);
      verticalFilter(word, downstepOffset + Math.floor(word[0].lights[2].y / step));
      //console.log(downstepOffset + Math.floor(word[0].lights[2].y / step));
      expect(word[0].lights[0].power).toEqual(true);
      expect(word[0].lights[1].power).toEqual(false);
      expect(word[0].lights[2].power).toEqual(false);
    })

  });

});
