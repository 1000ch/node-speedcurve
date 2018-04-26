'use strict';

const test = require('ava');
const SpeedCurve = require('..');

const SPEEDCURVE_APIKEY = process.env.SPEEDCURVE_APIKEY;
const SPEEDCURVE_URL_ID = process.env.SPEEDCURVE_URL_ID;
const SPEEDCURVE_TEST_ID = process.env.SPEEDCURVE_TEST_ID;
const SPEEDCURVE_DEPLOY_ID = process.env.SPEEDCURVE_DEPLOY_ID;
let speedcurve;

test.beforeEach(() => {
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
  const format = 'speedcurve';
  const days = 14;
  const response = await speedcurve.getSites(format, days);
  t.truthy(response.body);
});

test('getUrls(urlId, browser, days)', async t => {
  const urlId = SPEEDCURVE_URL_ID;
  const browser = 'chrome';
  const days = 30;
  const response = await speedcurve.getUrls(urlId, browser, days);
  t.truthy(response.body);
});

test('getTest(testId)', async t => {
  const testId = SPEEDCURVE_TEST_ID;
  const response = await speedcurve.getTest(testId);
  t.truthy(response.body);
});

test('getNotes()', async t => {
  const response = await speedcurve.getNotes();
  t.truthy(response.body);
});

test('getLatestDeploy()', async t => {
  const response = await speedcurve.getLatestDeploy();
  t.truthy(response.body);
});

test('getDeploy(deployId)', async t => {
  const deployId = SPEEDCURVE_DEPLOY_ID;
  const response = await speedcurve.getDeploy(deployId);
  t.truthy(response.body);
});
