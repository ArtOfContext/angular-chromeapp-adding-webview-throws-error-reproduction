/* global chrome */

'use strict';

chrome.app.runtime.onLaunched.addListener(launchData => {
  chrome.app.window.create(
    'index.html',
    {
      id: 'shell',
      state: 'fullscreen'
    }
  );
});
