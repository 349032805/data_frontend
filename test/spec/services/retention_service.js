'use strict';

describe('Service: retentionService', function () {

  // load the service's module
  beforeEach(module('chopperApp'));

  // instantiate service
  var retentionService;
  beforeEach(inject(function (_retentionService_) {
    retentionService = _retentionService_;
  }));

  it('should do something', function () {
    expect(!!retentionService).toBe(true);
  });

});
