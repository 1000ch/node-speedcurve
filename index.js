'use strict';

const querystring = require('querystring');
const request = require('got');
const API_ENDPOINT = 'https://api.speedcurve.com/v1';

module.exports = class SpeedCurve {
  /**
   * SpeedCurve Constructor
   * @param {String} apiKey
   */
  constructor(apiKey) {
    this.options = {
      json    : true,
      headers : {
        'authorization': 'Basic ' + (new Buffer(`${apiKey}:x`).toString('base64')),
        'accept-encoding': 'gzip,deflate'
      }
    };
  }

  /**
   * Retrieves all sites and monitored URL’s for an account/team and the median tests for a site across all templates/URL’s and regions.
   * @description GET https://api.speedcurve.com/v1/sites
   * @returns {Promise}
   */
  getSites() {
    let options = Object.assign({}, this.options);
    return request.get(`${API_ENDPOINT}/sites`, options);
  }

  /**
   * Retrieves all the metadata for tests of a specific monitored URL.
   * @description GET https://api.speedcurve.com/v1/urls/{id}?days=30&browser=ie
   * @param {Number} urlId
   * @param {String} browser
   * @param {Number} days
   * @returns {Promise}
   */
  getUrls(urlId, browser, days) {
    let options = Object.assign({}, this.options);
    let queries = {
      browser : browser,
      days    : days
    };
    return request.get(`${API_ENDPOINT}/urls/${urlId}${querystring.stringify(queries)}`, options);
  }

  /**
   * Retrieves all the details available for a specific test.
   * @description GET https://api.speedcurve.com/v1/tests/{id}
   * @param {String} testId
   * @returns {Promise}
   */
  getTest(testId) {
    let options = Object.assign({}, this.options);
    return request.get(`${API_ENDPOINT}/tests/${testId}`, options);
  }

  /**
   * Gets all the notes for the main site in a users account.
   * @description GET https://api.speedcurve.com/v1/notes
   * @returns {Promise}
   */
  getNotes() {
    let options = Object.assign({}, this.options);
    return request.get(`${API_ENDPOINT}/notes`, options);
  }

  /**
   * Gets details and status of testing for the latest deployment.
   * @description GET https://api.speedcurve.com/v1/deploy/latest
   * @returns {Promise}
   */
  getLatestDeploy() {
    let options = Object.assign({}, this.options);
    return request.get(`${API_ENDPOINT}/deploy/latest`, options);
  }

  /**
   * Get the details for a particular deployment.
   * @description GET https://api.speedcurve.com/v1/deploy/{id}
   * @param {Number} deployId
   * @returns {Promise}
   */
  getDeploy(deployId) {
    let options = Object.assign({}, this.options);
    return request.get(`${API_ENDPOINT}/deploy/${deployId}`, options);
  }
}
