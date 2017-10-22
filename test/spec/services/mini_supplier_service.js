'use strict';

describe('Service: miniSupplierService', function () {

  // load the service's module
  beforeEach(module('chopperApp'));

  // instantiate service
  var miniSupplierService;
  beforeEach(inject(function (_miniSupplierService_) {
    miniSupplierService = _miniSupplierService_;
  }));

  it('should do something', function () {
    expect(!!miniSupplierService).toBe(true);
  });

});
