'use strict';

describe('navbar', function() {
  beforeEach(module('app.navbar'));

  describe('NavbarController', function() {
    var ctrl;

    beforeEach(inject(function($componentController) {
      ctrl = $componentController('navbar', {});
    }));

    it('should set a value for the `title` property', function() {
      expect(ctrl.title).toBeDefined();
      expect(ctrl.title).toBe('AngularJS Starter Application');
    });
  });
});
