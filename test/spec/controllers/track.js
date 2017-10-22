'use strict';

describe('Controller: TrackCtrl', function () {

  // load the controller's module
  beforeEach(module('chopperApp'));

  var TrackCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    TrackCtrl = $controller('TrackCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(TrackCtrl.awesomeThings.length).toBe(3);
  });
});
