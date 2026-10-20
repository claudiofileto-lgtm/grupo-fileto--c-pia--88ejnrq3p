;((function () {
  try {
    var e =
      typeof window < `u`
        ? window
        : typeof global < `u`
          ? global
          : typeof globalThis < `u`
            ? globalThis
            : typeof self < `u`
              ? self
              : {}
    e.SENTRY_RELEASE = { id: `a9fd465e704c8f3044384b341dd0bec15172bfb2` }
    var t = new e.Error().stack
    t &&
      ((e._sentryDebugIds = e._sentryDebugIds || {}),
      (e._sentryDebugIds[t] = `22ce709d-aecc-4f8d-9d2a-8367916338f8`),
      (e._sentryDebugIdIdentifier = `sentry-dbid-22ce709d-aecc-4f8d-9d2a-8367916338f8`))
  } catch {}
})(),
  (function () {
    function e(t, n) {
      if (
        (n === void 0 && (n = new WeakSet()),
        t == null ||
          typeof t == `string` ||
          typeof t == `number` ||
          typeof t == `boolean` ||
          typeof t == `bigint`)
      )
        return t
      if (typeof t == `symbol`)
        return { $$skip: !0, type: `Symbol`, description: t.description || `[Symbol]` }
      if (typeof t == `function`)
        return { $$skip: !0, type: `Function`, name: t.name || `anonymous` }
      if (typeof t == `object`) {
        if (n.has(t)) return { $$skip: !0, type: `Circular` }
        try {
          if (t instanceof FormData) {
            let e = []
            try {
              for (let n of t.keys()) e.push(n)
            } catch {}
            return { $$skip: !0, type: `FormData`, keys: e, description: `[FormData]` }
          }
          if (typeof ReadableStream < `u` && t instanceof ReadableStream)
            return { $$skip: !0, type: `ReadableStream`, description: `[ReadableStream]` }
          if (typeof Blob < `u` && t instanceof Blob)
            return { $$skip: !0, type: `Blob`, size: t.size, mediaType: t.type || void 0 }
          if (typeof File < `u` && t instanceof File)
            return {
              $$skip: !0,
              type: `File`,
              name: t.name,
              size: t.size,
              mediaType: t.type || void 0,
            }
          if (typeof ArrayBuffer < `u` && t instanceof ArrayBuffer)
            return { $$skip: !0, type: `ArrayBuffer`, byteLength: t.byteLength }
          if (typeof Node < `u` && t instanceof Node) {
            let e = t.nodeName || t.constructor?.name || `Node`
            return { $$skip: !0, type: `Node`, tag: e, description: `[${e}]` }
          }
          if (t instanceof Error)
            return { $$skip: !0, type: `Error`, message: t.message, name: t.name, stack: t.stack }
          if (t instanceof Date || t instanceof RegExp) return t
          if ((n.add(t), Array.isArray(t))) {
            let r = []
            for (let i = 0; i < t.length; i++) r.push(e(t[i], n))
            return r
          }
          if (typeof Map < `u` && t instanceof Map) {
            let r = []
            try {
              t.forEach((t, i) => {
                r.push([e(i, n), e(t, n)])
              })
            } catch {
              return { $$skip: !0, type: `Map`, description: `[Map]` }
            }
            return { $$skip: !0, type: `Map`, entries: r }
          }
          if (typeof Set < `u` && t instanceof Set) {
            let r = []
            try {
              t.forEach((t) => r.push(e(t, n)))
            } catch {
              return { $$skip: !0, type: `Set`, description: `[Set]` }
            }
            return { $$skip: !0, type: `Set`, values: r }
          }
          let r = {}
          for (let i of Object.keys(t))
            try {
              r[i] = e(t[i], n)
            } catch {
              r[i] = { $$skip: !0, type: `unknown`, description: `[unserializable]` }
            }
          return r
        } catch (e) {
          return {
            $$skip: !0,
            type: `object`,
            error: e && e.message,
            description: `[unserializable]`,
          }
        }
      }
      return t
    }
    function t(t, n, r) {
      r === void 0 && (r = `*`)
      try {
        t.postMessage(n, r)
      } catch (i) {
        if (i.name === `DataCloneError` || (i.message && i.message.indexOf(`clone`) !== -1))
          try {
            let i = e(n)
            t.postMessage(i, r)
          } catch (e) {
            try {
              t.postMessage(
                {
                  type: n && n.type,
                  $$skipSerializationError: !0,
                  error: e && e.message,
                  timestamp: Date.now(),
                },
                r,
              )
            } catch {}
          }
        else throw i
      }
    }
    function n(e) {
      return e[Object.keys(e).find((e) => e.startsWith(`__reactFiber$`))]
    }
    function r(e) {
      return Object.fromEntries(
        Object.entries(e)
          .filter(([t]) => {
            if (t === `children` || t === `ref`) return !1
            try {
              JSON.stringify(e[t])
            } catch {
              return !1
            }
            return !0
          })
          .map(([e, t]) => [e, typeof t == `function` ? t.toString() : t]),
      )
    }
    function i(e) {
      if (!e) return null
      if (!e.stateNode) return r(e.memoizedProps || e.pendingProps)
      let t = Object.keys(e.stateNode).find((e) => e.startsWith(`__reactProps$`))
      return t ? r(e.stateNode[t]) : null
    }
    function a(e, t = 0) {
      let r = n(e)
      if (r == null) return null
      let i = (e) => {
          let t = e.return
          for (; t && typeof t.type != `function`; ) t = t.return
          return t
        },
        a = i(r)
      for (let e = 0; e < t; e++) a = i(a)
      return a
    }
    function o(e) {
      var t = e.getAttribute(`data-prohibitions`)
      if (t && t.includes(`editContent`)) return !0
      for (var n = e; n && n !== document.body; ) {
        if (n instanceof SVGElement) return !0
        n = n.parentElement
      }
      return !1
    }
    let s = !1,
      c = new Map()
    function l(e) {
      return (
        e &&
        e instanceof Element &&
        e.tagName?.toLowerCase() === `img` &&
        !!e.getAttribute(`data-uid`)
      )
    }
    function u(e) {
      return `[data-uid="${typeof CSS < `u` && CSS.escape ? CSS.escape(e) : e}"]`
    }
    function d(e) {
      return e
        ? Array.from(document.querySelectorAll(u(e))).filter(
            (t) => t.getAttribute(`data-uid`) === e,
          )
        : []
    }
    function f(e) {
      let t = e?.getAttribute?.(`data-uid`)
      if (!t) return
      let n = d(t).indexOf(e)
      return n >= 0 ? n : void 0
    }
    function p(e, t) {
      if (typeof document.elementsFromPoint == `function`) {
        let n = document.elementsFromPoint(e, t)
        for (let e = 0; e < n.length; e++) {
          let t = n[e]
          if (l(t)) return t
          let r = t.closest?.(`img[data-uid]`)
          if (l(r)) return r
        }
        return null
      }
      let n = document.elementFromPoint(e, t)
      return l(n) ? n : null
    }
    function m(e, t, n) {
      let r = n?.imageOnly === !0,
        i = n?.preferImg === !0 || s
      if (r || i) {
        let n = p(e, t)
        if (n) return n
        if (r) return null
      }
      let a = document.elementFromPoint(e, t)
      return !a || !(a instanceof Element) ? null : a
    }
    let h = new Map(),
      g = new Map(),
      _ = new Map(),
      v = null,
      y = null,
      b = null
    function ee() {
      ;(b && clearTimeout(b),
        (b = setTimeout(() => {
          ;((b = null), se())
        }, 50)))
    }
    function te() {
      y ||
        ((y = new MutationObserver(() => {
          v && ee()
        })),
        y.observe(document.documentElement, { childList: !0, subtree: !0 }))
    }
    function ne() {
      ;((b &&= (clearTimeout(b), null)), (y &&= (y.disconnect(), null)))
    }
    function x(e) {
      return e
        ? e.tagName?.toLowerCase() === `img`
          ? [e]
          : Array.from(e.querySelectorAll(`img`))
        : []
    }
    function re(e, t) {
      if (!e) return null
      let n = d(e),
        r = Number.isInteger(t) ? n.slice(t, t + 1) : n
      for (let e of r) {
        let t = x(e)
        for (let e of t) {
          let t = h.get(e)
          if (t?.src) return t.src
          let n = e.currentSrc || e.getAttribute(`src`) || ``
          if (n) return n
        }
      }
      return null
    }
    function ie() {
      for (let e of g.values()) e.disconnect()
      g.clear()
      for (let { cleanup: e } of _.values()) e()
      _.clear()
      for (let [e, t] of h)
        (t.src ? e.setAttribute(`src`, t.src) : e.removeAttribute(`src`),
          t.srcset == null ? e.removeAttribute(`srcset`) : e.setAttribute(`srcset`, t.srcset),
          (e.style.filter = t.styleFilter),
          (e.style.transition = t.styleTransition))
      h.clear()
    }
    function S(e) {
      let t = _.get(e)
      if (!t) return
      let n = e.getBoundingClientRect()
      ;((t.overlay.style.top = `${n.top}px`),
        (t.overlay.style.left = `${n.left}px`),
        (t.overlay.style.width = `${n.width}px`),
        (t.overlay.style.height = `${n.height}px`))
    }
    function C(e) {
      let t = _.get(e)
      t && (t.cleanup(), _.delete(e))
    }
    function w(e) {
      C(e)
      let t = document.createElement(`div`)
      ;(t.setAttribute(`data-skip-image-loading-overlay`, `true`),
        (t.style.cssText = `
      position: fixed;
      pointer-events: none;
      z-index: 2147483646;
      display: flex;
      align-items: center;
      justify-content: center;
      border-radius: ${getComputedStyle(e).borderRadius || `8px`};
      background: rgba(0, 0, 0, 0.22);
      backdrop-filter: blur(1px);
    `))
      let n = document.createElement(`div`)
      ;((n.style.cssText = `
      width: 28px;
      height: 28px;
      border-radius: 9999px;
      border: 3px solid rgba(255, 255, 255, 0.45);
      border-top-color: #fff;
      filter: drop-shadow(0 1px 2px rgba(0, 0, 0, 0.35));
    `),
        n.animate([{ transform: `rotate(0deg)` }, { transform: `rotate(360deg)` }], {
          duration: 850,
          iterations: 1 / 0,
        }),
        t.appendChild(n),
        document.body.appendChild(t))
      let r = () => S(e)
      ;(_.set(e, {
        overlay: t,
        sync: r,
        cleanup: () => {
          ;(window.removeEventListener(`scroll`, r, !0),
            window.removeEventListener(`resize`, r),
            e.removeEventListener(`load`, r),
            t.parentNode && t.parentNode.removeChild(t))
        },
      }),
        r(),
        window.addEventListener(`scroll`, r, !0),
        window.addEventListener(`resize`, r),
        e.addEventListener(`load`, r))
    }
    function ae(e, t, n, r, i) {
      let a = !!i
      if (h.has(e) && e.getAttribute(`src`) === t && a === _.has(e)) return
      h.has(e) ||
        h.set(e, {
          src: e.getAttribute(`src`) || e.currentSrc || ``,
          srcset: e.hasAttribute(`srcset`) ? e.getAttribute(`srcset`) : null,
          styleFilter: e.style.filter || ``,
          styleTransition: e.style.transition || ``,
        })
      let o = h.get(e)
      ;((e.src = t),
        e.setAttribute(`src`, t),
        e.hasAttribute(`srcset`) && e.removeAttribute(`srcset`),
        a
          ? ((e.style.filter =
              `${o?.styleFilter ? `${o.styleFilter} ` : ``}blur(4px) brightness(0.72)`.trim()),
            (e.style.transition = o?.styleTransition || `filter 160ms ease`),
            _.has(e) || w(e))
          : ((e.style.filter = o?.styleFilter || ``),
            (e.style.transition = o?.styleTransition || ``),
            C(e)))
      let s = g.get(e)
      s && s.disconnect()
      let l = new MutationObserver(() => {
        v &&
          (e.getAttribute(`src`) !== t && ((e.src = t), e.setAttribute(`src`, t)),
          e.hasAttribute(`srcset`) && e.removeAttribute(`srcset`))
      })
      ;(l.observe(e, { attributes: !0, attributeFilter: [`src`, `srcset`] }), g.set(e, l))
      let u = () => {
        let t = G(e)
        t && c.has(t) && K(t)
      }
      e.complete ? u() : e.addEventListener(`load`, u, { once: !0 })
    }
    function oe(e, t, n, r) {
      let i = d(e),
        a = Number.isInteger(n) ? i.slice(n, n + 1) : i,
        o = !1
      return (
        a.forEach((e) => {
          let n = e.getAttribute(`data-uid`)
          if (!n) return
          let i = x(e)
          i.length !== 0 &&
            i.forEach((i) => {
              ;(ae(i, t, n, e, !!r), (o = !0))
            })
        }),
        o
      )
    }
    function se() {
      if (v?.previews?.length)
        for (let e of v.previews)
          e?.elementId && e?.src && oe(e.elementId, e.src, e.instanceIndex, e.isLoading)
    }
    function ce(e, t) {
      if ((ie(), !e || !t?.length)) return ((v = null), ne(), [])
      ;((v = { previews: t }), te())
      let n = []
      for (let e of t)
        if (!(!e?.elementId || !e?.src) && oe(e.elementId, e.src, e.instanceIndex, e.isLoading)) {
          let t = { elementId: e.elementId }
          ;(Number.isInteger(e.instanceIndex) && (t.instanceIndex = e.instanceIndex), n.push(t))
        }
      return n
    }
    let T = `skip-theme-preview`,
      E = null
    function le(e) {
      return !e || Object.keys(e).length === 0
        ? ``
        : `:root {\n${((e) =>
            Object.entries(e || {}).map(([e, t]) => `  --${e}: ${t};`).join(`
`))(e)}\n}`
    }
    function ue() {
      let e = document.getElementById(T)
      return (
        e || ((e = document.createElement(`style`)), (e.id = T), document.head.appendChild(e)), e
      )
    }
    function de() {
      let e = document.getElementById(T)
      ;(e && e.remove(), (E = null), me())
    }
    function fe() {
      if (!E) return
      let e = ue()
      e.textContent = le(E)
    }
    function pe(e, t) {
      return (de(), e ? ((E = t || {}), fe(), me(), !0) : !0)
    }
    let D = new Map()
    function me() {
      D.clear()
    }
    let he = new Set([
        `text-xs`,
        `text-sm`,
        `text-base`,
        `text-lg`,
        `text-xl`,
        `text-2xl`,
        `text-3xl`,
        `text-4xl`,
        `text-5xl`,
        `text-6xl`,
        `text-7xl`,
        `text-8xl`,
        `text-9xl`,
      ]),
      ge = [
        `text-left`,
        `text-center`,
        `text-right`,
        `text-justify`,
        `text-start`,
        `text-end`,
        `text-wrap`,
        `text-nowrap`,
        `text-balance`,
        `text-pretty`,
        `text-ellipsis`,
        `text-clip`,
        `text-transparent`,
        `text-underline`,
        `text-overline`,
        `text-line-through`,
        `text-no-underline`,
        `text-indent-`,
        `text-decoration-`,
      ]
    function _e(e) {
      return he.has(e) ? !0 : ge.some((t) => e === t || e.startsWith(t))
    }
    function ve(e) {
      if (!e) return !1
      for (let t of e.split(/\s+/)) {
        if (!t) continue
        let { utility: e, variantPrefix: n } = ze(t)
        if (!n && e.startsWith(`text-`) && !_e(e)) return !0
      }
      return !1
    }
    let ye = new Set([`svg`, `path`, `script`, `style`, `img`, `input`, `textarea`, `select`])
    function be(e) {
      for (let t of e.childNodes)
        if (t.nodeType === Node.TEXT_NODE && t.textContent?.trim()) return !0
      return !1
    }
    function xe(e) {
      return !(e instanceof Element) || !e.innerText?.trim() ? !1 : be(e)
    }
    function Se(e) {
      return e.filter((t) => !e.some((e) => e !== t && t.contains(e)) || be(t))
    }
    let O = {
      background: [`bg-background`, `from-background`, `to-background`, `via-background`],
      foreground: [
        `text-foreground`,
        `from-foreground`,
        `to-foreground`,
        `via-foreground`,
        `fill-foreground`,
        `stroke-foreground`,
        `decoration-foreground`,
      ],
      primary: [
        `bg-primary`,
        `text-primary`,
        `border-primary`,
        `ring-primary`,
        `fill-primary`,
        `stroke-primary`,
        `from-primary`,
        `to-primary`,
        `via-primary`,
        `shadow-primary`,
      ],
      'primary-foreground': [
        `bg-primary-foreground`,
        `text-primary-foreground`,
        `border-primary-foreground`,
        `ring-primary-foreground`,
        `fill-primary-foreground`,
        `stroke-primary-foreground`,
      ],
      secondary: [
        `bg-secondary`,
        `text-secondary`,
        `border-secondary`,
        `ring-secondary`,
        `fill-secondary`,
        `stroke-secondary`,
      ],
      'secondary-foreground': [
        `bg-secondary-foreground`,
        `text-secondary-foreground`,
        `border-secondary-foreground`,
        `ring-secondary-foreground`,
      ],
      muted: [`bg-muted`, `text-muted`, `border-muted`, `ring-muted`],
      'muted-foreground': [
        `bg-muted-foreground`,
        `text-muted-foreground`,
        `border-muted-foreground`,
      ],
      accent: [`bg-accent`, `text-accent`, `border-accent`, `ring-accent`, `fill-accent`],
      'accent-foreground': [
        `bg-accent-foreground`,
        `text-accent-foreground`,
        `border-accent-foreground`,
        `ring-accent-foreground`,
      ],
      destructive: [
        `bg-destructive`,
        `text-destructive`,
        `border-destructive`,
        `ring-destructive`,
        `fill-destructive`,
      ],
      'destructive-foreground': [
        `bg-destructive-foreground`,
        `text-destructive-foreground`,
        `border-destructive-foreground`,
      ],
      card: [`bg-card`, `text-card`, `border-card`, `ring-card`],
      'card-foreground': [`bg-card-foreground`, `text-card-foreground`, `border-card-foreground`],
      popover: [`bg-popover`, `text-popover`, `border-popover`, `ring-popover`],
      'popover-foreground': [
        `bg-popover-foreground`,
        `text-popover-foreground`,
        `border-popover-foreground`,
      ],
      border: [`border-border`, `divide-border`, `ring-border`],
      input: [`border-input`, `bg-input`, `ring-input`],
      ring: [`ring-ring`, `focus-visible:ring-ring`],
      radius: [`rounded`],
    }
    function k(e) {
      return e === `foreground` || e.endsWith(`-foreground`)
    }
    function Ce(e) {
      return e === `foreground` ? null : e.endsWith(`-foreground`) ? e.slice(0, -11) : null
    }
    function A(e) {
      return !!window.getComputedStyle(document.documentElement).getPropertyValue(`--${e}`).trim()
    }
    function we(e) {
      if (D.has(e)) return D.get(e)
      let t = null
      if (e === `foreground`)
        A(`foreground`) && (t = window.getComputedStyle(document.body).color || null)
      else if (k(e) && A(e)) {
        let n = window.getComputedStyle(document.documentElement).getPropertyValue(`--${e}`).trim()
        if (n) {
          let e = document.createElement(`span`)
          ;((e.style.cssText =
            `position:absolute;visibility:hidden;pointer-events:none;color:hsl(` + n + `)`),
            document.body.appendChild(e),
            (t = window.getComputedStyle(e).color || null),
            document.body.removeChild(e))
        }
      }
      return (D.set(e, t), t)
    }
    function Te(e, t) {
      if (!t) return !0
      let n = O[t],
        r = [`text-${t}-foreground`],
        i = e.parentElement
      for (; i; ) {
        let e = H(i)
        if ((n && B(e, n)) || B(e, r)) return !0
        i = i.parentElement
      }
      return !1
    }
    function Ee(e, t) {
      if (!(e instanceof Element)) return !1
      let n = e.tagName.toLowerCase()
      if (ye.has(n) || !A(t) || ve(H(e)) || !xe(e)) return !1
      let r = Ce(t)
      if (r && !Te(e, r)) return !1
      let i = we(t)
      return i ? window.getComputedStyle(e).color === i : !1
    }
    function De(e, t, n = `all`) {
      let r = H(e),
        i = R(n),
        a = O[t]
      if (!a) return !1
      let o = L(r, a)
      if (i === `all`) {
        if (o.length > 0) return !0
      } else if (i === `none`) {
        if (o.some((e) => e.variantPrefix === null)) return !0
      } else if (o.some((e) => z(e.variantPrefix, i))) return !0
      return i !== `all` && i !== `none` ? !1 : Ee(e, t)
    }
    function Oe(e) {
      let t = e.getBoundingClientRect()
      return { top: t.top + window.scrollY, left: t.left + window.scrollX }
    }
    function ke(e, t) {
      let n = Oe(e),
        r = Oe(t)
      if (n.top !== r.top) return n.top - r.top
      if (n.left !== r.left) return n.left - r.left
      if (e === t) return 0
      let i = e.compareDocumentPosition(t)
      return i & Node.DOCUMENT_POSITION_FOLLOWING
        ? -1
        : i & Node.DOCUMENT_POSITION_PRECEDING
          ? 1
          : 0
    }
    function Ae(e) {
      return [...e].sort(ke)
    }
    function je(e) {
      if ((e !== `background` && e !== `foreground`) || !A(e)) return []
      let t = document.body || document.documentElement
      return !t || !V(t) ? [] : [t]
    }
    function Me(e, t = `all`) {
      let n = R(t),
        r = [],
        i = document.createTreeWalker(document.body, NodeFilter.SHOW_ELEMENT)
      for (; i.nextNode(); ) {
        let t = i.currentNode
        if (V(t) && U(t, e, n) && (r.push(t), r.length >= 200)) break
      }
      return k(e) ? Ae(Se(r)).slice(0, 50) : Ae(r).slice(0, 50)
    }
    let j = [],
      M = null,
      N = -1,
      P = !0,
      F = null,
      Ne = `
    position: fixed;
    pointer-events: none;
    z-index: 2147483644;
  `,
      Pe = `skip-theme-token-highlight-styles`
    function Fe() {
      if (document.getElementById(Pe)) return
      let e = document.createElement(`style`)
      ;((e.id = Pe),
        (e.textContent = `
      @keyframes skip-theme-token-highlight-focus {
        0% {
          box-shadow: 0 0 0 0 rgba(56, 189, 248, 0.95);
          transform: translate3d(0, 0, 0);
        }
        20% {
          box-shadow: 0 0 0 8px rgba(56, 189, 248, 0.35);
          transform: translate3d(-3px, 0, 0);
        }
        40% {
          transform: translate3d(3px, 0, 0);
        }
        60% {
          transform: translate3d(-2px, 0, 0);
        }
        80% {
          transform: translate3d(2px, 0, 0);
          box-shadow: 0 0 0 4px rgba(56, 189, 248, 0.5);
        }
        100% {
          box-shadow: 0 0 0 2px rgba(56, 189, 248, 0.55);
          transform: translate3d(0, 0, 0);
        }
      }
    `),
        document.head.appendChild(e))
    }
    function Ie(e) {
      e &&
        (Fe(),
        (e.style.animation = `none`),
        e.offsetWidth,
        (e.style.animation = `skip-theme-token-highlight-focus 700ms ease-out`))
    }
    function Le(e, t) {
      let n = t ? `dashed` : `solid`
      return e
        ? `${Ne}
        border: 2px ${n} rgb(56, 189, 248);
        background: transparent;
        box-shadow: 0 0 0 2px rgba(56, 189, 248, 0.55);
      `
        : `${Ne}
      border: 2px ${n} rgba(245, 158, 11, 0.75);
      background: transparent;
      box-shadow: none;
    `
    }
    function I() {
      j.forEach((e, t) => {
        let n = t === N,
          r = P || n
        ;((e.box.style.cssText = Le(n, e.isVariantOnly)),
          (e.box.style.display = r ? `block` : `none`))
      })
    }
    function Re(e) {
      return (
        (P = !!e),
        j.length === 0 ? { success: !0, visible: P } : (I(), W(), { success: !0, visible: P })
      )
    }
    function ze(e) {
      let t = e.trim(),
        n = t.lastIndexOf(`:`)
      return n === -1
        ? { utility: t, variantPrefix: null }
        : { utility: t.slice(n + 1), variantPrefix: t.slice(0, n) }
    }
    function Be(e, t) {
      return e === t || e.startsWith(`${t}/`)
    }
    function Ve(e, t, n) {
      return n.includes(`:`) ? e === n || e.startsWith(`${n}/`) : Be(t, n)
    }
    function He(e, t) {
      if (t.includes(`:`)) return e === t || e.startsWith(`${t}/`)
      let { utility: n } = ze(e)
      return n ? Be(n, t) : !1
    }
    function L(e, t) {
      let n = []
      for (let r of e.split(/\s+/)) {
        if (!r) continue
        let { utility: e, variantPrefix: i } = ze(r),
          a = t.filter((t) => Ve(r, e, t))
        if (a.length === 0) continue
        let o = a.some((e) => e.includes(`:`))
        n.push({ className: r, variantPrefix: o ? null : i })
      }
      return n
    }
    function Ue(e) {
      let t = e.match(/\[state=([^\]]+)\]/)
      if (t?.[1]) return t[1]
      let n = e.split(`:`)
      return n[n.length - 1] || e
    }
    function We(e) {
      return e
        ? e === `hover` || e.endsWith(`:hover`) || e.split(`:`).includes(`hover`)
          ? `hover`
          : e.includes(`[state=selected]`) ||
              e === `selected` ||
              e.endsWith(`:selected`) ||
              e.split(`:`).includes(`selected`)
            ? `selected`
            : Ue(e)
        : `none`
    }
    function R(e) {
      return e === `all` || e === `none` || (typeof e == `string` && e.length > 0) ? e : `none`
    }
    function z(e, t) {
      return t === `all` ? !0 : t === `none` ? !e : e ? We(e) === t : !1
    }
    function Ge(e) {
      let t = O[e]
      if (!t) return [`none`]
      let n = new Set(),
        r = document.createTreeWalker(document.body, NodeFilter.SHOW_ELEMENT)
      for (; r.nextNode(); ) {
        let e = r.currentNode
        if (!V(e)) continue
        let i = L(H(e), t)
        if (i.length !== 0) for (let e of i) n.add(We(e.variantPrefix))
      }
      return (n.size === 0 && n.add(`none`), [...n])
    }
    function Ke(e, t, n = `all`) {
      let r = O[t]
      if (!r) return null
      let i = L(H(e), r)
      if (i.length === 0) return null
      let a = R(n),
        o = a === `all` ? i : i.filter((e) => z(e.variantPrefix, a))
      if (o.length === 0) return null
      let s = o.some((e) => !e.variantPrefix),
        c = o.find((e) => !e.variantPrefix) ?? o[0]
      return {
        isVariantOnly: !s,
        activeVariantLabel: c.variantPrefix ? Ue(c.variantPrefix) : null,
        activeMatchingClass: c.className,
      }
    }
    function B(e, t) {
      return !e || typeof e != `string` ? !1 : L(e, t).length > 0
    }
    function V(e) {
      if (!(e instanceof Element)) return !1
      let t = e.getBoundingClientRect()
      if (t.width <= 0 && t.height <= 0) return !1
      let n = window.getComputedStyle(e)
      return !(n.display === `none` || n.visibility === `hidden`)
    }
    function H(e) {
      return typeof e.className == `string`
        ? e.className
        : e.className && typeof e.className.baseVal == `string`
          ? e.className.baseVal
          : ``
    }
    function qe(e) {
      if (!(e instanceof Element)) return !1
      let t = e.tagName.toLowerCase()
      return ![`input`, `textarea`, `select`, `button`].includes(t) && B(H(e), O.background)
    }
    function U(e, t, n = `all`) {
      if (t === `background`) {
        let t = R(n)
        return t !== `all` &&
          t !== `none` &&
          !L(H(e), O.background).some((e) => z(e.variantPrefix, t))
          ? !1
          : qe(e)
      }
      if (k(t)) return De(e, t, n)
      let r = O[t]
      if (!r) return !1
      let i = H(e),
        a = R(n)
      return a === `all` ? B(i, r) : L(i, r).some((e) => z(e.variantPrefix, a))
    }
    function Je(e) {
      if (!O[e]) return 0
      let t = [],
        n = document.createTreeWalker(document.body, NodeFilter.SHOW_ELEMENT)
      for (; n.nextNode(); ) {
        let r = n.currentNode
        V(r) && U(r, e) && t.push(r)
      }
      let r = k(e) ? Se(t).length : t.length
      return r === 0 && je(e).length > 0 ? 1 : r
    }
    function Ye(e, t = `all`) {
      if (!O[e]) return []
      let n = R(t),
        r = Me(e, n)
      return r.length === 0 && n === `all` ? je(e) : r
    }
    function Xe(e) {
      return e ? { success: !0, matchedCount: Je(e) } : { success: !0, matchedCount: 0 }
    }
    function Ze(e) {
      let t = Array.isArray(e) ? e : [],
        n = {}
      for (let e of t) n[e] = 0
      let r = t.filter((e) => O[e])
      if (r.length === 0) return { success: !0, counts: n }
      let i = document.createTreeWalker(document.body, NodeFilter.SHOW_ELEMENT),
        a = new Map()
      for (let e of r) k(e) && a.set(e, [])
      for (; i.nextNode(); ) {
        let e = i.currentNode
        if (V(e))
          for (let t of r) {
            if (k(t)) {
              U(e, t) && a.get(t).push(e)
              continue
            }
            U(e, t) && (n[t] += 1)
          }
      }
      for (let [e, t] of a) n[e] = Se(t).length
      for (let e of r) n[e] === 0 && je(e).length > 0 && (n[e] = 1)
      return { success: !0, counts: n }
    }
    function Qe(e, t) {
      return !e || !t ? `Tipo: sem seletor` : `Tipo: ${t}`
    }
    function $e(e, t) {
      return !(!e || !t)
    }
    function et() {
      ;(F?.parentNode && F.parentNode.removeChild(F), (F = null))
    }
    function tt() {
      let e = j[N]
      if (!e) {
        et()
        return
      }
      if (!$e(e.activeMatchingClass, e.activeVariantLabel)) {
        et()
        return
      }
      ;(F ||
        ((F = document.createElement(`div`)),
        (F.style.cssText = `
        position: fixed;
        pointer-events: none;
        z-index: 2147483645;
        background: rgba(56, 189, 248, 0.85);
        color: white;
        padding: 2px 6px;
        font-size: 11px;
        font-weight: 500;
        font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
        border-radius: 3px;
        white-space: nowrap;
        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
      `),
        document.body.appendChild(F)),
        (F.textContent = Qe(e.activeMatchingClass, e.activeVariantLabel)),
        (F.style.display = `block`))
      let t = e.element.getBoundingClientRect()
      ;(t.top < 25 ? (F.style.top = `${t.top + 2}px`) : (F.style.top = `${t.top - 20}px`),
        (F.style.left = `${t.left}px`))
    }
    function W() {
      for (let e of j) {
        let t = e.element.getBoundingClientRect()
        ;((e.box.style.top = `${t.top}px`),
          (e.box.style.left = `${t.left}px`),
          (e.box.style.width = `${t.width}px`),
          (e.box.style.height = `${t.height}px`))
      }
      tt()
    }
    function nt() {
      for (let e of j) e.box && e.box.parentNode && e.box.parentNode.removeChild(e.box)
      ;((j = []),
        (N = -1),
        et(),
        (M &&=
          (window.removeEventListener(`scroll`, M.scroll, !0),
          window.removeEventListener(`resize`, M.resize),
          null)))
    }
    function rt(e) {
      if (!e) return
      for (let t = e.parentElement; t; t = t.parentElement) {
        let n = window.getComputedStyle(t).overflowY
        if (
          (n === `auto` || n === `scroll` || n === `overlay`) &&
          t.scrollHeight > t.clientHeight + 1
        ) {
          let n = e.getBoundingClientRect(),
            r = t.getBoundingClientRect(),
            i = 0
          if (
            (n.top < r.top + 24
              ? (i = n.top - (r.top + 24))
              : n.bottom > r.bottom - 24 && (i = n.bottom - (r.bottom - 24)),
            i !== 0)
          ) {
            t.scrollBy({ top: i, behavior: `smooth` })
            return
          }
        }
      }
      let t = e.getBoundingClientRect(),
        n = window.innerHeight,
        r = 0
      ;(t.top < 24 ? (r = t.top - 24) : t.bottom > n - 24 && (r = t.bottom - (n - 24)),
        r !== 0 && window.scrollBy({ top: r, behavior: `smooth` }))
    }
    function it(e) {
      if (!e) return
      let n = e.getBoundingClientRect()
      t(window.top, {
        type: `preview:theme-token-highlight-scroll`,
        rect: { top: n.top, left: n.left, width: n.width, height: n.height },
        timestamp: Date.now(),
      })
    }
    function at(e) {
      let t = j[e]
      return {
        success: !0,
        activeIndex: e,
        matchedCount: j.length,
        activeVariantLabel: t?.activeVariantLabel ?? null,
        activeMatchingClass: t?.activeMatchingClass ?? null,
      }
    }
    function ot(e) {
      if (j.length === 0)
        return (
          (N = -1),
          {
            success: !0,
            activeIndex: -1,
            matchedCount: 0,
            activeVariantLabel: null,
            activeMatchingClass: null,
          }
        )
      if (e < 0)
        return (
          (N = -1),
          I(),
          W(),
          {
            success: !0,
            activeIndex: -1,
            matchedCount: j.length,
            activeVariantLabel: null,
            activeMatchingClass: null,
          }
        )
      let t = ((e % j.length) + j.length) % j.length
      ;((N = t), I(), W())
      let n = j[t]
      return (Ie(n?.box), rt(n?.element), it(n?.element), at(t))
    }
    function st(e, t = -1, n = `none`) {
      if ((nt(), !e))
        return {
          success: !0,
          matchedCount: 0,
          activeIndex: -1,
          activeVariantLabel: null,
          activeMatchingClass: null,
          availableVariantFilters: [],
        }
      let r = Ge(e),
        i = R(n),
        a = Ye(e, i)
      for (let t of a) {
        let n = Ke(t, e, i),
          r = document.createElement(`div`)
        ;((r.style.cssText = Le(!1, n?.isVariantOnly ?? !1)),
          document.body.appendChild(r),
          j.push({
            element: t,
            box: r,
            isVariantOnly: n?.isVariantOnly ?? !1,
            activeVariantLabel: n?.activeVariantLabel ?? null,
            activeMatchingClass: n?.activeMatchingClass ?? null,
          }))
      }
      if (j.length > 0) {
        W()
        let e = () => W(),
          n = () => W()
        return (
          window.addEventListener(`scroll`, e, !0),
          window.addEventListener(`resize`, n),
          (M = { scroll: e, resize: n }),
          t < 0
            ? ((N = -1),
              I(),
              W(),
              {
                success: !0,
                matchedCount: j.length,
                activeIndex: -1,
                activeVariantLabel: null,
                activeMatchingClass: null,
                availableVariantFilters: r,
              })
            : { ...ot(Math.min(t, j.length - 1)), availableVariantFilters: r }
        )
      }
      return {
        success: !0,
        matchedCount: 0,
        activeIndex: -1,
        activeVariantLabel: null,
        activeMatchingClass: null,
        availableVariantFilters: r,
      }
    }
    globalThis.__skipTestExports === void 0 &&
      window.addEventListener(`load`, () => {
        ;(se(), fe())
      })
    function ct(e) {
      let t = a(e),
        r = null
      return (
        t && (r = { displayName: t.type.displayName, name: t.type.name, props: i(t) }),
        {
          id: e.getAttribute(`data-uid`),
          instanceIndex: f(e),
          htmlId: e.id || ``,
          tagName: e.tagName.toLowerCase(),
          className: typeof e.className == `string` ? e.className : e.className?.baseVal || ``,
          renderedHTML: e.outerHTML,
          props: i(n(e)),
          content: e.outerHTML.replace(/^<[^>]*>|<[^>]*>$/g, ``),
          prohibitions:
            e
              .getAttribute(`data-prohibitions`)
              ?.substring(1)
              ?.substring(0, e.getAttribute(`data-prohibitions`).length - 2)
              ?.split(`,`) || [],
          parent: {
            id: e.parentElement?.getAttribute(`data-uid`) || ``,
            tagName: e.parentElement?.tagName.toLowerCase() || ``,
            parentComponent: r,
          },
          children: Array.from(e.children).map((e) => ({
            id: e.getAttribute(`data-uid`),
            tagName: e.tagName.toLowerCase(),
          })),
        }
      )
    }
    function lt() {
      for (let e of c.values())
        for (let t of e)
          (t.box && t.box.parentNode && t.box.parentNode.removeChild(t.box),
            t.box &&
              t.box._skipMultiHighlightListeners &&
              (window.removeEventListener(`scroll`, t.box._skipMultiHighlightListeners.scroll, !0),
              window.removeEventListener(`resize`, t.box._skipMultiHighlightListeners.resize)))
      c.clear()
    }
    function G(e) {
      let t = e?.getAttribute?.(`data-uid`)
      if (!t) return null
      let n = f(e)
      return Number.isInteger(n) ? `${t}#${n}` : t
    }
    function K(e) {
      let t = c.get(e)
      if (t)
        for (let e of t) {
          let t = e.element.getBoundingClientRect()
          ;((e.box.style.top = `${t.top}px`),
            (e.box.style.left = `${t.left}px`),
            (e.box.style.width = `${t.width}px`),
            (e.box.style.height = `${t.height}px`))
        }
    }
    function ut(e) {
      if (!e.getAttribute(`data-uid`)) return null
      let t = G(e)
      if (!t) return null
      if (c.has(t)) {
        let e = c.get(t)
        for (let t of e)
          (t.box && t.box.parentNode && t.box.parentNode.removeChild(t.box),
            t.box &&
              t.box._skipMultiHighlightListeners &&
              (window.removeEventListener(`scroll`, t.box._skipMultiHighlightListeners.scroll, !0),
              window.removeEventListener(`resize`, t.box._skipMultiHighlightListeners.resize)))
        return (c.delete(t), `removed`)
      }
      let n = [e],
        r = []
      if (
        (n.forEach((e) => {
          if (e.tagName?.toLowerCase() !== `img`) return
          let t = document.createElement(`div`)
          ;((t.style.cssText = `
        position: fixed;
        pointer-events: none;
        z-index: 2147483645;
        border: 2px solid rgba(99, 102, 241, 0.85);
        box-shadow: 0 0 0 1px rgba(0, 0, 0, 0.1);
        transition: all 0.05s ease;
      `),
            document.body.appendChild(t),
            r.push({ element: e, box: t }))
        }),
        r.length > 0)
      ) {
        ;(c.set(t, r), K(t))
        let e = () => K(t),
          n = () => K(t)
        return (
          window.addEventListener(`scroll`, e, !0),
          window.addEventListener(`resize`, n),
          (r[0].box._skipMultiHighlightListeners = { scroll: e, resize: n }),
          `added`
        )
      }
      return null
    }
    let q = null,
      J = null
    function dt() {
      J ||
        ((J = document.createElement(`div`)),
        (J.style.cssText = `
      position: fixed;
      pointer-events: none;
      z-index: 2147483646;
      border: 2px solid rgba(78, 70, 229, 0.7);
      box-shadow: 0 0 0 1px rgba(0, 0, 0, 0.1);
      transition: all 0.05s ease;
      display: none;
    `),
        document.body.appendChild(J))
    }
    function ft() {
      ;(q &&
        q._skipHighlightUpdateListeners &&
        (window.removeEventListener(`scroll`, q._skipHighlightUpdateListeners.scroll, !0),
        window.removeEventListener(`resize`, q._skipHighlightUpdateListeners.resize),
        delete q._skipHighlightUpdateListeners),
        J && (J.style.display = `none`),
        (q = null))
    }
    function Y(e) {
      if (q !== e || !J) return
      let n = e.getBoundingClientRect()
      ;((J.style.top = `${n.top}px`),
        (J.style.left = `${n.left}px`),
        (J.style.width = `${n.width}px`),
        (J.style.height = `${n.height}px`))
      let r = e.getAttribute(`data-uid`),
        i = f(e)
      t(window.top, {
        type: `preview:visual-editor:update-rect`,
        elementId: r,
        ...(Number.isInteger(i) ? { instanceIndex: i } : {}),
        rect: { top: n.top, left: n.left, width: n.width, height: n.height },
        timestamp: Date.now(),
      })
    }
    function pt(e) {
      if ((dt(), ft(), !e || !J)) return
      let t = e.getBoundingClientRect()
      ;((J.style.display = `block`),
        (J.style.top = `${t.top}px`),
        (J.style.left = `${t.left}px`),
        (J.style.width = `${t.width}px`),
        (J.style.height = `${t.height}px`),
        (q = e),
        e._skipHighlightUpdateListeners &&
          (window.removeEventListener(`scroll`, e._skipHighlightUpdateListeners.scroll, !0),
          window.removeEventListener(`resize`, e._skipHighlightUpdateListeners.resize)))
      let n = () => Y(e),
        r = () => Y(e)
      ;(window.addEventListener(`scroll`, n, !0),
        window.addEventListener(`resize`, r),
        (e._skipHighlightUpdateListeners = { scroll: n, resize: r }))
    }
    function mt({
      onElementSelected: e,
      onCancel: r,
      onElementDoubleClicked: i,
      getEditableElement: a,
    }) {
      if (!e) return
      let l = null,
        u = null,
        d = null
      ;((d = document.createElement(`style`)),
        (d.textContent = `
      * {
        cursor: crosshair !important;
      }
    `),
        document.head.appendChild(d),
        (l = document.createElement(`div`)),
        (l.style.cssText = `
      position: fixed;
      pointer-events: none;
      z-index: 2147483647;
      border: 2px solid rgba(78, 70, 229, 0.5);
      background: rgba(78, 70, 229, 0.1);
      box-shadow: 0 0 0 1px rgba(0, 0, 0, 0.1);
      transition: all 0.05s ease;
      display: none;
    `),
        (u = document.createElement(`div`)),
        (u.style.cssText = `
      position: fixed;
      pointer-events: none;
      z-index: 2147483648;
      background:rgba(78, 70, 229, 0.5);
      color: white;
      padding: 2px 6px;
      font-size: 11px;
      font-weight: 500;
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
      border-radius: 3px;
      white-space: nowrap;
      display: none;
      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
    `),
        document.body.appendChild(l),
        document.body.appendChild(u))
      function f(e) {
        let t = n(e)
        if (t && typeof t.type == `function`)
          return `<${t.type.displayName || t.type.name || e.tagName.toLowerCase()}>`
        if (t && t.return && typeof t.return.type == `function`)
          return `<${t.return.type.displayName || t.return.type.name || e.tagName.toLowerCase()}>`
        let r = `<${e.tagName.toLowerCase()} `
        if (e.id) r += ` id="${e.id}"`
        else if (e.className && typeof e.className == `string`) {
          let t = e.className.split(` `).slice(0, 3).join(` `)
          t && (r += ` class="${t}"`)
        }
        return r + `>`
      }
      function p(e) {
        if (!e || e === l || e === u) {
          ;((l.style.display = `none`), (u.style.display = `none`))
          return
        }
        let t = e.getBoundingClientRect(),
          n = f(e),
          r = o(e)
        ;(r
          ? ((l.style.border = `2px solid rgba(249, 115, 22, 0.5)`),
            (l.style.background = `rgba(249, 115, 22, 0.1)`),
            (u.style.background = `rgba(249, 115, 22, 0.5)`))
          : ((l.style.border = `2px solid rgba(78, 70, 229, 0.5)`),
            (l.style.background = `rgba(78, 70, 229, 0.1)`),
            (u.style.background = `rgba(78, 70, 229, 0.5)`)),
          (l.style.display = `block`),
          (l.style.top = `${t.top}px`),
          (l.style.left = `${t.left}px`),
          (l.style.width = `${t.width}px`),
          (l.style.height = `${t.height}px`),
          (u.textContent = (r ? `` : `✏️ `) + n),
          (u.style.display = `block`),
          t.top < 25 ? (u.style.top = `${t.top + 2}px`) : (u.style.top = `${t.top - 20}px`),
          (u.style.left = `${t.left}px`))
      }
      function h(e) {
        let t = m(e.clientX, e.clientY, { preferImg: s }),
          n = a?.()
        if (n && n.contains(t)) {
          ;((l.style.display = `none`), (u.style.display = `none`))
          return
        }
        t && t !== l && t !== u && p(t)
      }
      function g(n) {
        let r = a?.()
        if (r && r.contains(n.target)) return
        ;(n.preventDefault(), n.stopPropagation())
        let i = m(n.clientX, n.clientY, { imageOnly: !0 })
        if (s && i) {
          let e = i.getAttribute(`data-uid`),
            r = G(i),
            a = !!(r && c.has(r)),
            o = n.ctrlKey || n.metaKey,
            s = null
          if ((o ? (s = ut(i)) : a || (s = ut(i)), s)) {
            let n = i.getBoundingClientRect()
            t(window.top, {
              type: `preview:element-picker:image-multi-select`,
              element: ct(i),
              instancesCount: document.querySelectorAll(`[data-uid="${e}"]`).length,
              rect: { top: n.top, left: n.left, width: n.width, height: n.height },
              action: s,
              timestamp: Date.now(),
            })
          }
          ;(pt(i), (q = i))
          return
        }
        y()
        let o = document.elementFromPoint(n.clientX, n.clientY)
        e && o && e(o)
      }
      function _(e) {
        e.key === `Escape` && (y(), r && r())
      }
      function v(t) {
        let n = a?.()
        if (n && n.contains(t.target)) return
        ;(t.preventDefault(), t.stopPropagation())
        let r = document.elementFromPoint(t.clientX, t.clientY)
        ;(y(), r && (e(r), i && i(r)))
      }
      function y() {
        ;(document.removeEventListener(`mousemove`, h, !0),
          document.removeEventListener(`click`, g, !0),
          document.removeEventListener(`dblclick`, v, !0),
          document.removeEventListener(`keydown`, _),
          l && l.parentNode && l.parentNode.removeChild(l),
          u && u.parentNode && u.parentNode.removeChild(u),
          d && d.parentNode && d.parentNode.removeChild(d),
          (l = null),
          (u = null),
          (d = null))
      }
      return (
        document.addEventListener(`mousemove`, h, !0),
        document.addEventListener(`click`, g, !0),
        document.addEventListener(`dblclick`, v, !0),
        document.addEventListener(`keydown`, _),
        { cancel: y }
      )
    }
    let ht = `skip-preview-scroll-restore`
    function gt() {
      try {
        sessionStorage.setItem(
          ht,
          JSON.stringify({ href: window.location.href, x: window.scrollX, y: window.scrollY }),
        )
      } catch {}
    }
    function _t() {
      try {
        let e = sessionStorage.getItem(ht)
        if (!e) return
        let t = JSON.parse(e)
        if ((sessionStorage.removeItem(ht), !t || t.href !== window.location.href)) return
        let n = () => {
          window.scrollTo(t.x ?? 0, t.y ?? 0)
        }
        ;(n(),
          requestAnimationFrame(n),
          window.addEventListener(`load`, n, { once: !0 }),
          setTimeout(n, 50),
          setTimeout(n, 150),
          setTimeout(n, 400))
      } catch {}
    }
    function vt() {
      if (!$()) return
      let e,
        r = null,
        u = null,
        m = null
      ;(document.addEventListener(
        `click`,
        function (e) {
          q && (e.target.closest(`a`) || e.target.closest(`button`)) && e.preventDefault()
        },
        !0,
      ),
        dt(),
        window.addEventListener(`message`, async (n) => {
          switch (n.data.type) {
            case `skip:preview-go-back`:
              window.history.back()
              break
            case `skip:preview-go-forward`:
              window.history.forward()
              break
            case `skip:preview-refresh`:
              ;(ie(), de(), gt(), window.location.replace(window.location.href))
              break
            case `skip:preview-go-to`:
              window.history.pushState({}, ``, n.data.url)
              break
            case `skip:preview-screenshot`:
              try {
                if (!window.htmlToImage) throw Error(`htmlToImage library not loaded`)
                document.readyState !== `complete` &&
                  (await new Promise((e) => {
                    window.addEventListener(`load`, e)
                  }))
                let e = await htmlToImage.toJpeg(document.documentElement, {
                  quality: 0.8,
                  pixelRatio: 0.5,
                  backgroundColor: `#ffffff`,
                  width: window.innerWidth,
                  height: window.innerHeight,
                })
                t(window.top, { type: `preview:screenshot:done`, image: e, timestamp: Date.now() })
              } catch (e) {
                t(window.top, {
                  type: `preview:screenshot:error`,
                  error: e.message,
                  timestamp: Date.now(),
                })
              }
              break
            case `skip:preview-capabilities`:
              n.data.messageId &&
                t(window.top, {
                  type: `preview:capabilities-ack`,
                  success: !0,
                  features: {
                    imageSrcPreview: !0,
                    imageDisplaySrcs: !0,
                    themeCssVarsPreview: !0,
                    themeTokenHighlight: !0,
                    themeTokenCount: !0,
                    themeTokenCountAll: !0,
                  },
                  timestamp: Date.now(),
                  messageId: n.data.messageId,
                })
              break
            case `skip:preview-theme-token-count`:
              {
                let e = Xe(n.data.token || null)
                n.data.messageId &&
                  t(window.top, {
                    type: `preview:theme-token-count-ack`,
                    success: e.success,
                    matchedCount: e.matchedCount,
                    timestamp: Date.now(),
                    messageId: n.data.messageId,
                  })
              }
              break
            case `skip:preview-theme-token-count-all`:
              {
                let e = Ze(n.data.tokens)
                n.data.messageId &&
                  t(window.top, {
                    type: `preview:theme-token-count-all-ack`,
                    success: e.success,
                    counts: e.counts,
                    timestamp: Date.now(),
                    messageId: n.data.messageId,
                  })
              }
              break
            case `skip:preview-element-image-src-preview`:
              {
                let e = ce(n.data.enabled, n.data.previews)
                n.data.messageId &&
                  t(window.top, {
                    type: `preview:element-image-src-preview-ack`,
                    success: !0,
                    appliedElements: e,
                    timestamp: Date.now(),
                    messageId: n.data.messageId,
                  })
              }
              break
            case `skip:preview-theme-token-highlight`:
              {
                let e = st(
                  n.data.token || null,
                  Number.isInteger(n.data.activeIndex) ? n.data.activeIndex : -1,
                  n.data.variantFilter,
                )
                n.data.messageId &&
                  t(window.top, {
                    type: `preview:theme-token-highlight-ack`,
                    success: e.success,
                    matchedCount: e.matchedCount,
                    activeIndex: e.activeIndex,
                    activeVariantLabel: e.activeVariantLabel,
                    activeMatchingClass: e.activeMatchingClass,
                    availableVariantFilters: e.availableVariantFilters ?? [],
                    timestamp: Date.now(),
                    messageId: n.data.messageId,
                  })
              }
              break
            case `skip:preview-theme-token-highlight-focus`:
              {
                let e = ot(n.data.index ?? 0)
                n.data.messageId &&
                  t(window.top, {
                    type: `preview:theme-token-highlight-focus-ack`,
                    success: e.success,
                    matchedCount: e.matchedCount,
                    activeIndex: e.activeIndex,
                    activeVariantLabel: e.activeVariantLabel,
                    activeMatchingClass: e.activeMatchingClass,
                    timestamp: Date.now(),
                    messageId: n.data.messageId,
                  })
              }
              break
            case `skip:preview-theme-token-highlight-overlays`:
              {
                let e = Re(n.data.visible)
                n.data.messageId &&
                  t(window.top, {
                    type: `preview:theme-token-highlight-overlays-ack`,
                    success: e.success,
                    visible: e.visible,
                    timestamp: Date.now(),
                    messageId: n.data.messageId,
                  })
              }
              break
            case `skip:preview-theme-css-vars`:
              {
                let e = pe(n.data.enabled, n.data.variables)
                n.data.messageId &&
                  t(window.top, {
                    type: `preview:theme-css-vars-ack`,
                    success: e,
                    timestamp: Date.now(),
                    messageId: n.data.messageId,
                  })
              }
              break
            case `skip:preview-element-image-display-srcs`:
              {
                let e = Array.isArray(n.data.elements)
                    ? n.data.elements
                    : Array.isArray(n.data.elementIds)
                      ? n.data.elementIds.map((e) => ({ elementId: e }))
                      : [],
                  r = []
                for (let t of e) {
                  let e = typeof t == `string` ? t : t?.elementId,
                    n = typeof t == `string` ? void 0 : t?.instanceIndex
                  if (!e) continue
                  let i = re(e, n)
                  if (i) {
                    let t = { elementId: e, src: i }
                    ;(Number.isInteger(n) && (t.instanceIndex = n), r.push(t))
                  }
                }
                t(window.top, {
                  type: `preview:element-image-display-srcs-ack`,
                  success: !0,
                  srcs: r,
                  timestamp: Date.now(),
                  messageId: n.data.messageId,
                })
              }
              break
            case `skip:preview-element-picker-image-multi-mode`:
              if (((s = !!n.data.enabled), s)) {
                lt()
                let e = Array.isArray(n.data.selectedElements)
                  ? n.data.selectedElements
                  : Array.isArray(n.data.selectedElementIds)
                    ? n.data.selectedElementIds.map((e) => ({ elementId: e }))
                    : []
                for (let t of e) {
                  let e = typeof t == `string` ? t : t?.elementId,
                    n = typeof t == `string` ? void 0 : t?.instanceIndex
                  if (!e) continue
                  let r = d(e),
                    i = Number.isInteger(n) ? r[n] : r[0],
                    a = G(i)
                  l(i) && a && !c.has(a) && ut(i)
                }
              } else lt()
              break
            case `skip:preview-element-picker-start`:
              e
                ? (e.cancel(),
                  (e = null),
                  t(window.top, {
                    type: `preview:element-picker:start-ack`,
                    success: !1,
                    timestamp: Date.now(),
                    messageId: n.data.messageId,
                  }))
                : (document.removeEventListener(`keydown`, x),
                  document.removeEventListener(`mousedown`, S),
                  (e = mt({ onElementSelected: ne, onCancel: C, getEditableElement: () => r })),
                  t(window.top, {
                    type: `preview:element-picker:start-ack`,
                    success: !0,
                    timestamp: Date.now(),
                    messageId: n.data.messageId,
                  }))
              break
            case `skip:preview-element-picker-stop`:
              ;(w(),
                ft(),
                (q = null),
                (e &&= (e.cancel(), null)),
                t(window.top, {
                  type: `preview:element-picker:stop-ack`,
                  success: !0,
                  timestamp: Date.now(),
                  messageId: n.data.messageId,
                }))
              break
            case `skip:preview-visual-editor:enable-content-edit`:
              if (!q || o(q)) {
                t(window.top, {
                  type: `preview:visual-editor:enable-content-edit-ack`,
                  success: !1,
                  timestamp: Date.now(),
                  messageId: n.data.messageId,
                })
                return
              }
              ;(w(),
                (q.contentEditable = `true`),
                (r = q),
                r.querySelectorAll(`[data-prohibitions], svg`).forEach(function (e) {
                  ;(e instanceof SVGElement ||
                    e.getAttribute(`data-prohibitions`)?.includes(`editContent`)) &&
                    (e.contentEditable = `false`)
                }),
                r.focus())
              {
                let e = window.getComputedStyle(r),
                  t = e.webkitTextFillColor || ``,
                  n = e.color
                if (
                  t === `transparent` ||
                  t === `rgba(0, 0, 0, 0)` ||
                  n === `transparent` ||
                  n === `rgba(0, 0, 0, 0)`
                ) {
                  let e = null,
                    t = r
                  for (; t; ) {
                    let n = window.getComputedStyle(t).backgroundColor
                    if (n && n !== `transparent` && n !== `rgba(0, 0, 0, 0)`) {
                      e = n
                      break
                    }
                    t = t.parentElement
                  }
                  let n = `#000`
                  if (e) {
                    let t = e.match(/\d+/g)
                    if (t) {
                      let [e, r, i] = t.map(Number)
                      n = (0.299 * e + 0.587 * r + 0.114 * i) / 255 > 0.5 ? `#000` : `#fff`
                    }
                  }
                  r.style.setProperty(`caret-color`, n, `important`)
                }
              }
              ;((m = document.createElement(`style`)),
                (m.textContent = `
            [contenteditable="true"], [contenteditable="true"] * {
              cursor: text !important;
            }
          `),
                document.head.appendChild(m))
              let i = q.innerHTML,
                a = () => {
                  ;(q.innerHTML !== i && ae(q, q.innerHTML), Y(q))
                },
                f = () => {
                  ;(q.innerHTML !== i && ae(q, q.innerHTML), Y(q))
                },
                p = (e) => {
                  ;(e.stopPropagation(), e.stopImmediatePropagation())
                }
              ;(r.addEventListener(`click`, p, { capture: !0 }),
                r.addEventListener(`input`, a),
                r.addEventListener(`blur`, f),
                document.removeEventListener(`mousedown`, S),
                (u = { input: a, blur: f, click: p }),
                t(window.top, {
                  type: `preview:visual-editor:enable-content-edit-ack`,
                  success: !0,
                  timestamp: Date.now(),
                  messageId: n.data.messageId,
                }))
              break
            case `skip:preview-visual-editor:disable-content-edit`:
              ;(w(),
                document.addEventListener(`mousedown`, S),
                t(window.top, {
                  type: `preview:visual-editor:disable-content-edit-ack`,
                  success: !0,
                  timestamp: Date.now(),
                  messageId: n.data.messageId,
                }))
              break
            case `skip:preview-visual-editor:get-element`:
              let h = oe(n.data.elementId)
              t(window.top, {
                type: `preview:visual-editor:get-element-ack`,
                success: !0,
                element: h,
                timestamp: Date.now(),
                messageId: n.data.messageId,
              })
              break
            case `skip:preview-visual-editor:edit`:
              ;(se(n.data.elementId, n.data.style),
                t(window.top, {
                  type: `preview:visual-editor:edit-ack`,
                  success: !0,
                  timestamp: Date.now(),
                  messageId: n.data.messageId,
                }))
              break
            case `skip:preview-visual-editor:edit-content`:
              ;(T(n.data.elementId, n.data.content),
                t(window.top, {
                  type: `preview:visual-editor:edit-content-ack`,
                  success: !0,
                  timestamp: Date.now(),
                  messageId: n.data.messageId,
                }))
              break
            case `skip:preview-visual-editor:delete`:
              ;(yt(n.data.elementId),
                t(window.top, {
                  type: `preview:visual-editor:delete-ack`,
                  success: !0,
                  timestamp: Date.now(),
                  messageId: n.data.messageId,
                }))
              break
          }
        }),
        window.addEventListener(`popstate`, () => {
          t(window.top, {
            type: `preview:navigate-pop`,
            url: window.location.pathname,
            timestamp: Date.now(),
          })
        }))
      let h = window.history.pushState.bind(window.history)
      window.history.pushState = function (e, n, r) {
        ;(h.call(this, e, n, r),
          t(window.top, {
            type: `preview:navigate-push`,
            url: window.location.pathname,
            timestamp: Date.now(),
          }))
      }
      let g = window.history.replaceState.bind(window.history)
      ;((window.history.replaceState = function (e, n, r) {
        ;(g(e, n, r),
          t(window.top, {
            type: `preview:navigate-replace`,
            url: window.location.pathname,
            timestamp: Date.now(),
          }))
      }),
        (window.onerror = function (e, t, n, r, i) {
          Q(`preview:error`, e, t, n, r, i)
        }),
        (window.onunhandledrejection = function (e) {
          let t = e.reason
          Q(`preview:error`, t.message, t.source, t.line, t.column, t)
        }))
      let _ = window.fetch
      window.fetch = function (...e) {
        if (document.readyState !== `complete`) return _.call(this, ...e)
        let n = Error().stack,
          r = Date.now(),
          i = {
            id: crypto.randomUUID(),
            url: typeof e[0] == `string` ? e[0] : e[0].url,
            method: typeof e[0] == `string` ? e[1]?.method || `GET` : e[0].method,
            headers: typeof e[0] == `string` ? X(e[1]?.headers) : X(e[0].headers),
            body: typeof e[0] == `string` ? (e[1] ? e[1].body : void 0) : e[0].body,
          }
        return (
          t(window.top, { type: `preview:network:request`, request: i, timestamp: r }),
          _.call(this, ...e)
            .then(
              (e) => (
                e
                  .clone()
                  .text()
                  .then((a) => {
                    let o = Date.now(),
                      s = o - r,
                      c = X(e.headers),
                      l = c[`content-type`] || `text/plain`,
                      u = a
                    l.includes(`application/json`)
                      ? (u = JSON.parse(u))
                      : l.includes(`application/x-www-form-urlencoded`) &&
                        (u = Object.fromEntries(new URLSearchParams(u)))
                    let d = {
                      id: i.id,
                      ok: e.ok,
                      status: e.status,
                      headers: c,
                      body: u,
                      bodyText: a,
                      duration: s,
                    }
                    if (
                      (t(window.top, {
                        type: `preview:network:response`,
                        response: d,
                        timestamp: o,
                      }),
                      !e.ok)
                    ) {
                      let t = Error(`Fetch Error: HTTP ${e.status} (non-OK response)`)
                      throw ((t.stack = n), t)
                    }
                  })
                  .catch((e) => {
                    Q(
                      `preview:network:response:error`,
                      e.message,
                      e.source,
                      e.line,
                      e.column,
                      e,
                      i.id,
                    )
                  }),
                e
              ),
            )
            .catch((e) => {
              throw (
                (errorMessage =
                  e.message === `Failed to fetch`
                    ? `Failed to fetch. This is usually caused by a CORS policy. Please check if the server is configured to allow CORS requests.`
                    : e.message),
                Q(
                  `preview:network:response:error`,
                  errorMessage,
                  e.source,
                  e.line,
                  e.column,
                  e,
                  i.id,
                ),
                e
              )
            })
        )
      }
      let v = console.log,
        y = console.info,
        b = console.debug,
        ee = console.warn,
        te = console.error
      ;((console.log = function (...e) {
        ;(Z(`preview:console:log`, e).then((e) => {
          t(window.top, { type: `preview:console:log`, args: e, timestamp: Date.now() })
        }),
          v.call(console, ...e))
      }),
        (console.info = function (...e) {
          ;(Z(`preview:console:log`, e).then((e) => {
            t(window.top, { type: `preview:console:log`, args: e, timestamp: Date.now() })
          }),
            y.call(console, ...e))
        }),
        (console.debug = function (...e) {
          ;(Z(`preview:console:log`, e).then((e) => {
            t(window.top, { type: `preview:console:log`, args: e, timestamp: Date.now() })
          }),
            b.call(console, ...e))
        }),
        (console.warn = function (...e) {
          ;(Z(`preview:console:warn`, e).then((e) => {
            t(window.top, { type: `preview:console:warn`, args: e, timestamp: Date.now() })
          }),
            ee.call(console, ...e))
        }),
        (console.error = function (...e) {
          ;(Z(`preview:console:error`, e).then((e) => {
            t(window.top, { type: `preview:console:error`, args: e, timestamp: Date.now() })
          }),
            te.call(console, ...e))
        }))
      function ne(o) {
        if (r && r.getAttribute(`data-uid`) === o.getAttribute(`data-uid`)) {
          ;(q.focus(), mt({ onElementSelected: ne, onCancel: C, getEditableElement: () => r }))
          return
        }
        ;(w(), pt(o), (e = null))
        let s = a(o),
          c = null
        s && (c = { displayName: s.type.displayName, name: s.type.name, props: i(s) })
        let l = {
            id: o.getAttribute(`data-uid`),
            instanceIndex: f(o),
            htmlId: o.id || ``,
            tagName: o.tagName.toLowerCase(),
            className: typeof o.className == `string` ? o.className : o.className?.baseVal || ``,
            renderedHTML: o.outerHTML,
            props: i(n(o)),
            content: o.outerHTML.replace(/^<[^>]*>|<[^>]*>$/g, ``),
            prohibitions:
              o
                .getAttribute(`data-prohibitions`)
                ?.substring(1)
                ?.substring(0, o.getAttribute(`data-prohibitions`).length - 2)
                ?.split(`,`) || [],
            parent: {
              id: o.parentElement?.getAttribute(`data-uid`) || ``,
              tagName: o.parentElement?.tagName.toLowerCase() || ``,
              parentComponent: c,
            },
            children: Array.from(o.children).map((e) => ({
              id: e.getAttribute(`data-uid`),
              tagName: e.tagName.toLowerCase(),
            })),
          },
          u = o.getBoundingClientRect()
        ;(t(window.top, {
          type: `preview:element-picker:select`,
          element: l,
          rect: u,
          timestamp: Date.now(),
        }),
          (q = o),
          document.addEventListener(`keydown`, x),
          document.addEventListener(`mousedown`, S))
      }
      function x(e) {
        e.key === `Escape` && C()
      }
      function S(e) {
        if (!(s && (p(e.clientX, e.clientY) || e.ctrlKey || e.metaKey)))
          if (q) {
            let t = q.getBoundingClientRect(),
              n = e.clientX,
              r = e.clientY
            ;(n >= t.left - 80 && n <= t.right + 80 && r >= t.top - 80 && r <= t.bottom + 80) || C()
          } else C()
      }
      function C() {
        ;((e = null),
          w(),
          ft(),
          document.removeEventListener(`keydown`, x),
          document.removeEventListener(`mousedown`, S),
          t(window.top, { type: `preview:element-picker:cancel`, timestamp: Date.now() }))
      }
      function w() {
        ;((r &&=
          ((u &&=
            (r.removeEventListener(`input`, u.input),
            r.removeEventListener(`blur`, u.blur),
            r.removeEventListener(`click`, u.click, { capture: !0 }),
            null)),
          r.querySelectorAll(`[data-prohibitions], svg`).forEach(function (e) {
            e.contentEditable === `false` && e.removeAttribute(`contenteditable`)
          }),
          (r.contentEditable = `false`),
          (r.style.cursor = ``),
          (r.style.outline = ``),
          r.style.removeProperty(`caret-color`),
          null)),
          m && m.parentNode && (m.parentNode.removeChild(m), (m = null)))
      }
      function ae(e, n) {
        let r = e.getAttribute(`data-uid`)
        r &&
          t(window.top, {
            type: `preview:visual-editor:content-edit`,
            element: { id: r, content: n, renderedHTML: e.outerHTML },
            timestamp: Date.now(),
          })
      }
      function oe(e) {
        let t = document.querySelector(`[data-uid="${e}"]`)
        return t
          ? (pt(t),
            {
              id: t.getAttribute(`data-uid`),
              htmlId: t.id || ``,
              tagName: t.tagName,
              className: typeof t.className == `string` ? t.className : t.className?.baseVal || ``,
              renderedHTML: t.outerHTML,
              props: i(n(t)),
              content: t.outerHTML.replace(/^<[^>]*>|<[^>]*>$/g, ``),
              prohibitions: t
                .getAttribute(`data-prohibitions`)
                ?.substring(1)
                ?.substring(0, t.getAttribute(`data-prohibitions`)?.length - 2)
                ?.split(`,`),
              parent: {
                id: t.parentElement?.getAttribute(`data-uid`) || ``,
                tagName: t.parentElement?.tagName || ``,
              },
              children: Array.from(t.children).map((e) => ({
                id: e.getAttribute(`data-uid`),
                tagName: e.tagName,
              })),
            })
          : null
      }
      function se(e, t) {
        let n = document.querySelectorAll(`[data-uid="${e}"]`)
        n &&
          n.forEach((e) => {
            ;(Object.entries(t).forEach(([t, n]) => {
              e.style[t] = n
            }),
              Y(e))
          })
      }
      function T(e, t) {
        let n = document.querySelectorAll(`[data-uid="${e}"]`)
        n &&
          n.forEach((e) => {
            ;((e.innerHTML = t), Y(e))
          })
      }
    }
    function yt(e) {
      let t = document.querySelectorAll(`[data-uid="${e}"]`)
      t &&
        t.forEach((e) => {
          e.remove()
        })
    }
    function bt(e, t, n, r, i, a, o, s, c = 0) {
      let l = document.querySelector(`#root`),
        u = l && l.children.length > 0
      window.sourceMappedStackTrace
        ? window.sourceMappedStackTrace.mapStackTrace(e.stack, function (c) {
            s({
              type: t,
              id: o,
              message: n,
              source: r,
              line: i,
              column: a,
              error: e && e.message,
              stack: e && e.stack,
              originalStack: c,
              hasMounted: u,
              timestamp: Date.now(),
            })
          })
        : window.$$skipStackParserFailed || c >= 50
          ? s({
              type: t,
              id: o,
              message: n,
              source: r,
              line: i,
              column: a,
              error: e && e.message,
              stack: e && e.stack,
              originalStack:
                e && e.stack
                  ? e.stack.split(`
`)
                  : [],
              hasMounted: u,
              timestamp: Date.now(),
            })
          : setTimeout(() => bt(e, t, n, r, i, a, o, s, c + 1), 100)
    }
    function X(e) {
      if (e) {
        if (e instanceof Headers) return Object.fromEntries(e.entries())
        if (typeof e == `object`) return Object.fromEntries(Object.entries(e))
      }
    }
    function Z(e, t) {
      return Promise.all(
        t.map((t) =>
          t instanceof Error
            ? new Promise((n) => bt(t, e, t.message, t.source, t.line, t.column, void 0, n))
            : Promise.resolve(t),
        ),
      )
    }
    function Q(e, n, r, i, a, o, s) {
      return (
        bt(o, e, n, r, i, a, s, (e) => {
          t(window.top, e)
        }),
        !0
      )
    }
    function xt() {
      return localStorage.getItem(`skip-badge-closed`) === `true`
    }
    function St() {
      let e = document.createElement(`style`)
      ;((e.textContent = `
      .skip-badge {
        position: fixed;
        bottom: 10px;
        right: 10px;
        z-index: 9999;
        background-color: #000;
        color: #fff;
        border-radius: 8px;
        padding: 8px 12px;
        box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
        display: flex;
        align-items: center;
        gap: 8px;
        font-size: 12px;
        font-weight: 500;
        border: 1px solid #374151;
        animation: slideInFromBottomRight 0.5s ease-out;
        font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
        cursor: pointer;
        transition: background-color 0.2s;
        text-decoration: none;
      }

      .skip-badge:hover {
        background-color: #1f1f1f;
      }

      .skip-badge img {
        width: 16px;
        height: 16px;
        object-fit: contain;
      }

      .skip-badge-close {
        margin-left: 8px;
        width: 16px;
        height: 16px;
        background: none;
        border: none;
        color: #fff;
        cursor: pointer;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        transition: background-color 0.2s;
        padding: 0;
      }

      .skip-badge-close:hover {
        background-color: #374151;
      }

      .skip-badge.hidden {
        display: none;
      }

      @keyframes slideInFromBottomRight {
        from {
          transform: translate(20px, 20px);
          opacity: 0;
        }
        to {
          transform: translate(0, 0);
          opacity: 1;
        }
      }
    `),
        document.head.appendChild(e))
    }
    function Ct() {
      let e = document.createElement(`div`)
      return (
        (e.id = `skip-badge`),
        (e.className = `skip-badge`),
        (e.innerHTML = `
      <img src="/skip.png" alt="Skip" />
      <span>Criado com o Skip</span>
      <button class="skip-badge-close" aria-label="Fechar badge">
        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <path d="M18 6L6 18M6 6l12 12"/>
        </svg>
      </button>
    `),
        e.addEventListener(`click`, wt),
        e.querySelector(`.skip-badge-close`)?.addEventListener(`click`, Tt),
        e
      )
    }
    function wt(e) {
      e.target.closest(`.skip-badge-close`) || window.open(`https://goskip.dev`, `_blank`)
    }
    function Tt(e) {
      e.stopPropagation()
      let t = document.getElementById(`skip-badge`)
      t && (t.classList.add(`hidden`), localStorage.setItem(`skip-badge-closed`, `true`))
    }
    function $() {
      return window.self !== window.top
    }
    async function Et() {
      try {
        let e = await fetch(`https://api.goskip.dev/v1/projects/config/public`)
        if (!e.ok) return null
        let { config: t } = await e.json()
        return t
      } catch (e) {
        return (console.warn(`Erro ao obter configurações do pod:`, e), null)
      }
    }
    async function Dt() {
      if (xt() || $()) return
      let e = await Et()
      if (e && e.showBadge === !1) return
      St()
      let t = Ct(e)
      document.body.appendChild(t)
    }
    let Ot = `https://beacon-analytics-system-68a34.shrd00.internal.goskip.dev/backend/v1/pixel.gif`
    function kt() {
      let e = window.location.hostname
      return e === `localhost` ||
        e === `127.0.0.1` ||
        e === `0.0.0.0` ||
        e.endsWith(`.local`) ||
        e.endsWith(`.preview.internal.goskip.dev`)
        ? !1
        : !e.includes(`--preview`)
    }
    function At() {
      if (!($() || !kt()))
        try {
          let e = new URLSearchParams()
          ;(e.set(`t`, String(Date.now())), document.referrer && e.set(`r`, document.referrer))
          let t = new URLSearchParams(window.location.search)
          for (let n of [
            `utm_source`,
            `utm_medium`,
            `utm_campaign`,
            `utm_term`,
            `utm_content`,
            `ref`,
            `gclid`,
            `fbclid`,
          ]) {
            let r = t.get(n)
            r && e.set(n, r)
          }
          new Image().src = `${Ot}?${e.toString()}`
        } catch {
          new Image().src = `${Ot}?t=${Date.now()}`
        }
    }
    function jt() {
      return window.sourceMappedStackTrace || !$()
        ? Promise.resolve()
        : new Promise((e, t) => {
            let n = document.createElement(`script`)
            ;((n.src = `https://cdn.jsdelivr.net/npm/sourcemapped-stacktrace@1.1.11/dist/sourcemapped-stacktrace.min.js`),
              (n.async = !0),
              (n.onload = e),
              (n.onerror = () => {
                ;((window.$$skipStackParserFailed = !0),
                  t(Error(`Falha ao carregar sourcemapped-stacktrace`)))
              }),
              document.body.appendChild(n))
          })
    }
    function Mt() {
      return window.htmlToImage || !$()
        ? Promise.resolve()
        : new Promise((e, t) => {
            let n = document.createElement(`script`)
            ;((n.src = `https://cdn.jsdelivr.net/npm/html-to-image@1.11.13/dist/html-to-image.min.js`),
              (n.async = !0),
              (n.onload = e),
              (n.onerror = () => t(Error(`Falha ao carregar htmlToImage`))),
              document.body.appendChild(n))
          })
    }
    function Nt() {
      ;(_t(), vt(), Dt(), At(), jt().catch(console.error), Mt().catch(console.error), It())
    }
    let Pt = []
    function Ft(e, t, n, r, i) {
      Pt.push([e, t, n, r, i])
    }
    function It() {
      window.onerror && window.onerror !== Ft
        ? Pt.forEach((e) => window.onerror(...e))
        : setTimeout(It, 100)
    }
    if (globalThis.__skipTestExports !== void 0) {
      globalThis.__skipTestExports = {
        serializeForPostMessage: e,
        normalizeReactProps: r,
        isElementNonEditable: o,
        normalizeHeaders: X,
        isBadgeClosed: xt,
        closeBadge: Tt,
        isInIframe: $,
        isImgPickerTarget: l,
        findImgPickerTargetAtPoint: p,
        resolveElementPickerTargetAtPoint: m,
        getElementImageDisplaySrc: re,
        setElementImageSrcPreviews: ce,
        setThemeCssVarsPreview: pe,
        restoreThemeCssVarsPreview: de,
        buildThemePreviewCss: le,
        setThemeTokenHighlight: st,
        clearThemeTokenHighlights: nt,
        focusThemeTokenHighlightIndex: ot,
        setThemeTokenHighlightOverlaysVisible: Re,
        countThemeTokenElements: Xe,
        countAllThemeTokenElements: Ze,
        countElementsForThemeToken: Je,
        findElementsForThemeToken: Ye,
        matchVariantPrefixToFilter: z,
        normalizeThemeTokenVariantFilter: R,
        matchesThemeTokenTailwindClass: He,
        classListUsesThemeToken: B,
        savePreviewScrollForRefresh: gt,
        restorePreviewScrollAfterRefresh: _t,
      }
      return
    }
    ;((window.onerror = Ft),
      (window.onunhandledrejection = (e) =>
        Ft(e.reason.message, e.reason.source, e.reason.line, e.reason.column, e.reason)),
      document.readyState === `loading` ? document.addEventListener(`DOMContentLoaded`, Nt) : Nt())
  })())
//# sourceMappingURL=skip.js.map
