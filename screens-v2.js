(function () {
'use strict';
// 游伴 文旅风 v2 — 8 屏 (Click-through Prototype)
// Strict Figma navigation: every CTA goes to a specific screen.

const D_ = window.YOUBAN_DATA;
const {
  C: c,
  FS: fs,
  FM: fm,
  Badge,
  StatusLine,
  PScroll
} = window.V2;
const {
  useState
} = React;

// ───────────────────────────────────────────────
// Atoms
// ───────────────────────────────────────────────
function Section({
  title,
  hint,
  children,
  style
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      padding: '0 20px',
      ...style
    }
  }, title && /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'baseline',
      marginBottom: 10
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 12.5,
      fontWeight: 600,
      color: c.text
    }
  }, title), hint && /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 11,
      color: c.muted,
      marginLeft: 'auto'
    }
  }, hint)), children);
}
function HeroTitle({
  title,
  sub
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      padding: '6px 20px 18px'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 23,
      fontWeight: 700,
      letterSpacing: '-0.018em',
      color: c.ink,
      lineHeight: 1.25
    }
  }, title), sub && /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 12.5,
      color: c.muted,
      marginTop: 6
    }
  }, sub));
}
function CtaRow({
  ghost,
  ghostAction,
  primary,
  primaryAction
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      padding: '12px 20px 18px',
      background: c.paper,
      borderTop: `1px solid ${c.lineSoft}`,
      flexShrink: 0,
      display: 'flex',
      gap: 10,
      alignItems: 'center'
    }
  }, ghost && /*#__PURE__*/React.createElement("button", {
    onClick: ghostAction,
    style: {
      appearance: 'none',
      cursor: 'pointer',
      border: `1px solid ${c.line}`,
      background: c.paper,
      color: c.text,
      padding: '12px 20px',
      borderRadius: 999,
      fontFamily: fs,
      fontSize: 13,
      fontWeight: 500
    }
  }, ghost), /*#__PURE__*/React.createElement("button", {
    onClick: primaryAction,
    style: {
      flex: 1,
      appearance: 'none',
      border: 'none',
      cursor: 'pointer',
      background: c.cta,
      color: c.paper,
      padding: '14px',
      borderRadius: 999,
      fontFamily: fs,
      fontSize: 14,
      fontWeight: 600
    }
  }, primary));
}
function NavBack({
  onClick,
  right
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      padding: '4px 16px 8px',
      display: 'flex',
      alignItems: 'center',
      gap: 10,
      flexShrink: 0
    }
  }, /*#__PURE__*/React.createElement("button", {
    onClick: onClick,
    style: {
      appearance: 'none',
      cursor: 'pointer',
      border: 'none',
      width: 32,
      height: 32,
      borderRadius: '50%',
      background: c.bg,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontSize: 15,
      color: c.ink,
      flexShrink: 0,
      fontFamily: fs
    }
  }, "\u2039"), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1
    }
  }), right);
}

// ═════════════════════════════════════════════════════════════
// S1 — Home (Frame 1)
// ═════════════════════════════════════════════════════════════

function HomeScreen({
  ctx
}) {
  const [date, setDate] = useState('08/01');
  const [tags, setTags] = useState(['Citywalk', '豫园', '文化深度游']);
  const allTags = ['Citywalk', '豫园', '文化深度游', '研学游', '亲子游', '不太网红', '地铁 + 打车', '轻松节奏'];
  return /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      display: 'flex',
      flexDirection: 'column'
    }
  }, /*#__PURE__*/React.createElement(StatusLine, null), /*#__PURE__*/React.createElement(PScroll, null, /*#__PURE__*/React.createElement(HeroTitle, {
    title: "\u8FD9\u6B21\u60F3\u600E\u4E48\u73A9\uFF1F",
    sub: "\u5148\u544A\u8BC9\u6211\u65F6\u95F4\uFF0C\u518D\u544A\u8BC9\u6211\u65C5\u884C\u504F\u597D"
  }), /*#__PURE__*/React.createElement(Section, {
    title: "\u51FA\u884C\u65F6\u95F4"
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      background: c.paper,
      border: `1px solid ${c.line}`,
      borderRadius: 14,
      padding: 14
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 11,
      color: c.muted,
      fontWeight: 600,
      letterSpacing: '0.06em',
      marginBottom: 8
    }
  }, "\u65E5\u671F"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 8
    }
  }, [{
    d: '08/01',
    sub: '出发'
  }, {
    d: '08/02',
    sub: '回程'
  }, {
    d: '自定义',
    sub: '日期'
  }].map((x, i) => {
    const a = x.d === date && i < 2;
    return /*#__PURE__*/React.createElement("button", {
      key: x.d,
      onClick: () => i < 2 && setDate(x.d),
      style: {
        appearance: 'none',
        cursor: 'pointer',
        flex: 1,
        background: a ? c.cta : c.bg,
        border: a ? 'none' : `1px solid ${c.line}`,
        color: a ? c.paper : c.ink,
        padding: '10px 0',
        borderRadius: 10,
        fontFamily: fs,
        textAlign: 'center'
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 15,
        fontWeight: 700,
        letterSpacing: '-0.005em'
      }
    }, x.d), /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 10,
        color: a ? '#ffffffa0' : c.muted,
        marginTop: 2
      }
    }, x.sub));
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: '1fr 1fr',
      gap: 10,
      marginTop: 12
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      background: c.bg,
      borderRadius: 10,
      padding: '10px 12px'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 10,
      color: c.muted,
      fontWeight: 600
    }
  }, "\u51FA\u884C\u65F6\u95F4"), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 16,
      fontWeight: 700,
      marginTop: 2,
      fontFamily: fm
    }
  }, "09:30 ", /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 11,
      color: c.muted,
      fontFamily: fs,
      fontWeight: 500
    }
  }, "\u51FA\u53D1"))), /*#__PURE__*/React.createElement("div", {
    style: {
      background: c.bg,
      borderRadius: 10,
      padding: '10px 12px'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 10,
      color: c.muted,
      fontWeight: 600
    }
  }, "\u9884\u8BA1\u65F6\u957F"), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 16,
      fontWeight: 700,
      marginTop: 2,
      fontFamily: fm
    }
  }, "1 ", /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 11,
      color: c.muted,
      fontFamily: fs,
      fontWeight: 500
    }
  }, "\u5929")))))), /*#__PURE__*/React.createElement(Section, {
    title: "\u6211\u60F3\u8981\u2026",
    style: {
      marginTop: 18
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      background: c.paper,
      border: `1px solid ${c.line}`,
      borderRadius: 14,
      padding: 14,
      minHeight: 92,
      position: 'relative'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 13.5,
      color: c.text,
      lineHeight: 1.65
    }
  }, "\u4E0A\u6D77\u4E00\u5929\uFF0C\u8F7B\u677E\u4E00\u70B9\uFF0C", /*#__PURE__*/React.createElement("br", null), "\u6709\u6587\u5316\u611F\uFF0C\u9002\u5408\u5E26\u7238\u5988\u3002"), /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      right: 12,
      bottom: 10,
      fontSize: 10,
      color: c.muted,
      fontFamily: fm
    }
  }, "32 / 200"))), /*#__PURE__*/React.createElement(Section, {
    title: "\u7075\u611F\u6807\u7B7E",
    hint: "\u70B9\u9009\u504F\u597D\u5411\u91CF",
    style: {
      marginTop: 18
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexWrap: 'wrap',
      gap: 8
    }
  }, allTags.map(t => {
    const a = tags.includes(t);
    return /*#__PURE__*/React.createElement("button", {
      key: t,
      onClick: () => setTags(a ? tags.filter(x => x !== t) : [...tags, t]),
      style: {
        appearance: 'none',
        cursor: 'pointer',
        background: a ? c.mintSoft : c.paper,
        color: a ? c.mintDeep : c.text,
        border: `1px solid ${a ? c.mint + '60' : c.line}`,
        padding: '7px 14px',
        borderRadius: 999,
        fontFamily: fs,
        fontSize: 12.5,
        fontWeight: a ? 600 : 500
      }
    }, t);
  }))), /*#__PURE__*/React.createElement("div", {
    style: {
      height: 16
    }
  })), /*#__PURE__*/React.createElement(CtaRow, {
    primary: "\u8BA9 AI \u5E2E\u6211\u6574\u7406\u9700\u6C42",
    primaryAction: () => ctx.nav.push('prefs')
  }));
}

// ═════════════════════════════════════════════════════════════
// S2 — Prefs (Frame 2)
// ═════════════════════════════════════════════════════════════

const PREFS = [{
  key: 'walk',
  label: '每日步行上限',
  valLabel: '低',
  range: '0~5km',
  desc: '低 · 5km 以内',
  val: 0.18
}, {
  key: 'culture',
  label: '文化深度',
  valLabel: '高',
  range: '70~100',
  desc: '高 · 偏博物馆/历史街区',
  val: 0.78
}, {
  key: 'rest',
  label: '休憩频率',
  valLabel: '高',
  range: '约 90 min / 次',
  desc: '高 · 90 min/次',
  val: 0.82
}];
function PrefsScreen({
  ctx
}) {
  const [vals, setVals] = useState(PREFS.map(p => p.val));
  return /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      display: 'flex',
      flexDirection: 'column'
    }
  }, /*#__PURE__*/React.createElement(StatusLine, null), /*#__PURE__*/React.createElement(PScroll, null, /*#__PURE__*/React.createElement(HeroTitle, {
    title: "\u786E\u8BA4\u65C5\u884C\u504F\u597D",
    sub: "\u6ED1\u5757\u8BBE\u7F6E\u4F1A\u5F71\u54CD\u884C\u7A0B\u6392\u5E8F"
  }), /*#__PURE__*/React.createElement(Section, null, /*#__PURE__*/React.createElement("div", {
    style: {
      background: c.paper,
      border: `1px solid ${c.line}`,
      borderRadius: 14,
      padding: '14px 16px',
      display: 'flex',
      alignItems: 'center',
      gap: 12
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      width: 34,
      height: 34,
      borderRadius: 10,
      background: c.mintSoft,
      color: c.mintDeep,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontSize: 16,
      fontWeight: 700
    }
  }, "\u2726"), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 14,
      fontWeight: 700
    }
  }, "\u63A8\u8350\u6A21\u5F0F"), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 11,
      color: c.muted,
      marginTop: 2
    }
  }, "\u8F7B\u677E\u957F\u8F88 \xB7 \u53EF\u624B\u52A8\u4FEE\u6539")), /*#__PURE__*/React.createElement(Badge, {
    kind: "mint"
  }, "\u5DF2\u9009"))), /*#__PURE__*/React.createElement(Section, {
    title: "\u53EF\u8C03\u6574\u504F\u597D",
    style: {
      marginTop: 20
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      background: c.paper,
      border: `1px solid ${c.line}`,
      borderRadius: 14,
      padding: '4px 16px'
    }
  }, PREFS.map((p, i) => /*#__PURE__*/React.createElement(PrefSlider, {
    key: p.key,
    pref: p,
    value: vals[i],
    onChange: v => setVals(vals.map((x, j) => j === i ? v : x)),
    last: i === PREFS.length - 1
  })))), /*#__PURE__*/React.createElement(Section, {
    style: {
      marginTop: 16
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      background: c.mintSoft,
      borderRadius: 12,
      padding: '12px 14px',
      display: 'flex',
      alignItems: 'flex-start',
      gap: 10
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      width: 18,
      height: 18,
      borderRadius: '50%',
      background: c.mint,
      color: c.paper,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontSize: 10,
      fontWeight: 700,
      flexShrink: 0,
      marginTop: 1
    }
  }, "i"), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 11.5,
      color: c.mintDeep,
      lineHeight: 1.55
    }
  }, "\u4F60\u53EF\u4EE5\u968F\u65F6\u4FEE\u6539\u8FD9\u4E9B\u504F\u597D\uFF0C\u8C03\u6574\u540E\uFF0C\u65B0\u65B9\u6848\u5C06\u4F1A\u91CD\u65B0\u6392\u5E8F\u3002"))), /*#__PURE__*/React.createElement("div", {
    style: {
      height: 16
    }
  })), /*#__PURE__*/React.createElement(CtaRow, {
    ghost: "\u8FD4\u56DE\u4FEE\u6539",
    ghostAction: () => ctx.nav.pop(),
    primary: "\u751F\u6210\u65B9\u6848",
    primaryAction: () => ctx.nav.push('plans')
  }));
}
function PrefSlider({
  pref,
  value,
  onChange,
  last
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      padding: '14px 0',
      borderBottom: last ? 'none' : `1px solid ${c.lineSoft}`
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'baseline',
      marginBottom: 10
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 13,
      fontWeight: 600,
      color: c.ink
    }
  }, pref.label), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 11,
      color: c.mintDeep,
      marginLeft: 8,
      fontWeight: 600
    }
  }, ": ", pref.valLabel), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 10.5,
      color: c.muted,
      fontFamily: fm
    }
  }, pref.range)), /*#__PURE__*/React.createElement(Slider, {
    value: value,
    onChange: onChange
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 10.5,
      color: c.muted,
      marginTop: 6
    }
  }, pref.desc));
}
function Slider({
  value,
  onChange
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'relative',
      height: 22,
      display: 'flex',
      alignItems: 'center'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      left: 0,
      right: 0,
      height: 4,
      borderRadius: 4,
      background: c.lineSoft
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      left: 0,
      height: 4,
      borderRadius: 4,
      width: `${value * 100}%`,
      background: c.mint
    }
  }), /*#__PURE__*/React.createElement("input", {
    type: "range",
    min: "0",
    max: "1",
    step: "0.01",
    value: value,
    onChange: e => onChange(parseFloat(e.target.value)),
    style: {
      position: 'absolute',
      inset: 0,
      opacity: 0,
      cursor: 'pointer',
      width: '100%',
      margin: 0
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      left: `calc(${value * 100}% - 9px)`,
      width: 18,
      height: 18,
      borderRadius: '50%',
      background: c.paper,
      border: `2.5px solid ${c.mint}`,
      boxShadow: '0 1px 4px rgba(0,0,0,0.12)',
      pointerEvents: 'none'
    }
  }));
}

// ═════════════════════════════════════════════════════════════
// S3 — Plans (Frame 3)
// ═════════════════════════════════════════════════════════════

const PLAN_DATA = [{
  id: 'A',
  code: '经典文化线',
  score: 86,
  recommended: false,
  summary: '外滩 → 豫园 → 博物馆',
  note: '文化沉浸高，但下午行进较多。',
  walk: '4.2 km',
  dur: '6.5 h',
  cost: '¥180'
}, {
  id: 'B',
  code: '轻松长辈线',
  score: 92,
  recommended: true,
  summary: '外滩 → 午餐 → 上海博物馆东馆',
  note: '休憩点充足，已避开下午烈日和高峰客流。',
  walk: '2.1 km',
  dur: '5.0 h',
  cost: '¥220'
}, {
  id: 'C',
  code: '城市记忆线',
  score: 79,
  recommended: false,
  summary: '武康路 → 田子坊 → 思南公馆',
  note: '街区漫步主，含 1 个商业合作节点，已标注。',
  walk: '3.5 km',
  dur: '6.0 h',
  cost: '¥150'
}];
function PlansScreen({
  ctx
}) {
  const picked = ctx.pickedPlan;
  const setPicked = ctx.setPickedPlan;
  return /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      display: 'flex',
      flexDirection: 'column'
    }
  }, /*#__PURE__*/React.createElement(StatusLine, null), /*#__PURE__*/React.createElement(PScroll, null, /*#__PURE__*/React.createElement(HeroTitle, {
    title: "\u9009\u62E9\u4F60\u7684\u884C\u7A0B\u65B9\u6848",
    sub: "\u4E0D\u6EE1\u610F\u53EF\u8FD4\u56DE\u8C03\u6574\u504F\u597D"
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      padding: '0 20px',
      display: 'flex',
      flexDirection: 'column',
      gap: 12
    }
  }, PLAN_DATA.map(p => /*#__PURE__*/React.createElement(PlanCard, {
    key: p.id,
    p: p,
    picked: picked === p.id,
    onPick: () => setPicked(p.id)
  }))), /*#__PURE__*/React.createElement("div", {
    style: {
      height: 16
    }
  })), /*#__PURE__*/React.createElement(CtaRow, {
    ghost: "\u8FD4\u56DE\u4FEE\u6539",
    ghostAction: () => ctx.nav.pop(),
    primary: `选择方案 ${picked}`,
    primaryAction: () => {
      ctx.setAutoTriggered(false);
      ctx.nav.push('trip');
    }
  }));
}
function PlanCard({
  p,
  picked,
  onPick
}) {
  return /*#__PURE__*/React.createElement("button", {
    onClick: onPick,
    style: {
      appearance: 'none',
      cursor: 'pointer',
      textAlign: 'left',
      background: c.paper,
      border: picked ? `1.5px solid ${c.mint}` : `1px solid ${c.line}`,
      borderRadius: 14,
      padding: '14px 16px',
      position: 'relative',
      fontFamily: fs
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'flex-start',
      gap: 10
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      minWidth: 0
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 6
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 15,
      fontWeight: 700,
      letterSpacing: '-0.005em'
    }
  }, p.id, " \xB7 ", p.code), p.recommended && /*#__PURE__*/React.createElement(Badge, {
    kind: "mint",
    dense: true
  }, "\u63A8\u8350")), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 11.5,
      color: c.muted,
      marginTop: 4
    }
  }, p.summary)), /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: fm,
      fontSize: 22,
      fontWeight: 800,
      lineHeight: 1,
      color: p.recommended ? c.mintDeep : c.ink,
      letterSpacing: '-0.02em'
    }
  }, p.score)), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 10,
      height: 3,
      background: c.lineSoft,
      borderRadius: 2,
      overflow: 'hidden'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      height: '100%',
      width: `${p.score}%`,
      background: p.recommended ? c.mint : c.mutedSoft
    }
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 10,
      display: 'flex',
      alignItems: 'center',
      gap: 12,
      fontSize: 11,
      color: c.text2
    }
  }, /*#__PURE__*/React.createElement("span", null, /*#__PURE__*/React.createElement("span", {
    style: {
      color: c.muted
    }
  }, "\u6B65\u884C"), " ", /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: fm,
      fontWeight: 600,
      color: c.ink
    }
  }, p.walk)), /*#__PURE__*/React.createElement("span", {
    style: {
      color: c.line
    }
  }, "|"), /*#__PURE__*/React.createElement("span", null, /*#__PURE__*/React.createElement("span", {
    style: {
      color: c.muted
    }
  }, "\u65F6\u957F"), " ", /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: fm,
      fontWeight: 600,
      color: c.ink
    }
  }, p.dur)), /*#__PURE__*/React.createElement("span", {
    style: {
      color: c.line
    }
  }, "|"), /*#__PURE__*/React.createElement("span", null, /*#__PURE__*/React.createElement("span", {
    style: {
      color: c.muted
    }
  }, "\u9884\u7B97"), " ", /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: fm,
      fontWeight: 600,
      color: c.ink
    }
  }, p.cost))), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 10,
      paddingTop: 10,
      borderTop: `1px solid ${c.lineSoft}`,
      fontSize: 11.5,
      color: c.text2,
      lineHeight: 1.5
    }
  }, p.note));
}

// ═════════════════════════════════════════════════════════════
// S4 — Trip (Frame 4)
// ═════════════════════════════════════════════════════════════

const STOPS = [{
  n: 1,
  name: '外滩',
  kind: '景点',
  meta: '地铁 · 2.0 公里 · 18 分钟',
  x: 0.30,
  y: 0.78
}, {
  n: 2,
  name: '老字号午餐',
  kind: '餐厅',
  meta: '地铁 · 2.7 公里 · 13 分钟',
  x: 0.66,
  y: 0.40
}, {
  n: 3,
  name: '上海博物馆东馆',
  kind: '景点',
  meta: '地铁 · 3.4 公里 · 21 分钟',
  x: 0.78,
  y: 0.18
}];
function TripScreen({
  ctx
}) {
  const [tab, setTab] = useState('day1');
  return /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      display: 'flex',
      flexDirection: 'column',
      position: 'relative'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      inset: 0,
      zIndex: 0
    }
  }, /*#__PURE__*/React.createElement(TripMap, null)), /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'relative',
      zIndex: 1,
      background: 'linear-gradient(180deg, #ffffffe8 0%, #ffffff00 100%)'
    }
  }, /*#__PURE__*/React.createElement(StatusLine, null), /*#__PURE__*/React.createElement("div", {
    style: {
      padding: '4px 18px 12px',
      display: 'flex',
      alignItems: 'center',
      gap: 10
    }
  }, /*#__PURE__*/React.createElement("button", {
    onClick: () => ctx.nav.push('search'),
    style: {
      flex: 1,
      appearance: 'none',
      cursor: 'pointer',
      background: c.paper,
      borderRadius: 999,
      padding: '10px 14px',
      display: 'flex',
      alignItems: 'center',
      gap: 8,
      border: `1px solid ${c.line}`,
      textAlign: 'left'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      color: c.muted,
      fontSize: 13
    }
  }, "\u2315"), /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 12,
      color: c.muted
    }
  }, "\u641C\u7D22\u666F\u70B9\u3001\u9910\u5385\u3001\u9152\u5E97")), /*#__PURE__*/React.createElement("div", {
    style: {
      width: 36,
      height: 36,
      borderRadius: '50%',
      background: c.paper,
      border: `1px solid ${c.line}`,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontSize: 14
    }
  }, "\u25D0"))), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'relative',
      zIndex: 2,
      background: c.paper,
      borderRadius: '18px 18px 0 0',
      boxShadow: '0 -8px 28px rgba(15, 20, 17, 0.08)',
      padding: '10px 0 6px'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      width: 36,
      height: 4,
      borderRadius: 2,
      background: c.mutedSoft,
      margin: '0 auto 12px'
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      padding: '0 20px',
      display: 'flex',
      alignItems: 'center',
      gap: 18,
      borderBottom: `1px solid ${c.lineSoft}`
    }
  }, [{
    k: 'all',
    l: '总览',
    d: ''
  }, {
    k: 'day1',
    l: '08.01',
    d: '周五'
  }, {
    k: 'day2',
    l: '08.02',
    d: '周六'
  }].map(t => {
    const a = t.k === tab;
    return /*#__PURE__*/React.createElement("button", {
      key: t.k,
      onClick: () => setTab(t.k),
      style: {
        appearance: 'none',
        border: 'none',
        cursor: 'pointer',
        background: 'transparent',
        padding: '10px 0 12px',
        position: 'relative',
        fontFamily: fs,
        display: 'flex',
        alignItems: 'baseline',
        gap: 4
      }
    }, /*#__PURE__*/React.createElement("span", {
      style: {
        fontSize: 13,
        fontWeight: a ? 700 : 500,
        color: a ? c.ink : c.muted,
        fontFamily: t.k === 'all' ? fs : fm
      }
    }, t.l), t.d && /*#__PURE__*/React.createElement("span", {
      style: {
        fontSize: 11,
        color: a ? c.text2 : c.mutedSoft
      }
    }, t.d), a && /*#__PURE__*/React.createElement("span", {
      style: {
        position: 'absolute',
        left: 0,
        right: 0,
        bottom: -1,
        height: 2,
        background: c.cta
      }
    }));
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1
    }
  }), /*#__PURE__*/React.createElement("button", {
    style: {
      appearance: 'none',
      border: 'none',
      cursor: 'pointer',
      background: 'transparent',
      color: c.mintDeep,
      fontSize: 12,
      fontWeight: 600
    }
  }, "\u6DFB\u52A0\u5907\u6CE8")), /*#__PURE__*/React.createElement("div", {
    style: {
      padding: '14px 20px 4px',
      display: 'flex',
      alignItems: 'baseline'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 18,
      fontWeight: 700,
      fontFamily: fm,
      letterSpacing: '-0.005em'
    }
  }, "08.01"), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 13,
      color: c.muted,
      marginLeft: 8
    }
  }, "\u5468\u4E94")), /*#__PURE__*/React.createElement("div", {
    style: {
      padding: '0 20px 6px'
    }
  }, STOPS.map(s => /*#__PURE__*/React.createElement(StopRow, {
    key: s.n,
    s: s,
    onClick: () => ctx.nav.push('detail')
  }))), /*#__PURE__*/React.createElement("div", {
    style: {
      padding: '8px 20px 16px',
      display: 'flex',
      justifyContent: 'flex-end'
    }
  }, /*#__PURE__*/React.createElement("button", {
    onClick: () => ctx.nav.push('search'),
    style: {
      appearance: 'none',
      cursor: 'pointer',
      border: 'none',
      background: c.cta,
      color: c.paper,
      padding: '11px 22px',
      borderRadius: 999,
      fontFamily: fs,
      fontSize: 13,
      fontWeight: 600,
      display: 'flex',
      alignItems: 'center',
      gap: 8
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 13
    }
  }, "\u270E"), "\u7F16\u8F91\u8DEF\u7EBF"))), !ctx.autoTriggered && /*#__PURE__*/React.createElement(AutoEventHint, null));
}
function AutoEventHint() {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      top: 122,
      left: '50%',
      transform: 'translateX(-50%)',
      background: c.warnPaper,
      color: c.warn,
      zIndex: 5,
      padding: '7px 14px',
      borderRadius: 999,
      fontSize: 11,
      fontWeight: 600,
      fontFamily: fs,
      border: `1px solid ${c.warn}40`,
      whiteSpace: 'nowrap',
      display: 'flex',
      alignItems: 'center',
      gap: 6,
      boxShadow: '0 4px 12px rgba(0,0,0,0.08)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      width: 8,
      height: 8,
      borderRadius: '50%',
      background: c.warn,
      animation: 'pulse 1.4s infinite'
    }
  }), "6 \u79D2\u540E\u81EA\u52A8\u63A8\u9001\u540C\u884C\u504F\u597D\u63D0\u9192\u2026");
}
function StopRow({
  s,
  onClick
}) {
  return /*#__PURE__*/React.createElement("button", {
    onClick: onClick,
    style: {
      appearance: 'none',
      cursor: 'pointer',
      border: 'none',
      background: 'transparent',
      display: 'flex',
      alignItems: 'center',
      gap: 12,
      padding: '10px 0',
      width: '100%',
      borderTop: `1px solid ${c.lineSoft}`,
      textAlign: 'left',
      fontFamily: fs
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      width: 44,
      height: 44,
      borderRadius: 10,
      background: c.bg2,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      flexShrink: 0
    }
  }, /*#__PURE__*/React.createElement("svg", {
    width: "22",
    height: "22",
    viewBox: "0 0 22 22"
  }, /*#__PURE__*/React.createElement("rect", {
    x: "3",
    y: "14",
    width: "16",
    height: "5",
    fill: c.mutedSoft,
    opacity: "0.6"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M3 14 L8 7 L13 11 L19 4 L19 14 Z",
    fill: c.mutedSoft
  }), /*#__PURE__*/React.createElement("circle", {
    cx: "14",
    cy: "6",
    r: "1.5",
    fill: c.mutedSoft
  }))), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      minWidth: 0
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 11,
      color: c.muted,
      marginBottom: 2
    }
  }, s.kind), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 14,
      fontWeight: 600,
      letterSpacing: '-0.005em'
    }
  }, s.n, ". ", s.name), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 11,
      color: c.muted,
      marginTop: 3
    }
  }, s.meta)), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 16,
      color: c.mutedSoft,
      paddingRight: 4
    }
  }, "\u203A"));
}
function TripMap() {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      inset: 0,
      background: c.sky,
      overflow: 'hidden'
    }
  }, /*#__PURE__*/React.createElement("svg", {
    width: "100%",
    height: "100%",
    viewBox: "0 0 372 540",
    preserveAspectRatio: "xMidYMid slice"
  }, /*#__PURE__*/React.createElement("path", {
    d: "M 0 420 Q 90 360 180 400 T 380 340",
    fill: "none",
    stroke: "#b9d2e0",
    strokeWidth: "42",
    opacity: "0.5"
  }), /*#__PURE__*/React.createElement("ellipse", {
    cx: "320",
    cy: "140",
    rx: "48",
    ry: "32",
    fill: "#cde0c8",
    opacity: "0.7"
  }), /*#__PURE__*/React.createElement("ellipse", {
    cx: "60",
    cy: "200",
    rx: "42",
    ry: "26",
    fill: "#cde0c8",
    opacity: "0.55"
  }), [60, 120, 180, 240, 300, 360, 420, 480].map(y => /*#__PURE__*/React.createElement("line", {
    key: 'h' + y,
    x1: "0",
    y1: y,
    x2: "372",
    y2: y,
    stroke: "#ffffff",
    strokeWidth: "1",
    opacity: "0.6"
  })), [60, 140, 220, 300].map(x => /*#__PURE__*/React.createElement("line", {
    key: 'v' + x,
    x1: x,
    y1: "0",
    x2: x,
    y2: "540",
    stroke: "#ffffff",
    strokeWidth: "1",
    opacity: "0.6"
  })), /*#__PURE__*/React.createElement("path", {
    d: "M 112 421 Q 200 316 246 216 T 290 97",
    stroke: c.mint,
    strokeWidth: "3",
    fill: "none",
    strokeLinecap: "round"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M 112 421 Q 200 316 246 216 T 290 97",
    stroke: c.paper,
    strokeWidth: "1",
    fill: "none",
    strokeLinecap: "round",
    strokeDasharray: "2 4",
    opacity: "0.7"
  }), STOPS.map(s => /*#__PURE__*/React.createElement("g", {
    key: s.n,
    transform: `translate(${s.x * 372}, ${s.y * 540})`
  }, /*#__PURE__*/React.createElement("circle", {
    r: "16",
    fill: c.mint
  }), /*#__PURE__*/React.createElement("circle", {
    r: "16",
    fill: "none",
    stroke: c.paper,
    strokeWidth: "2.5"
  }), /*#__PURE__*/React.createElement("text", {
    textAnchor: "middle",
    y: "5",
    fill: c.paper,
    fontSize: "14",
    fontWeight: "700",
    fontFamily: fs
  }, s.n)))), /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      right: 14,
      bottom: '38%',
      width: 36,
      height: 36,
      borderRadius: '50%',
      background: c.paper,
      border: `1px solid ${c.line}`,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
      fontSize: 14
    }
  }, "\u2316"));
}

// ═════════════════════════════════════════════════════════════
// S4A — Search (Frame 4A)
// ═════════════════════════════════════════════════════════════

const SEARCH_RESULTS = [{
  n: '博',
  name: '上海博物馆东馆',
  meta: '室内 · 文化深度展览 · 距离 2.1 km',
  tag: '博物馆'
}, {
  n: '园',
  name: '豫园',
  meta: '园林 · 历史街区 · 距离 1.4 km',
  tag: '景点'
}];
function SearchScreen({
  ctx
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      display: 'flex',
      flexDirection: 'column',
      position: 'relative'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      inset: 0,
      zIndex: 0
    }
  }, /*#__PURE__*/React.createElement(SearchMap, null)), /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'relative',
      zIndex: 2
    }
  }, /*#__PURE__*/React.createElement(StatusLine, null), /*#__PURE__*/React.createElement("div", {
    style: {
      padding: '4px 16px 12px',
      display: 'flex',
      alignItems: 'center',
      gap: 8
    }
  }, /*#__PURE__*/React.createElement("button", {
    onClick: () => ctx.nav.pop(),
    style: {
      appearance: 'none',
      cursor: 'pointer',
      border: 'none',
      width: 36,
      height: 36,
      borderRadius: '50%',
      background: c.paper,
      border: `1px solid ${c.line}`,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontSize: 15,
      color: c.ink
    }
  }, "\u2039"), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      background: c.paper,
      borderRadius: 999,
      padding: '10px 14px',
      display: 'flex',
      alignItems: 'center',
      gap: 8,
      border: `1px solid ${c.line}`,
      boxShadow: '0 2px 6px rgba(0,0,0,0.04)'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      color: c.mint,
      fontSize: 13
    }
  }, "\u2315"), /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 12.5,
      color: c.ink,
      fontWeight: 500
    }
  }, "\u641C\u7D22\u666F\u70B9\u3001\u9910\u5385\u3001\u9152\u5E97")))), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'relative',
      zIndex: 2,
      background: c.paper,
      borderRadius: '18px 18px 0 0',
      boxShadow: '0 -8px 28px rgba(15,20,17,0.08)',
      padding: '10px 0 0'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      width: 36,
      height: 4,
      borderRadius: 2,
      background: c.mutedSoft,
      margin: '0 auto 12px'
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      padding: '0 20px 8px',
      display: 'flex',
      alignItems: 'baseline'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 13,
      fontWeight: 600
    }
  }, "\u641C\u7D22\u7ED3\u679C"), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 11,
      color: c.muted,
      marginLeft: 'auto',
      fontFamily: fm
    }
  }, "2 results")), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 11,
      color: c.muted,
      padding: '0 20px 10px'
    }
  }, "\u4EE5\u4E0B\u7ED3\u679C\u5728\u4F60\u884C\u7A0B\u6CBF\u8DEF 2 km"), /*#__PURE__*/React.createElement("div", {
    style: {
      padding: '0 20px',
      display: 'flex',
      flexDirection: 'column',
      gap: 10
    }
  }, SEARCH_RESULTS.map((r, i) => /*#__PURE__*/React.createElement("div", {
    key: i,
    style: {
      background: c.paper,
      border: `1px solid ${c.line}`,
      borderRadius: 12,
      padding: '12px 14px',
      display: 'flex',
      alignItems: 'center',
      gap: 12
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      width: 38,
      height: 38,
      borderRadius: 10,
      background: c.mintSoft,
      color: c.mintDeep,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontSize: 14,
      fontWeight: 700
    }
  }, r.n), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      minWidth: 0
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'baseline',
      gap: 6
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 13,
      fontWeight: 600
    }
  }, r.name), /*#__PURE__*/React.createElement(Badge, {
    dense: true,
    kind: "ghost"
  }, r.tag)), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 11,
      color: c.muted,
      marginTop: 3
    }
  }, r.meta)), /*#__PURE__*/React.createElement("button", {
    style: {
      appearance: 'none',
      cursor: 'pointer',
      border: `1px solid ${c.line}`,
      background: c.paper,
      color: c.ink,
      padding: '6px 12px',
      borderRadius: 999,
      fontFamily: fs,
      fontSize: 11.5,
      fontWeight: 500
    }
  }, "\u67E5\u770B")))), /*#__PURE__*/React.createElement("div", {
    style: {
      padding: '14px 20px 18px'
    }
  }, /*#__PURE__*/React.createElement("button", {
    onClick: () => ctx.nav.pop(),
    style: {
      width: '100%',
      appearance: 'none',
      cursor: 'pointer',
      border: 'none',
      background: c.cta,
      color: c.paper,
      padding: '14px',
      borderRadius: 999,
      fontFamily: fs,
      fontSize: 14,
      fontWeight: 600
    }
  }, "\u67E5\u770B\u5DF2\u9009\u5730\u70B9"))));
}
function SearchMap() {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      inset: 0,
      background: c.sky,
      overflow: 'hidden'
    }
  }, /*#__PURE__*/React.createElement("svg", {
    width: "100%",
    height: "100%",
    viewBox: "0 0 372 540",
    preserveAspectRatio: "xMidYMid slice"
  }, /*#__PURE__*/React.createElement("ellipse", {
    cx: "80",
    cy: "180",
    rx: "56",
    ry: "36",
    fill: "#cde0c8",
    opacity: "0.6"
  }), /*#__PURE__*/React.createElement("ellipse", {
    cx: "290",
    cy: "100",
    rx: "58",
    ry: "38",
    fill: "#cde0c8",
    opacity: "0.6"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M 0 360 Q 100 320 200 350 T 380 320",
    fill: "none",
    stroke: "#b9d2e0",
    strokeWidth: "40",
    opacity: "0.5"
  }), [60, 120, 180, 240, 300, 360, 420].map(y => /*#__PURE__*/React.createElement("line", {
    key: 'h' + y,
    x1: "0",
    y1: y,
    x2: "372",
    y2: y,
    stroke: "#ffffff",
    strokeWidth: "1",
    opacity: "0.6"
  })), [60, 140, 220, 300].map(x => /*#__PURE__*/React.createElement("line", {
    key: 'v' + x,
    x1: x,
    y1: "0",
    x2: x,
    y2: "540",
    stroke: "#ffffff",
    strokeWidth: "1",
    opacity: "0.6"
  })), [{
    n: 1,
    x: 100,
    y: 280
  }, {
    n: 2,
    x: 280,
    y: 160
  }, {
    n: 3,
    x: 220,
    y: 360
  }].map(p => /*#__PURE__*/React.createElement("g", {
    key: p.n,
    transform: `translate(${p.x}, ${p.y})`
  }, /*#__PURE__*/React.createElement("circle", {
    r: "16",
    fill: c.mint
  }), /*#__PURE__*/React.createElement("circle", {
    r: "16",
    fill: "none",
    stroke: c.paper,
    strokeWidth: "2.5"
  }), /*#__PURE__*/React.createElement("text", {
    textAnchor: "middle",
    y: "5",
    fill: c.paper,
    fontSize: "14",
    fontWeight: "700"
  }, p.n)))), /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      right: 14,
      bottom: 200,
      width: 36,
      height: 36,
      borderRadius: '50%',
      background: c.paper,
      border: `1px solid ${c.line}`,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
      fontSize: 14
    }
  }, "\u2316"));
}

// ═════════════════════════════════════════════════════════════
// S5 — Alert (Frame 5)
// ═════════════════════════════════════════════════════════════

function AlertScreen({
  ctx
}) {
  const [companion, setCompanion] = useState('couple');
  return /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      display: 'flex',
      flexDirection: 'column'
    }
  }, /*#__PURE__*/React.createElement(StatusLine, null), /*#__PURE__*/React.createElement(NavBack, {
    onClick: () => ctx.nav.pop(),
    right: /*#__PURE__*/React.createElement(Badge, {
      kind: "mint",
      dense: true
    }, "L6")
  }), /*#__PURE__*/React.createElement(PScroll, null, /*#__PURE__*/React.createElement("div", {
    style: {
      padding: '4px 20px 18px'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 22,
      fontWeight: 700,
      letterSpacing: '-0.018em'
    }
  }, "\u540C\u884C\u504F\u597D\u63D0\u9192"), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 12.5,
      color: c.muted,
      marginTop: 6
    }
  }, "\u5148\u770B\u53EF\u80FD\u51B2\u7A81\uFF0C\u518D\u4E00\u8D77\u51B3\u5B9A")), /*#__PURE__*/React.createElement(Section, {
    title: "\u540C\u884C\u4EBA"
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      background: c.paper,
      border: `1px solid ${c.line}`,
      borderRadius: 14,
      padding: '14px 16px'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 8
    }
  }, [{
    k: 'couple',
    l: '我'
  }, {
    k: 'family',
    l: '他'
  }, {
    k: 'kids',
    l: '+'
  }].map(p => {
    const a = p.k === companion;
    return /*#__PURE__*/React.createElement("button", {
      key: p.k,
      onClick: () => setCompanion(p.k),
      style: {
        appearance: 'none',
        cursor: 'pointer',
        width: 36,
        height: 36,
        borderRadius: '50%',
        background: a ? c.mint : c.bg,
        color: a ? c.paper : c.text,
        border: 'none',
        fontFamily: fs,
        fontSize: 14,
        fontWeight: 600
      }
    }, p.l);
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      alignSelf: 'center',
      fontSize: 11,
      color: c.muted
    }
  }, "3 \u4EBA\u5171\u540C\u51FA\u884C")))), /*#__PURE__*/React.createElement(Section, {
    style: {
      marginTop: 18
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      background: c.warnPaper,
      border: `1px solid ${c.warn}30`,
      borderRadius: 14,
      padding: '14px 16px'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 8,
      marginBottom: 8
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      width: 8,
      height: 8,
      borderRadius: '50%',
      background: c.warn
    }
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 13.5,
      fontWeight: 700,
      color: c.warn
    }
  }, "\u51B2\u7A81\u98CE\u9669\u63D0\u793A \xB7 Citywalk")), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 12,
      color: c.text,
      lineHeight: 1.7
    }
  }, "\u4F60\u60F3\u4FDD\u7559\u6B66\u5EB7\u8DEF Citywalk\uFF0C", /*#__PURE__*/React.createElement("br", null), "\u540C\u884C\u4EBA\u7238\u5988\u504F\u597D", /*#__PURE__*/React.createElement("strong", null, "\u8F7B\u677E\u8282\u594F"), "\uFF0C", /*#__PURE__*/React.createElement("br", null), /*#__PURE__*/React.createElement("span", {
    style: {
      color: c.warn
    }
  }, "\u4E0B\u5348\u9884\u62A5\u964D\u96E8\u6982\u7387 60%\uFF0C\u53EF\u80FD\u5F71\u54CD\u3002")))), /*#__PURE__*/React.createElement(Section, {
    title: "\u6298\u4E2D\u5EFA\u8BAE",
    style: {
      marginTop: 20
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 10
    }
  }, [{
    t: '缩短 Citywalk',
    d: '武康路漫步从 90 分钟 → 30 分钟',
    icon: '◐'
  }, {
    t: '换室内文化点',
    d: '换去思南公馆 / 上海博物馆东馆',
    icon: '⌂'
  }].map(o => /*#__PURE__*/React.createElement("button", {
    key: o.t,
    onClick: () => ctx.nav.push('replan'),
    style: {
      appearance: 'none',
      cursor: 'pointer',
      border: 'none',
      background: c.paper,
      border: `1px solid ${c.line}`,
      borderRadius: 12,
      padding: '12px 14px',
      display: 'flex',
      alignItems: 'center',
      gap: 12,
      textAlign: 'left',
      fontFamily: fs,
      width: '100%'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      width: 32,
      height: 32,
      borderRadius: 8,
      background: c.mintSoft,
      color: c.mintDeep,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontSize: 14
    }
  }, o.icon), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      minWidth: 0
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 13,
      fontWeight: 600
    }
  }, o.t), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 11,
      color: c.muted,
      marginTop: 2
    }
  }, o.d)), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 14,
      color: c.mutedSoft
    }
  }, "\u203A"))))), /*#__PURE__*/React.createElement("div", {
    style: {
      height: 16
    }
  })), /*#__PURE__*/React.createElement(CtaRow, {
    ghost: "\u8FD4\u56DE\u6211\u51B3\u5B9A",
    ghostAction: () => ctx.nav.pop(),
    primary: "\u67E5\u770B\u63A8\u8350\u8C03\u6574",
    primaryAction: () => ctx.nav.push('replan')
  }));
}

// ═════════════════════════════════════════════════════════════
// S6 — Replan (Frame 6)
// ═════════════════════════════════════════════════════════════

function ReplanScreen({
  ctx
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      display: 'flex',
      flexDirection: 'column'
    }
  }, /*#__PURE__*/React.createElement(StatusLine, null), /*#__PURE__*/React.createElement(NavBack, {
    onClick: () => ctx.nav.pop(),
    right: /*#__PURE__*/React.createElement(Badge, {
      kind: "warn",
      dense: true
    }, "L6")
  }), /*#__PURE__*/React.createElement(PScroll, null, /*#__PURE__*/React.createElement("div", {
    style: {
      padding: '4px 20px 18px'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 22,
      fontWeight: 700,
      letterSpacing: '-0.018em'
    }
  }, "\u884C\u7A0B\u9700\u8981\u8C03\u6574"), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 12.5,
      color: c.muted,
      marginTop: 6
    }
  }, "\u4E0B\u5348\u4F1A\u964D\u96E8 \xB7 \u63A8\u8350\u5207\u6362\u5BA4\u5185\u4F53\u9A8C")), /*#__PURE__*/React.createElement(Section, {
    title: "\u5F53\u524D\u884C\u7A0B"
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      background: c.paper,
      border: `1px solid ${c.line}`,
      borderRadius: 14,
      padding: '14px 16px'
    }
  }, /*#__PURE__*/React.createElement(ReplanStopsRow, {
    active: 1
  }))), /*#__PURE__*/React.createElement(Section, {
    title: "\u964D\u96E8\u9884\u6D4B",
    hint: "\u4E0B\u5348 14:00 \u8D77",
    style: {
      marginTop: 18
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      background: c.paper,
      border: `1px solid ${c.line}`,
      borderRadius: 14,
      padding: '14px 16px'
    }
  }, /*#__PURE__*/React.createElement(RainChart, null), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 10,
      display: 'flex',
      alignItems: 'baseline',
      gap: 6
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 11,
      color: c.muted
    }
  }, "\u4E0B\u5348\u964D\u96E8\u6982\u7387\u5347\u81F3"), /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: fm,
      fontSize: 22,
      fontWeight: 800,
      color: c.warn
    }
  }, "80%")), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 11,
      color: c.muted,
      marginTop: 2
    }
  }, "\u53D7\u5F71\u54CD\uFF1A", /*#__PURE__*/React.createElement("span", {
    style: {
      color: c.text,
      fontWeight: 600
    }
  }, "\u6B66\u5EB7\u8DEF Citywalk")))), /*#__PURE__*/React.createElement(Section, {
    title: "\u63A8\u8350 A \xB7 \u6362\u4E0A\u6D77\u535A\u7269\u9986\u4E1C\u9986",
    style: {
      marginTop: 18
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      background: c.paper,
      border: `1.5px solid ${c.mint}`,
      borderRadius: 14,
      padding: '14px 16px',
      position: 'relative'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      top: -10,
      right: 14,
      padding: '3px 10px',
      borderRadius: 999,
      background: c.mint,
      color: c.paper,
      fontSize: 10.5,
      fontWeight: 700
    }
  }, "AI \u63A8\u8350"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'baseline',
      gap: 8,
      marginBottom: 8
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 14,
      fontWeight: 700
    }
  }, "\u6362\u4E0A\u6D77\u535A\u7269\u9986\u4E1C\u9986"), /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 11,
      color: c.muted
    }
  }, "\u514D\u8D39 \xB7 \u5DF2\u9884\u7EA6\u53EF\u7528")), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 12,
      color: c.text2,
      lineHeight: 1.6
    }
  }, "\u5BA4\u5185\u6587\u5316\u70B9\uFF0C\u907F\u96E8\u53EF\u63A7\uFF1B\u4E0E\u4F60\u4ECA\u5929\u7684\u300C\u6587\u5316\u6DF1\u5EA6\u300D\u504F\u597D\u9AD8\u5EA6\u4E00\u81F4\u3002"), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 10,
      paddingTop: 10,
      borderTop: `1px solid ${c.lineSoft}`,
      display: 'flex',
      gap: 12
    }
  }, /*#__PURE__*/React.createElement(GainLost, {
    kind: "gain",
    t: "\u6587\u5316\u6DF1\u5EA6 \u2191 \xB7 \u4E0D\u6015\u96E8"
  }), /*#__PURE__*/React.createElement(GainLost, {
    kind: "lost",
    t: "\u5C11\u4E86\u4E00\u6BB5\u8857\u533A\u6C1B\u56F4"
  })))), /*#__PURE__*/React.createElement("div", {
    style: {
      padding: '14px 20px 16px',
      display: 'flex',
      justifyContent: 'center',
      gap: 16,
      fontSize: 11
    }
  }, /*#__PURE__*/React.createElement("button", {
    style: {
      appearance: 'none',
      border: 'none',
      background: 'transparent',
      color: c.text2,
      cursor: 'pointer',
      fontFamily: fs,
      fontSize: 11
    }
  }, "\u4FDD\u7559\u539F\u8BA1\u5212"), /*#__PURE__*/React.createElement("span", {
    style: {
      color: c.line
    }
  }, "\xB7"), /*#__PURE__*/React.createElement("button", {
    style: {
      appearance: 'none',
      border: 'none',
      background: 'transparent',
      color: c.text2,
      cursor: 'pointer',
      fontFamily: fs,
      fontSize: 11
    }
  }, "\u81EA\u5DF1\u8C03\u6574"))), /*#__PURE__*/React.createElement(CtaRow, {
    ghost: "\u8BF7\u66F4\u6362\u5176\u5B83",
    ghostAction: () => {},
    primary: "\u63A5\u53D7\u65B9\u6848 A",
    primaryAction: () => ctx.nav.push('detail')
  }));
}
function ReplanStopsRow({
  active
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'relative',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: '8px 6px'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      left: '12%',
      right: '12%',
      top: '50%',
      height: 2,
      background: c.lineSoft
    }
  }), [0, 1, 2, 3].map(i => {
    const done = i <= active;
    return /*#__PURE__*/React.createElement("div", {
      key: i,
      style: {
        position: 'relative',
        width: 18,
        height: 18,
        borderRadius: '50%',
        background: done ? c.mint : c.paper,
        border: `2px solid ${done ? c.mint : c.mutedSoft}`,
        zIndex: 1
      }
    });
  }));
}
function RainChart() {
  const data = [10, 15, 20, 25, 40, 55, 70, 80, 75, 60];
  const labels = ['10', '11', '12', '13', '14', '15', '16', '17', '18', '19'];
  const max = 100;
  return /*#__PURE__*/React.createElement("svg", {
    width: "100%",
    height: "74",
    viewBox: "0 0 280 80"
  }, data.map((v, i) => {
    const x = 8 + i * 28;
    const h = v / max * 56;
    const isHigh = v >= 50;
    return /*#__PURE__*/React.createElement("g", {
      key: i
    }, /*#__PURE__*/React.createElement("rect", {
      x: x,
      y: 64 - h,
      width: 18,
      height: h,
      rx: "3",
      fill: isHigh ? c.warn : c.mintMid
    }), /*#__PURE__*/React.createElement("text", {
      x: x + 9,
      y: "76",
      textAnchor: "middle",
      fontSize: "9",
      fill: c.muted,
      fontFamily: fm
    }, labels[i]));
  }), /*#__PURE__*/React.createElement("line", {
    x1: "0",
    y1: "64",
    x2: "280",
    y2: "64",
    stroke: c.line,
    strokeWidth: "0.5"
  }));
}
function GainLost({
  kind,
  t
}) {
  const g = kind === 'gain';
  return /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      display: 'flex',
      gap: 6,
      alignItems: 'flex-start'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: fm,
      fontSize: 9,
      fontWeight: 800,
      padding: '2px 5px',
      borderRadius: 3,
      background: g ? c.mintSoft : c.warnSoft,
      color: g ? c.mintDeep : c.warn,
      marginTop: 1,
      flexShrink: 0
    }
  }, g ? 'GAIN' : 'LOST'), /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 11,
      color: c.text2,
      lineHeight: 1.45
    }
  }, t));
}

// ═════════════════════════════════════════════════════════════
// S7 — Detail (Frame 7)
// ═════════════════════════════════════════════════════════════

const THREE = [{
  n: 1,
  head: '为什么值得看',
  body: '这是国内首个汇集青铜、陶瓷、书画的常设展，号称「半部中国通史」。'
}, {
  n: 2,
  head: '到现场重点看哪里',
  body: '先看青铜馆「大盂鼎」与「商鞅方升」，再到三楼书画馆看赵孟頫真迹。'
}, {
  n: 3,
  head: '和你的兴趣有什么关系',
  body: '你勾了「文化深度」、「轻松节奏」标签——东馆室内可坐，沉浸时间长。'
}];
function DetailScreen({
  ctx
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      display: 'flex',
      flexDirection: 'column'
    }
  }, /*#__PURE__*/React.createElement(StatusLine, null), /*#__PURE__*/React.createElement(NavBack, {
    onClick: () => ctx.nav.pop()
  }), /*#__PURE__*/React.createElement(PScroll, null, /*#__PURE__*/React.createElement("div", {
    style: {
      padding: '4px 20px 18px'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 22,
      fontWeight: 700,
      letterSpacing: '-0.018em'
    }
  }, "\u770B\u61C2\u8FD9\u4E00\u7AD9"), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 12.5,
      color: c.muted,
      marginTop: 6
    }
  }, "\u5C11\u4E00\u70B9\u767E\u79D1\uFF0C\u591A\u4E00\u70B9\u4E3A\u4EC0\u4E48\u76F8\u5173")), /*#__PURE__*/React.createElement(Section, null, /*#__PURE__*/React.createElement("div", {
    style: {
      background: c.paper,
      border: `1px solid ${c.line}`,
      borderRadius: 14,
      padding: '4px 16px'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 11,
      color: c.muted,
      fontWeight: 600,
      letterSpacing: '0.06em',
      padding: '12px 0 4px'
    }
  }, "\u5DF2\u66F4\u65B0\u884C\u7A0B"), /*#__PURE__*/React.createElement(UpdatedRow, {
    time: "15:20",
    name: "\u4E0A\u6D77\u535A\u7269\u9986\u4E1C\u9986",
    tag: "\u521A\u521A\u66FF\u6362\u4E86 Citywalk"
  }), /*#__PURE__*/React.createElement(UpdatedRow, {
    time: "17:30",
    name: "\u665A\u9910 \xB7 \u8336\u6B47",
    tag: "\u65F6\u95F4\u4E0D\u53D8",
    last: true
  }))), /*#__PURE__*/React.createElement(Section, {
    style: {
      marginTop: 18
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 18,
      fontWeight: 700,
      letterSpacing: '-0.012em'
    }
  }, "\u4E0A\u6D77 \xB7 \u535A\u7269\u9986\u4E1C\u9986")), /*#__PURE__*/React.createElement(Section, {
    style: {
      marginTop: 12
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 14
    }
  }, THREE.map(t => /*#__PURE__*/React.createElement("div", {
    key: t.n,
    style: {
      display: 'flex',
      gap: 14
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      width: 26,
      height: 26,
      borderRadius: 7,
      background: c.mintSoft,
      color: c.mintDeep,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontFamily: fm,
      fontSize: 12,
      fontWeight: 800,
      flexShrink: 0
    }
  }, t.n), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      paddingTop: 2
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 13.5,
      fontWeight: 700
    }
  }, t.n, "\u3001", t.head), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 12,
      color: c.text2,
      marginTop: 5,
      lineHeight: 1.65
    }
  }, t.body)))))), /*#__PURE__*/React.createElement(Section, {
    style: {
      marginTop: 18
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      background: c.bg,
      borderRadius: 10,
      padding: '10px 14px',
      display: 'flex',
      alignItems: 'center',
      gap: 10
    }
  }, /*#__PURE__*/React.createElement(Badge, {
    kind: "ghost",
    dense: true
  }, "\u6765\u6E90"), /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 11,
      color: c.muted,
      flex: 1
    }
  }, "\u4E0A\u535A\u5B98\u7F51 / \u300A\u4F55\u4EE5\u4E2D\u56FD\u300B\u56FE\u5F55 2024"), /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: fm,
      fontSize: 12,
      fontWeight: 700,
      color: c.mintDeep
    }
  }, "92%"))), /*#__PURE__*/React.createElement("div", {
    style: {
      height: 16
    }
  })), /*#__PURE__*/React.createElement(CtaRow, {
    ghost: "\u8FD4\u56DE\u5730\u56FE",
    ghostAction: () => ctx.nav.jumpTo('trip'),
    primary: "\u52A0\u5165\u8BB2\u89E3",
    primaryAction: () => ctx.nav.jumpTo('trip')
  }));
}
function UpdatedRow({
  time,
  name,
  tag,
  last
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      padding: '10px 0',
      borderTop: `1px solid ${c.lineSoft}`,
      display: 'flex',
      alignItems: 'center',
      gap: 12
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: fm,
      fontSize: 13,
      fontWeight: 700,
      color: c.ink,
      minWidth: 44
    }
  }, time), /*#__PURE__*/React.createElement("div", {
    style: {
      width: 8,
      height: 8,
      borderRadius: '50%',
      background: c.mint,
      flexShrink: 0
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      minWidth: 0
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 13,
      fontWeight: 600
    }
  }, name), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 11,
      color: c.muted,
      marginTop: 2
    }
  }, tag)));
}

// ═════════════════════════════════════════════════════════════
// Registry
// ═════════════════════════════════════════════════════════════

window.SCREENS = {
  home: HomeScreen,
  prefs: PrefsScreen,
  plans: PlansScreen,
  trip: TripScreen,
  search: SearchScreen,
  alert: AlertScreen,
  replan: ReplanScreen,
  detail: DetailScreen
};
})();
