// 游伴 Agent Demo — 文旅风 v2 (Click-through App)
// Strict navigation per Figma prototype:
//   home → prefs → plans → trip
//   trip ↔ search (Frame 4A)
//   trip → alert (5s) → replan → trip
//   trip → detail (tap stop) → trip

const { useState, useEffect, useMemo, useCallback, useRef } = React;
const D = window.YOUBAN_DATA;

// ═════════════════════════════════════════════════════════════
// Tokens — paper / ink / mint
// ═════════════════════════════════════════════════════════════
const C = {
  ink:        '#0f1411',
  text:       '#1f2520',
  text2:      '#4a544c',
  muted:      '#8a948e',
  mutedSoft:  '#b8beb9',
  line:       '#e6e8e3',
  lineSoft:   '#eef0eb',
  bg:         '#f5f6f4',
  bg2:        '#ecede9',
  paper:      '#ffffff',
  mint:       '#1ac49a',
  mintDeep:   '#0f9d7a',
  mintSoft:   '#e6f7f1',
  mintMid:    '#cdeee2',
  cta:        '#0f1411',
  ctaSoft:    '#1f2520',
  warn:       '#c98a1a',
  warnSoft:   '#fbf3dc',
  warnPaper:  '#fdf8e6',
  sky:        '#dfe9f0'
};

const FS = '-apple-system, "PingFang SC", "Noto Sans SC", "Manrope", system-ui, sans-serif';
const FM = '"JetBrains Mono", "SF Mono", ui-monospace, monospace';

// Screen registry — used for back stack
const SCREEN_META = {
  home:   { label: '愿望',    layerIdx: 6, note: 'L1 意图理解 · 把模糊愿望转成结构化约束' },
  prefs:  { label: '确认偏好', layerIdx: 5, note: 'L2 约束建模 · 映射非标感受词到画像参数' },
  plans:  { label: '行程方案', layerIdx: 3, note: 'L4 规划决策 · 加权评分 + 多方案并排' },
  trip:   { label: '今日地图', layerIdx: 0, note: 'L6 动态反馈 · 空间可视化 + 监测中数据源' },
  search: { label: '搜索结果', layerIdx: 2, note: 'L5 工具调用 · 调用 POI 检索 API' },
  alert:  { label: '同行提醒', layerIdx: 1, note: 'L6 动态反馈 · 冲突识别 + 折中建议' },
  replan: { label: '行程调整', layerIdx: 1, note: 'L6 动态反馈 · 事件 → 重排 → 解释 → 等待确认' },
  detail: { label: '看懂一站', layerIdx: 4, note: 'L3 知识数据 · 三段式 + 来源 + 置信度' }
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
    push: (k) => setStack(s => [...s, k]),
    pop:  () => setStack(s => s.length > 1 ? s.slice(0, -1) : s),
    reset: () => { setStack(['home']); setAutoTriggered(false); setPickedPlan('B'); },
    replace: (k) => setStack(s => [...s.slice(0, -1), k]),
    jumpTo: (k) => {
      // replace stack with shortest path containing k
      const path = NAV_PATHS[k] || [k];
      setStack(path);
    }
  }), []);

  const ctx = {
    screen: current,
    eventKey, setEventKey,
    pickedPlan, setPickedPlan,
    autoTriggered, setAutoTriggered,
    nav,
    canBack: stack.length > 1
  };

  return (
    <div style={{
      minHeight: '100vh', background: C.bg, color: C.ink,
      fontFamily: FS, display: 'flex', flexDirection: 'column'
    }}>
      <V2TopBar nav={nav} current={current} showSidekick={showSidekick} setShowSidekick={setShowSidekick} showFlow={showFlow} setShowFlow={setShowFlow} />
      <V2Stage ctx={ctx} showSidekick={showSidekick} showFlow={showFlow} />
    </div>
  );
}

// Canonical path to any screen — used when user clicks the flow map
const NAV_PATHS = {
  home:   ['home'],
  prefs:  ['home', 'prefs'],
  plans:  ['home', 'prefs', 'plans'],
  trip:   ['home', 'prefs', 'plans', 'trip'],
  search: ['home', 'prefs', 'plans', 'trip', 'search'],
  alert:  ['home', 'prefs', 'plans', 'trip', 'alert'],
  replan: ['home', 'prefs', 'plans', 'trip', 'alert', 'replan'],
  detail: ['home', 'prefs', 'plans', 'trip', 'detail']
};

function V2TopBar({ nav, current, showSidekick, setShowSidekick, showFlow, setShowFlow }) {
  return (
    <div style={{
      padding: '12px 28px', display: 'flex', alignItems: 'center', gap: 24,
      borderBottom: `1px solid ${C.line}`, background: C.paper
    }}>
      <div style={{ display: 'flex', alignItems: 'baseline', gap: 10 }}>
        <span style={{
          display: 'inline-block', width: 8, height: 8, borderRadius: 2,
          background: C.mint, alignSelf: 'center'
        }}></span>
        <span style={{ fontSize: 17, fontWeight: 700, letterSpacing: '-0.012em' }}>
          游伴 <span style={{ color: C.mintDeep }}>YouBan</span>
        </span>
        <span style={{ fontSize: 11, color: C.muted, fontWeight: 500 }}>文化旅行连续决策代理 · 可点击原型</span>
      </div>
      <div style={{ flex: 1 }}></div>
      <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
        <ChromeBtn active={showFlow} onClick={() => setShowFlow(!showFlow)}>流程图</ChromeBtn>
        <ChromeBtn active={showSidekick} onClick={() => setShowSidekick(!showSidekick)}>系统日志</ChromeBtn>
        <ChromeBtn onClick={nav.reset}>↻ 重置</ChromeBtn>
      </div>
    </div>
  );
}

function ChromeBtn({ children, onClick, active }) {
  return (
    <button onClick={onClick} style={{
      appearance: 'none', cursor: 'pointer',
      border: `1px solid ${active ? C.cta : C.line}`,
      background: active ? C.cta : C.paper,
      color: active ? C.paper : C.text2,
      padding: '6px 12px', borderRadius: 999,
      fontFamily: FS, fontSize: 12, fontWeight: 500
    }}>{children}</button>
  );
}

function V2Stage({ ctx, showSidekick, showFlow }) {
  return (
    <div style={{
      flex: 1, padding: '28px 32px 32px',
      display: 'flex', alignItems: 'flex-start', justifyContent: 'center', gap: 40
    }}>
      {showFlow && <FlowMap ctx={ctx} />}
      <V2Phone ctx={ctx} />
      {showSidekick && <V2Sidekick ctx={ctx} />}
    </div>
  );
}

// ═════════════════════════════════════════════════════════════
// Flow Map — clickable graph of all 8 screens
// ═════════════════════════════════════════════════════════════

const FLOW_NODES = [
  { k: 'home',   label: '① 愿望',     x: 0, y: 0, group: 'A' },
  { k: 'prefs',  label: '② 偏好',     x: 0, y: 1, group: 'A' },
  { k: 'plans',  label: '③ 方案',     x: 0, y: 2, group: 'A' },
  { k: 'trip',   label: '④ 地图',     x: 0, y: 3, group: 'B' },
  { k: 'search', label: '④A 搜索',   x: 1, y: 3, group: 'B' },
  { k: 'alert',  label: '⑤ 同行提醒', x: 0, y: 4, group: 'C' },
  { k: 'replan', label: '⑥ 行程调整', x: 0, y: 5, group: 'B' },
  { k: 'detail', label: '⑦ 看懂一站', x: 1, y: 4, group: 'C' }
];

const FLOW_EDGES = [
  ['home', 'prefs'], ['prefs', 'plans'], ['plans', 'trip'],
  ['trip', 'search'], ['search', 'trip'],
  ['trip', 'alert'], ['alert', 'replan'], ['replan', 'trip'],
  ['trip', 'detail']
];

function FlowMap({ ctx }) {
  const current = ctx.screen;
  const W = 280, ROW_H = 56, COL_W = 110, PAD_X = 24, PAD_Y = 24;
  const nodePos = (n) => ({ x: PAD_X + n.x * COL_W + 50, y: PAD_Y + n.y * ROW_H + 22 });

  return (
    <div style={{ width: W, marginTop: 36 }}>
      <div style={{ fontSize: 12, fontWeight: 600, marginBottom: 4 }}>原型跳转 · Flow</div>
      <div style={{ fontSize: 10.5, color: C.muted, marginBottom: 14 }}>点节点跳转 · 严格按 Figma 流</div>

      <div style={{
        background: C.paper, border: `1px solid ${C.line}`, borderRadius: 14,
        padding: 0, position: 'relative', height: PAD_Y * 2 + 6 * ROW_H
      }}>
        <svg width="100%" height="100%" style={{ position: 'absolute', inset: 0 }}>
          {FLOW_EDGES.map(([a, b], i) => {
            const na = FLOW_NODES.find(n => n.k === a);
            const nb = FLOW_NODES.find(n => n.k === b);
            const pa = nodePos(na), pb = nodePos(nb);
            return (
              <line key={i}
                x1={pa.x} y1={pa.y} x2={pb.x} y2={pb.y}
                stroke={C.mutedSoft} strokeWidth="1" strokeDasharray="3 3"
              />
            );
          })}
        </svg>

        {FLOW_NODES.map(n => {
          const p = nodePos(n);
          const active = n.k === current;
          return (
            <button key={n.k} onClick={() => ctx.nav.jumpTo(n.k)} style={{
              appearance: 'none', cursor: 'pointer',
              position: 'absolute', left: p.x - 46, top: p.y - 14,
              width: 92, height: 28, borderRadius: 999,
              border: `1px solid ${active ? C.cta : C.line}`,
              background: active ? C.cta : C.paper,
              color: active ? C.paper : C.text2,
              fontFamily: FS, fontSize: 11, fontWeight: active ? 600 : 500,
              display: 'flex', alignItems: 'center', justifyContent: 'center'
            }}>{n.label}</button>
          );
        })}
      </div>

      <div style={{ marginTop: 12, fontSize: 10.5, color: C.muted, lineHeight: 1.7 }}>
        <div><span style={{ color: C.mintDeep, fontWeight: 600 }}>A</span> 输入与方案 · 线性</div>
        <div><span style={{ color: C.mintDeep, fontWeight: 600 }}>B</span> 地图与动态调整</div>
        <div><span style={{ color: C.mintDeep, fontWeight: 600 }}>C</span> 协作与解释</div>
      </div>
    </div>
  );
}

function V2Phone({ ctx }) {
  const meta = SCREEN_META[ctx.screen];
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 14 }}>
      <div style={{ textAlign: 'center', minHeight: 36 }}>
        <div style={{ fontSize: 12, fontWeight: 600 }}>{meta.label}</div>
        <div style={{ fontSize: 10.5, color: C.muted, marginTop: 2 }}>{meta.note}</div>
      </div>
      <IOSDevice width={372} height={760} dark={false}>
        <PhoneShell ctx={ctx} />
      </IOSDevice>
      {ctx.canBack && (
        <button onClick={ctx.nav.pop} style={{
          appearance: 'none', cursor: 'pointer', marginTop: 4,
          border: `1px solid ${C.line}`, background: C.paper, color: C.text2,
          padding: '7px 16px', borderRadius: 999,
          fontFamily: FS, fontSize: 11.5, fontWeight: 500
        }}>← 上一屏</button>
      )}
    </div>
  );
}

function PhoneShell({ ctx }) {
  const Screen = SCREENS[ctx.screen];
  return (
    <div style={{
      height: '100%', display: 'flex', flexDirection: 'column',
      background: C.paper, color: C.ink, overflow: 'hidden', position: 'relative'
    }}>
      {Screen ? <Screen ctx={ctx} /> : <div style={{ padding: 32 }}>[{ctx.screen}]</div>}
    </div>
  );
}

// ═════════════════════════════════════════════════════════════
// Sidekick — system log
// ═════════════════════════════════════════════════════════════

function V2Sidekick({ ctx }) {
  const meta = SCREEN_META[ctx.screen];
  const layer = D.layers[meta.layerIdx];
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: 12, marginTop: 36, width: 300 }}>
      <div style={{ textAlign: 'left' }}>
        <div style={{ fontSize: 12, fontWeight: 600 }}>系统侧 · System Log</div>
        <div style={{ fontSize: 10.5, color: C.muted, marginTop: 2 }}>当前层在 App 背后做什么</div>
      </div>
      <div style={{
        width: '100%', background: C.ink, color: C.paper,
        borderRadius: 14, padding: '16px 18px', minHeight: 600,
        fontFamily: FM, fontSize: 11.5, lineHeight: 1.7, position: 'relative', overflow: 'hidden'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 12 }}>
          <span style={{ width: 8, height: 8, borderRadius: '50%', background: layer.core ? C.warn : C.mint }}></span>
          <span style={{ fontSize: 10, letterSpacing: '0.15em', color: '#ffffffb0', fontWeight: 600 }}>
            {layer.en.toUpperCase()} · {layer.id}
          </span>
          {layer.core && <span style={{ fontSize: 9, padding: '2px 6px', borderRadius: 3, background: C.warn + '30', color: C.warn, fontWeight: 700, marginLeft: 'auto' }}>CORE</span>}
        </div>
        <Trace screen={ctx.screen} ctx={ctx} />
      </div>
    </div>
  );
}

const grn = '#74e9a3', cyn = '#7ad7e8', yel = '#f3d76c', org = '#ffb38a', gry = '#9aa3b0', mag = '#ec7ff7';
const TrLine = ({ children }) => <div style={{ whiteSpace: 'pre' }}>{children}</div>;
const Kk = ({ children, c }) => <span style={{ color: c || '#7ad7e8' }}>{children}</span>;
const Vv = ({ children, c }) => <span style={{ color: c || '#f3d76c' }}>{children}</span>;
const Qq = ({ children, c }) => <span style={{ color: c || '#74e9a3' }}>{children}</span>;
const Cm = ({ children }) => <span style={{ color: gry, fontStyle: 'italic' }}>{children}</span>;

function Trace({ screen, ctx }) {
  const s = screen;
  if (s === 'home') return (
    <>
      <TrLine><Kk>input</Kk> = <Qq>"上海一天，轻松一点，有文化感，不要太网红"</Qq></TrLine>
      <TrLine> </TrLine>
      <TrLine><Cm>// 提取非标感受词</Cm></TrLine>
      <TrLine><Kk>tokens</Kk> = [<Qq c={grn}>"轻松"</Qq>, <Qq c={grn}>"有文化感"</Qq>]</TrLine>
      <TrLine> </TrLine>
      <TrLine><Cm>// 结构化输入</Cm></TrLine>
      <TrLine><Kk>date</Kk>: <Vv c={grn}>"08/01"</Vv></TrLine>
      <TrLine><Kk>depart_time</Kk>: <Vv c={grn}>"09:30"</Vv></TrLine>
      <TrLine><Kk>duration</Kk>: <Vv c={org}>1 day</Vv></TrLine>
      <TrLine><Kk>seed_tags</Kk>: [<Vv c={grn}>"Citywalk"</Vv>, <Vv c={grn}>"豫园"</Vv>]</TrLine>
      <TrLine> </TrLine>
      <TrLine><Cm>// next → L2 偏好滑块补全</Cm></TrLine>
    </>
  );
  if (s === 'prefs') return (
    <>
      <TrLine><Kk>mode</Kk> = <Vv c={grn}>"relaxed_elder"</Vv></TrLine>
      <TrLine> </TrLine>
      <TrLine><Kk>profile</Kk> = {`{`}</TrLine>
      <TrLine>  <Kk c={cyn}>walk_max_km</Kk>: <Vv c={org}>2.5</Vv>,    <Cm>// 低</Cm></TrLine>
      <TrLine>  <Kk c={cyn}>culture_depth</Kk>: <Vv c={org}>0.78</Vv>, <Cm>// 高</Cm></TrLine>
      <TrLine>  <Kk c={cyn}>rest_rate</Kk>: <Vv c={org}>0.82</Vv>,    <Cm>// 高</Cm></TrLine>
      <TrLine>  <Kk c={cyn}>crowd_threshold</Kk>: <Vv c={org}>0.6</Vv></TrLine>
      <TrLine>{`}`}</TrLine>
      <TrLine> </TrLine>
      <TrLine><Cm>// 调整 → 即时影响排序</Cm></TrLine>
    </>
  );
  if (s === 'plans') return (
    <>
      <TrLine><Cm>// ScoreAttraction() 已经评分</Cm></TrLine>
      <TrLine><Vv c={mag}>B</Vv> 轻松长辈线 → <Vv c={grn}>92</Vv> <Cm>★ 推荐</Cm></TrLine>
      <TrLine><Vv c={mag}>A</Vv> 经典文化线 → <Vv c={yel}>86</Vv></TrLine>
      <TrLine><Vv c={mag}>C</Vv> 城市记忆线 → <Vv c={yel}>79</Vv></TrLine>
      <TrLine> </TrLine>
      <TrLine><Kk>user_picked</Kk>: <Vv c={grn}>"{ctx.pickedPlan}"</Vv></TrLine>
      <TrLine><Kk>user_can_iterate</Kk>: <Vv c={grn}>true</Vv></TrLine>
    </>
  );
  if (s === 'trip') return (
    <>
      <TrLine><Kk>day</Kk>: <Vv c={grn}>"08.01 周五"</Vv></TrLine>
      <TrLine><Kk>stops</Kk>: <Vv c={org}>3</Vv></TrLine>
      <TrLine> </TrLine>
      <TrLine><Cm>// 监测中</Cm></TrLine>
      <TrLine>  <Vv c={grn}>✓</Vv> weather_api</TrLine>
      <TrLine>  <Vv c={grn}>✓</Vv> traffic</TrLine>
      <TrLine>  <Vv c={grn}>✓</Vv> queue_estimator</TrLine>
      <TrLine>  <Vv c={grn}>✓</Vv> behavior_signal</TrLine>
      <TrLine> </TrLine>
      <TrLine><Cm>// 6s 后自动推送同行提醒 →</Cm></TrLine>
    </>
  );
  if (s === 'search') return (
    <>
      <TrLine><Kk>query</Kk> = <Vv c={grn}>"豫园 附近 文化"</Vv></TrLine>
      <TrLine><Kk>filter</Kk>: <Vv c={grn}>"沿路 2 km"</Vv></TrLine>
      <TrLine> </TrLine>
      <TrLine><Cm>// POI 检索 → 2 results</Cm></TrLine>
      <TrLine>1. 上海博物馆东馆</TrLine>
      <TrLine>   <Cm>·</Cm> 距离 2.1 km</TrLine>
      <TrLine>2. 豫园</TrLine>
      <TrLine>   <Cm>·</Cm> 距离 1.4 km</TrLine>
    </>
  );
  if (s === 'alert') return (
    <>
      <TrLine><Kk>partner</Kk> = <Vv c={grn}>"爸妈"</Vv></TrLine>
      <TrLine><Kk>conflict_detected</Kk>: <Vv c={org}>true</Vv></TrLine>
      <TrLine><Kk>user_pref</Kk> = <Vv c={grn}>"保留武康路 Citywalk"</Vv></TrLine>
      <TrLine><Kk>partner_constraint</Kk> = <Vv c={grn}>"下午体力偏高"</Vv></TrLine>
      <TrLine> </TrLine>
      <TrLine><Cm>// 折中建议</Cm></TrLine>
      <TrLine>A: 缩短 Citywalk → <Vv c={grn}>保留氛围</Vv></TrLine>
      <TrLine>B: 换室内文化点 → <Vv c={grn}>少走 1.2 km</Vv></TrLine>
    </>
  );
  const ev = D.events[ctx.eventKey];
  if (s === 'replan') return (
    <>
      <TrLine><Kk>event</Kk> = {`{`}</TrLine>
      <TrLine>  <Kk c={cyn}>type</Kk>: <Vv c={grn}>"{ctx.eventKey}"</Vv>,</TrLine>
      <TrLine>  <Kk c={cyn}>severity</Kk>: <Vv c={org}>"{ev.severity}"</Vv>,</TrLine>
      <TrLine>  <Kk c={cyn}>detail</Kk>: <Vv c={grn}>"{ev.headline}"</Vv></TrLine>
      <TrLine>{`}`}</TrLine>
      <TrLine> </TrLine>
      <TrLine><Vv c={grn}>✓</Vv> Detect</TrLine>
      <TrLine><Vv c={grn}>✓</Vv> Query KB · 同主题室内</TrLine>
      <TrLine><Vv c={grn}>✓</Vv> Score & rank</TrLine>
      <TrLine> </TrLine>
      <TrLine><Cm>// GAIN/LOST 同步告知</Cm></TrLine>
    </>
  );
  if (s === 'detail') return (
    <>
      <TrLine><Kk>query</Kk> = <Vv c={grn}>"上海博物馆东馆"</Vv></TrLine>
      <TrLine> </TrLine>
      <TrLine><Cm>// RAG 检索</Cm></TrLine>
      <TrLine><Vv c={grn}>✓</Vv> 上博官网</TrLine>
      <TrLine><Vv c={grn}>✓</Vv> 《何以中国》图录 2024</TrLine>
      <TrLine> </TrLine>
      <TrLine><Kk>output</Kk> = {`{`}</TrLine>
      <TrLine>  <Kk c={cyn}>format</Kk>: <Vv c={grn}>"three_things"</Vv>,</TrLine>
      <TrLine>  <Kk c={cyn}>confidence</Kk>: <Vv c={grn}>0.92</Vv></TrLine>
      <TrLine>{`}`}</TrLine>
    </>
  );
  return null;
}

// ═════════════════════════════════════════════════════════════
// Shared phone atoms
// ═════════════════════════════════════════════════════════════

function StatusLine() {
  // Device frame already renders its own status bar + dynamic island.
  // Reserve safe-area below them (status bar ~62px tall).
  return <div style={{ height: 64, flexShrink: 0 }}></div>;
}

function PScroll({ children }) {
  return <div style={{ flex: 1, overflowY: 'auto', overflowX: 'hidden' }}>{children}</div>;
}

function Badge({ kind = 'neutral', children, dense }) {
  const map = {
    neutral: { bg: C.bg, fg: C.text2, br: C.line },
    mint:    { bg: C.mintSoft, fg: C.mintDeep, br: C.mint + '40' },
    solid:   { bg: C.mint, fg: C.paper, br: C.mint },
    dark:    { bg: C.cta, fg: C.paper, br: C.cta },
    warn:    { bg: C.warnSoft, fg: C.warn, br: C.warn + '40' },
    ghost:   { bg: 'transparent', fg: C.muted, br: C.line }
  };
  const m = map[kind] || map.neutral;
  return <span style={{
    fontSize: dense ? 9.5 : 10.5, padding: dense ? '2px 6px' : '3px 8px', borderRadius: 999,
    background: m.bg, color: m.fg, border: `1px solid ${m.br}`,
    fontWeight: 600, whiteSpace: 'nowrap', letterSpacing: '0.02em'
  }}>{children}</span>;
}

window.V2 = { C, FS, FM, SCREEN_META, V2App, Badge, StatusLine, PScroll };
window.__v2Ready = true;
