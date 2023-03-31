
'use strict';


console.log(document.cookie ? 'Cookies available' : 'No cookies found');

function setCookie(name, value, options = {}) {
  options = {
    path: '/',
    SameSite: 'Lax',
    ...options
  };

  const keys = Object.keys(options);
  const values = Object.values(options);

  if (options.expires instanceof Date) {
    options.expires = options.expires.toUTCString();
  }

  let updatedCookie = encodeURIComponent(name) + "=" + encodeURIComponent(value);

  for (let i = 0; i < keys.length; i++) {
    updatedCookie += `; ${keys[i]}=${values[i]}`;
  }

  document.cookie = updatedCookie;
}

/*
  ?:  -> Non-capturing group (the regex inside the parenthesis must be matched
         but does not create the capturing group)
  ^|; -> Not the following
*/

function getCookie(name) {
  let matches = document.cookie.match(new RegExp(
    "(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"
  ));

  return matches ? decodeURIComponent(matches[1]) : undefined;
}

function deleteCookie(name) {
  setCookie(name, '', {'max-age': -1});
}

// deleteCookie('name');

const dialog1 = document.getElementById('dialog1');
const dialog1AcceptBtn = document.querySelector('.dialog1-accept-btn');
const dialog1SettingsBtn = document.querySelector('.dialog1-settings-btn');

const dialog2 = document.getElementById('dialog2');
const dialog2SaveBtn = document.querySelector('.dialog2-save-btn');

const dialog =document.querySelector('dialog');

window.onload = function() {
  dialog2.close();
  setTimeout(function() {
    dialog1.showModal();
  }, 1000); // delay of 1 seconds
  // Set the checkboxes to checked
  browserCheckbox.checked = true;
  osCheckbox.checked = true;
  screenWidthCheckbox.checked = true;
  screenHeightCheckbox.checked = true;
};

dialog.addEventListener('click', function(e) {
  const rect = this.getBoundingClientRect();

  if (e.clientY < rect.top || e.clientY > rect.bottom ||
    e.clientX < rect.left || e.clientX > rect.right) {
      dialog.close();
    }
});

function getBrowserName() {
  const userAgent = navigator.userAgent;
  let browserName;

  if (userAgent.includes("Firefox")) {
    browserName = "Firefox";
  } else if (userAgent.includes("Chrome")) {
    browserName = "Chrome";
  } else if (userAgent.includes("Safari")) {
    browserName = "Safari";
  } else if (userAgent.includes("Edge")) {
    browserName = "Edge";
  } else {
    browserName = "Unknown";
  }

  return browserName;
};

function getOSName() {
  const userAgent = navigator.userAgent;
  let osName;

  if (userAgent .includes("Win")) {
    osName = "Windows";
  } else if (userAgent .includes("Mac")) {
    osName = "macOS";
  } else if (userAgent .includes("Linux")) {
    osName = "Linux";
  } else {
    osName = "Unknown";
  }

  return osName;
};

const screenWidth = screen.width;
const screenHeight = screen.height;

const browserCheckbox = document.querySelector('#bro');
const osCheckbox = document.querySelector('#os');
const screenWidthCheckbox = document.querySelector('#sw');
const screenHeightCheckbox = document.querySelector('#sh');



dialog1AcceptBtn.addEventListener('click', () => {
  dialog1.close();
  setCookie('Browser', getBrowserName(), {'max-age': 15});
  document.cookie = `Operating system=${getOSName()}; path=/; max-age=15; SameSite=Lax`;
  document.cookie = `Screen width=${screenWidth}; path=/; max-age=15; SameSite=Lax`;
  document.cookie = `Screen height=${screenHeight}; path=/; max-age=15; SameSite=Lax`;
});

console.log(`Browser:${getCookie('Browser')}`);
console.log(`Operating system:${getCookie('Operating system')}`);
console.log(`Screen width:${getCookie('Screen width')}`);
console.log(`Screen height:${getCookie('Screen height')}`);


dialog1SettingsBtn.addEventListener('click', () => {
  dialog1.close();
  dialog2.showModal();
});

dialog2SaveBtn.addEventListener('click', () => {
  dialog2.close();

  if (browserCheckbox.checked) {
    setCookie('Browser', getBrowserName(), {'max-age': 15});
  }
  if (osCheckbox.checked) {
    document.cookie = `Operating system=${getOSName()}; path=/; max-age=15; SameSite=Lax`;
  }
  if (screenWidthCheckbox.checked) {
    document.cookie = `Screen width=${screenWidth}; path=/; max-age=15; SameSite=Lax`;
  }
  if (screenHeightCheckbox.checked) {
    document.cookie = `Screen height=${screenHeight}; path=/; max-age=15; SameSite=Lax`;
  }
});





