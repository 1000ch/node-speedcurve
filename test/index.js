'use strict'

const test = require('ava');
const SpeedCurve = require('..');
const SPEEDCURVE_APIKEY = process.env.SPEEDCURVE_APIKEY;
const SPEEDCURVE_URL_ID = process.env.SPEEDCURVE_URL_ID;
const SPEEDCURVE_TEST_ID = process.env.SPEEDCURVE_TEST_ID;
const SPEEDCURVE_DEPLOY_ID = process.env.SPEEDCURVE_DEPLOY_ID;
let speedcurve;

test.beforeEach(t => {
  speedcurve = new SpeedCurve(SPEEDCURVE_APIKEY);
});

test('SpeedCurve()', t => {
  t.is(typeof speedcurve.getSites, 'function');
  t.is(typeof speedcurve.getUrls, 'function');
  t.is(typeof speedcurve.getTest, 'function');
  t.is(typeof speedcurve.getNotes, 'function');
  t.is(typeof speedcurve.addNote, 'function');
  t.is(typeof speedcurve.getLatestDeploy, 'function');
  t.is(typeof speedcurve.addDeploy, 'function');
  t.is(typeof speedcurve.getDeploy, 'function');
});

test('getSites(format, days)', async t => {
  let format = 'speedcurve';
  let days = 14;
  let response = await speedcurve.getSites(format, days);
  t.truthy(response.body);
});

test('getUrls(urlId, browser, days)', async t => {
  let urlId = SPEEDCURVE_URL_ID;
  let browser = 'chrome';
  let days = 30;
  let response = await speedcurve.getUrls(urlId, browser, days);
  t.truthy(response.body);
});

test('getTest(testId)', async t => {
  let testId = SPEEDCURVE_TEST_ID;
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
  let deployId = SPEEDCURVE_DEPLOY_ID;
  let response = await speedcurve.getDeploy(deployId);
  t.truthy(response.body);
});
