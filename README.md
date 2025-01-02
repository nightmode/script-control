# Script Control

A web browser extension that can allow or block JavaScript.

Available in Chrome, Edge, and Firefox.

## Navigation

* [Install](#install)
* [Development](#development)
* [Test](#test)
* [Deploy](#deploy)
* [License](#license)

## Install

For Chrome, install via the `Script Control` page on the [Chrome Web Store](https://chrome.google.com/webstore/detail/script-control/lhdjmcedmkdenkgphahlnmkbddhbgeoh).

For Edge, install via the `Script Control` page on the [Microsoft Edge Addons](https://microsoftedge.microsoft.com/addons/detail/script-control/foadanilgkkoaompgnpbjggalpecphcd) site.

For Firefox, install via the `Script Control` page on the [Firefox Add-ons](https://addons.mozilla.org/en-US/firefox/addon/script-control/) site.

## Development

Optionally set the `log` setting inside `source/js/shared.js` to `true` to log all sorts of information to the console.

Optionally set the `rule_debug` setting inside `source/js/shared.js` to `true` to log information about browser rule matches.

Use [Feri](https://github.com/nightmode/feri) to continually publish from the `source` directory to the `deploy` directory.

### Development in Chrome

Navigate to `chrome://extensions` and enable developer mode.

Use `load unpacked` and select `deploy` as the extension folder.

### Development in Edge

Navigate to `edge://extensions/` and enable developer mode.

Use `load unpacked` and select `deploy` as the extension folder.

### Development in Firefox

Navigate to `about:debugging` and enable `add-on debugging`.

Use `load temporary add-on` and select the `manifest.json` file within the `deploy` folder.

## Test

From the background page, run `await test()` to use the test suite.

## Deploy

No matter which platform you are deploying on, make sure the `log` and `rule_debug` settings inside `source/js/shared.js` are set to `false`.

Update the change log under `/source/page/-about.html.jss` with any major changes. Also update the `Upgrade Complete` message in `/source/page/include/-show-message.html.jss` based on the new change log entry.

Increment the version in `/source/manifest.json`.

Search for `?version=` using the previous version and replace all occurrences with a new `?version=` string.

Run Feri one last time to make sure any changed files are processed from the `source` directory to the `deploy` directory.

### Deploy for Chrome

Make sure the Feri build tool is not running.

Zip up everything in the `deploy` directory, except for the `_metadata` folder which may or may not exist.

Upload the zip file to the Chrome Web Store via the [Developer Dashboard](https://chrome.google.com/webstore/devconsole).

### Deploy for Edge

Make sure the Feri build tool is not running.

Zip up everything in the `deploy` directory, except for the `_metadata` folder which may or may not exist.

Upload the zip file to the Microsoft Edge Addons site via the [Microsoft Partner Center](https://partner.microsoft.com/en-us/dashboard/microsoftedge/overview).

### Deploy for Firefox

Make sure the Feri build tool is not running.

Edit `source/manifest.json` to make the following temporary changes.

Replace the `background` object with the following two objects.

```
"background": {
    "scripts": ["background.js"]
},
"browser_specific_settings": {
    "gecko": {
        "id": "script-control@___.addons.mozilla.org",
        "strict_min_version": "119.0"
    }
},
```

Replace the underscores in the ID of the second object with your username or another unique string that you always publish your extensions with.

Run Feri once to publish from the `source` directory to the `deploy` directory.

Make sure the Feri build tool is not running.

Zip up everything in the `deploy` directory and set the zip file aside for a moment.

Use GitHub Desktop to discard the changes to `source/manifest.json`.

Run the Feri build tool once to publish from the `source` directory to the `deploy` directory.

Upload the zip file to the Firefox Add-ons site via the [Developer Hub](https://addons.mozilla.org/en-US/developers/addons).

## License

[CC0 1.0 Universal](https://creativecommons.org/publicdomain/zero/1.0/)

This work has been marked as dedicated to the public domain.