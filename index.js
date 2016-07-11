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
   * Add a note to one of the sites within your account/team.
   * @description POST https://api.speedcurve.com/v1/notes
   * @param {String} timestamp: Either a UTC Unix Timestamp or “now”. Options: (now, unix timestamp).
   * @param {Number} siteId: ID of site to add note to. If no ID provided then note is added to the first site in the account/team.
   * @param {String} note: Short URL encoded note to display globally across all graphs for the main site. (Max: 255 characters).
   * @param {String} detail: Optional note detail to display if people want more context.
   * @returns {Promise} promise
   */
  addNote(timestamp = 'now', siteId, note, detail) {
    let options = Object.assign({}, this.options, {
      body : {
        timestamp : timestamp,
        site_id   : siteId,
        note      : note,
        detail    : detail
      }
    });
    return request.post(`${API_ENDPOINT}/notes`, options);
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
   * Add a deployment and trigger an additional round of testing for one of the sites in your account/team. A note is also automatically added to your graphs.
   * @description POST https://api.speedcurve.com/v1/deploy
   * @param {Number} siteId: The ID of the site you’d like to trigger a round of testing on. If no site_id then the deployment is added to the first site in the account/team.
   * @param {String} note: Short URL encoded note to display globally across all graphs for the main site. (Max: 255 characters).
   * @param {String} detail: Optional URL encoded note detail to display if people want more context.
   * @returns {Promise} promise
   */
  addDeploy(siteId, note, detail) {
    let options = Object.assign({}, this.options, {
      body : {
        site_id : siteId,
        note    : note,
        detail  : detail
      }
    });
    return request.post(`${API_ENDPOINT}/notes`, options);
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
