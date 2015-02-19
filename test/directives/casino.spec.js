describe('Casino lights directive', function() {
  var $compile,
      $rootScope,
      fontServiceGetSpy,
      timeoutSpy;

  // Load the myApp module, which contains the directive
  beforeEach(module('casino-lights'));

  //Mock the font service
  beforeEach(module(function ($provide) {

    fontServiceGetSpy = jasmine.createSpy('font-service.get').and.callFake(
      function(config, callback) {
        callback({"A":[{"top":50, 'x':50}]})
      }
    );

    timeoutSpy = jasmine.createSpy('timeout');

    $provide.decorator('$timeout', function($delegate) {
      return timeoutSpy;
    });

    $provide.provider('casino.font-service', function () {
      this.$get = function() {
        return {
          fetch : fontServiceGetSpy
        }
      }
    });
  }));

  // Store references to $rootScope and $compile
  // so they are available to all tests in this describe block
  beforeEach(inject(function(_$compile_, _$rootScope_){
    // The injector unwraps the underscores (_) from around the parameter names when matching
    $compile = _$compile_;
    $rootScope = _$rootScope_;
    $rootScope.config = {};
  }));

  describe('#link', function(){

    it('should insert light elements into the DOM', function() {
      // Compile a piece of HTML containing the directive
      var element = $compile("<h1 casino-lights>A</h1>")($rootScope);
      expect(element.find('i').length).toEqual(0);
      $rootScope.$digest();
      expect(element.find('i').length).toEqual(1);
    });

    it('should give preference to provided config', function() {
      // Compile a piece of HTML containing the directive
      $rootScope.config.filter = 'letters';
      var element = $compile("<h1 casino-lights config='config'>A</h1>")($rootScope);
      $rootScope.$digest();
      expect($rootScope.config.filter).toEqual('letters');
      expect($rootScope.config.power).toEqual(true);
    });

    it('should call font service for the font data', function() {
      $compile('<h1 casino-lights config="config">A</h1>')($rootScope);
      $rootScope.$digest();
      expect(fontServiceGetSpy).toHaveBeenCalled();
    });

    it('should call font service with the correct font family', function() {
      //slightly heavy test, add to the DOM so we can check CSS is read.
      var body = angular.element(document).find('body');
      body.append('<h1 casino-lights config="config">A</h1>');
      $compile(body.find('h1'))($rootScope);
      $rootScope.$digest();
      expect(fontServiceGetSpy).toHaveBeenCalledWith('raleway', jasmine.any(Function));
    });

    it('should add transcluded element text to the config', function() {
      var text = 'ANDY'
      $compile('<h1 casino-lights config="config">' + text + '</h1>')($rootScope);
      $rootScope.$digest();
      expect($rootScope.config.letters).toEqual(text);
    });

    it('should start animation sequence when power is on', function() {
      $rootScope.config.power = true;
      $compile('<h1 casino-lights config="config">A</h1>')($rootScope);
      $rootScope.$digest();
      expect(timeoutSpy).toHaveBeenCalled();
    });

    it('should not start animation sequence when power is off', function() {
      $rootScope.config.power = false;
      $compile('<h1 casino-lights config="config">A</h1>')($rootScope);
      $rootScope.$digest();
      expect(timeoutSpy).not.toHaveBeenCalled();
    });

  });
});
