'use strict';

describe('Service: realtimeService', function () {

  // load the service's module
  beforeEach(module('chopperApp'));

  // instantiate service
  var realtimeService;
  beforeEach(inject(function (_realtimeService_) {
    realtimeService = _realtimeService_;
  }));

  it('should do something', function () {
    expect(!!realtimeService).toBe(true);
  });

});
