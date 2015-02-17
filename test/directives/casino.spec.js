describe('Casino lights directive', function() {
  var $compile,
      $rootScope;

  // Load the myApp module, which contains the directive
  beforeEach(module('casino-lights'));

  //Mock the font service
  beforeEach(module(function ($provide) {
    $provide.provider('casino.font-service', function () {
      this.$get = function() {
        return {
          fetch : function(config, callback) {callback({"A":[{"top":50, "left":50}]})}
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
  }));

  it('should insert light elements into the DOM', function() {
    // Compile a piece of HTML containing the directive
    var element = $compile("<h1 casino-lights>A</h1>")($rootScope);
    expect(element.find('i').length).toEqual(0);
    $rootScope.$digest();
    expect(element.find('i').length).toEqual(1);
  });
});
