  var MAP = new Map();
  Object.keys(DICT).forEach(function (k) { MAP.set(k, DICT[k]); });
  DICT = null;

  var ATTRS = ['placeholder', 'title', 'aria-label'];
  var ATTR_SEL = '[placeholder],[title],[aria-label]';
  var SKIP_TAGS = { SCRIPT: 1, STYLE: 1, TEXTAREA: 1, CODE: 1, PRE: 1, INPUT: 1, NOSCRIPT: 1 };
  // chat message bodies / editors: never touch
  var MSG_SEL = 'pre,code,.markdown,.prose,[data-message-id],[data-message-role],[data-role="message"],[role="log"]';
  var SKIP_SEL = MSG_SEL + ',textarea,input,[contenteditable=""],[contenteditable="true"],[contenteditable="plaintext-only"],' +
    '.ProseMirror,.cm-editor,.monaco-editor';

  var NODE_BUDGET = 800;   // max text nodes examined per slice
  var TIME_BUDGET = 8;     // ms per slice
  var DEBOUNCE = 200;      // ms between flushes
  var MAX_PENDING = 3000;

  var pending = new Set();
  var timer = 0;
  var obs = null;
  var active = null;       // { walker } being processed across slices

  function blocked(el) {
    if (!el) return true;
    if (SKIP_TAGS[el.tagName]) return true;
    if (el.isContentEditable) return true;
    return !!(el.closest && el.closest(SKIP_SEL));
  }

  // strings with embedded values; anchored, tried only when exact lookup misses
  function rel(s) {
    if (s === 'just now') return '방금 전';
    var m = /^(a|an|\d+) (second|minute|hour|day|week|month|year)s? ago$/.exec(s);
    if (!m) return s;
    var u = { second: '초', minute: '분', hour: '시간', day: '일', week: '주', month: '개월', year: '년' }[m[2]];
    return (m[1] === 'a' || m[1] === 'an' ? '1' : m[1]) + u + ' 전';
  }
  var RULES = [
    [/^Last updated at (.+), ([\d,]+) chunks?$/, function (m) { return '마지막 업데이트: ' + rel(m[1]) + ', 청크 ' + m[2] + '개'; }],
    [/^Last updated (.+ ago|just now)$/, function (m) { return '마지막 업데이트: ' + rel(m[1]); }]
  ];
  function lookup(t) {
    var ko = MAP.get(t);
    if (ko !== undefined || t.length > 120 || t.charCodeAt(0) !== 76 /* L */) return ko;
    for (var i = 0; i < RULES.length; i++) {
      var m = RULES[i][0].exec(t);
      if (m) return RULES[i][1](m);
    }
    return undefined;
  }

  function tText(node) {
    var v = node.nodeValue;
    if (!v || v.length > 300) return;
    var t = v.trim();
    if (!t) return;
    var ko = lookup(t);
    if (ko === undefined || ko === t) return;
    if (blocked(node.parentElement)) return;
    var i = v.indexOf(t);
    node.nodeValue = v.slice(0, i) + ko + v.slice(i + t.length);
  }

  function tAttrs(el) {
    if (el.nodeType !== 1 || el.tagName === 'SCRIPT' || el.tagName === 'STYLE') return;
    var checked = false, bad = false;
    for (var i = 0; i < ATTRS.length; i++) {
      var a = ATTRS[i], v = el.getAttribute(a);
      if (!v || v.length > 300) continue;
      var ko = MAP.get(v.trim());
      if (ko === undefined || ko === v) continue;
      if (!checked) { bad = !!(el.closest && el.closest(MSG_SEL)); checked = true; }
      if (!bad) el.setAttribute(a, ko);
    }
  }

  function enqueue(node) {
    if (pending.size >= MAX_PENDING) { pending.clear(); pending.add(document.body); return; }
    pending.add(node);
  }

  function schedule(ms) {
    if (timer) return;
    timer = setTimeout(flush, ms || DEBOUNCE);
  }

  function flush() {
    timer = 0;
    var t0 = performance.now(), seen = 0;
    if (obs) obs.disconnect();           // our own writes must not re-trigger us
    try {
      while (performance.now() - t0 < TIME_BUDGET && seen < NODE_BUDGET) {
        if (!active) {
          var it = pending.values().next();
          if (it.done) break;
          var root = it.value;
          pending.delete(root);
          if (!root.isConnected) continue;
          if (root.nodeType === 3) { tText(root); seen++; continue; }
          if (root.nodeType !== 1) continue;
          tAttrs(root);
          var els = root.querySelectorAll ? root.querySelectorAll(ATTR_SEL) : [];
          for (var j = 0; j < els.length && j < 500; j++) tAttrs(els[j]);
          active = document.createTreeWalker(root, NodeFilter.SHOW_TEXT);
        }
        var n = active.nextNode();
        if (!n) { active = null; continue; }
        tText(n); seen++;
      }
    } catch (e) { /* never break the host page */ }
    reconnect();
    if (active || pending.size) schedule(50);
  }

  function reconnect() {
    if (!obs) return;
    obs.takeRecords();
    obs.observe(document.documentElement, { subtree: true, childList: true, characterData: true });
  }

  function start() {
    obs = new MutationObserver(function (muts) {
      for (var i = 0; i < muts.length; i++) {
        var m = muts[i];
        if (m.type === 'characterData') { enqueue(m.target); }
        else { for (var k = 0; k < m.addedNodes.length; k++) enqueue(m.addedNodes[k]); }
      }
      schedule();
    });
    reconnect();
    if (document.body) { enqueue(document.body); schedule(); }
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', start, { once: true });
  else start();
})();
