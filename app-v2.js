(function () {
'use strict';
const IOSDevice = window.IOSDevice;
// 游伴 Agent Demo — 文旅风 v2 (Click-through App)
// Strict navigation per Figma prototype:
//   home → prefs → plans → trip
//   trip ↔ search (Frame 4A)
//   trip → alert (5s) → replan → trip
//   trip → detail (tap stop) → trip

const {
  useState,
  useEffect,
  useMemo,
  useCallback,
  useRef
} = React;
const D = window.YOUBAN_DATA;

// ═════════════════════════════════════════════════════════════
// Tokens — paper / ink / mint
// ═════════════════════════════════════════════════════════════
const C = {
  ink: '#0f1411',
  text: '#1f2520',
  text2: '#4a544c',
  muted: '#8a948e',
  mutedSoft: '#b8beb9',
  line: '#e6e8e3',
  lineSoft: '#eef0eb',
  bg: '#f5f6f4',
  bg2: '#ecede9',
  paper: '#ffffff',
  mint: '#1ac49a',
  mintDeep: '#0f9d7a',
  mintSoft: '#e6f7f1',
  mintMid: '#cdeee2',
  cta: '#0f1411',
  ctaSoft: '#1f2520',
  warn: '#c98a1a',
  warnSoft: '#fbf3dc',
  warnPaper: '#fdf8e6',
  sky: '#dfe9f0'
};
const FS = '-apple-system, "PingFang SC", "Noto Sans SC", "Manrope", system-ui, sans-serif';
const FM = '"JetBrains Mono", "SF Mono", ui-monospace, monospace';

// Screen registry — used for back stack
const SCREEN_META = {
  home: {
    label: '愿望',
    layerIdx: 6,
    note: 'L1 意图理解 · 把模糊愿望转成结构化约束'
  },
  prefs: {
    label: '确认偏好',
    layerIdx: 5,
    note: 'L2 约束建模 · 映射非标感受词到画像参数'
  },
  plans: {
    label: '行程方案',
    layerIdx: 3,
    note: 'L4 规划决策 · 加权评分 + 多方案并排'
  },
  trip: {
    label: '今日地图',
    layerIdx: 0,
    note: 'L6 动态反馈 · 空间可视化 + 监测中数据源'
  },
  search: {
    label: '搜索结果',
    layerIdx: 2,
    note: 'L5 工具调用 · 调用 POI 检索 API'
  },
  alert: {
    label: '同行提醒',
    layerIdx: 1,
    note: 'L6 动态反馈 · 冲突识别 + 折中建议'
  },
  replan: {
    label: '行程调整',
    layerIdx: 1,
    note: 'L6 动态反馈 · 事件 → 重排 → 解释 → 等待确认'
  },
  detail: {
    label: '看懂一站',
    layerIdx: 4,
    note: 'L3 知识数据 · 三段式 + 来源 + 置信度'
  }
};

// ═════════════════════════════════════════════════════════════
// App Shell — nav-stack model
// ═════════════════════════════════════════════════════════════

function V2App() {
  const [stack, setStack] = useState(['home']);
  const [eventKey, setEventKey] = useState('rain');
  const [showSidekick, setShowSidekick] = useState(true);
  const [showFlow, setShowFlow] = useState(true);
  const [pickedPlan, setPickedPlan] = useState('B');
  const [autoTriggered, setAutoTriggered] = useState(false);
  const current = stack[stack.length - 1];

  // 5-second auto trigger: trip → alert
  useEffect(() => {
    if (current === 'trip' && !autoTriggered) {
      const t = setTimeout(() => {
        setAutoTriggered(true);
        setStack(s => [...s, 'alert']);
      }, 6000);
      return () => clearTimeout(t);
    }
  }, [current, autoTriggered]);
  const nav = useMemo(() => ({
    push: k => setStack(s => [...s, k]),
    pop: () => setStack(s => s.length > 1 ? s.slice(0, -1) : s),
    reset: () => {
      setStack(['home']);
      setAutoTriggered(false);
      setPickedPlan('B');
    },
    replace: k => setStack(s => [...s.slice(0, -1), k]),
    jumpTo: k => {
      // replace stack with shortest path containing k
      const path = NAV_PATHS[k] || [k];
      setStack(path);
    }
  }), []);
  const ctx = {
    screen: current,
    eventKey,
    setEventKey,
    pickedPlan,
    setPickedPlan,
    autoTriggered,
    setAutoTriggered,
    nav,
    canBack: stack.length > 1
  };
  return /*#__PURE__*/React.createElement("div", {
    style: {
      minHeight: '100vh',
      background: C.bg,
      color: C.ink,
      fontFamily: FS,
      display: 'flex',
      flexDirection: 'column'
    }
  }, /*#__PURE__*/React.createElement(V2TopBar, {
    nav: nav,
    current: current,
    showSidekick: showSidekick,
    setShowSidekick: setShowSidekick,
    showFlow: showFlow,
    setShowFlow: setShowFlow
  }), /*#__PURE__*/React.createElement(V2Stage, {
    ctx: ctx,
    showSidekick: showSidekick,
    showFlow: showFlow
  }));
}

// Canonical path to any screen — used when user clicks the flow map
const NAV_PATHS = {
  home: ['home'],
  prefs: ['home', 'prefs'],
  plans: ['home', 'prefs', 'plans'],
  trip: ['home', 'prefs', 'plans', 'trip'],
  search: ['home', 'prefs', 'plans', 'trip', 'search'],
  alert: ['home', 'prefs', 'plans', 'trip', 'alert'],
  replan: ['home', 'prefs', 'plans', 'trip', 'alert', 'replan'],
  detail: ['home', 'prefs', 'plans', 'trip', 'detail']
};
function V2TopBar({
  nav,
  current,
  showSidekick,
  setShowSidekick,
  showFlow,
  setShowFlow
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      padding: '12px 28px',
      display: 'flex',
      alignItems: 'center',
      gap: 24,
      borderBottom: `1px solid ${C.line}`,
      background: C.paper
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'baseline',
      gap: 10
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'inline-block',
      width: 8,
      height: 8,
      borderRadius: 2,
      background: C.mint,
      alignSelf: 'center'
    }
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 17,
      fontWeight: 700,
      letterSpacing: '-0.012em'
    }
  }, "\u6E38\u4F34 ", /*#__PURE__*/React.createElement("span", {
    style: {
      color: C.mintDeep
    }
  }, "YouBan")), /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 11,
      color: C.muted,
      fontWeight: 500
    }
  }, "\u6587\u5316\u65C5\u884C\u8FDE\u7EED\u51B3\u7B56\u4EE3\u7406 \xB7 \u53EF\u70B9\u51FB\u539F\u578B")), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 8
    }
  }, /*#__PURE__*/React.createElement(ChromeBtn, {
    active: showFlow,
    onClick: () => setShowFlow(!showFlow)
  }, "\u6D41\u7A0B\u56FE"), /*#__PURE__*/React.createElement(ChromeBtn, {
    active: showSidekick,
    onClick: () => setShowSidekick(!showSidekick)
  }, "\u7CFB\u7EDF\u65E5\u5FD7"), /*#__PURE__*/React.createElement(ChromeBtn, {
    onClick: nav.reset
  }, "\u21BB \u91CD\u7F6E")));
}
function ChromeBtn({
  children,
  onClick,
  active
}) {
  return /*#__PURE__*/React.createElement("button", {
    onClick: onClick,
    style: {
      appearance: 'none',
      cursor: 'pointer',
      border: `1px solid ${active ? C.cta : C.line}`,
      background: active ? C.cta : C.paper,
      color: active ? C.paper : C.text2,
      padding: '6px 12px',
      borderRadius: 999,
      fontFamily: FS,
      fontSize: 12,
      fontWeight: 500
    }
  }, children);
}
function V2Stage({
  ctx,
  showSidekick,
  showFlow
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      padding: '28px 32px 32px',
      display: 'flex',
      alignItems: 'flex-start',
      justifyContent: 'center',
      gap: 40
    }
  }, showFlow && /*#__PURE__*/React.createElement(FlowMap, {
    ctx: ctx
  }), /*#__PURE__*/React.createElement(V2Phone, {
    ctx: ctx
  }), showSidekick && /*#__PURE__*/React.createElement(V2Sidekick, {
    ctx: ctx
  }));
}

// ═════════════════════════════════════════════════════════════
// Flow Map — clickable graph of all 8 screens
// ═════════════════════════════════════════════════════════════

const FLOW_NODES = [{
  k: 'home',
  label: '① 愿望',
  x: 0,
  y: 0,
  group: 'A'
}, {
  k: 'prefs',
  label: '② 偏好',
  x: 0,
  y: 1,
  group: 'A'
}, {
  k: 'plans',
  label: '③ 方案',
  x: 0,
  y: 2,
  group: 'A'
}, {
  k: 'trip',
  label: '④ 地图',
  x: 0,
  y: 3,
  group: 'B'
}, {
  k: 'search',
  label: '④A 搜索',
  x: 1,
  y: 3,
  group: 'B'
}, {
  k: 'alert',
  label: '⑤ 同行提醒',
  x: 0,
  y: 4,
  group: 'C'
}, {
  k: 'replan',
  label: '⑥ 行程调整',
  x: 0,
  y: 5,
  group: 'B'
}, {
  k: 'detail',
  label: '⑦ 看懂一站',
  x: 1,
  y: 4,
  group: 'C'
}];
const FLOW_EDGES = [['home', 'prefs'], ['prefs', 'plans'], ['plans', 'trip'], ['trip', 'search'], ['search', 'trip'], ['trip', 'alert'], ['alert', 'replan'], ['replan', 'trip'], ['trip', 'detail']];
function FlowMap({
  ctx
}) {
  const current = ctx.screen;
  const W = 280,
    ROW_H = 56,
    COL_W = 110,
    PAD_X = 24,
    PAD_Y = 24;
  const nodePos = n => ({
    x: PAD_X + n.x * COL_W + 50,
    y: PAD_Y + n.y * ROW_H + 22
  });
  return /*#__PURE__*/React.createElement("div", {
    style: {
      width: W,
      marginTop: 36
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 12,
      fontWeight: 600,
      marginBottom: 4
    }
  }, "\u539F\u578B\u8DF3\u8F6C \xB7 Flow"), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 10.5,
      color: C.muted,
      marginBottom: 14
    }
  }, "\u70B9\u8282\u70B9\u8DF3\u8F6C \xB7 \u4E25\u683C\u6309 Figma \u6D41"), /*#__PURE__*/React.createElement("div", {
    style: {
      background: C.paper,
      border: `1px solid ${C.line}`,
      borderRadius: 14,
      padding: 0,
      position: 'relative',
      height: PAD_Y * 2 + 6 * ROW_H
    }
  }, /*#__PURE__*/React.createElement("svg", {
    width: "100%",
    height: "100%",
    style: {
      position: 'absolute',
      inset: 0
    }
  }, FLOW_EDGES.map(([a, b], i) => {
    const na = FLOW_NODES.find(n => n.k === a);
    const nb = FLOW_NODES.find(n => n.k === b);
    const pa = nodePos(na),
      pb = nodePos(nb);
    return /*#__PURE__*/React.createElement("line", {
      key: i,
      x1: pa.x,
      y1: pa.y,
      x2: pb.x,
      y2: pb.y,
      stroke: C.mutedSoft,
      strokeWidth: "1",
      strokeDasharray: "3 3"
    });
  })), FLOW_NODES.map(n => {
    const p = nodePos(n);
    const active = n.k === current;
    return /*#__PURE__*/React.createElement("button", {
      key: n.k,
      onClick: () => ctx.nav.jumpTo(n.k),
      style: {
        appearance: 'none',
        cursor: 'pointer',
        position: 'absolute',
        left: p.x - 46,
        top: p.y - 14,
        width: 92,
        height: 28,
        borderRadius: 999,
        border: `1px solid ${active ? C.cta : C.line}`,
        background: active ? C.cta : C.paper,
        color: active ? C.paper : C.text2,
        fontFamily: FS,
        fontSize: 11,
        fontWeight: active ? 600 : 500,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }
    }, n.label);
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 12,
      fontSize: 10.5,
      color: C.muted,
      lineHeight: 1.7
    }
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("span", {
    style: {
      color: C.mintDeep,
      fontWeight: 600
    }
  }, "A"), " \u8F93\u5165\u4E0E\u65B9\u6848 \xB7 \u7EBF\u6027"), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("span", {
    style: {
      color: C.mintDeep,
      fontWeight: 600
    }
  }, "B"), " \u5730\u56FE\u4E0E\u52A8\u6001\u8C03\u6574"), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("span", {
    style: {
      color: C.mintDeep,
      fontWeight: 600
    }
  }, "C"), " \u534F\u4F5C\u4E0E\u89E3\u91CA")));
}
function V2Phone({
  ctx
}) {
  const meta = SCREEN_META[ctx.screen];
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      gap: 14
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      textAlign: 'center',
      minHeight: 36
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 12,
      fontWeight: 600
    }
  }, meta.label), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 10.5,
      color: C.muted,
      marginTop: 2
    }
  }, meta.note)), /*#__PURE__*/React.createElement(IOSDevice, {
    width: 372,
    height: 760,
    dark: false
  }, /*#__PURE__*/React.createElement(PhoneShell, {
    ctx: ctx
  })), ctx.canBack && /*#__PURE__*/React.createElement("button", {
    onClick: ctx.nav.pop,
    style: {
      appearance: 'none',
      cursor: 'pointer',
      marginTop: 4,
      border: `1px solid ${C.line}`,
      background: C.paper,
      color: C.text2,
      padding: '7px 16px',
      borderRadius: 999,
      fontFamily: FS,
      fontSize: 11.5,
      fontWeight: 500
    }
  }, "\u2190 \u4E0A\u4E00\u5C4F"));
}
function PhoneShell({
  ctx
}) {
  const Screen = SCREENS[ctx.screen];
  return /*#__PURE__*/React.createElement("div", {
    style: {
      height: '100%',
      display: 'flex',
      flexDirection: 'column',
      background: C.paper,
      color: C.ink,
      overflow: 'hidden',
      position: 'relative'
    }
  }, Screen ? /*#__PURE__*/React.createElement(Screen, {
    ctx: ctx
  }) : /*#__PURE__*/React.createElement("div", {
    style: {
      padding: 32
    }
  }, "[", ctx.screen, "]"));
}

// ═════════════════════════════════════════════════════════════
// Sidekick — system log
// ═════════════════════════════════════════════════════════════

function V2Sidekick({
  ctx
}) {
  const meta = SCREEN_META[ctx.screen];
  const layer = D.layers[meta.layerIdx];
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'flex-start',
      gap: 12,
      marginTop: 36,
      width: 300
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      textAlign: 'left'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 12,
      fontWeight: 600
    }
  }, "\u7CFB\u7EDF\u4FA7 \xB7 System Log"), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 10.5,
      color: C.muted,
      marginTop: 2
    }
  }, "\u5F53\u524D\u5C42\u5728 App \u80CC\u540E\u505A\u4EC0\u4E48")), /*#__PURE__*/React.createElement("div", {
    style: {
      width: '100%',
      background: C.ink,
      color: C.paper,
      borderRadius: 14,
      padding: '16px 18px',
      minHeight: 600,
      fontFamily: FM,
      fontSize: 11.5,
      lineHeight: 1.7,
      position: 'relative',
      overflow: 'hidden'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 6,
      marginBottom: 12
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      width: 8,
      height: 8,
      borderRadius: '50%',
      background: layer.core ? C.warn : C.mint
    }
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 10,
      letterSpacing: '0.15em',
      color: '#ffffffb0',
      fontWeight: 600
    }
  }, layer.en.toUpperCase(), " \xB7 ", layer.id), layer.core && /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 9,
      padding: '2px 6px',
      borderRadius: 3,
      background: C.warn + '30',
      color: C.warn,
      fontWeight: 700,
      marginLeft: 'auto'
    }
  }, "CORE")), /*#__PURE__*/React.createElement(Trace, {
    screen: ctx.screen,
    ctx: ctx
  })));
}
const grn = '#74e9a3',
  cyn = '#7ad7e8',
  yel = '#f3d76c',
  org = '#ffb38a',
  gry = '#9aa3b0',
  mag = '#ec7ff7';
const TrLine = ({
  children
}) => /*#__PURE__*/React.createElement("div", {
  style: {
    whiteSpace: 'pre'
  }
}, children);
const Kk = ({
  children,
  c
}) => /*#__PURE__*/React.createElement("span", {
  style: {
    color: c || '#7ad7e8'
  }
}, children);
const Vv = ({
  children,
  c
}) => /*#__PURE__*/React.createElement("span", {
  style: {
    color: c || '#f3d76c'
  }
}, children);
const Qq = ({
  children,
  c
}) => /*#__PURE__*/React.createElement("span", {
  style: {
    color: c || '#74e9a3'
  }
}, children);
const Cm = ({
  children
}) => /*#__PURE__*/React.createElement("span", {
  style: {
    color: gry,
    fontStyle: 'italic'
  }
}, children);
function Trace({
  screen,
  ctx
}) {
  const s = screen;
  if (s === 'home') return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(TrLine, null, /*#__PURE__*/React.createElement(Kk, null, "input"), " = ", /*#__PURE__*/React.createElement(Qq, null, "\"\u4E0A\u6D77\u4E00\u5929\uFF0C\u8F7B\u677E\u4E00\u70B9\uFF0C\u6709\u6587\u5316\u611F\uFF0C\u4E0D\u8981\u592A\u7F51\u7EA2\"")), /*#__PURE__*/React.createElement(TrLine, null, " "), /*#__PURE__*/React.createElement(TrLine, null, /*#__PURE__*/React.createElement(Cm, null, "// \u63D0\u53D6\u975E\u6807\u611F\u53D7\u8BCD")), /*#__PURE__*/React.createElement(TrLine, null, /*#__PURE__*/React.createElement(Kk, null, "tokens"), " = [", /*#__PURE__*/React.createElement(Qq, {
    c: grn
  }, "\"\u8F7B\u677E\""), ", ", /*#__PURE__*/React.createElement(Qq, {
    c: grn
  }, "\"\u6709\u6587\u5316\u611F\""), "]"), /*#__PURE__*/React.createElement(TrLine, null, " "), /*#__PURE__*/React.createElement(TrLine, null, /*#__PURE__*/React.createElement(Cm, null, "// \u7ED3\u6784\u5316\u8F93\u5165")), /*#__PURE__*/React.createElement(TrLine, null, /*#__PURE__*/React.createElement(Kk, null, "date"), ": ", /*#__PURE__*/React.createElement(Vv, {
    c: grn
  }, "\"08/01\"")), /*#__PURE__*/React.createElement(TrLine, null, /*#__PURE__*/React.createElement(Kk, null, "depart_time"), ": ", /*#__PURE__*/React.createElement(Vv, {
    c: grn
  }, "\"09:30\"")), /*#__PURE__*/React.createElement(TrLine, null, /*#__PURE__*/React.createElement(Kk, null, "duration"), ": ", /*#__PURE__*/React.createElement(Vv, {
    c: org
  }, "1 day")), /*#__PURE__*/React.createElement(TrLine, null, /*#__PURE__*/React.createElement(Kk, null, "seed_tags"), ": [", /*#__PURE__*/React.createElement(Vv, {
    c: grn
  }, "\"Citywalk\""), ", ", /*#__PURE__*/React.createElement(Vv, {
    c: grn
  }, "\"\u8C6B\u56ED\""), "]"), /*#__PURE__*/React.createElement(TrLine, null, " "), /*#__PURE__*/React.createElement(TrLine, null, /*#__PURE__*/React.createElement(Cm, null, "// next \u2192 L2 \u504F\u597D\u6ED1\u5757\u8865\u5168")));
  if (s === 'prefs') return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(TrLine, null, /*#__PURE__*/React.createElement(Kk, null, "mode"), " = ", /*#__PURE__*/React.createElement(Vv, {
    c: grn
  }, "\"relaxed_elder\"")), /*#__PURE__*/React.createElement(TrLine, null, " "), /*#__PURE__*/React.createElement(TrLine, null, /*#__PURE__*/React.createElement(Kk, null, "profile"), " = ", `{`), /*#__PURE__*/React.createElement(TrLine, null, "  ", /*#__PURE__*/React.createElement(Kk, {
    c: cyn
  }, "walk_max_km"), ": ", /*#__PURE__*/React.createElement(Vv, {
    c: org
  }, "2.5"), ",    ", /*#__PURE__*/React.createElement(Cm, null, "// \u4F4E")), /*#__PURE__*/React.createElement(TrLine, null, "  ", /*#__PURE__*/React.createElement(Kk, {
    c: cyn
  }, "culture_depth"), ": ", /*#__PURE__*/React.createElement(Vv, {
    c: org
  }, "0.78"), ", ", /*#__PURE__*/React.createElement(Cm, null, "// \u9AD8")), /*#__PURE__*/React.createElement(TrLine, null, "  ", /*#__PURE__*/React.createElement(Kk, {
    c: cyn
  }, "rest_rate"), ": ", /*#__PURE__*/React.createElement(Vv, {
    c: org
  }, "0.82"), ",    ", /*#__PURE__*/React.createElement(Cm, null, "// \u9AD8")), /*#__PURE__*/React.createElement(TrLine, null, "  ", /*#__PURE__*/React.createElement(Kk, {
    c: cyn
  }, "crowd_threshold"), ": ", /*#__PURE__*/React.createElement(Vv, {
    c: org
  }, "0.6")), /*#__PURE__*/React.createElement(TrLine, null, `}`), /*#__PURE__*/React.createElement(TrLine, null, " "), /*#__PURE__*/React.createElement(TrLine, null, /*#__PURE__*/React.createElement(Cm, null, "// \u8C03\u6574 \u2192 \u5373\u65F6\u5F71\u54CD\u6392\u5E8F")));
  if (s === 'plans') return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(TrLine, null, /*#__PURE__*/React.createElement(Cm, null, "// ScoreAttraction() \u5DF2\u7ECF\u8BC4\u5206")), /*#__PURE__*/React.createElement(TrLine, null, /*#__PURE__*/React.createElement(Vv, {
    c: mag
  }, "B"), " \u8F7B\u677E\u957F\u8F88\u7EBF \u2192 ", /*#__PURE__*/React.createElement(Vv, {
    c: grn
  }, "92"), " ", /*#__PURE__*/React.createElement(Cm, null, "\u2605 \u63A8\u8350")), /*#__PURE__*/React.createElement(TrLine, null, /*#__PURE__*/React.createElement(Vv, {
    c: mag
  }, "A"), " \u7ECF\u5178\u6587\u5316\u7EBF \u2192 ", /*#__PURE__*/React.createElement(Vv, {
    c: yel
  }, "86")), /*#__PURE__*/React.createElement(TrLine, null, /*#__PURE__*/React.createElement(Vv, {
    c: mag
  }, "C"), " \u57CE\u5E02\u8BB0\u5FC6\u7EBF \u2192 ", /*#__PURE__*/React.createElement(Vv, {
    c: yel
  }, "79")), /*#__PURE__*/React.createElement(TrLine, null, " "), /*#__PURE__*/React.createElement(TrLine, null, /*#__PURE__*/React.createElement(Kk, null, "user_picked"), ": ", /*#__PURE__*/React.createElement(Vv, {
    c: grn
  }, "\"", ctx.pickedPlan, "\"")), /*#__PURE__*/React.createElement(TrLine, null, /*#__PURE__*/React.createElement(Kk, null, "user_can_iterate"), ": ", /*#__PURE__*/React.createElement(Vv, {
    c: grn
  }, "true")));
  if (s === 'trip') return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(TrLine, null, /*#__PURE__*/React.createElement(Kk, null, "day"), ": ", /*#__PURE__*/React.createElement(Vv, {
    c: grn
  }, "\"08.01 \u5468\u4E94\"")), /*#__PURE__*/React.createElement(TrLine, null, /*#__PURE__*/React.createElement(Kk, null, "stops"), ": ", /*#__PURE__*/React.createElement(Vv, {
    c: org
  }, "3")), /*#__PURE__*/React.createElement(TrLine, null, " "), /*#__PURE__*/React.createElement(TrLine, null, /*#__PURE__*/React.createElement(Cm, null, "// \u76D1\u6D4B\u4E2D")), /*#__PURE__*/React.createElement(TrLine, null, "  ", /*#__PURE__*/React.createElement(Vv, {
    c: grn
  }, "\u2713"), " weather_api"), /*#__PURE__*/React.createElement(TrLine, null, "  ", /*#__PURE__*/React.createElement(Vv, {
    c: grn
  }, "\u2713"), " traffic"), /*#__PURE__*/React.createElement(TrLine, null, "  ", /*#__PURE__*/React.createElement(Vv, {
    c: grn
  }, "\u2713"), " queue_estimator"), /*#__PURE__*/React.createElement(TrLine, null, "  ", /*#__PURE__*/React.createElement(Vv, {
    c: grn
  }, "\u2713"), " behavior_signal"), /*#__PURE__*/React.createElement(TrLine, null, " "), /*#__PURE__*/React.createElement(TrLine, null, /*#__PURE__*/React.createElement(Cm, null, "// 6s \u540E\u81EA\u52A8\u63A8\u9001\u540C\u884C\u63D0\u9192 \u2192")));
  if (s === 'search') return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(TrLine, null, /*#__PURE__*/React.createElement(Kk, null, "query"), " = ", /*#__PURE__*/React.createElement(Vv, {
    c: grn
  }, "\"\u8C6B\u56ED \u9644\u8FD1 \u6587\u5316\"")), /*#__PURE__*/React.createElement(TrLine, null, /*#__PURE__*/React.createElement(Kk, null, "filter"), ": ", /*#__PURE__*/React.createElement(Vv, {
    c: grn
  }, "\"\u6CBF\u8DEF 2 km\"")), /*#__PURE__*/React.createElement(TrLine, null, " "), /*#__PURE__*/React.createElement(TrLine, null, /*#__PURE__*/React.createElement(Cm, null, "// POI \u68C0\u7D22 \u2192 2 results")), /*#__PURE__*/React.createElement(TrLine, null, "1. \u4E0A\u6D77\u535A\u7269\u9986\u4E1C\u9986"), /*#__PURE__*/React.createElement(TrLine, null, "   ", /*#__PURE__*/React.createElement(Cm, null, "\xB7"), " \u8DDD\u79BB 2.1 km"), /*#__PURE__*/React.createElement(TrLine, null, "2. \u8C6B\u56ED"), /*#__PURE__*/React.createElement(TrLine, null, "   ", /*#__PURE__*/React.createElement(Cm, null, "\xB7"), " \u8DDD\u79BB 1.4 km"));
  if (s === 'alert') return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(TrLine, null, /*#__PURE__*/React.createElement(Kk, null, "partner"), " = ", /*#__PURE__*/React.createElement(Vv, {
    c: grn
  }, "\"\u7238\u5988\"")), /*#__PURE__*/React.createElement(TrLine, null, /*#__PURE__*/React.createElement(Kk, null, "conflict_detected"), ": ", /*#__PURE__*/React.createElement(Vv, {
    c: org
  }, "true")), /*#__PURE__*/React.createElement(TrLine, null, /*#__PURE__*/React.createElement(Kk, null, "user_pref"), " = ", /*#__PURE__*/React.createElement(Vv, {
    c: grn
  }, "\"\u4FDD\u7559\u6B66\u5EB7\u8DEF Citywalk\"")), /*#__PURE__*/React.createElement(TrLine, null, /*#__PURE__*/React.createElement(Kk, null, "partner_constraint"), " = ", /*#__PURE__*/React.createElement(Vv, {
    c: grn
  }, "\"\u4E0B\u5348\u4F53\u529B\u504F\u9AD8\"")), /*#__PURE__*/React.createElement(TrLine, null, " "), /*#__PURE__*/React.createElement(TrLine, null, /*#__PURE__*/React.createElement(Cm, null, "// \u6298\u4E2D\u5EFA\u8BAE")), /*#__PURE__*/React.createElement(TrLine, null, "A: \u7F29\u77ED Citywalk \u2192 ", /*#__PURE__*/React.createElement(Vv, {
    c: grn
  }, "\u4FDD\u7559\u6C1B\u56F4")), /*#__PURE__*/React.createElement(TrLine, null, "B: \u6362\u5BA4\u5185\u6587\u5316\u70B9 \u2192 ", /*#__PURE__*/React.createElement(Vv, {
    c: grn
  }, "\u5C11\u8D70 1.2 km")));
  const ev = D.events[ctx.eventKey];
  if (s === 'replan') return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(TrLine, null, /*#__PURE__*/React.createElement(Kk, null, "event"), " = ", `{`), /*#__PURE__*/React.createElement(TrLine, null, "  ", /*#__PURE__*/React.createElement(Kk, {
    c: cyn
  }, "type"), ": ", /*#__PURE__*/React.createElement(Vv, {
    c: grn
  }, "\"", ctx.eventKey, "\""), ","), /*#__PURE__*/React.createElement(TrLine, null, "  ", /*#__PURE__*/React.createElement(Kk, {
    c: cyn
  }, "severity"), ": ", /*#__PURE__*/React.createElement(Vv, {
    c: org
  }, "\"", ev.severity, "\""), ","), /*#__PURE__*/React.createElement(TrLine, null, "  ", /*#__PURE__*/React.createElement(Kk, {
    c: cyn
  }, "detail"), ": ", /*#__PURE__*/React.createElement(Vv, {
    c: grn
  }, "\"", ev.headline, "\"")), /*#__PURE__*/React.createElement(TrLine, null, `}`), /*#__PURE__*/React.createElement(TrLine, null, " "), /*#__PURE__*/React.createElement(TrLine, null, /*#__PURE__*/React.createElement(Vv, {
    c: grn
  }, "\u2713"), " Detect"), /*#__PURE__*/React.createElement(TrLine, null, /*#__PURE__*/React.createElement(Vv, {
    c: grn
  }, "\u2713"), " Query KB \xB7 \u540C\u4E3B\u9898\u5BA4\u5185"), /*#__PURE__*/React.createElement(TrLine, null, /*#__PURE__*/React.createElement(Vv, {
    c: grn
  }, "\u2713"), " Score & rank"), /*#__PURE__*/React.createElement(TrLine, null, " "), /*#__PURE__*/React.createElement(TrLine, null, /*#__PURE__*/React.createElement(Cm, null, "// GAIN/LOST \u540C\u6B65\u544A\u77E5")));
  if (s === 'detail') return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(TrLine, null, /*#__PURE__*/React.createElement(Kk, null, "query"), " = ", /*#__PURE__*/React.createElement(Vv, {
    c: grn
  }, "\"\u4E0A\u6D77\u535A\u7269\u9986\u4E1C\u9986\"")), /*#__PURE__*/React.createElement(TrLine, null, " "), /*#__PURE__*/React.createElement(TrLine, null, /*#__PURE__*/React.createElement(Cm, null, "// RAG \u68C0\u7D22")), /*#__PURE__*/React.createElement(TrLine, null, /*#__PURE__*/React.createElement(Vv, {
    c: grn
  }, "\u2713"), " \u4E0A\u535A\u5B98\u7F51"), /*#__PURE__*/React.createElement(TrLine, null, /*#__PURE__*/React.createElement(Vv, {
    c: grn
  }, "\u2713"), " \u300A\u4F55\u4EE5\u4E2D\u56FD\u300B\u56FE\u5F55 2024"), /*#__PURE__*/React.createElement(TrLine, null, " "), /*#__PURE__*/React.createElement(TrLine, null, /*#__PURE__*/React.createElement(Kk, null, "output"), " = ", `{`), /*#__PURE__*/React.createElement(TrLine, null, "  ", /*#__PURE__*/React.createElement(Kk, {
    c: cyn
  }, "format"), ": ", /*#__PURE__*/React.createElement(Vv, {
    c: grn
  }, "\"three_things\""), ","), /*#__PURE__*/React.createElement(TrLine, null, "  ", /*#__PURE__*/React.createElement(Kk, {
    c: cyn
  }, "confidence"), ": ", /*#__PURE__*/React.createElement(Vv, {
    c: grn
  }, "0.92")), /*#__PURE__*/React.createElement(TrLine, null, `}`));
  return null;
}

// ═════════════════════════════════════════════════════════════
// Shared phone atoms
// ═════════════════════════════════════════════════════════════

function StatusLine() {
  // Device frame already renders its own status bar + dynamic island.
  // Reserve safe-area below them (status bar ~62px tall).
  return /*#__PURE__*/React.createElement("div", {
    style: {
      height: 64,
      flexShrink: 0
    }
  });
}
function PScroll({
  children
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      overflowY: 'auto',
      overflowX: 'hidden'
    }
  }, children);
}
function Badge({
  kind = 'neutral',
  children,
  dense
}) {
  const map = {
    neutral: {
      bg: C.bg,
      fg: C.text2,
      br: C.line
    },
    mint: {
      bg: C.mintSoft,
      fg: C.mintDeep,
      br: C.mint + '40'
    },
    solid: {
      bg: C.mint,
      fg: C.paper,
      br: C.mint
    },
    dark: {
      bg: C.cta,
      fg: C.paper,
      br: C.cta
    },
    warn: {
      bg: C.warnSoft,
      fg: C.warn,
      br: C.warn + '40'
    },
    ghost: {
      bg: 'transparent',
      fg: C.muted,
      br: C.line
    }
  };
  const m = map[kind] || map.neutral;
  return /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: dense ? 9.5 : 10.5,
      padding: dense ? '2px 6px' : '3px 8px',
      borderRadius: 999,
      background: m.bg,
      color: m.fg,
      border: `1px solid ${m.br}`,
      fontWeight: 600,
      whiteSpace: 'nowrap',
      letterSpacing: '0.02em'
    }
  }, children);
}
window.V2 = {
  C,
  FS,
  FM,
  SCREEN_META,
  V2App,
  Badge,
  StatusLine,
  PScroll
};
window.__v2Ready = true;
})();
