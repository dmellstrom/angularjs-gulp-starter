'use strict';

var fs = require('fs');
var EC = protractor.ExpectedConditions;

// This scenario must be run while the development server is running (`npm start`)
// Makes a series of juvenile edits to verify that development toolchain is functioning

describe('HTML editing test', function() {
  beforeEach(function() {
    browser.get('index.html');
  });

  it('should wait for a certain string to be inserted', function() {
    replaceTextInFile('app/navbar/navbar.template.html', /flex></, "flex>Oiramapap<");
    expect(
      browser.wait(EC.textToBePresentInElement(
        $('#navbar span'), 'Oiramapap'), 10000
      )
    ).toBe(true);
  });

  it('should see the same text removed', function() {
    replaceTextInFile('app/navbar/navbar.template.html', /Oiramapap/, "");
    expect(
      browser.wait(EC.not(EC.textToBePresentInElement(
        $('#navbar span'), 'Oiramapap'), 10000
      )
    )).toBe(true);
  });

});

describe('CSS editing test', function() {
  beforeEach(function() {
    browser.get('index.html');
  });

  it('should wait for a certain rule to be added', function() {
    replaceTextInFile('app/navbar/navbar.scss', /\n\s{4}\n/, "\n    display: none;\n");
    expect(
      browser.wait(EC.invisibilityOf(
        $('#navbar h1')), 10000
      )
    ).toBe(true);
  });

  it('should see the same rule removed', function() {
    replaceTextInFile('app/navbar/navbar.scss', /display: none;/, "");
    expect(
      browser.wait(EC.visibilityOf(
        $('#navbar h1')), 10000
      )
    ).toBe(true);
  });

});

describe('JS editing test', function() {
  beforeEach(function() {
    browser.get('index.html');
  });

  it('should wait for a certain string to be edited', function() {
    replaceTextInFile('app/navbar/navbar.component.js', /Starter/, "Sharter");
    expect(
      browser.wait(EC.textToBePresentInElement(
        $('#navbar h1'), 'AngularJS Sharter Application'), 10000
      )
    ).toBe(true);
  });

  it('should see the same text reverted', function() {
    replaceTextInFile('app/navbar/navbar.component.js', /Sharter/, "Starter");
    expect(
      browser.wait(EC.textToBePresentInElement(
        $('#navbar h1'), 'AngularJS Starter Application'), 10000
      )
    ).toBe(true);
  });

});


function replaceTextInFile(filename, searchPattern, replacement, callback) {
  fs.readFile(filename, 'utf8', function (err, data) {
    if (err) {
      return console.error(err);
    }
    let result = data.replace(searchPattern, replacement);

    fs.writeFile(filename, result, 'utf8', function (err) {
       if (err) return console.error(err);
    });
  });
}