'use strict';

describe('Controller: BaseNightCatCtrl', function () {

  // load the controller's module
  beforeEach(module('chopperApp'));

  var BaseNightCatCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    BaseNightCatCtrl = $controller('BaseNightCatCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

});
