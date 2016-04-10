# node-speedcurve

[SpeedCurve](https://speedcurve.com/) API thin wrapper.

## Install

```sh
npm install speedcurve
```

## Usage

```javascript
const SpeedCurve = require('speedcurve');

let speedcurve = new SpeedCurve([SpeedCurve API key]);
speedcurve.getSites().then(json => {
  console.log(json);
});
```

SpeedCurve API key is available on **Teams** section at **Admin** page.

## API

### [`getSites(format, days)`](https://api.speedcurve.com/#get-all-sites)

> Retrieves all sites and monitored URL’s for an account/team and the median tests for a site across all templates/URL’s and regions.

### [`getUrls(urlId, browser, days)`](https://api.speedcurve.com/#get-all-tests-for-a-url)

> Retrieves all the metadata for tests of a specific monitored URL.

### [`getTest(testId)`](https://api.speedcurve.com/#get-a-test)

> Retrieves all the details available for a specific test.

### [`getNotes()`](https://api.speedcurve.com/#get-all-notes)

> Gets all the notes for the main site in a users account.

### [`getLatestDeploy()`](https://api.speedcurve.com/#lastest-deployment)

> Gets details and status of testing for the latest deployment.

### [`getDeploy(deployId)`](https://api.speedcurve.com/#get-a-deployment)

> Get the details for a particular deployment.

## License

MIT: http://1000ch.mit-license.org
