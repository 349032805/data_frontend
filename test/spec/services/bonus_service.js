'use strict';

describe('Service: bonusService', function () {

  // load the service's module
  beforeEach(module('chopperApp'));

  // instantiate service
  var bonusService;
  beforeEach(inject(function (_bonusService_) {
    bonusService = _bonusService_;
  }));

  it('should do something', function () {
    expect(!!bonusService).toBe(true);
  });

});
