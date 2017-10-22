'use strict';

describe('Service: marketingService', function () {

  // load the service's module
  beforeEach(module('chopperApp'));

  // instantiate service
  var marketingService;
  beforeEach(inject(function (_marketingService_) {
    marketingService = _marketingService_;
  }));

  it('should do something', function () {
    expect(!!marketingService).toBe(true);
  });

});
