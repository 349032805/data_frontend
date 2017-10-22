'use strict';

describe('Controller: StoreDataCtrl', function () {

  // load the controller's module
  beforeEach(module('chopperApp'));

  var StoreDataCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    StoreDataCtrl = $controller('StoreDataCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(StoreDataCtrl.awesomeThings.length).toBe(3);
  });
});
