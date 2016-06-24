'use strict';

const querystring = require('querystring');
const request = require('got');
const API_ENDPOINT = 'https://api.speedcurve.com/v1';

module.exports = class SpeedCurve {
  /**
   * SpeedCurve Constructor
   * @param {String} apiKey: Your API key is available on the Admin > Teams page.
   */
  constructor(apiKey) {
    let authorization = new Buffer(`${apiKey}:x`).toString('base64');
    this.options = {
      json    : true,
      headers : {
        authorization     : `Basic ${authorization}`,
        'accept-encoding' : 'gzip,deflate'
      }
    };
  }

  /**
   * Retrieves all sites and monitored URL’s for an account/team and the median tests for a site across all templates/URL’s and regions.
   * @description GET https://api.speedcurve.com/v1/sites
   * @param {String} format: Switch JSON structure to support a graph on Panic’s Statusboard. Options: (speedcurve, statusboard).
   * @param {Number} days: Number of days of median tests to return. (Max: 365)
   * @returns {Promise} promise
   */
  getSites(format, days) {
    let queries = querystring.stringify({
      format : format || 'speedcurve',
      days   : days || 14
    });
    let options = Object.assign({}, this.options);
    return request.get(`${API_ENDPOINT}/sites?${queries}`, options);
  }

  /**
   * Retrieves all the metadata for tests of a specific monitored URL.
   * @description GET https://api.speedcurve.com/v1/urls/{id}?days=30&browser=ie
   * @param {Number} urlId: ID of URL.
   * @param {String} browser: Browser. Options: (all, chrome, ie, firefox, safari).
   * @param {Number} days: Number of days of tests (Max: 365).
   * @returns {Promise} promise
   */
  getUrls(urlId, browser, days) {
    let queries = querystring.stringify({
      browser : browser || 'chrome',
      days    : days || 14
    });
    let options = Object.assign({}, this.options);
    return request.get(`${API_ENDPOINT}/urls/${urlId}?${queries}`, options);
  }

  /**
   * Retrieves all the details available for a specific test.
   * @description GET https://api.speedcurve.com/v1/tests/{id}
   * @param {String} testId: ID of test.
   * @returns {Promise} promise
   */
  getTest(testId) {
    let options = Object.assign({}, this.options);
    return request.get(`${API_ENDPOINT}/tests/${testId}`, options);
  }

  /**
   * Gets all the notes for the main site in a users account.
   * @description GET https://api.speedcurve.com/v1/notes
   * @returns {Promise} promise
   */
  getNotes() {
    let options = Object.assign({}, this.options);
    return request.get(`${API_ENDPOINT}/notes`, options);
  }

  /**
   * Gets details and status of testing for the latest deployment.
   * @description GET https://api.speedcurve.com/v1/deploy/latest
   * @returns {Promise} promise
   */
  getLatestDeploy() {
    let options = Object.assign({}, this.options);
    return request.get(`${API_ENDPOINT}/deploy/latest`, options);
  }

  /**
   * Get the details for a particular deployment.
   * @description GET https://api.speedcurve.com/v1/deploy/{id}
   * @param {Number} deployId: ID of the deployment.
   * @returns {Promise} promise
   */
  getDeploy(deployId) {
    let options = Object.assign({}, this.options);
    return request.get(`${API_ENDPOINT}/deploy/${deployId}`, options);
  }
};
