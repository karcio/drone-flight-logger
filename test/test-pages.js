var expect = require('chai').expect;
var request = require('request');

it('Main page status', function(done) {
  request('http://localhost:7000', function(error, response, body) {
    expect(response.statusCode).to.equal(200);
    done();
  });
});

it('Home page status', function(done) {
  request('http://localhost:7000/home', function(error, response, body) {
    expect(response.statusCode).to.equal(200);
    done();
  });
});

it('Drones page status', function(done) {
  request('http://localhost:7000/drones', function(error, response, body) {
    expect(response.statusCode).to.equal(200);
    done();
  });
});

it('Flight log page status', function(done) {
  request('http://localhost:7000/flightlog', function(error, response, body) {
    expect(response.statusCode).to.equal(200);
    done();
  });
});

it('Add flight page status', function(done) {
  request('http://localhost:7000/addflight', function(error, response, body) {
    expect(response.statusCode).to.equal(200);
    done();
  });
});

it('Add drone page status', function(done) {
  request('http://localhost:7000/adddrone', function(error, response, body) {
    expect(response.statusCode).to.equal(200);
    done();
  });
});
