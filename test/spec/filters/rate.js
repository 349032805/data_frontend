'use strict';

describe('Filter: rate', function () {

  // load the filter's module
  beforeEach(module('chopperApp'));

  // initialize a new instance of the filter before each test
  var rate;
  beforeEach(inject(function ($filter) {
    rate = $filter('rate');
  }));

  it('should return the input prefixed with "rate filter:"', function () {
    var text = 'angularjs';
    expect(rate(text)).toBe('rate filter: ' + text);
  });

});
