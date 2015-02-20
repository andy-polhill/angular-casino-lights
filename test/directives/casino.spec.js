describe('Casino lights directive', function() {
  var $compile,
      $rootScope,
      $timeout,
      $filter;

  // Load the myApp module, which contains the directive
  beforeEach(module('casino-lights'));

  beforeEach(module(function ($provide) {

    //Mock and decodate the timeout - urgh
    $provide.decorator('$timeout', function ($delegate, $browser, $injector) {

      // Make sure these values are injected before running invoke on the $TimeoutDecorator.
      $provide.value('$delegate', $delegate);
      $provide.value('$browser', $browser);

      $delegate = jasmine.createSpy().and.callFake($delegate);

      // Apply the ngMock $timeout functions.
      angular.extend($delegate,
        $injector.invoke(angular.mock.$TimeoutDecorator));

      //another spy for cancel
      $delegate.cancel = jasmine.createSpy().and.callThrough();

      return $delegate;
    });

    $provide.decorator('$filter', function($delegate) {
      return jasmine.createSpy('filter').and.returnValue(function(){});
    });

    $provide.factory('casino.raleway', function() {
      return {'A':[{'top':50, 'x':50, 'power': true}]};
    });

    $provide.factory('fontService', function ($injector) {
      return {
        fetch : jasmine.createSpy('fontService').and.callFake(
          function(config, callback) {
            callback($injector.get('casino.raleway'));
          }
        )
      }
    });
  }));

  // Store references to $rootScope and $compile
  // so they are available to all tests in this describe block
  beforeEach(inject(function(_$filter_, _$timeout_, _$compile_, _$rootScope_){
    // The injector unwraps the underscores (_) from around the parameter names when matching
    $compile = _$compile_;
    $rootScope = _$rootScope_;
    $timeout = _$timeout_;
    $filter = _$filter_;
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

    it('should give precedence to provided config', function() {
      $rootScope.config.filter = 'letters';
      var element = $compile("<h1 casino-lights config='config'>A</h1>")($rootScope);
      $rootScope.$digest();
      expect($rootScope.config.filter).toEqual('letters');
      expect($rootScope.config.power).toEqual(true);
    });

    it('should call font service for the font data', inject(function(fontService) {
      $compile('<h1 casino-lights config="config">A</h1>')($rootScope);
      $rootScope.$digest();
      expect(fontService.fetch).toHaveBeenCalled();
    }));

    it('should call font service with the correct font family', inject(function(fontService) {
      //slightly heavy test, add to the DOM so we can check CSS is read.
      var body = angular.element(document).find('body');
      body.append('<h1 casino-lights config="config">A</h1>');
      $compile(body.find('h1'))($rootScope);
      $rootScope.$digest();
      expect(fontService.fetch).toHaveBeenCalledWith('raleway', jasmine.any(Function));
    }));

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
      expect($timeout).toHaveBeenCalled();
    });

    it('should not start animation sequence when power is off', function() {
      $rootScope.config.power = false;
      $compile('<h1 casino-lights config="config">A</h1>')($rootScope);
      $rootScope.$digest();
      expect($timeout).not.toHaveBeenCalled();
    });

    it('should animate at specified speed', function() {
      var speed = 100;
      $rootScope.config.power = true;
      $rootScope.config.speed = speed;
      $compile('<h1 casino-lights config="config">A</h1>')($rootScope);
      $rootScope.$digest();
      expect($timeout.calls.count()).toEqual(1);
      expect($timeout.calls.argsFor(0)).toEqual([jasmine.any(Function), speed]);
      $timeout.flush();
      expect($timeout.calls.count()).toEqual(2);
      expect($timeout.calls.argsFor(1)).toEqual([jasmine.any(Function), speed]);
    });

    it('should alter it\'s animation speed when changed', function() {
      var slowSpeed = 100, fastSpeed = 50;
      $rootScope.config.power = true;
      $rootScope.config.speed = slowSpeed;
      $compile('<h1 casino-lights config="config">A</h1>')($rootScope);
      $rootScope.$digest();
      expect($timeout.calls.count()).toEqual(1);
      expect($timeout.calls.argsFor(0)).toEqual([jasmine.any(Function), slowSpeed]);
      $rootScope.config.speed = fastSpeed;
      $timeout.flush();
      expect($timeout.calls.count()).toEqual(2);
      expect($timeout.calls.argsFor(1)).toEqual([jasmine.any(Function), fastSpeed]);
    });

    it('should stop animating when power turns off', function() {
      $rootScope.config.power = true;
      $compile('<h1 casino-lights config="config">A</h1>')($rootScope);
      $rootScope.$digest();
      expect($timeout.calls.count()).toEqual(1);
      $rootScope.config.power = false;
      $timeout.flush();
      expect($timeout.calls.count()).toEqual(1);
    });

    it('should stop animating when destroyed', function() {
      $compile('<h1 casino-lights config="config">A</h1>')($rootScope).remove();
      expect($timeout.cancel.calls.count()).toEqual(1);
    });

    it('should animate with the specified filter type', function() {
      var filter1 = 'filter-one';
      $rootScope.config.filter = filter1;
      $compile('<h1 casino-lights config="config">A</h1>')($rootScope);
      $rootScope.$digest();
      $timeout.flush();
      expect($filter.calls.argsFor(0)).toEqual([filter1]);
      expect($filter.calls.count()).toEqual(1);
    });

    it('should respond to filter changes', function() {
      var filter1 = 'filter-one', filter2 = 'filter-two';
      $rootScope.config.filter = filter1;
      $compile('<h1 casino-lights config="config">A</h1>')($rootScope);
      $rootScope.$digest();
      $timeout.flush();
      $rootScope.config.filter = filter2;
      $timeout.flush();
      expect($filter.calls.argsFor(0)).toEqual([filter1]);
      expect($filter.calls.argsFor(1)).toEqual([filter2]);
      expect($filter.calls.count()).toEqual(2);
    });

  });
});
