<!--
PLEASE HELP US PROCESS GITHUB ISSUES FASTER BY PROVIDING THE FOLLOWING INFORMATION.

ISSUES MISSING IMPORTANT INFORMATION MAY BE CLOSED WITHOUT INVESTIGATION.
-->

## I'm submitting a...
<!-- Check one of the following options with "x" -->
<pre><code>
[ ] Regression (a behavior that used to work and stopped working in a new release)
[ x ] Bug report  <!-- Please search GitHub for a similar issue or PR before submitting -->
[ ] Feature request
[ ] Documentation issue or request
[ ] Support request => Please do not submit support request here, instead see https://github.com/angular/angular/blob/master/CONTRIBUTING.md#question
</code></pre>

## Current behavior
<!-- Describe how the issue manifests. -->
I am adding a `<webview>` when the app first runs in a component, and then a second one on a button click.  The first one is displayed without issue.  The second one throws an error:

> Uncaught TypeError: GuestViewContainer[(this.viewType + "BrowserPlugin")] is not a constructor

The application is hosted as a Chrome app.  The webviews are added by being contained in a component, the components are added via `*ngIf`.

The issue also manifests when adding the component containing the webview via the router and activating a route.

It is unclear to me if this is a bug in Angular or in Chrome.  I am only able to reproduce the issue in Chrome.

## Expected behavior
<!-- Describe what the desired behavior would be. -->
I expect that the webview will be displayed properly without error whenever its added - when the app first runs or if its displayed later in response to an event or route being activated.

## Minimal reproduction of the problem with instructions
<!--
For bug reports please provide the *STEPS TO REPRODUCE* and if possible a *MINIMAL DEMO* of the problem via
https://plnkr.co or similar (you can use this template as a starting point: http://plnkr.co/edit/tpl:AvJOMERrnz94ekVua0u5).
-->

*STEPS TO REPRODUCE*

Load a webview in angular component either on event (e.g. button click) or via activating an angular route.  You will get error "Uncaught TypeError: GuestViewContainer[(this.viewType + "BrowserPlugin")] is not a constructor" and callstack shown in "Others" section.

*MINIMAL DEMO*

To run packaged chrome app reproduction of the issue:
* Unzip the .zip file : [https://github.com/ArtOfContext/angular-chromeapp-adding-webview-throws-error-reproduction/raw/master/angular-chromeapp-adding-webview-throws-error-reproduction.zip](https://github.com/ArtOfContext/angular-chromeapp-adding-webview-throws-error-reproduction/raw/master/angular-chromeapp-adding-webview-throws-error-reproduction.zip)
* Navigate Chrome browser to chrome://extensions
* check the Developer mode button checkbox
* Click Load unpacked extension... button
* Browse to the folder that you just unzipped
* Find the Chrome app that was just added in extensions window, click the launch button
* Again in extensions window for the app, click the index.html 
* In the application, click the button that says "Click to add 2nd webview"
* Check the javascript console.
* See error message - the error and callstack is listed in Others section below

To build the bug reproduction from source:
* pull git repo: https://github.com/ArtOfContext/angular-chromeapp-adding-webview-throws-error-reproduction
* requires Angular CLI
* npm install
* run the following:
ng build --aot
npm run chromeapp # this copies manifest.json and background.js into the dist folder
- The packaged chrome app is now inside of the "dist" folder.  You can use this folder and the Load unpackaged extension button in chrome://extensions

## What is the motivation / use case for changing the behavior?
<!-- Describe the motivation or the concrete use case. -->

I want to be able to use `<webview>`s as I would other HTML components inside of Angular / Chrome apps.  In Chrome apps, iframes are not available and we need similar functionality.  Webview is the answer - its a a powerful component in Chrome apps and there are several capabilities we require. 

## Environment

<pre><code>
Angular version: 4.4.3
<!-- Check whether this is still an issue in the most recent Angular version -->

Browser:
- [ x ] Chrome (desktop) version XX
- [ ] Chrome (Android) version XX
- [ ] Chrome (iOS) version XX
- [ ] Firefox version XX
- [ ] Safari (desktop) version XX
- [ ] Safari (iOS) version XX
- [ ] IE version XX
- [ ] Edge version XX
 
For Tooling issues:
- Node version: 8.0.0  <!-- run `node --version` -->
- Platform:  Windows <!-- Mac, Linux, Windows -->

Others:
<!-- Anything else relevant?  Operating system version, IDE, package manager, HTTP server, ... -->

The reproduction repo contains another JavaScript only version of the app, it does not use Angular.  I am not able to reproduce the issue in that case.  That app is "javascript-only-working".

Call stack of error in the Angular version:
Uncaught TypeError: GuestViewContainer[(this.viewType + "BrowserPlugin")] is not a constructor
    at WebViewImpl.GuestViewContainer.createInternalElement$ (extensions::guestViewContainer:97:7)
    at WebViewImpl.GuestViewContainer (extensions::guestViewContainer:26:41)
    at new WebViewImpl (extensions::webView:19:22)
    at HTMLElement.proto.createdCallback (extensions::guestViewContainer:246:5)
    at DefaultDomRenderer2.webpackJsonp.../../../platform-browser/@angular/platform-browser.es5.js.DefaultDomRenderer2.createElement (chrome-extension://abjegfgbmmkgiifemllflgcpdpjdecjj/vendor.bundle.js:24397:25)
    at DebugRenderer2.webpackJsonp.../../../core/@angular/core.es5.js.DebugRenderer2.createElement (chrome-extension://abjegfgbmmkgiifemllflgcpdpjdecjj/vendor.bundle.js:20357:49)
    at createElement (chrome-extension://abjegfgbmmkgiifemllflgcpdpjdecjj/vendor.bundle.js:15950:27)
    at createViewNodes (chrome-extension://abjegfgbmmkgiifemllflgcpdpjdecjj/vendor.bundle.js:18946:44)
    at callViewAction (chrome-extension://abjegfgbmmkgiifemllflgcpdpjdecjj/vendor.bundle.js:19429:13)
    at execComponentViewsAction (chrome-extension://abjegfgbmmkgiifemllflgcpdpjdecjj/vendor.bundle.js:19338:13)

</code></pre>
