'use strict';

describe('Controller: CompetitionDataCtrl', function () {

  // load the controller's module
  beforeEach(module('chopperApp'));

  var CompetitionDataCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    CompetitionDataCtrl = $controller('CompetitionDataCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(CompetitionDataCtrl.awesomeThings.length).toBe(3);
  });
});
