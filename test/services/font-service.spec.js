describe('Font service', function() {

  var fontService;

  beforeEach(module('casino-lights'));

  beforeEach(module(function ($provide) {
    $provide.factory('casino.raleway', function() {
      return {};
    });
  }));

  beforeEach(inject(function(_fontService_) {
    fontService = _fontService_;
  }));

  describe('Error handling', function() {
    it('should throw an error when font data is not found', function() {
      expect(function() {
        fontService.fetch('test', function(){})
      }).toThrow();
    });

    it('should not throw an error when font data is found', function() {
      expect(function() {
        fontService.fetch('raleway', function(){})
      }).not.toThrow();
    });
  });

  describe('Success handling', function() {
    it('it should respond to callback when font data is found', function() {
      var spy = jasmine.createSpy('service callback');
      fontService.fetch('raleway', spy);
      expect(spy).toHaveBeenCalled();
      expect(spy).toHaveBeenCalledWith(jasmine.any(Object));
    });
  });

});
