'use strict';

describe('Controller: KpiDataListCtrl', function () {

  // load the controller's module
  beforeEach(module('chopperApp'));

  var KpiDataListCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    KpiDataListCtrl = $controller('KpiDataListCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

});
