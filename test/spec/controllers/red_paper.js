'use strict';

describe('Controller: RedPaperCtrl', function () {

  // load the controller's module
  beforeEach(module('chopperApp'));

  var RedPaperCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    RedPaperCtrl = $controller('RedPaperCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(RedPaperCtrl.awesomeThings.length).toBe(3);
  });
});
