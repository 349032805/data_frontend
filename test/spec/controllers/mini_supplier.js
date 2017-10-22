'use strict';

describe('Controller: MiniSupplierCtrl', function () {

  // load the controller's module
  beforeEach(module('chopperApp'));

  var MiniSupplierCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    MiniSupplierCtrl = $controller('MiniSupplierCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

});
