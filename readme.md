# node-speedcurve

SpeedCurve API thin wrapper.

## Install

```sh
npm install speedcurve
```

## Usage

```javascript
const SpeedCurve = require('speedcurve');

let speedcurve = new SpeedCurve([apiKey]);
speedcurve.getSites().then(json => {
  console.log(json);
});
```

## API

### [`getSites()`](https://api.speedcurve.com/#get-all-sites)

### [`getUrls(urlId, browser, days)`](https://api.speedcurve.com/#get-all-tests-for-a-url)

### [`getTest(testId)`](https://api.speedcurve.com/#get-a-test)

### [`getNotes()`](https://api.speedcurve.com/#get-all-notes)

### [`getLatestDeploy()`](https://api.speedcurve.com/#lastest-deployment)

### [`getDeploy(deployId)`](https://api.speedcurve.com/#get-a-deployment)

## License

MIT: http://1000ch.mit-license.org
