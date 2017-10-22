'use strict';

describe('Service: competitionService', function () {

  // load the service's module
  beforeEach(module('chopperApp'));

  // instantiate service
  var competitionService;
  beforeEach(inject(function (_competitionService_) {
    competitionService = _competitionService_;
  }));

  it('should do something', function () {
    expect(!!competitionService).toBe(true);
  });

});
