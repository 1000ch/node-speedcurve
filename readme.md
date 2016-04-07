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

### `getSites()`

### `getUrls(urlId, browser, days)`

### `getTest(testId)`

### `getNotes()`

### `getLatestDeploy()`

### `getDeploy(deployId)`

## License

MIT: http://1000ch.mit-license.org
