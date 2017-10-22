'use strict';

describe('Service: basicService', function () {

  // load the service's module
  beforeEach(module('chopperApp'));

  // instantiate service
  var basicService;
  beforeEach(inject(function (_basicService_) {
    basicService = _basicService_;
  }));

});
