'use strict';

describe('Service: areaService', function () {

  // load the service's module
  beforeEach(module('chopperApp'));

  // instantiate service
  var areaService;
  beforeEach(inject(function (_areaService_) {
    areaService = _areaService_;
  }));

  it('should do something', function () {
    expect(!!areaService).toBe(true);
  });

});
