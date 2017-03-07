
export {requestFull, cancelFull, fullAvailable, activated}
const _hasWebkitFullScreen = 'webkitCancelFullScreen' in document
const _hasMozFullScreen = 'mozCancelFullScreen' in document

function requestFull (element) {
  element = element || document.body
  // const _hasWebkitFullScreen = true
  if (_hasWebkitFullScreen) {
    element.webkitRequestFullScreen()
  } else if (this._hasMozFullScreen) {
    element.mozRequestFullScreen()
  } else {
    console.assert(false)
  }
}

function cancelFull () {
  if (_hasWebkitFullScreen) {
    document.webkitCancelFullScreen()
  } else if (_hasMozFullScreen) {
    document.mozCancelFullScreen()
  } else {
    console.assert(false)
  }
}

function fullAvailable () {
  return _hasWebkitFullScreen || _hasMozFullScreen
}

function activated () {
  if (_hasWebkitFullScreen) {
    return document.webkitIsFullScreen
  } else if (_hasMozFullScreen) {
    return document.mozFullScreen
  } else {
    console.assert(false)
  }
}
