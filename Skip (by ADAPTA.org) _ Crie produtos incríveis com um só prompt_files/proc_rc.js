cartstackAPI.bReady = false
window.console =
  typeof window.console === 'undefined'
    ? {
        log: function (str) {
          return false
        },
      }
    : window.console
function cs_crossDomain(cross_domain) {
  if (xe_isset(cartstackAPI.crossDomain)) {
    return false
  }
  cartstackAPI.crossDomain = true
  cs_console.log('Setting up cross domain for domain: ' + cross_domain)
  document.cookie.split(';').reduce((cookies, cookie) => {
    var [name, value] = cookie.split('=').map((c) => c.trim())
    if (name.indexOf('xe_xdm-') > -1)
      document.cookie = name + '=;expires=Thu, 01 Jan 1970 00:00:01 GMT;'
  }, {})
}
/* ver: 2.3_CSCNT-3.7@Brazil-console */
var cs_debug = xe_readCookie('cs_debug') != '' ? true : false
window.cs_console = {
  log: function (str) {
    return false
  },
}
var cs_result = {
  result: 'failed',
  message:
    '[error] Domain not found, not set\/active... Domain: .dev REF: https:\/\/goskip.dev\/claudio-44534\/workspace',
}
