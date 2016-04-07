'use strict'

const test = require('ava');
const SpeedCurve = require('..');
const SPEEDCURVE_APIKEY = process.env.SPEEDCURVE_APIKEY || '5u5r02shb6co4bzzzt7s8o0bgxmgr6';

let speedcurve;

test.beforeEach(t => {
  speedcurve = new SpeedCurve(SPEEDCURVE_APIKEY);
});

test('SpeedCurve()', t => {
  t.is(typeof speedcurve.getSites, 'function');
  t.is(typeof speedcurve.getUrls, 'function');
  t.is(typeof speedcurve.getTest, 'function');
  t.is(typeof speedcurve.getNotes, 'function');
  t.is(typeof speedcurve.getLatestDeploy, 'function');
  t.is(typeof speedcurve.getDeploy, 'function');
});

test('getSites()', async t => {
  let response = await speedcurve.getSites();
  t.truthy(response.body);
});

test('getUrls(urlId, browser, days)', async t => {
  let urlId = 8601;
  let browser = 'chrome';
  let days = 30;
  let response = await speedcurve.getUrls(urlId, browser, days);
  t.truthy(response.body);
});

test('getTest(testId)', async t => {
  let testId = '160406_TT_5c9c44ad9fd706d918e5ba47eb03b687';
  let response = await speedcurve.getTest(testId);
  t.truthy(response.body);
});

test('getNotes()', async t => {
  let response = await speedcurve.getNotes();
  t.truthy(response.body);
});

test('getLatestDeploy()', async t => {
  let response = await speedcurve.getLatestDeploy();
  t.truthy(response.body);
});

test('getDeploy(deployId)', async t => {
  let deployId = 37732;
  let response = await speedcurve.getDeploy(deployId);
  t.truthy(response.body);
});
