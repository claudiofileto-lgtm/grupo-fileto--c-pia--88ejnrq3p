var xex_visitor_Class = function () {
    var that = this
    ;((this.ns = 'VISITOR'),
      (this.build_date = '031020261048:GMT-03:00'),
      (this.build_ts = 1791024493),
      (this.semaphores = { tunnel: !0, local: !0 }),
      (this.lastFire = 0),
      (this.hooks = 0),
      (this.trackCph = !1),
      (this.popInterv = { handle: -1, count: 0, max: 5 }),
      (this.events = { EMAIL_INPUT: xe_core.createEvent(that.ns + '_EMAIL_INPUT') }))
    var sources = { none: 0, vtrk: 1, local: 2, tunnel: 3 }
    const _VISITOR = { id: '', email: '', source: 0 }
    var VISITOR
    function uuidFromString(e) {
      let t = 0
      for (let i = 0; i < e.length; i++) ((t = (t << 5) - t + e.charCodeAt(i)), (t |= 0))
      let i = ''
      for (let r = 0; r < 8; r++)
        i += (15 & ((t >> (4 * r)) ^ (e.charCodeAt(r % e.length) || 0))).toString(16)
      for (; i.length < 32; ) ((t = (31 * t + 7) & 4294967295), (i += (t >>> 0).toString(16)))
      return (
        (i = i.slice(0, 32)),
        i.slice(0, 8) +
          '-' +
          i.slice(8, 12) +
          '-' +
          i.slice(12, 16) +
          '-' +
          i.slice(16, 20) +
          '-' +
          i.slice(20)
      )
    }
    function buildVisitorData() {
      return (
        ((VISITOR = Object.assign({}, _VISITOR)).id = uuidFromString(String(+new Date()))), !0
      )
    }
    if (
      (buildVisitorData(), xe_deleteLS('xe_vtrk'), xe_isset(xe_urlp.vtrk, 'string') && xe_urlp.vtrk)
    )
      try {
        for (
          var rot13 = xe_urlp.vtrk.replace(/-/g, '+').replace(/_/g, '/'),
            base64 = rot13.replace(/[a-zA-Z]/g, function (e) {
              return String.fromCharCode(
                (e <= 'Z' ? 90 : 122) >= (e = e.charCodeAt(0) + 13) ? e : e - 26,
              )
            });
          base64.length % 4;
        )
          base64 += '\x3d'
        var incomingVtrk = JSON.parse(window.atob(base64))
        if (incomingVtrk && 'object' == typeof incomingVtrk && !Array.isArray(incomingVtrk)) {
          var vtrkData = JSON.stringify(incomingVtrk)
          fillInfo(vtrkData, sources.vtrk) && xe_setLS(!1, 'xe_vtrk', vtrkData, 15)
        }
      } catch (e) {}
    function tunnedData() {
      return (
        !(!that.semaphores.tunnel || VISITOR.source === sources.tunnel) &&
        ((that.semaphores.tunnel = !1), (buff = xe_readCookie('xe_visitor', fillInfo)), !0)
      )
    }
    function validJSONString(e) {
      return !!(e && xe_isset(e, 'string') && e.length > 2 && '{' == e[0] && '}' == e[e.length - 1])
    }
    function validVisitorID(e) {
      return (
        (e = e && xe_isset(e, 'object') ? e : VISITOR),
        !(!xe_isset(e.id, 'string') || 36 !== e.id.length)
      )
    }
    function readLocalVisitorData() {
      var e = xe_readCookie('xe_visitor')
      return (xe_isset(e, 'string') && e.length > 5 && validJSONString(e)) ||
        ('function' == typeof xe_getLS &&
          ((e = xe_getLS('xe_visitor')),
          xe_isset(e, 'string') && e.length > 5 && validJSONString(e)))
        ? e
        : ''
    }
    function fillInfo(e, t) {
      if (!xe_isset(e, 'string')) return !1
      var i = !1,
        r = !1
      if (((t = xe_isset(t, 'number') ? t : sources.tunnel), validJSONString(e))) {
        try {
          i = JSON.parse(e)
        } catch (e) {
          i = !1
        }
        if (i) {
          switch (t) {
            case sources.vtrk:
              ;(xe_isset(i.visitor_id, 'string') &&
                /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(
                  i.visitor_id,
                ) &&
                (i.id = i.visitor_id),
                (that.semaphores.tunnel = !1),
                (that.semaphores.local = !1),
                (VISITOR.source = t))
              break
            case sources.local:
            case sources.tunnel:
              ;(t === sources.tunnel &&
                (i.id && delete i.id,
                VISITOR.source !== sources.tunnel &&
                '' === VISITOR.email &&
                i.email &&
                validEmailAddress(i.email)
                  ? (r = !0)
                  : i.email && delete i.email),
                i.source < sources.tunnel && (i.source = t))
          }
          for (const e in i) i.hasOwnProperty(e) && (VISITOR[e] = i[e])
          ;(r && ((VISITOR.fireEvent = !0), (that.semaphores.tunnel = !1)), saveInfo(!1))
        }
      }
      if (!i) {
        if (t === sources.tunnel && validVisitorID(VISITOR)) return !1
        ;(buildVisitorData(), saveInfo(!1))
      }
      return i
    }
    function saveInfo(e) {
      e = !(!e || !xe_isset(e, 'boolean')) && e
      var t = !1,
        i = !!xe_isset(VISITOR, 'object') && VISITOR
      if ((buildVisitorData(), i)) {
        ;(validEmailAddress(i.email) && ((VISITOR.email = i.email), (t = !0)),
          validVisitorID(i.id) && (VISITOR.id = i.id),
          i.source && (VISITOR.source = i.source))
        for (const e in _VISITOR) i.hasOwnProperty(e) && delete i[e]
        for (const e in i) i.hasOwnProperty(e) && (VISITOR[e] = i[e])
      }
      return (
        VISITOR.fireEvent &&
          (xe_core.fireEvent(that.events.EMAIL_INPUT, VISITOR), delete VISITOR.fireEvent),
        xe_setLS('xe_visitor', JSON.stringify(VISITOR), 720),
        t
          ? xe_createCookie('xe_visitor', JSON.stringify(VISITOR), 720, !0)
          : xe_createCookie('xe_visitor', JSON.stringify(VISITOR), 720),
        !0
      )
    }
    function validEmailAddress(e) {
      if (!xe_isset(e, 'string') || e.length <= 0) return !1
      return (
        (e = e.replace(/\s+/g, '')) &&
        /^([A-Za-z0-9_\-\.])+@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,7})$/.test(e)
      )
    }
    this.semaphores.local &&
      ((buff = readLocalVisitorData()),
      xe_isset(buff, 'string') && buff.length > 5
        ? fillInfo(buff, sources.local)
        : ((VISITOR.source = sources.none), saveInfo(!1)))
    var HOOK_DATA = {
        types: 'textemailtelefonecelularcellphone',
        events: {
          blur: function () {
            trkData(this.value, '')
          },
          onchange: function () {
            ;((xex_visitor.lfield = this),
              (xe_isset(xex_visitor.chgint) && !1 !== xex_visitor.chgint) ||
                (xex_visitor.chgint = window.setInterval(function () {
                  document.activeElement != xex_visitor.lfield &&
                    (window.clearInterval(xex_visitor.chgint),
                    (xex_visitor.chgint = !1),
                    trkData(xex_visitor.lfield.value, ''))
                }, 1500)))
          },
        },
      },
      PROCESS_DATA = {
        email: function (e, t) {
          if (validEmailAddress(e)) {
            var i = ['dXJsOi9yZXBvcnRzLw\x3d\x3d']
            ;(i.push(window.btoa('@:' + xe_config.DOMAIN.split('.')[0])), (e = e.toLowerCase()))
            for (var r = 0; r < i.length; r++) {
              var n = window.atob(i[r]),
                a = n.split(':')[0]
              switch (((n = n.split(':')[1]), a)) {
                case 'url':
                  if (window.location.href.indexOf(n) > -1) return !1
                  break
                case 'email':
                  if (e.indexOf(n) > -1)
                    return (
                      VISITOR.email.indexOf(n) > -1 && ((VISITOR.email = ''), saveInfo(!1)), !1
                    )
              }
            }
            return String(e)
          }
          return !1
        },
        cph: function (e, t) {
          if (!xe_isset(xex_visitor.trackCph) || !xex_visitor.trackCph) return !1
          return (
            (e = e.match(/\d+/g)),
            (e = Array.isArray(e) && e.length > 0 ? e.join([]) : ''),
            !!/^\(?(?:[14689][1-9]|2[12478]|3[1234578]|5[1345]|7[134579])\)? ?(?:[2-8]|9[1-9])[0-9]{3}\-?[0-9]{4}$/.test(
              e,
            ) && String(e)
          )
        },
        name: function (e, t) {
          return !1
        },
      }
    function trkData(e, t) {
      t = t && void 0 !== t ? t : ''
      var i = ''
      if ((e = 'string' == typeof e && '' != e && e))
        for (var r in PROCESS_DATA)
          if (
            !1 !== (i = PROCESS_DATA[r](String(e), String(t))) &&
            (!xe_isset(VISITOR[r]) || VISITOR[r] != i)
          )
            return ((VISITOR[r] = i), saveInfo(!1), fireInputChange(!0, 'EMAIL_INPUT'), !0)
      return !1
    }
    function fireInputChange(e, t) {
      t = t && void 0 !== t ? t : 'EMAIL_INPUT'
      var i = new Date()
      ;(e || 0 == that.lastFire || Math.round((i - that.lastFire) / 1e3) >= 3) &&
        ((that.lastFire = i),
        e && xe_isset(that.events[t]) && xe_core.fireEvent(that.events[t], VISITOR))
    }
    ;((this.hkINP = function (e, t) {
      function i(e, t, i) {
        t.addEventListener
          ? t.addEventListener(e, i, !1)
          : t.attachEvent && t.attachEvent('on' + e, i)
      }
      e = null != e && e
      var r = (t =
        null == t || 'function' != typeof t.querySelectorAll
          ? window.document
          : t).querySelectorAll('input')
      if (0 < r.length)
        for (var n = 0; n < r.length; n++) {
          var a = r[n],
            o = xe_isset(a.name) ? String(a.name) : ''
          o = xe_isset(a.id) ? o + String(a.id) : o
          var s = r[n].type.toLowerCase()
          HOOK_DATA.types.indexOf(s) > -1 &&
            !/(cartao|cc|card|credit|pagamento|pay|expiration|cvv|cvc|cid)/i.test(o) &&
            (trkData(a.value, ''),
            e &&
              navigator.cookieEnabled &&
              (this.hooks++,
              i('blur', a, HOOK_DATA.events.blur),
              i('change', a, HOOK_DATA.events.onchange)))
        }
    }),
      xe_core.hookEvent(
        XE_EVENTS.vars.ready,
        function (e) {
          ;(xe_core.requireExtension('datatunnel.js'),
            xe_createCookie(
              !1,
              'xe_gRPC',
              '{"oauth":1,"delay":300,"serialize":false,"lgpd":true}',
              1,
              !0,
            ),
            xe_createCookie(!1, 'xe_gRPC-ts', String(+new Date()), 1, !0),
            tunnedData(),
            xe_core.hookEvent(XE_EVENTS.vars.domready, function (e) {
              ;(that.hkINP(!0, window.document),
                -1 === that.popInterv.handle &&
                  (that.popInterv.handle = window.setInterval(function () {
                    ;(that.popInterv.count++,
                      that.popInterv.count > that.popInterv.max
                        ? window.clearInterval(that.popInterv.handle)
                        : that.hkINP(that.popInterv.count >= that.popInterv.max, window.document))
                  }, 1e3)))
              var t = (function () {
                  for (var e = ['WebKit', 'Moz', 'O', 'Ms', ''], t = 0; t < e.length; t++)
                    if (e[t] + 'MutationObserver' in window)
                      return window[e[t] + 'MutationObserver']
                  return !1
                })(),
                i = []
              function r(e, t) {
                ;((t = !(!t || void 0 === t) && t),
                  (e = window.btoa(e.trim().replace(/\s+/g, '-'))))
                var r = Math.round(new Date().getTime() / 1e3)
                if (t) return (i.push({ key: e, ts: r, hits: 0, blocked: !1 }), !0)
                for (var n = 0; n < i.length; n++)
                  if (i[n].key === e) {
                    if (i[n].blocked) return !0
                    i[n].hits++
                    var a = Math.floor(r - parseInt(i[n].ts, 10))
                    return a <= 2 && i[n].hits > 2
                      ? ((i[n].blocked = !0), !0)
                      : ((i[n].ts = r), a <= 2)
                  }
                return !1
              }
              t &&
                new t(function (e) {
                  e.forEach(function (e) {
                    ;[].slice.call(e.addedNodes).forEach(function (e) {
                      e.classList &&
                        e.classList.length > 0 &&
                        '' != e.classList.value &&
                        !r(e.classList.value, !1) &&
                        (r(e.classList.value, !0),
                        window.setTimeout(function () {
                          that.hkINP(!0, e)
                        }, 3e3))
                    })
                  })
                }).observe(document, {
                  childList: !0,
                  subtree: !0,
                  characterData: !1,
                  attributes: !0,
                })
            }))
        },
        9,
      ),
      xe_core.createService('saveVisitorInfo', function () {
        saveInfo(!0)
      }),
      xe_core.createService('visitorInfo', function () {
        var args = Array.prototype.slice.call(arguments),
          VISITOR_COPY = VISITOR
        let cph = xe_isset(VISITOR_COPY.cph) ? VISITOR_COPY.cph : ''
        if ('' != cph) {
          let buff = ''
          if (void 0 !== args && xe_isset(args[0], 'string') && eval(args[0]))
            for (let e = 0; e < cph.length; e++) {
              const t = cph.charCodeAt(e),
                i = 'cph'.charCodeAt(e % 3),
                r = t ^ i
              buff += String.fromCharCode(r)
            }
          VISITOR_COPY.cph =
            ('' === buff ? '0' : '1').toString() +
            ('' === buff ? window.btoa(xe_getCacheTS()) : window.btoa(buff)).toString()
        }
        return VISITOR_COPY
      }))
  },
  xex_visitor = new xex_visitor_Class()
