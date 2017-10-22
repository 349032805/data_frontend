'use strict';

describe('Service: csvDataService', function () {

  // load the service's module
  beforeEach(module('chopperApp'));

  // instantiate service
  var csvDataService;
  beforeEach(inject(function (_csvDataService_) {
    csvDataService = _csvDataService_;
  }));

  it('should do something', function () {
    expect(!!csvDataService).toBe(true);
  });

});
