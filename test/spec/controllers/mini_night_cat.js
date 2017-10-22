'use strict';

describe('Controller: MiniNightCatCtrl', function () {

  // load the controller's module
  beforeEach(module('chopperApp'));

  var MiniNightCatCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    MiniNightCatCtrl = $controller('MiniNightCatCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

});
