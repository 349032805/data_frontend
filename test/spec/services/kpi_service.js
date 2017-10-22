'use strict';

describe('Service: kpiService', function () {

  // load the service's module
  beforeEach(module('chopperApp'));

  // instantiate service
  var kpiService;
  beforeEach(inject(function (_kpiService_) {
    kpiService = _kpiService_;
  }));

  it('should do something', function () {
    expect(!!kpiService).toBe(true);
  });

});
