'use strict';

describe('AngularJS Starter Application', function() {

  it('should have a title', function() {
    browser.get('index.html');

    expect(browser.getTitle()).toEqual('AngularJS Starter Application');
  });

});
