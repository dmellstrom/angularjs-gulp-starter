'use strict';

describe('AngularJS Starter Application', function() {
  beforeEach(function() {
    browser.get('index.html');
  });

  it('should have a title', function() {
    expect(browser.getTitle()).toEqual('AngularJS Starter Application');
  });

  it('should navigate to /about when the toolbar link is clicked', function() {
    element(by.id('aboutbutton')).click();
    expect(browser.getCurrentUrl()).toContain('/about');
  });

});
