var xex_pulse_Class = function () {
    var t = this
    ;((this.ns = 'PULSE'), (this.VERSION = '1.0.26'))
    var e = !1,
      r = { status: 'pending', kind: '', url: '', ts: 0 }
    this.modifier = ''
    const n = {
      pvw: { lb_count: 2, last_transport: 0 },
      pht: { lb_count: 8, last_transport: 0 },
      pev: { lb_count: 3, last_transport: 0 },
      trk: { lb_count: 2, last_transport: 0 },
    }
    function i(t) {
      const e = ['atlas', 'lumen', 'nova', 'orion', 'stark', 'razor', 'vesta', 'zenith']
      for (var r = [], i = Math.min(n[t].lb_count || 1, e.length), o = 0; o < i; o++)
        r.push('https://' + e[o] + '.' + t + '.conectiva.io')
      return r.length ? r : null
    }
    this.events = { PULSE_ACTIVATED: xe_core.createEvent(t.ns + '_ACTIVATED', null, !0, !1) }
    const o = 'cnt-pulse_',
      c = o + 'lb-hrw',
      u = 6e5,
      a = 800,
      s = 700,
      l = 900,
      d = 864e5,
      f = 'hlt',
      v = 1200,
      p = 300,
      h = 2e3,
      m = 18e4,
      g = o + 'kal_timer',
      _ = o + 'sid_fs',
      w = o + 'vst',
      y = 1 / 24,
      b = 2 / 24,
      S = 2e3,
      k = 2e3,
      I = 1200,
      C = o + 'dedupe_event_map',
      x = o + 'dedupe_action_map',
      N = o + 'eps_health_'
    var L = {},
      A = function () {
        return Date.now()
      },
      R = function (t) {
        return Math.random()
          .toString(16)
          .slice(2, 2 + t)
      },
      O = function () {
        return [R(8), R(4), R(4), R(4), R(12)].join('-')
      }
    function U(t) {
      var e,
        r = 0
      if (!t) return '0'
      for (e = 0; e < t.length; e++) ((r = (r << 5) - r + t.charCodeAt(e)), (r |= 0))
      return (r >>> 0).toString(16)
    }
    function j(t) {
      var e,
        r,
        n = 2166136261
      if (!t) return '0'
      for (e = 0; e < t.length; e++)
        ((n ^= 255 & (r = t.charCodeAt(e))),
          (n = Math.imul(n, 16777619)),
          r > 255 && ((n ^= (r >>> 8) & 255), (n = Math.imul(n, 16777619))))
      return (
        (n ^= n >>> 16),
        (n = Math.imul(n, 2246822507)),
        (n ^= n >>> 13),
        (n = Math.imul(n, 3266489909)),
        ((n ^= n >>> 16) >>> 0).toString(16)
      )
    }
    var E = (function () {
      var t = 0
      try {
        navigator && !0 === navigator.webdriver && (t |= 1)
      } catch (t) {}
      try {
        for (
          var e = [
              '_phantom',
              'callPhantom',
              '__nightmare',
              '_selenium',
              'callSelenium',
              '__webdriver_script_fn',
            ],
            r = 0;
          r < e.length;
          r++
        )
          if (e[r] in window) {
            t |= 2
            break
          }
      } catch (t) {}
      return { version: 1, mask: t }
    })()
    function P(t) {
      return N + t
    }
    function q(t) {
      var e = L[t]
      if (void 0 !== e) return e
      var r = xe_getLS(P(t))
      if (!r || 'null' === r) return ((L[t] = null), null)
      try {
        var n = JSON.parse(r),
          o = Number((n && n.ts) || 0),
          c = i(t) || []
        return !o || A() - o > d
          ? ((L[t] = null), null)
          : (function (t, e) {
                if (!Array.isArray(t) || !Array.isArray(e)) return !1
                if (t.length !== e.length) return !1
                for (var r = 0; r < t.length; r++) if (t[r] !== e[r]) return !1
                return !0
              })(n.eps || [], c) &&
              Array.isArray(n.ok) &&
              n.ok.length
            ? ((L[t] = n), n)
            : ((L[t] = null), null)
      } catch (e) {
        return ((L[t] = null), null)
      }
    }
    function T(t, e) {
      if (!n[t]) return null
      var r = (function (t, e) {
        if (!e || !e.length) return e
        var r = q(t)
        if (!r || !Array.isArray(r.ok) || !r.ok.length) return e
        for (var n = {}, i = 0; i < r.ok.length; i++) n[r.ok[i]] = !0
        for (var o = [], c = 0; c < e.length; c++) n[e[c]] && o.push(e[c])
        return o.length ? o : e
      })(t, i(t))
      if (!r || !r.length) return null
      for (
        var o = Math.floor(A() / u),
          a = (function (t) {
            if (t && t.vid) return 'vid:' + String(t.vid)
            if (t && t.dg) return 'dg:' + String(t.dg)
            if (t && t.sid) return 'sid:' + String(t.sid)
            var e = xe_getLS(c)
            return ((e && 'null' !== e) || ((e = O()), xe_setLS(c, e, 365)), 'ls:' + e)
          })(e),
          s = t + '|' + a + '|' + o,
          l = [],
          d = 0;
        d < r.length;
        d++
      ) {
        var f = r[d],
          v = j(s + '|' + f + '|' + d),
          p = parseInt(v, 16) || 0
        l.push([f, p])
      }
      l.sort(function (t, e) {
        return t[1] === e[1] ? (t[0] < e[0] ? -1 : t[0] > e[0] ? 1 : 0) : e[1] - t[1]
      })
      for (var h = [], m = 0; m < l.length; m++) h.push(l[m][0])
      return h
    }
    function V(t) {
      if (null == t) return t
      if (Array.isArray(t)) {
        for (var e = [], r = 0; r < t.length; r++) e.push(V(t[r]))
        return e
      }
      if (t && 'object' == typeof t) {
        for (var n = t, i = Object.keys(n).sort(), o = {}, c = 0; c < i.length; c++)
          o[i[c]] = V(n[i[c]])
        return o
      }
      return t
    }
    function M(t) {
      if (null == t) return ''
      if ('string' == typeof t) return 's:' + t
      if ('number' == typeof t || 'boolean' == typeof t) return 'p:' + String(t)
      if ('object' == typeof t)
        try {
          return 'o:' + JSON.stringify(V(t))
        } catch (t) {
          return 'o:[unserializable]'
        }
      return 'x:' + String(t)
    }
    function F(t, e) {
      try {
        xe_setLS(t, JSON.stringify(e || {}), y)
      } catch (t) {}
    }
    function z(t, e, r, n) {
      var i = []
      for (var o in t)
        if (Object.prototype.hasOwnProperty.call(t, o)) {
          var c = Number(t[o] || 0)
          !isFinite(c) || c <= 0 || (e - c <= r && i.push([o, c]))
        }
      i.length > n &&
        (i.sort(function (t, e) {
          return t[1] - e[1]
        }),
        (i = i.slice(i.length - n)))
      for (var u = {}, a = 0; a < i.length; a++) u[i[a][0]] = i[a][1]
      return u
    }
    function B(t, e, r, n) {
      var i = (function (t) {
        var e = xe_getLS(t)
        if (!e || 'null' === e) return {}
        try {
          var r = JSON.parse(e)
          if (r && 'object' == typeof r && !Array.isArray(r)) return r
        } catch (t) {}
        return {}
      })(t)
      i = z(i, r, n, I)
      var o = Number(i[e] || 0)
      return isFinite(o) && o > 0 && r - o < n
        ? ((i[e] = r), F(t, i), !0)
        : ((i[e] = r), F(t, (i = z(i, r, n, I))), !1)
    }
    !(function () {
      try {
        if (!window.localStorage) return
        for (
          var t = o + 'event_dedupe_', e = o + 'action_dedupe_', r = localStorage.length - 1;
          r >= 0;
          r--
        ) {
          var n = localStorage.key(r)
          n && ((0 !== n.indexOf(t) && 0 !== n.indexOf(e)) || localStorage.removeItem(n))
        }
      } catch (t) {}
    })()
    const J = 700,
      H = 8,
      D = 90,
      $ = o + 'attr_last_touch',
      G = o + 'attr_first_touch'
    var Z = [
        'sku',
        'id',
        'pid',
        'product',
        'product_id',
        'variant',
        'variation',
        'v',
        'ref',
        'code',
        'variant_id',
        'product_variant',
        'item_id',
        'item_variant',
        'item_group_id',
        'gtin',
      ],
      W = [
        'gclid',
        'fbclid',
        'msclkid',
        'yclid',
        'ttclid',
        'gbraid',
        'wbraid',
        'gad_source',
        'gad_campaignid',
        'gad_adgroupid',
        'gad_creativeid',
        '_ga',
        '_gid',
        '_gac',
        '_gl',
        '_fbp',
        '_fbc',
        'mc_cid',
        'mc_eid',
      ],
      X = ['gclid', 'fbclid', 'msclkid', 'ttclid', 'gbraid', 'wbraid', 'yclid', 'dclid', 'igclid']
    function Y(t, e) {
      return t && e && t.slice(0, e.length) === e
    }
    function K(t, e) {
      for (var r = 0; r < t.length; r++) if (t[r] === e) return !0
      return !1
    }
    function Q(t) {
      try {
        return decodeURIComponent((t || '').replace(/\+/g, ' '))
      } catch (e) {
        return (t || '').replace(/\+/g, ' ')
      }
    }
    function tt(t) {
      try {
        return encodeURIComponent(null == t ? '' : String(t))
      } catch (e) {
        return '' + (null == t ? '' : t)
      }
    }
    function et(t) {
      var e = t || ''
      if (!e) return []
      if (('?' === e.charAt(0) && (e = e.slice(1)), !e)) return []
      for (var r = e.split('\x26'), n = [], i = 0; i < r.length; i++) {
        var o = r[i]
        if (o) {
          var c = o.indexOf('\x3d'),
            u = c >= 0 ? o.slice(0, c) : o,
            a = c >= 0 ? o.slice(c + 1) : ''
          ;(u = Q(u).trim()) && ((a = Q(a)), n.push([u, a]))
        }
      }
      return n
    }
    function rt(t) {
      return (t = ee(t).toLowerCase()) ? (Y(t, 'www.') && (t = t.slice(4)), t) : ''
    }
    function nt(t, e, r) {
      var n = ee(t)
      return n
        ? (r && (n = n.toLowerCase()),
          (n = (n = n.replace(/[|]/g, '_')).replace(/\s+/g, ' ').trim()),
          e > 0 && n.length > e && (n = n.slice(0, e)),
          n)
        : ''
    }
    function it(t) {
      for (var e = 0; e < X.length; e++) if (X[e] === t) return !0
      return !1
    }
    function ot() {
      for (
        var t = (function () {
            var t = et(location.search || ''),
              e = location.hash || ''
            if (e && e.length > 1)
              if (Y(e, '#/')) {
                var r = e.slice(1),
                  n = r.indexOf('?')
                n >= 0 && (t = t.concat(et(r.slice(n + 1))))
              } else if (Y(e, '#!/')) {
                var i = e.slice(2),
                  o = i.indexOf('?')
                o >= 0 && (t = t.concat(et(i.slice(o + 1))))
              }
            return t
          })(),
          e = {
            source: '',
            medium: '',
            campaign: '',
            term: '',
            content: '',
            utm_id: '',
            click_id_type: '',
            has_signal: !1,
          },
          r = 0;
        r < t.length;
        r++
      ) {
        var n = ee(t[r][0]).toLowerCase(),
          i = ee(t[r][1])
        n &&
          i &&
          ('utm_source' === n
            ? ((e.source = nt(i, 80, !0)), (e.has_signal = !0))
            : 'utm_medium' === n
              ? ((e.medium = nt(i, 80, !0)), (e.has_signal = !0))
              : 'utm_campaign' === n
                ? ((e.campaign = nt(i, 160, !0)), (e.has_signal = !0))
                : 'utm_term' === n
                  ? ((e.term = nt(i, 160, !0)), (e.has_signal = !0))
                  : 'utm_content' === n
                    ? ((e.content = nt(i, 160, !0)), (e.has_signal = !0))
                    : 'utm_id' === n
                      ? ((e.utm_id = nt(i, 120, !0)), (e.has_signal = !0))
                      : !e.click_id_type && it(n) && ((e.click_id_type = n), (e.has_signal = !0)))
      }
      return (function (t) {
        if (!t.click_id_type) return t
        if (t.source && t.medium) return t
        var e = t.click_id_type
        return (
          t.source ||
            ('gclid' === e || 'gbraid' === e || 'wbraid' === e
              ? (t.source = 'google')
              : 'msclkid' === e
                ? (t.source = 'bing')
                : 'fbclid' === e || 'igclid' === e
                  ? (t.source = 'facebook')
                  : 'ttclid' === e && (t.source = 'tiktok')),
          t.medium ||
            (t.medium = 'fbclid' === e || 'igclid' === e || 'ttclid' === e ? 'paid_social' : 'cpc'),
          t
        )
      })(e)
    }
    function ct(t) {
      var e = xe_getLS(t)
      if (!e || 'null' === e) return null
      try {
        var r = JSON.parse(e)
        return r && 'object' == typeof r
          ? {
              source: nt(r.source, 80, !0),
              medium: nt(r.medium, 80, !0),
              campaign: nt(r.campaign, 160, !0),
              term: nt(r.term, 160, !0),
              content: nt(r.content, 160, !0),
              utm_id: nt(r.utm_id, 120, !0),
              click_id_type: nt(r.click_id_type, 24, !0),
              referrer_host: nt(r.referrer_host, 120, !0),
              channel_group: nt(r.channel_group, 40, !0),
            }
          : null
      } catch (t) {
        return null
      }
    }
    function ut(t, e) {
      try {
        xe_setLS(t, JSON.stringify(e || {}), D)
      } catch (t) {}
    }
    function at(t) {
      t = t || {}
      try {
        xe_setLS(
          w,
          JSON.stringify({
            fs: isFinite(t.fs) && t.fs > 0 ? Math.floor(t.fs) : 0,
            ls: isFinite(t.ls) && t.ls > 0 ? Math.floor(t.ls) : 0,
            csid: ee(t.csid),
            cvt: ee(t.cvt).toLowerCase(),
            clv: isFinite(t.clv) && t.clv > 0 ? Math.floor(t.clv) : 0,
            cra: isFinite(t.cra) && t.cra > 0 ? Math.floor(t.cra) : 0,
          }),
        )
      } catch (t) {}
    }
    function st(t) {
      var e = {
        source: nt((t = t || {}).source, 80, !0) || '(direct)',
        medium: nt(t.medium, 80, !0) || '(none)',
        campaign: nt(t.campaign, 160, !0) || '-',
        term: nt(t.term, 160, !0) || '-',
        content: nt(t.content, 160, !0) || '-',
        utm_id: nt(t.utm_id, 120, !0) || '-',
        click_id_type: nt(t.click_id_type, 24, !0) || '-',
        referrer_host: nt(t.referrer_host, 120, !0) || '-',
      }
      return (
        (e.channel_group = (function (t, e, r, n) {
          var i = nt(t, 80, !0),
            o = nt(e, 80, !0),
            c = nt(r, 24, !0),
            u = nt(n, 120, !0)
          return '(none)' === o || '(direct)' === i
            ? 'direct'
            : 'email' === o
              ? 'email'
              : 'affiliate' === o || 'affiliates' === o
                ? 'affiliate'
                : 'display' === o || 'banner' === o || 'cpm' === o || 'programmatic' === o
                  ? 'display'
                  : 'organic' === o
                    ? 'organic_search'
                    : 'referral' === o || u
                      ? 'referral'
                      : 'paid_social' === o ||
                          Y(o, 'social_paid') ||
                          'fbclid' === c ||
                          'ttclid' === c ||
                          'igclid' === c
                        ? 'paid_social'
                        : 'social' === o || 'organic_social' === o
                          ? 'organic_social'
                          : 'cpc' === o ||
                              'ppc' === o ||
                              'paidsearch' === o ||
                              'paid_search' === o ||
                              'gclid' === c ||
                              'msclkid' === c ||
                              'gbraid' === c ||
                              'wbraid' === c ||
                              'dclid' === c
                            ? 'paid_search'
                            : 'other'
        })(e.source, e.medium, e.click_id_type, e.referrer_host)),
        e
      )
    }
    function lt() {
      var t,
        e,
        r = (function () {
          try {
            var t = ee(document.referrer || '')
            if (!t) return ''
            var e = ''
            try {
              e = new URL(t).hostname || ''
            } catch (n) {
              var r = document.createElement('a')
              ;((r.href = t), (e = r.hostname || ''))
            }
            e = rt(e)
            var n = rt(location.hostname || '')
            return e && e !== n ? e : ''
          } catch (t) {
            return ''
          }
        })(),
        n = ot(),
        i = ct($),
        o = ct(G),
        c = null
      return n.has_signal
        ? ((t = (t = i) || {}),
          ((c = {
            source: (e = (e = n) || {}).source || t.source || '',
            medium: e.medium || t.medium || '',
            campaign: e.campaign || t.campaign || '',
            term: e.term || t.term || '',
            content: e.content || t.content || '',
            utm_id: e.utm_id || t.utm_id || '',
            click_id_type: e.click_id_type || t.click_id_type || '',
            referrer_host: e.referrer_host || t.referrer_host || '',
          }).referrer_host = r || c.referrer_host || ''),
          c.source || (c.source = '(unknown)'),
          c.medium || (c.medium = '(unknown)'),
          (c = st(c)),
          ut($, c),
          o || ut(G, c),
          c)
        : r && !i
          ? ((c = st({ source: r, medium: 'referral', referrer_host: r })),
            ut($, c),
            o || ut(G, c),
            c)
          : i
            ? (c = st(i))
            : ((c = st({ source: '(direct)', medium: '(none)', referrer_host: r || '' })),
              o || ut(G, c),
              c)
    }
    function dt() {
      try {
        var t = location.pathname || '/',
          e = location.search || '',
          r = location.hash || '',
          n = t
        r && r.length > 1 && (Y(r, '#/') ? (n = r.slice(1)) : Y(r, '#!/') && (n = r.slice(2)))
        var i = n,
          o = '',
          c = n.indexOf('?')
        c >= 0 && ((i = n.slice(0, c) || '/'), (o = n.slice(c + 1)))
        var u = et(e)
        if (o) {
          var a = et(o)
          a && a.length && (u = u.concat(a))
        }
        if (!u.length) {
          var s = i
          return ('/' === s && (s = 'homepage'), s.length > J && (s = s.slice(0, J)), s)
        }
        for (var l = [], d = 0; d < u.length; d++) {
          var f = (u[d][0] || '').toLowerCase(),
            v = u[d][1]
          if (
            f &&
            !K(W, f) &&
            !Y(f, 'utm_') &&
            K(Z, f) &&
            (null == v && (v = ''), (v = String(v)), l.push([f, v]), l.length >= H)
          )
            break
        }
        if (!l.length) {
          var p = i
          return ('/' === p && (p = 'homepage'), p.length > J && (p = p.slice(0, J)), p)
        }
        l.sort(function (t, e) {
          return t[0] < e[0] ? -1 : t[0] > e[0] ? 1 : t[1] < e[1] ? -1 : t[1] > e[1] ? 1 : 0
        })
        for (var h = '', m = 0; m < l.length; m++)
          (m && (h += '\x26'), (h += tt(l[m][0]) + '\x3d' + tt(l[m][1])))
        var g = i + '?' + h
        return (g.length > J && (g = g.slice(0, J)), g)
      } catch (t) {
        var _ = (location.pathname || '/') + (location.search || ''),
          w = location.hash || ''
        return (
          w && w.length > 1 && (Y(w, '#/') ? (_ = w.slice(1)) : Y(w, '#!/') && (_ = w.slice(2))),
          '/' === _ && (_ = 'homepage'),
          _.length > J && (_ = _.slice(0, J)),
          _
        )
      }
    }
    function ft(t, e) {
      return 'function' != typeof fetch
        ? Promise.resolve(!1)
        : new Promise(function (r) {
            var n = !1,
              i = e || l,
              o = 'AbortController' in window ? new AbortController() : null,
              c = setTimeout(function () {
                if (!n) {
                  n = !0
                  try {
                    o && o.abort()
                  } catch (t) {}
                  r(!1)
                }
              }, i)
            fetch(t + '/' + f, {
              method: 'GET',
              credentials: 'omit',
              mode: 'cors',
              cache: 'no-store',
              signal: o ? o.signal : void 0,
            })
              .then(function (t) {
                n || ((n = !0), clearTimeout(c), r(!(!t || !t.ok)))
              })
              .catch(function () {
                n || ((n = !0), clearTimeout(c), r(!1))
              })
          })
    }
    function vt(t) {
      if (q(t)) return Promise.resolve(!0)
      var e = i(t)
      if (!e || !e.length) return Promise.resolve(!1)
      for (var r = [], n = 0; n < e.length; n++)
        !(function (t) {
          r.push(
            ft(t, l).then(function (e) {
              return { ep: t, ok: e }
            }),
          )
        })(e[n])
      return Promise.all(r)
        .then(function (r) {
          for (var n = [], i = [], o = 0; o < r.length; o++)
            r[o] && r[o].ok ? n.push(r[o].ep) : r[o] && i.push(r[o].ep)
          return (
            n.length &&
              (function (t, e) {
                ;(((e = e || {}).ts = A()), (L[t] = e))
                try {
                  xe_setLS(P(t), JSON.stringify(e), 1)
                } catch (t) {}
              })(t, { eps: e, ok: n, bad: i }),
            n.length > 0
          )
        })
        .catch(function () {
          return !1
        })
    }
    function pt() {
      for (
        var t = (function () {
            var t = []
            for (var e in n) Object.prototype.hasOwnProperty.call(n, e) && t.push(e)
            return t
          })(),
          e = [],
          r = 0;
        r < t.length;
        r++
      )
        e.push(vt(t[r]))
      return Promise.all(e).catch(function () {})
    }
    function ht(t) {
      return new Promise(function (e) {
        setTimeout(e, t)
      })
    }
    function mt(t) {
      return t ? Math.max(0, t - A()) : v
    }
    var gt = xe_getLS(o + 'sid'),
      _t = parseInt(xe_getLS(o + 'sid_time') || '0', 10),
      wt = A(),
      yt = !gt || wt - _t > 18e5
    ;((gt && !yt) || (gt = O()),
      xe_setLS(o + 'sid', gt, b),
      xe_setLS(o + 'sid_time', String(wt), b))
    var bt = O(),
      St = parseInt(xe_getLS(_) || '0', 10),
      kt = isFinite(St) && St > 0,
      It = kt ? St : wt,
      Ct = kt ? 1 : 0
    kt || xe_setLS(_, String(It))
    var xt = (function () {
      var t = xe_getLS(w)
      if (!t || 'null' === t) return { fs: 0, ls: 0, csid: '', cvt: '', clv: 0, cra: 0 }
      try {
        var e = JSON.parse(t),
          r = parseInt(e && e.fs, 10),
          n = parseInt(e && e.ls, 10),
          i = parseInt(e && e.clv, 10),
          o = parseInt(e && e.cra, 10)
        return {
          fs: isFinite(r) && r > 0 ? r : 0,
          ls: isFinite(n) && n > 0 ? n : 0,
          csid: ee(e && e.csid),
          cvt: ee(e && e.cvt).toLowerCase(),
          clv: isFinite(i) && i > 0 ? i : 0,
          cra: isFinite(o) && o > 0 ? o : 0,
        }
      } catch (t) {
        return { fs: 0, ls: 0, csid: '', cvt: '', clv: 0, cra: 0 }
      }
    })()
    !xt.fs && kt && (xt.fs = It)
    var Nt = null,
      Lt = null
    if (yt) {
      var At = xt.fs > 0 || kt ? 'returning' : 'new',
        Rt = xt.fs > 0 ? xt.fs : It,
        Ot = xt.ls > 0 ? xt.ls : 0,
        Ut = Ot > 0 ? Math.max(0, Math.floor((wt - Ot) / 1e3)) : 0
      ;((Nt = Lt =
        { visitor_type: At, first_seen_ts_ms: Rt, last_visit_ts_ms: Ot, return_after_sec: Ut }),
        (xt.fs = Rt),
        (xt.ls = wt),
        (xt.csid = gt),
        (xt.cvt = At),
        (xt.clv = Ot),
        (xt.cra = Ut),
        at(xt))
    } else
      xt.csid !== gt || ('new' !== xt.cvt && 'returning' !== xt.cvt)
        ? ((Lt = {
            visitor_type: Ct ? 'returning' : 'new',
            first_seen_ts_ms: xt.fs > 0 ? xt.fs : It,
            last_visit_ts_ms: 0,
            return_after_sec: 0,
          }),
          (xt.csid = gt),
          (xt.cvt = Lt.visitor_type),
          (xt.clv = 0),
          (xt.cra = 0),
          at(xt))
        : (Lt = {
            visitor_type: xt.cvt,
            first_seen_ts_ms: xt.fs > 0 ? xt.fs : It,
            last_visit_ts_ms: xt.clv || 0,
            return_after_sec: xt.cra || 0,
          })
    function jt(t, e, r, n) {
      var i = 0,
        o = T(t, r)
      o &&
        o.length &&
        (function t() {
          if (!(i >= o.length)) {
            var c = o[i] + '/' + e
            try {
              if (
                (function (t, e) {
                  try {
                    if (navigator.sendBeacon) {
                      var r = new Blob([JSON.stringify(e)], { type: 'text/plain' })
                      return navigator.sendBeacon(t, r)
                    }
                  } catch (t) {}
                  return !1
                })(c, r)
              )
                return
            } catch (t) {}
            ;(async function (t, e, r) {
              if ('function' != typeof fetch) return !1
              var n = 'AbortController' in window ? new AbortController() : null,
                i = null
              n &&
                (i = setTimeout(function () {
                  try {
                    n.abort()
                  } catch (t) {}
                }, r || a))
              try {
                return (
                  await fetch(t, {
                    method: 'POST',
                    headers: { 'Content-Type': 'text/plain' },
                    body: JSON.stringify(e),
                    keepalive: !0,
                    credentials: 'omit',
                    mode: 'no-cors',
                    cache: 'no-store',
                    signal: n ? n.signal : void 0,
                  }),
                  !0
                )
              } catch (t) {
                return !1
              } finally {
                i && clearTimeout(i)
              }
            })(c, r, a).then(function (e) {
              var r, o, u
              e ||
                ((r = c),
                (o = n),
                (u = s),
                new Promise(function (t) {
                  try {
                    var e = new Image(),
                      n = !1,
                      i = setTimeout(function () {
                        n || ((n = !0), t(!1))
                      }, u || s)
                    ;((e.onload = function () {
                      n || ((n = !0), clearTimeout(i), t(!0))
                    }),
                      (e.onerror = function () {
                        n || ((n = !0), clearTimeout(i), t(!1))
                      }),
                      (e.src = r + '?' + o))
                  } catch (e) {
                    t(!1)
                  }
                })).then(function (e) {
                  e || (i++, t())
                })
            })
          }
        })()
    }
    function Et(t, e, r, n, i) {
      var o = T(t, r)
      if (!o || !o.length) return Promise.resolve({ ok: !1, url: '' })
      var c = 0
      return (function t() {
        if (c >= o.length) return Promise.resolve({ ok: !1, url: '' })
        var u = mt(i)
        if (i && u <= 0) return Promise.resolve({ ok: !1, url: '' })
        var s = o[c] + '/' + e
        return (function (t, e, r, n) {
          if ('function' != typeof fetch) return Promise.resolve(!1)
          var i = 'AbortController' in window ? new AbortController() : null,
            o = null
          return (
            i &&
              (o = setTimeout(function () {
                try {
                  i.abort()
                } catch (t) {}
              }, n || a)),
            fetch(t, {
              method: 'POST',
              headers: { 'Content-Type': 'text/plain' },
              body: JSON.stringify(e),
              keepalive: !0,
              credentials: 'omit',
              mode: 'cors',
              cache: 'no-store',
              signal: i ? i.signal : void 0,
            })
              .then(function (t) {
                if (!t || !t.ok) return !1
                if (r && t.headers && 'function' == typeof t.headers.get) {
                  var e = t.headers.get(r)
                  if (e && 'drop' === String(e).toLowerCase()) return !1
                }
                return !0
              })
              .catch(function () {
                return !1
              })
              .then(function (t) {
                return (o && clearTimeout(o), t)
              })
          )
        })(s, r, n, Math.min(v, u || v)).then(function (e) {
          if (e) return { ok: !0, url: s }
          if (++c >= o.length) return t()
          var r = Math.min(p * c, h)
          return (i && (r = Math.min(r, mt(i))), ht(r).then(t))
        })
      })()
    }
    function Pt() {
      return {
        dm: xe_config && xe_config.DOMAIN ? String(xe_config.DOMAIN) : '',
        dg: xe_config && xe_config.GUID ? String(xe_config.GUID) : '',
        ts: A(),
        bsv: E.version,
        bs: E.mask,
      }
    }
    function qt() {
      var t = Pt()
      return ((t.vid = (xe_core.callService('visitorInfo') || {}).id || ''), t)
    }
    function Tt() {
      var e = qt()
      ;((e.md = (function (t) {
        if (null == t) return ''
        if ('boolean' == typeof t) return ''
        var e = ee(t)
        if (!e) return ''
        var r = e.toLowerCase()
        if ('false' === r || 'null' === r || 'undefined' === r || 'nan' === r) return ''
        if (!(e = e.replace(/[^A-Za-z0-9_-]/g, ''))) return ''
        e.length > 20 && (e = e.slice(0, 20))
        return e
      })(t && null != t.modifier ? t.modifier : '')),
        (e.pv_id = bt),
        (e.sid = gt),
        (e.ns = yt ? 1 : 0),
        (e.rv = Ct))
      var r = (function () {
        var t = lt()
        return {
          us: t.source,
          um: t.medium,
          uc: t.campaign,
          ut: t.term,
          uco: t.content,
          ui: t.utm_id,
          ct: t.click_id_type,
          rf: t.referrer_host,
          cg: t.channel_group,
        }
      })()
      return (
        (e.us = r.us),
        (e.um = r.um),
        (e.uc = r.uc),
        (e.ut = r.ut),
        (e.uco = r.uco),
        (e.ui = r.ui),
        (e.ct = r.ct),
        (e.rf = r.rf),
        (e.cg = r.cg),
        e
      )
    }
    function Vt() {
      var t = Pt()
      return ((t.pv_id = bt), t)
    }
    function Mt() {
      var t = Tt()
      if (t.dg && t.dm && t.vid) {
        t.pn = dt()
        var e =
          'dg\x3d' +
          encodeURIComponent(t.dg) +
          '\x26dm\x3d' +
          encodeURIComponent(t.dm) +
          '\x26pn\x3d' +
          encodeURIComponent(t.pn) +
          '\x26pv_id\x3d' +
          encodeURIComponent(t.pv_id) +
          '\x26ts\x3d' +
          t.ts +
          '\x26vid\x3d' +
          encodeURIComponent(t.vid) +
          '\x26sid\x3d' +
          encodeURIComponent(t.sid) +
          '\x26ns\x3d' +
          (0 | t.ns) +
          '\x26bsv\x3d' +
          (0 | t.bsv) +
          '\x26bs\x3d' +
          (0 | t.bs)
        ;(1 == (0 | t.ns) && (e += '\x26rv\x3d' + (0 | t.rv)),
          t.md && (e += '\x26md\x3d' + encodeURIComponent(t.md)),
          t.us && '-' !== t.us && (e += '\x26us\x3d' + encodeURIComponent(t.us)),
          t.um && '-' !== t.um && (e += '\x26um\x3d' + encodeURIComponent(t.um)),
          t.uc && '-' !== t.uc && (e += '\x26uc\x3d' + encodeURIComponent(t.uc)),
          t.ut && '-' !== t.ut && (e += '\x26ut\x3d' + encodeURIComponent(t.ut)),
          t.uco && '-' !== t.uco && (e += '\x26uco\x3d' + encodeURIComponent(t.uco)),
          t.ui && '-' !== t.ui && (e += '\x26ui\x3d' + encodeURIComponent(t.ui)),
          t.ct && '-' !== t.ct && (e += '\x26ct\x3d' + encodeURIComponent(t.ct)),
          t.rf && '-' !== t.rf && (e += '\x26rf\x3d' + encodeURIComponent(t.rf)),
          t.cg && '-' !== t.cg && (e += '\x26cg\x3d' + encodeURIComponent(t.cg)),
          jt('pht', 'ins', t, e))
      }
    }
    function Ft() {
      var t = qt()
      t.dg &&
        t.dm &&
        t.vid &&
        ((t.sid = gt),
        jt(
          'pht',
          'kal',
          t,
          'dg\x3d' +
            encodeURIComponent(t.dg) +
            '\x26dm\x3d' +
            encodeURIComponent(t.dm) +
            '\x26vid\x3d' +
            encodeURIComponent(t.vid) +
            '\x26sid\x3d' +
            encodeURIComponent(t.sid) +
            '\x26bsv\x3d' +
            (0 | t.bsv) +
            '\x26bs\x3d' +
            (0 | t.bs),
        ))
    }
    function zt(n, i, o) {
      ;((e = 'active' === n),
        (r = { status: n, kind: i || '', url: o || '', ts: A() }),
        (function () {
          try {
            if (!xe_core || 'function' != typeof xe_core.fireEvent) return
            if (!t.events || !t.events[t.ns + '_ACTIVATED']) return
            xe_core.fireEvent(t.events[t.ns + '_ACTIVATED'], !!e)
          } catch (t) {}
        })())
    }
    function Bt(t) {
      t &&
        ('pht' !== t && Mt(),
        (function () {
          if (!yt || !Nt) return
          ;(Jt('session/start', Nt),
            Ht(
              'session/start',
              'visitor',
              Nt.visitor_type || 'new',
              Number(Nt.return_after_sec || 0),
            ))
        })(),
        Kt())
    }
    async function Jt(t, r) {
      if (e && xe_isset(t, 'string')) {
        var n = re(t)
        if (n) {
          var i = Tt()
          if (i.dg && i.dm && i.vid) {
            r = r || {}
            var o = U((i.dg || '') + '|' + (i.sid || '') + '|' + n + '|' + M(r))
            if (!B(C, o, i.ts, S)) {
              i.ev = n
              var c =
                'dm\x3d' +
                encodeURIComponent(i.dm) +
                '\x26dg\x3d' +
                encodeURIComponent(i.dg) +
                '\x26vid\x3d' +
                encodeURIComponent(i.vid) +
                '\x26sid\x3d' +
                encodeURIComponent(i.sid) +
                '\x26ts\x3d' +
                i.ts +
                '\x26ns\x3d' +
                (0 | i.ns) +
                '\x26bsv\x3d' +
                (0 | i.bsv) +
                '\x26bs\x3d' +
                (0 | i.bs) +
                '\x26ev\x3d' +
                encodeURIComponent(i.ev)
              ;(i.md && (c += '\x26md\x3d' + encodeURIComponent(i.md)),
                r && 'object' == typeof r
                  ? ((i.pr = r), (c += '\x26pr\x3d' + encodeURIComponent(JSON.stringify(r))))
                  : 'string' == typeof r &&
                    ((i.pr = r), (c += '\x26pr\x3d' + encodeURIComponent(r))),
                jt('pev', 'ins', i, c))
            }
          }
        } else ae('invalid event name: ' + String(t || ''))
      }
    }
    function Ht(t, r, n, i) {
      if (e && xe_isset(t, 'string')) {
        var o = qt()
        if (o.dg && o.dm && o.vid) {
          if (r && 'object' == typeof r) {
            var c = r || {}
            ;((r = null != c.ot ? c.ot : null != c.object_type ? c.object_type : ''),
              (n = null != c.oid ? c.oid : null != c.object_id ? c.object_id : ''),
              null != c.val ? (i = c.val) : null != c.value && (i = c.value))
          }
          if (((o.ev = re(t)), o.ev))
            if (null == r || '' === r || ((o.ot = ne(r)), o.ot))
              if (null == n || '' === n || ((o.oid = ie(n)), o.oid))
                if (null == i || '' === i || ((o.val = ce(i)), null !== o.val)) {
                  var u = U(
                    (o.dg || '') +
                      '|' +
                      (o.vid || '') +
                      '|' +
                      (o.ev || '') +
                      '|' +
                      (o.ot || '') +
                      '|' +
                      (o.oid || '') +
                      '|' +
                      (void 0 !== o.val && null !== o.val ? String(o.val) : ''),
                  )
                  if (!B(x, u, o.ts, k)) {
                    var a =
                      'dm\x3d' +
                      encodeURIComponent(o.dm) +
                      '\x26dg\x3d' +
                      encodeURIComponent(o.dg) +
                      '\x26vid\x3d' +
                      encodeURIComponent(o.vid) +
                      '\x26ts\x3d' +
                      o.ts +
                      '\x26bsv\x3d' +
                      (0 | o.bsv) +
                      '\x26bs\x3d' +
                      (0 | o.bs) +
                      '\x26ev\x3d' +
                      encodeURIComponent(o.ev)
                    ;(o.ot && (a += '\x26ot\x3d' + encodeURIComponent(o.ot)),
                      o.oid && (a += '\x26oid\x3d' + encodeURIComponent(o.oid)),
                      void 0 === o.val ||
                        null === o.val ||
                        '' === o.val ||
                        isNaN(o.val) ||
                        (a += '\x26val\x3d' + encodeURIComponent(String(o.val))),
                      jt('trk', 'ins', o, a))
                  }
                } else ae('invalid action value: ' + String(i))
              else ae('invalid action object_id')
            else ae('invalid action object_type: ' + String(r || ''))
          else ae('invalid action event type: ' + String(t || ''))
        }
      }
    }
    function Dt() {
      return !document.visibilityState || 'visible' === document.visibilityState
    }
    var $t = {
      pageId: dt() || '/',
      activeStartedAt: Dt() ? A() : 0,
      activeAccumMs: 0,
      unloadFlushed: !1,
    }
    function Gt() {
      if ($t.activeStartedAt) {
        var t = A() - $t.activeStartedAt
        ;(isFinite(t) && t > 0 && ($t.activeAccumMs += t), ($t.activeStartedAt = 0))
      }
    }
    function Zt() {
      var t = $t.activeAccumMs || 0
      if ($t.activeStartedAt) {
        var e = A() - $t.activeStartedAt
        isFinite(e) && e > 0 && (t += e)
      }
      return ((!isFinite(t) || t < 0) && (t = 0), t)
    }
    function Wt(t) {
      if (('pagehide' !== t && 'beforeunload' !== t) || !$t.unloadFlushed) {
        var e = Zt()
        Gt()
        var r,
          n = Math.floor(e / 1e3)
        if (
          (n > 0 &&
            (n > 86400 && (n = 86400), Ht('time/page', 'page', $t.pageId || dt() || 'page', n)),
          'pagehide' !== t && 'beforeunload' !== t)
        )
          ((r = dt()),
            ($t.pageId = r || dt() || '/'),
            ($t.activeAccumMs = 0),
            ($t.activeStartedAt = Dt() ? A() : 0),
            ($t.unloadFlushed = !1))
        else $t.unloadFlushed = !0
      }
    }
    function Xt() {
      Dt() ? $t.activeStartedAt || (Dt() && ($t.activeStartedAt = A())) : Gt()
    }
    var Yt = { pageBottom: {}, productInterest: {} }
    function Kt() {
      try {
        if (window[g]) return
        ;(Dt() && Ft(),
          (window[g] = setInterval(function () {
            Dt() && Ft()
          }, m)))
      } catch (t) {}
    }
    function Qt(t) {
      return t && 'object' == typeof t ? Object.assign({}, t) : {}
    }
    ;((function () {
      var t = A() + 1e4,
        e = Vt()
      if (!e.dg || !e.dm) return (zt('blocked', 'missing_pvw_fields', ''), Promise.resolve(!1))
      function r() {
        var e = Tt()
        return e.dg && e.dm && e.vid
          ? ((e.pn = dt()),
            Et('pht', 'ins', e, 'X-PHT-Status', t).then(function (t) {
              return !(!t || !t.ok) && { kind: 'pht', url: t.url }
            }))
          : (zt('blocked', 'missing_pht_fields', ''), Promise.resolve(!1))
      }
      function n() {
        return Et('pvw', 'ins', e, 'X-PVW-Status', t).then(function (t) {
          return !(!t || !t.ok) && { kind: 'pvw', url: t.url }
        })
      }
      function i(t) {
        return pt().then(function () {
          return (zt('active', t.kind, t.url), t.kind)
        })
      }
      return n().then(function (e) {
        return e
          ? i(e)
          : r().then(function (e) {
              return e
                ? i(e)
                : ht(Math.min(3e3, mt(t))).then(function () {
                    return n().then(function (t) {
                      return t
                        ? i(t)
                        : r().then(function (t) {
                            return t
                              ? i(t)
                              : (zt('blocked', 'activation_failed', ''),
                                ae('activation failed: PVW and PHT did not validate'),
                                !1)
                          })
                    })
                  })
            })
      })
    })().then(function (t) {
      Bt(t)
    }),
      (function () {
        var t = location.href
        function r() {
          var r
          location.href !== t &&
            ((function (t) {
              var e = []
              for (var r in Yt.productInterest)
                Object.prototype.hasOwnProperty.call(Yt.productInterest, r) && e.push(r)
              for (var n = 0; n < e.length; n++) {
                var i = Yt.productInterest[e[n]]
                if (i) {
                  try {
                    'function' == typeof i.flush
                      ? i.flush(t || 'manual')
                      : 'function' == typeof i.stop && i.stop()
                  } catch (t) {}
                  delete Yt.productInterest[e[n]]
                }
              }
            })('nav'),
            Wt('nav'),
            (function () {
              var t = []
              for (var e in Yt.pageBottom)
                Object.prototype.hasOwnProperty.call(Yt.pageBottom, e) && t.push(e)
              for (var r = 0; r < t.length; r++) {
                var n = Yt.pageBottom[t[r]]
                if (n && 'function' == typeof n.stop)
                  try {
                    n.stop()
                  } catch (t) {}
              }
            })(),
            (t = location.href),
            xe_setLS(o + 'sid_time', String(A()), b),
            (yt = !1),
            (bt = O()),
            e &&
              ((r = Vt()).dg &&
                r.dm &&
                jt(
                  'pvw',
                  'ins',
                  r,
                  'dg\x3d' +
                    encodeURIComponent(r.dg) +
                    '\x26dm\x3d' +
                    encodeURIComponent(r.dm) +
                    '\x26pv_id\x3d' +
                    encodeURIComponent(r.pv_id) +
                    '\x26ts\x3d' +
                    r.ts +
                    '\x26bsv\x3d' +
                    (0 | r.bsv) +
                    '\x26bs\x3d' +
                    (0 | r.bs),
                ),
              Mt(),
              Kt()))
        }
        var n = history.pushState
        history.pushState = function () {
          ;(n.apply(this, arguments), setTimeout(r, 0))
        }
        var i = history.replaceState
        ;((history.replaceState = function () {
          ;(i.apply(this, arguments), setTimeout(r, 0))
        }),
          window.addEventListener('popstate', r, !0),
          window.addEventListener('hashchange', r, !0),
          document.addEventListener(
            'visibilitychange',
            function () {
              ;(Dt() && xe_setLS(o + 'sid_time', String(A()), b), Xt())
            },
            !0,
          ),
          window.addEventListener(
            'pagehide',
            function () {
              Wt('pagehide')
            },
            !0,
          ),
          window.addEventListener(
            'beforeunload',
            function () {
              Wt('beforeunload')
            },
            !0,
          ))
      })())
    var te = 120
    function ee(t) {
      return null == t ? '' : String(t).trim()
    }
    function re(t) {
      var e = ee(t)
      return /^[A-Za-z0-9_./:-]{1,40}$/.test(e) ? e : ''
    }
    function ne(t) {
      var e = ee(t)
      return /^[A-Za-z0-9_.:-]{1,24}$/.test(e) ? e : ''
    }
    function ie(t) {
      var e = ee(t)
      return e ? (e.length > te && (e = e.slice(0, te)), e) : ''
    }
    function oe(t) {
      var e = ee(t).toLowerCase()
      return e &&
        (e = (e = (e = e.replace(/[^a-z0-9_-]+/g, '_')).replace(/_+/g, '_')).replace(
          /^_+|_+$/g,
          '',
        ))
        ? (e.length > te && (e = e.slice(0, te)), e)
        : ''
    }
    function ce(t) {
      var e = Number(t)
      return isFinite(e) ? e : null
    }
    function ue(t, e, r) {
      return t < e ? e : t > r ? r : t
    }
    function ae(t) {
      try {
        if (!xe_core || void 0 === xe_core.vm || null === xe_core.vm) return
        var e = String(xe_core.vm).trim().toLowerCase()
        if (!e || '0' === e || 'false' === e || 'off' === e || 'no' === e) return
        window.console && console.warn && console.warn('[xex_pulse]', t)
      } catch (t) {}
    }
    var se = { required: !1, unlockToken: '', unlocked: !0, allowMap: null }
    function le(t) {
      var e = ee(t).toLowerCase()
      if (!e) return ''
      if ('*' === e) return '*'
      var r = e.split('.')
      if (r.length < 2) return ''
      for (var n = 0; n < r.length; n++) {
        if (((r[n] = ee(r[n]).toLowerCase()), !r[n])) return ''
        if (!/^[a-z0-9_*:-]+$/.test(r[n])) return ''
      }
      return r.join('.')
    }
    function de(t, e) {
      if (se.required && !se.unlocked) return !1
      if (!se.allowMap) return !0
      var r = ee(t).toLowerCase(),
        n = ee(e).toLowerCase()
      if (!r || !n) return !1
      var i = se.allowMap,
        o = r + '.' + n
      if (i['*'] || i[o]) return !0
      var c = o.split('.')
      if (c.length >= 2 && i[c[c.length - 2] + '.*']) return !0
      for (var u = c.length - 1; u >= 1; u--) if (i[c.slice(0, u).join('.') + '.*']) return !0
      return !1
    }
    function fe(t, e, r) {
      return function () {
        if (de(t, e)) return r.apply(this, arguments)
        ae('blocked helper: ' + t + '.' + e)
      }
    }
    function ve(t, e) {
      var r = {}
      for (var n in e)
        Object.prototype.hasOwnProperty.call(e, n) &&
          'function' == typeof e[n] &&
          (r[n] = fe(t, n, e[n]))
      return r
    }
    function pe(t, e, r, n) {
      var i = Qt(n),
        o = i.pr && 'object' == typeof i.pr ? Object.assign({}, i.pr) : {},
        c = oe(t)
      if (void 0 !== o.showcase_id) {
        var u = oe(o.showcase_id)
        u ? (o.showcase_id = u) : delete o.showcase_id
      }
      if (
        (c && void 0 === o.showcase_id && (o.showcase_id = c),
        null != e && '' !== e && void 0 === o.product_id && (o.product_id = String(e)),
        null != r && '' !== r && void 0 === o.pos)
      ) {
        var a = Number(r)
        isFinite(a) && (o.pos = a)
      }
      return (
        void 0 !== i.showcase_type &&
          void 0 === o.showcase_type &&
          (o.showcase_type = String(i.showcase_type || '')),
        void 0 !== i.strategy && void 0 === o.strategy && (o.strategy = String(i.strategy || '')),
        void 0 !== i.query && void 0 === o.query && (o.query = String(i.query || '')),
        (i.pr = o),
        i
      )
    }
    function he(t, e) {
      var r = Qt(e)
      return (void 0 === r.showcase_type && (r.showcase_type = t), r)
    }
    function me(t, e) {
      var r = ie(t)
      return r || (ae((e || 'product helper') + ': invalid product_id'), '')
    }
    function ge(t, e) {
      var r = Qt(t),
        n = String(e || '').trim()
      return (
        (r.pr && 'object' == typeof r.pr) || (r.pr = {}),
        '' !== n && void 0 === r.pr.id && (r.pr.id = n),
        r
      )
    }
    function _e(t, e) {
      var r = Qt(t)
      if (void 0 === r.pr) return ((r.pr = e), r)
      if (r.pr && 'object' == typeof r.pr && e && 'object' == typeof e) {
        for (var n in e)
          Object.prototype.hasOwnProperty.call(e, n) && void 0 === r.pr[n] && (r.pr[n] = e[n])
        return r
      }
      return r
    }
    function we() {
      return Lt && 'object' == typeof Lt
        ? {
            visitor_type: String(Lt.visitor_type || ''),
            first_seen_ts_ms: Number(Lt.first_seen_ts_ms || 0),
            last_visit_ts_ms: Number(Lt.last_visit_ts_ms || 0),
            return_after_sec: Number(Lt.return_after_sec || 0),
          }
        : null
    }
    function ye() {
      var t = document.documentElement || {},
        e = document.body || {},
        r =
          null != window.pageYOffset
            ? Number(window.pageYOffset || 0)
            : Number(t.scrollTop || e.scrollTop || 0),
        n = Number(window.innerHeight || t.clientHeight || e.clientHeight || 0),
        i = Math.max(Number(t.scrollHeight || 0), Number(e.scrollHeight || 0), n),
        o = Math.max(i - n, 0),
        c = o > 0 ? (r / o) * 100 : 100
      return (
        isFinite(c) || (c = 0),
        {
          scrollTop: r,
          viewportH: n,
          docH: i,
          pct: (c = ue(c, 0, 100)),
          remaining: Math.max(i - (r + n), 0),
        }
      )
    }
    function be(t) {
      return t && 'object' == typeof t.extras ? Qt(t.extras) : {}
    }
    function Se(t, e, r, n) {
      var i = ie(t || dt() || 'page')
      i || (i = 'page')
      var o = n || ye()
      ;(Jt(
        'view/page_bottom',
        _e(e, {
          page_id: i,
          scroll_pct: Number((o.pct || 0).toFixed(2)),
          viewport_h: Number(o.viewportH || 0),
          doc_h: Number(o.docH || 0),
          reason: String(r || 'scroll'),
        }),
      ),
        Ht('view/page_bottom', 'page', i, 1))
    }
    function ke(t, e, r, n, i, o) {
      var c = ie(t)
      if (c) {
        var u = ce(e)
        ;(null === u && (u = 0), (u = ue(u, 0, 86400)))
        var a = ce(r)
        ;(null === a && (a = 0),
          (a = ue(a, 0, 100)),
          Jt(
            'engage/product_interest',
            _e(i, {
              product_id: c,
              page_id: ie(dt() || 'page'),
              seconds_on_page: Number(u.toFixed(2)),
              scroll_pct_max: Number(a.toFixed(2)),
              reached_bottom: n ? 1 : 0,
              reason: String(o || 'manual'),
            }),
          ),
          Ht('time/product', 'product', c, Number(u.toFixed(2))),
          Ht('scroll/product', 'product', c, Number(a.toFixed(2))))
      }
    }
    function Ie(t, e) {
      var r = ie(t)
      if (!r) return (ae('observeProductInterest: invalid productId'), null)
      var n = Qt(e)
      !(function () {
        for (var t in Yt.productInterest)
          if (Object.prototype.hasOwnProperty.call(Yt.productInterest, t)) {
            var e = Yt.productInterest[t]
            try {
              e && 'function' == typeof e.stop && e.stop()
            } catch (t) {}
            delete Yt.productInterest[t]
          }
      })()
      var i = 'productInterest::' + r + '::' + dt()
      if (Yt.productInterest[i]) return Yt.productInterest[i]
      var o = ce(n.min_seconds)
      ;(null === o && (o = 0), (o = ue(o, 0, 86400)))
      var c = ce(n.bottom_threshold_pct)
      ;(null === c && (c = 98), (c = ue(c, 60, 100)))
      var u = ce(n.bottom_offset_px)
      ;(null === u && (u = 24), (u = ue(u, 0, 4096)))
      var a = be(n),
        s = Zt(),
        l = !1,
        d = !1,
        f = 0,
        v = !1,
        p = { passive: !0 }
      function h() {
        var t = ye()
        ;(t.pct > f && (f = t.pct), (t.pct >= c || t.remaining <= u) && (v = !0))
      }
      function m() {
        if (!d) {
          d = !0
          try {
            window.removeEventListener('scroll', _, p)
          } catch (t) {}
          try {
            window.removeEventListener('resize', w, p)
          } catch (t) {}
          try {
            document.removeEventListener('visibilitychange', y, !0)
          } catch (t) {}
          try {
            window.removeEventListener('pagehide', b, !0)
          } catch (t) {}
          try {
            window.removeEventListener('beforeunload', S, !0)
          } catch (t) {}
          delete Yt.productInterest[i]
        }
      }
      function g(t) {
        if (!l && !d) {
          ;((l = !0), h())
          var e = Zt() - s
          ;(!isFinite(e) || e < 0) && (e = 0)
          var n = e / 1e3
          ;(n < o || ke(r, n, f, v, a, t || 'auto'), m())
        }
      }
      function _(t) {
        ;(t && !1 === t.isTrusted) || h()
      }
      function w() {
        h()
      }
      function y() {
        Dt() || g('hidden')
      }
      function b() {
        g('pagehide')
      }
      function S() {
        g('beforeunload')
      }
      h()
      try {
        window.addEventListener('scroll', _, p)
      } catch (t) {}
      try {
        window.addEventListener('resize', w, p)
      } catch (t) {}
      try {
        document.addEventListener('visibilitychange', y, !0)
      } catch (t) {}
      try {
        window.addEventListener('pagehide', b, !0)
      } catch (t) {}
      try {
        window.addEventListener('beforeunload', S, !0)
      } catch (t) {}
      return (
        (Yt.productInterest[i] = {
          stop: m,
          flush: function (t) {
            g(t || 'manual')
          },
        }),
        Yt.productInterest[i]
      )
    }
    var Ce = {
        send: function (t, e) {
          return Jt(String(t || ''), e || {})
        },
        event: function (t, e) {
          return Jt(String(t || ''), e || {})
        },
      },
      xe = {
        send: function (t, e, r, n) {
          return Ht(t, e, r, n)
        },
        event: function (t, e, r, n) {
          return Ht(t, e, r, n)
        },
        scrollPercent: function (t, e, r) {
          var n = ne(t || 'page'),
            i = ie(e || dt()),
            o = ce(r)
          if (n && i && null !== o) return Ht('scroll/page', n, i, (o = ue(o, 0, 100)))
        },
        timeOnPage: function (t, e, r) {
          var n = ne(t || 'page'),
            i = ie(e || dt()),
            o = ce(r)
          if (n && i && null !== o) return Ht('time/page', n, i, (o = ue(o, 0, 86400)))
        },
      },
      Ne = {
        send: function (t, e) {
          return Jt(String(t || ''), e || {})
        },
        event: function (t, e) {
          return Jt(String(t || ''), e || {})
        },
        pageBottom: function (t, e) {
          return Se(t || dt(), Qt(e), 'manual', ye())
        },
        observePageBottom: function (t, e) {
          return (function (t, e) {
            var r = Qt(e),
              n = ie(t || dt() || 'page')
            n || (n = 'page')
            var i = 'pageBottom::' + n
            if (Yt.pageBottom[i]) return Yt.pageBottom[i]
            var o = ce(r.threshold_pct)
            ;(null === o && (o = 98), (o = ue(o, 60, 100)))
            var c = ce(r.bottom_offset_px)
            ;(null === c && (c = 24), (c = ue(c, 0, 4096)))
            var u = be(r),
              a = !1,
              s = !1,
              l = { passive: !0 }
            function d() {
              if (!s) {
                s = !0
                try {
                  window.removeEventListener('scroll', p, l)
                } catch (t) {}
                try {
                  window.removeEventListener('resize', h, l)
                } catch (t) {}
                try {
                  document.removeEventListener('visibilitychange', m, !0)
                } catch (t) {}
                delete Yt.pageBottom[i]
              }
            }
            function f(t, e) {
              a || s || ((a = !0), Se(n, u, t, e), d())
            }
            function v(t) {
              if (!a && !s) {
                var e = ye()
                ;(e.pct >= o || e.remaining <= c) && f(t || 'scroll', e)
              }
            }
            function p(t) {
              ;(t && !1 === t.isTrusted) || v('scroll')
            }
            function h() {
              v('resize')
            }
            function m() {
              Dt() || v('hidden')
            }
            try {
              window.addEventListener('scroll', p, l)
            } catch (t) {}
            try {
              window.addEventListener('resize', h, l)
            } catch (t) {}
            try {
              document.addEventListener('visibilitychange', m, !0)
            } catch (t) {}
            return (
              setTimeout(function () {
                v('init')
              }, 0),
              (Yt.pageBottom[i] = {
                stop: d,
                flush: function () {
                  f('manual', ye())
                },
              }),
              Yt.pageBottom[i]
            )
          })(t || dt(), e)
        },
        productInterest: function (t, e, r, n, i) {
          return ke(t, e, r, !!i, Qt(n), 'manual')
        },
        observeProductInterest: function (t, e) {
          return Ie(t, e)
        },
        variantSelect: function (t, e, r) {
          return Jt(
            'select/variant',
            _e(r, { product_id: String(t || ''), variant_id: String(e || '') }),
          )
        },
        stockStatus: function (t, e, r) {
          return Jt(
            'view/stock_status',
            _e(r, { product_id: String(t || ''), status: String(e || '') }),
          )
        },
        shippingSimulate: function (t, e, r, n, i) {
          return Jt(
            'simulate/shipping',
            _e(i, {
              zip_code: String(t || ''),
              shipping_method: String(e || ''),
              cost: Number(r || 0),
              eta_days: Number(n || 0),
            }),
          )
        },
        couponApply: function (t, e, r) {
          var n = void 0 === e || e ? 1 : 0
          return Jt(
            n ? 'apply/coupon' : 'error/coupon',
            _e(r, { code: String(t || ''), success: n }),
          )
        },
        paymentMethodSelect: function (t, e) {
          return Jt('select/payment_method', _e(e, { payment_method: String(t || '') }))
        },
        paymentError: function (t, e) {
          return Jt('error/payment', _e(e, { code: String(t || '') }))
        },
        mediaInteraction: function (t, e, r, n) {
          return Jt(
            'interact/pdp_media',
            _e(n, {
              product_id: String(t || ''),
              media_type: String(e || ''),
              action: String(r || 'interact'),
            }),
          )
        },
        reviewRead: function (t, e) {
          return Jt('read/review', _e(e, { product_id: String(t || '') }))
        },
        reviewFilter: function (t, e, r) {
          return Jt(
            'filter/review',
            _e(r, { product_id: String(t || ''), filter: String(e || '') }),
          )
        },
        searchRefine: function (t, e, r) {
          var n = _e(r, { q: String(t || ''), filters: e && 'object' == typeof e ? e : {} })
          return (Ht('refine/search', 'query', String(t || '')), Jt('refine/search', n))
        },
        cartRemoveReason: function (t, e, r) {
          return Jt(
            'remove/cart_reason',
            _e(r, { product_id: String(t || ''), reason: String(e || '') }),
          )
        },
        search: function (t, e) {
          var r = String(t || ''),
            n = Qt(e)
          return (
            void 0 === n.pr && (n.pr = { q: r }),
            Ht('search/query', 'query', r),
            Jt('search/query', n)
          )
        },
        searchEmpty: function (t, e) {
          var r = String(t || ''),
            n = Qt(e)
          return (
            void 0 === n.pr && (n.pr = { q: r, results_count: 0 }),
            Ht('search/empty', 'query', r),
            Jt('search/empty', n)
          )
        },
        productView: function (t, e) {
          var r = me(t, 'view/product')
          if (r) return Jt('view/product', _e(e, { product_id: r }))
        },
        productClick: function (t, e) {
          var r = me(t, 'click/product')
          if (r) return Jt('click/product', _e(e, { product_id: r }))
        },
        addToCart: function (t, e, r) {
          var n = me(t, 'add/cart')
          if (n) {
            var i = _e(r, { product_id: n })
            return (void 0 === i.qty && (i.qty = Number(e || 1)), Jt('add/cart', i))
          }
        },
        removeFromCart: function (t, e, r) {
          var n = me(t, 'remove/cart')
          if (n) {
            var i = _e(r, { product_id: n })
            return (void 0 === i.qty && (i.qty = Number(e || 1)), Jt('remove/cart', i))
          }
        },
        viewCart: function (t, e, r) {
          return Jt('view/cart', _e(r, { cart_value: Number(t || 0), items: e || [] }))
        },
        checkoutStart: function (t, e, r) {
          return Jt('start/checkout', _e(r, { cart_value: Number(t || 0), items: e || [] }))
        },
        addPaymentInfo: function (t, e, r) {
          return Jt(
            'add/payment_info',
            _e(r, { cart_value: Number(t || 0), payment_method: String(e || '') }),
          )
        },
        addShippingInfo: function (t, e, r) {
          return Jt(
            'add/shipping_info',
            _e(r, { cart_value: Number(t || 0), shipping_method: String(e || '') }),
          )
        },
        purchase: function (t, e, r, n) {
          return Jt(
            'complete/purchase',
            _e(
              (function (t) {
                var e = we()
                return e ? _e(t, e) : Qt(t)
              })(n),
              { order_id: String(t || ''), cart_value: Number(e || 0), items: r || [] },
            ),
          )
        },
        wishlistAdd: function (t, e) {
          var r = me(t, 'add/wishlist')
          if (r) return Jt('add/wishlist', _e(e, { product_id: r }))
        },
        wishlistRemove: function (t, e) {
          var r = me(t, 'remove/wishlist')
          if (r) return Jt('remove/wishlist', _e(e, { product_id: r }))
        },
        categoryView: function (t, e) {
          return Jt('view/category', _e(e, { category_id: oe(t) }))
        },
        bannerView: function (t, e) {
          return Jt('view/banner', _e(e, { banner_id: oe(t) }))
        },
        bannerClick: function (t, e) {
          return Jt('click/banner', _e(e, { banner_id: oe(t) }))
        },
        showcaseView: function (t, e) {
          return Jt('view/showcase', pe(t, '', '', e))
        },
        showcaseItemView: function (t, e, r, n) {
          return Jt('view/showcase_item', pe(t, e, r, n))
        },
        showcaseItemsViewBatch: function (t, e, r) {
          var n = Array.isArray(e) ? e : []
          if (n.length) {
            for (var i = [], o = 0; o < n.length; o++) {
              var c = n[o],
                u = {},
                a = ''
              if (c && 'object' == typeof c)
                for (var s in ((a = String(c.product_id || c.id || c.pid || '').trim()), c))
                  Object.prototype.hasOwnProperty.call(c, s) && (u[s] = c[s])
              else a = String(c || '').trim()
              if (a) {
                u.product_id = a
                var l = Number(null != u.pos ? u.pos : u.position)
                ;((!isFinite(l) || l <= 0) && (l = o + 1), (u.pos = l), i.push(u))
              }
            }
            if (i.length) {
              var d = pe(t, '', '', r)
              return (
                (d.pr && 'object' == typeof d.pr) || (d.pr = {}),
                (d.pr.items = i),
                (d.pr.batch_size = i.length),
                Jt('view/showcase_item', d)
              )
            }
          }
        },
        showcaseItemClick: function (t, e, r, n) {
          return Jt('click/showcase_item', pe(t, e, r, n))
        },
        showcaseSearch: function (t, e, r) {
          return Jt(
            'search/showcase_query',
            pe(t, '', '', Object.assign({ query: String(e || '') }, Qt(r))),
          )
        },
        showcaseSearchEmpty: function (t, e, r) {
          var n = pe(t, '', '', Object.assign({ query: String(e || '') }, Qt(r)))
          return (
            (n.pr && 'object' == typeof n.pr) || (n.pr = {}),
            void 0 === n.pr.results_count && (n.pr.results_count = 0),
            Jt('search/showcase_empty', n)
          )
        },
        bestSellersView: function (t, e) {
          return Ne.showcaseView(t, he('best_sellers', e))
        },
        hotProductsView: function (t, e) {
          return Ne.showcaseView(t, he('hot_products', e))
        },
        personalizedSearchView: function (t, e, r) {
          return Ne.showcaseSearch(t, e, he('personalized_search', r))
        },
      },
      Le = {
        send: function (t, e, r, n) {
          return Ht(t, e, r, n)
        },
        event: function (t, e, r, n) {
          return Ht(t, e, r, n)
        },
        pageBottom: function (t) {
          return Ht('view/page_bottom', 'page', String(t || dt() || 'page'), 1)
        },
        productInterest: function (t, e, r) {
          var n = String(t || ''),
            i = Number(e || 0),
            o = Number(r || 0)
          return (Ht('time/product', 'product', n, i), Ht('scroll/product', 'product', n, o))
        },
        variantSelect: function (t, e) {
          var r = String(e || '')
          return (r || (r = String(t || '')), Ht('select/variant', 'variant', r, 1))
        },
        stockStatus: function (t, e) {
          var r = String(e || '').toLowerCase(),
            n = 1
          return (
            'out_of_stock' === r || 'unavailable' === r || 'sold_out' === r
              ? (n = 0)
              : 'low_stock' === r
                ? (n = 2)
                : ('preorder' !== r && 'backorder' !== r) || (n = 3),
            Ht('view/stock_status', 'product', String(t || ''), n)
          )
        },
        shippingSimulate: function (t, e) {
          return Ht('simulate/shipping', 'shipping', String(t || ''), Number(e || 0))
        },
        couponApply: function (t, e) {
          var r = void 0 === e || e ? 1 : 0
          return Ht(r ? 'apply/coupon' : 'error/coupon', 'coupon', String(t || ''), r)
        },
        paymentMethodSelect: function (t) {
          return Ht('select/payment_method', 'payment', String(t || ''), 1)
        },
        paymentError: function (t) {
          return Ht('error/payment', 'payment', String(t || ''), 1)
        },
        mediaInteraction: function (t, e) {
          var r = String(t || '')
          return (
            null != e && '' !== e && (r += ':' + String(e)),
            Ht('interact/pdp_media', 'product', r, 1)
          )
        },
        reviewRead: function (t) {
          return Ht('read/review', 'product', String(t || ''), 1)
        },
        reviewFilter: function (t, e) {
          var r = String(t || '')
          return (
            null != e && '' !== e && (r += ':' + String(e)), Ht('filter/review', 'product', r, 1)
          )
        },
        searchRefine: function (t) {
          return Ht('refine/search', 'query', String(t || ''), 1)
        },
        cartRemoveReason: function (t, e) {
          var r = String(t || '')
          return (
            null != e && '' !== e && (r += ':' + String(e)),
            Ht('remove/cart_reason', 'product', r, 1)
          )
        },
        productView: function (t) {
          var e = me(t, 'view/product action')
          if (e) return Ht('view/product', 'product', e)
        },
        productClick: function (t) {
          var e = me(t, 'click/product action')
          if (e) return Ht('click/product', 'product', e)
        },
        addToCart: function (t, e) {
          var r = me(t, 'add/cart action')
          if (r) return Ht('add/cart', 'product', r, Number(e || 1))
        },
        removeFromCart: function (t, e) {
          var r = me(t, 'remove/cart action')
          if (r) return Ht('remove/cart', 'product', r, Number(e || 1))
        },
        viewCart: function (t) {
          return Ht('view/cart', 'order', 'cart', Number(t || 0))
        },
        checkoutStart: function (t) {
          return Ht('start/checkout', 'order', 'checkout', Number(t || 0))
        },
        addPaymentInfo: function (t) {
          return Ht('add/payment_info', 'payment', String(t || ''))
        },
        addShippingInfo: function (t) {
          return Ht('add/shipping_info', 'shipping', String(t || ''))
        },
        purchase: function (t, e) {
          var r
          return (
            (r = we()) &&
              Ht(
                'purchase/visitor_type',
                'visitor',
                r.visitor_type || 'new',
                Number(r.return_after_sec || 0),
              ),
            Ht('complete/purchase', 'order', String(t || ''), Number(e || 0))
          )
        },
        search: function (t) {
          return Ht('search/query', 'query', String(t || ''))
        },
        searchEmpty: function (t) {
          return Ht('search/empty', 'query', String(t || ''))
        },
        categoryView: function (t) {
          return Ht('view/category', 'category', oe(t))
        },
        bannerView: function (t) {
          return Ht('view/banner', 'banner', oe(t))
        },
        bannerClick: function (t) {
          return Ht('click/banner', 'banner', oe(t))
        },
        wishlistAdd: function (t) {
          var e = me(t, 'add/wishlist action')
          if (e) return Ht('add/wishlist', 'product', e)
        },
        wishlistRemove: function (t) {
          var e = me(t, 'remove/wishlist action')
          if (e) return Ht('remove/wishlist', 'product', e)
        },
        outOfStock: function (t) {
          return Ht('out_of_stock/product', 'product', String(t || ''))
        },
        notifyMe: function (t) {
          return Ht('notify/product', 'product', String(t || ''))
        },
        showcaseView: function (t) {
          return Ht('view/showcase', 'showcase', oe(t), 1)
        },
        showcaseItemView: function (t) {
          return Ht('view/showcase_item', 'showcase', oe(t), 1)
        },
        showcaseItemsViewBatch: function (t, e) {
          var r = Number(e || 0)
          if (isFinite(r) && !(r <= 0)) return Ht('view/showcase_item', 'showcase', oe(t), r)
        },
        showcaseItemClick: function (t) {
          return Ht('click/showcase_item', 'showcase', oe(t), 1)
        },
        showcaseSearch: function (t) {
          return Ht('search/showcase_query', 'showcase', oe(t), 1)
        },
        showcaseSearchEmpty: function (t) {
          return Ht('search/showcase_empty', 'showcase', oe(t), 1)
        },
        bestSellersView: function (t) {
          return Ht('view/showcase', 'showcase', oe(t || 'best_sellers'), 1)
        },
        hotProductsView: function (t) {
          return Ht('view/showcase', 'showcase', oe(t || 'hot_products'), 1)
        },
        personalizedSearchView: function (t) {
          return Ht('search/showcase_query', 'showcase', oe(t || 'personalized_search'), 1)
        },
      },
      Ae = {
        send: function (t, e) {
          return Jt(String(t || ''), e || {})
        },
        event: function (t, e) {
          return Jt(String(t || ''), e || {})
        },
        hotelView: function (t, e) {
          return Jt('view/hotel', ge(e, oe(t)))
        },
        roomView: function (t, e) {
          return Jt('view/room', ge(e, oe(t)))
        },
        rateSelect: function (t, e) {
          return Jt('select/rate', ge(e, oe(t)))
        },
        bookingStart: function (t, e, r) {
          return Jt('start/booking', _e(r, { booking_id: String(t || ''), total: Number(e || 0) }))
        },
        bookingComplete: function (t, e, r) {
          return Jt(
            'complete/booking',
            _e(r, { booking_id: String(t || ''), total: Number(e || 0) }),
          )
        },
      },
      Re = {
        send: function (t, e, r, n) {
          return Ht(t, e, r, n)
        },
        event: function (t, e, r, n) {
          return Ht(t, e, r, n)
        },
        hotelView: function (t) {
          return Ht('view/hotel', 'hotel', oe(t))
        },
        roomView: function (t) {
          return Ht('view/room', 'room', oe(t))
        },
        rateSelect: function (t) {
          return Ht('select/rate', 'rate', oe(t))
        },
        bookingStart: function (t, e) {
          return Ht('start/booking', 'booking', String(t || ''), Number(e || 0))
        },
        bookingComplete: function (t, e) {
          return Ht('complete/booking', 'booking', String(t || ''), Number(e || 0))
        },
      },
      Oe = {
        send: function (t, e) {
          return Jt(String(t || ''), e || {})
        },
        event: function (t, e) {
          return Jt(String(t || ''), e || {})
        },
        articleView: function (t, e) {
          return Jt('view/article', ge(e, oe(t)))
        },
        articleClick: function (t, e) {
          return Jt('click/article', ge(e, oe(t)))
        },
        articleRead: function (t, e, r) {
          return Jt('read/article', _e(r, { article_id: String(t || ''), seconds: Number(e || 0) }))
        },
        categoryView: function (t, e) {
          return Jt('view/category', ge(e, oe(t)))
        },
        tagView: function (t, e) {
          return Jt('view/tag', ge(e, oe(t)))
        },
        authorView: function (t, e) {
          return Jt('view/author', ge(e, oe(t)))
        },
        search: function (t, e) {
          var r = String(t || ''),
            n = Qt(e)
          return (
            void 0 === n.pr && (n.pr = { q: r }),
            Ht('search/query', 'query', r),
            Jt('search/query', n)
          )
        },
        searchEmpty: function (t, e) {
          var r = String(t || ''),
            n = Qt(e)
          return (
            void 0 === n.pr && (n.pr = { q: r, results_count: 0 }),
            Ht('search/empty', 'query', r),
            Jt('search/empty', n)
          )
        },
        commentAdd: function (t, e) {
          return Jt('add/comment', ge(e, oe(t)))
        },
        newsletterSubscribe: function (t, e) {
          return Jt('subscribe/newsletter', ge(e, oe(t)))
        },
        share: function (t, e, r) {
          return Jt(
            'share/article',
            _e(r, { article_id: String(t || ''), channel: String(e || '') }),
          )
        },
      },
      Ue = {
        send: function (t, e, r, n) {
          return Ht(t, e, r, n)
        },
        event: function (t, e, r, n) {
          return Ht(t, e, r, n)
        },
        articleView: function (t) {
          return Ht('view/article', 'article', oe(t))
        },
        articleClick: function (t) {
          return Ht('click/article', 'article', oe(t))
        },
        articleRead: function (t, e) {
          return Ht('read/article', 'article', String(t || ''), Number(e || 0))
        },
        categoryView: function (t) {
          return Ht('view/category', 'category', oe(t))
        },
        tagView: function (t) {
          return Ht('view/tag', 'tag', oe(t))
        },
        authorView: function (t) {
          return Ht('view/author', 'author', oe(t))
        },
        search: function (t) {
          return Ht('search/query', 'query', String(t || ''))
        },
        searchEmpty: function (t) {
          return Ht('search/empty', 'query', String(t || ''))
        },
        commentAdd: function (t) {
          return Ht('add/comment', 'article', oe(t))
        },
        newsletterSubscribe: function (t) {
          return Ht('subscribe/newsletter', 'newsletter', oe(t))
        },
        share: function (t) {
          return Ht('share/article', 'article', oe(t))
        },
      },
      je = {
        set: function (t) {
          return (
            (t = Qt(t)),
            (se.required = !!t.required),
            (se.unlockToken = ee(t.token)),
            (se.allowMap = (function (t) {
              if (!Array.isArray(t) || !t.length) return null
              for (var e = {}, r = 0; r < t.length; r++) {
                var n = le(t[r])
                n && (e[n] = !0)
              }
              return Object.keys(e).length ? e : null
            })(t.allow)),
            (se.unlocked = !se.required || '' === se.unlockToken),
            !0
          )
        },
        grant: function (t) {
          return (
            !se.required ||
            (se.unlockToken
              ? ee(t) === se.unlockToken && ((se.unlocked = !0), !0)
              : ((se.unlocked = !0), !0))
          )
        },
        revoke: function () {
          return ((se.unlocked = !se.required), !0)
        },
        allowed: function (t) {
          var e = le(t)
          if (!e || '*' === e) return !1
          var r = e.split('.')
          return !(r.length < 2) && de(r.slice(0, r.length - 1).join('.'), r[r.length - 1])
        },
      }
    ;((this.core = {
      version: this.VERSION,
      events: ve('core.events', Ce),
      actions: ve('core.actions', xe),
      permissions: je,
    }),
      (this.activated = function () {
        return !!e
      }),
      (this.activation = function () {
        return { status: r.status, kind: r.kind, url: r.url, ts: r.ts }
      }))
    try {
      Object.defineProperty &&
        Object.defineProperty(this, 'active', {
          configurable: !1,
          enumerable: !1,
          get: function () {
            return !!e
          },
          set: function () {},
        })
    } catch (t) {}
    ;((this.ecom = { events: ve('ecom.events', Ne), actions: ve('ecom.actions', Le) }),
      (this.booking = { events: ve('booking.events', Ae), actions: ve('booking.actions', Re) }),
      (this.blog = { events: ve('blog.events', Oe), actions: ve('blog.actions', Ue) }))
  },
  xex_pulse = new xex_pulse_Class()
