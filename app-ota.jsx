// 游伴 Agent Demo — OTA 实用风
// 单手机 + 7 步线性流 · 信息密集卡片化 · 大字价格 + 暖橙 CTA + 冷蓝品牌
// Original design — NOT a clone of any specific OTA product.

const { useState, useEffect, useMemo, useCallback, useRef } = React;
const D = window.YOUBAN_DATA;

// ═════════════════════════════════════════════════════════════
// OTA Tokens
// ═════════════════════════════════════════════════════════════
const C = {
  ink:        '#1a1f29',
  text:       '#2b323d',
  text2:      '#525a66',
  muted:      '#8b929c',
  mutedSoft:  '#b5bac3',
  line:       '#ebedf0',
  lineSoft:   '#f3f4f7',
  bg:         '#f5f7fa',
  bg2:        '#eef1f5',
  paper:      '#ffffff',
  brand:      '#1c4f7a',     // 冷蓝品牌（深 teal-navy，原创非任何 OTA 同款）
  brandSoft:  '#e6eff5',
  brandInk:   '#0e3553',
  price:      '#ff5a2c',     // 暖橙红 CTA + 价格
  priceSoft:  '#fff1eb',
  priceDeep:  '#d63d1a',
  success:    '#1e9c6e',
  successSoft:'#e3f5ee',
  warning:    '#f5a623',
  warningSoft:'#fef3df',
  gold:       '#c98a3a',
  goldSoft:   '#f9eed8'
};

const FS = '-apple-system, "PingFang SC", "Noto Sans SC", "Manrope", system-ui, sans-serif';
const FM = '"JetBrains Mono", "SF Mono", ui-monospace, monospace';

const STEPS = [
  { idx: 0, key: 'home',     label: '搜索',     layerIdx: 6, note: '把模糊愿望转成结构化约束' },
  { idx: 1, key: 'wizard',   label: 'AI 追问', layerIdx: 5, note: '映射非标感受词到画像参数' },
  { idx: 2, key: 'plans',    label: '行程方案', layerIdx: 3, note: '加权评分 + 多方案并排' },
  { idx: 3, key: 'trip',     label: '今日行程', layerIdx: 0, note: '空间可视化 + 偏好冲突' },
  { idx: 4, key: 'alert',    label: '智能调整', layerIdx: 1, note: '事件 → 重排 → 解释 → 等用户确认' },
  { idx: 5, key: 'replan',   label: '替代方案', layerIdx: 1, note: '带"损失声明"的替代方案' },
  { idx: 6, key: 'detail',   label: '景点详情', layerIdx: 4, note: '三段式 + 来源 + 置信度' }
];

// ═════════════════════════════════════════════════════════════
// App Shell
// ═════════════════════════════════════════════════════════════

function OtaApp({ initialStep = 0, printMode = false }) {
  const [step, setStep] = useState(initialStep);
  const [eventKey, setEventKey] = useState('rain');
  const [showOverlay, setShowOverlay] = useState(true);
  const [autoRained, setAutoRained] = useState(false);
  const [weights, setWeights] = useState(D.modes.relaxed_elder.weights);

  useEffect(() => {
    if (step === 3 && !autoRained) {
      const t = setTimeout(() => { setAutoRained(true); setStep(4); }, 5000);
      return () => clearTimeout(t);
    }
  }, [step, autoRained]);
  useEffect(() => { if (step < 3) setAutoRained(false); }, [step]);

  const advance = useCallback(() => setStep(s => Math.min(s + 1, STEPS.length - 1)), []);
  const back = useCallback(() => setStep(s => Math.max(s - 1, 0)), []);
  const goto = useCallback((i) => setStep(Math.max(0, Math.min(i, STEPS.length - 1))), []);

  const ctx = { step, eventKey, setEventKey, weights, setWeights, advance, back, goto, autoRained };

  return (
    <div style={{
      minHeight: '100vh', background: C.bg, color: C.ink,
      fontFamily: FS, display: 'flex', flexDirection: 'column'
    }}>
      <OtaTopBar step={step} goto={goto} />
      <OtaStage ctx={ctx} />
      <OtaDock ctx={ctx} showOverlay={showOverlay} />
      <OtaTweaks ctx={ctx} showOverlay={showOverlay} setShowOverlay={setShowOverlay} />
    </div>
  );
}

function OtaTopBar({ step, goto }) {
  return (
    <div style={{
      padding: '14px 28px', display: 'flex', alignItems: 'center', gap: 24,
      borderBottom: `1px solid ${C.line}`, background: C.paper
    }}>
      <div>
        <div style={{ fontSize: 11, letterSpacing: '0.18em', color: C.muted, textTransform: 'uppercase', fontWeight: 600 }}>
          PROJECT 2 · 模块 3+4 DEMO · OTA 实用风
        </div>
        <div style={{ fontSize: 20, fontWeight: 700, marginTop: 4, letterSpacing: '-0.01em' }}>
          游伴 <span style={{ color: C.brand, marginLeft: 2 }}>YouBan</span>
          <span style={{ color: C.muted, fontWeight: 400, marginLeft: 10, fontSize: 14 }}>文化旅行连续决策代理</span>
        </div>
      </div>
      <div style={{ flex: 1 }}></div>
      <div style={{ display: 'flex', alignItems: 'center', background: C.bg, padding: 4, borderRadius: 8, border: `1px solid ${C.line}` }}>
        {STEPS.map((s, i) => {
          const active = i === step;
          const done = i < step;
          return (
            <button key={s.key} onClick={() => goto(i)} style={{
              appearance: 'none', border: 'none', cursor: 'pointer',
              padding: '7px 12px', borderRadius: 6, fontFamily: FS, fontSize: 12,
              background: active ? C.ink : 'transparent',
              color: active ? C.paper : done ? C.text : C.muted,
              fontWeight: active ? 600 : 500, display: 'flex', alignItems: 'center', gap: 6,
              whiteSpace: 'nowrap'
            }}>
              <span style={{ fontFamily: FM, fontSize: 10, opacity: 0.7 }}>{String(i + 1).padStart(2, '0')}</span>
              {s.label}
            </button>
          );
        })}
      </div>
    </div>
  );
}

function OtaStage({ ctx }) {
  return (
    <div style={{
      flex: 1, padding: '20px 32px 14px',
      display: 'flex', alignItems: 'flex-start', justifyContent: 'center', gap: 56
    }}>
      <OtaPhone ctx={ctx} />
      <OtaSidekick ctx={ctx} />
    </div>
  );
}

function OtaPhone({ ctx }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 10 }}>
      <div style={{ textAlign: 'center', minHeight: 38 }}>
        <div style={{ fontSize: 12, fontWeight: 600 }}>OTA 实用风 · Practical OTA</div>
        <div style={{ fontSize: 10.5, color: C.muted, marginTop: 2 }}>信息密度 · 卡片化 · 大字数据</div>
      </div>
      <IOSDevice width={372} height={672} dark={false}>
        <PhoneShell ctx={ctx} />
      </IOSDevice>
    </div>
  );
}

function PhoneShell({ ctx }) {
  const step = STEPS[ctx.step];
  const Screen = SCREENS[step.key];
  return (
    <div style={{
      height: '100%', display: 'flex', flexDirection: 'column',
      background: C.bg, color: C.ink, overflow: 'hidden', position: 'relative'
    }}>
      {Screen ? <Screen ctx={ctx} /> : <div style={{ padding: 32 }}>[{step.label}]</div>}
    </div>
  );
}

// ═════════════════════════════════════════════════════════════
// Sidekick — shows what's "happening" alongside the phone:
// JSON snippet of the active layer's I/O. Looks like dev tools.
// Optional teaching aid for the answer.
// ═════════════════════════════════════════════════════════════

function OtaSidekick({ ctx }) {
  const step = STEPS[ctx.step];
  const layer = D.layers[step.layerIdx];
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: 10, marginTop: 42, width: 340 }}>
      <div style={{ textAlign: 'left' }}>
        <div style={{ fontSize: 12, fontWeight: 600 }}>系统侧 · System Log</div>
        <div style={{ fontSize: 10.5, color: C.muted, marginTop: 2 }}>展示当前层在 App 背后正在做什么</div>
      </div>
      <div style={{
        width: '100%', background: C.ink, color: C.paper,
        borderRadius: 14, padding: '16px 18px', minHeight: 600,
        fontFamily: FM, fontSize: 11.5, lineHeight: 1.7, position: 'relative', overflow: 'hidden'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 12 }}>
          <span style={{ width: 8, height: 8, borderRadius: '50%', background: layer.core ? C.warning : C.success }}></span>
          <span style={{ fontSize: 10, letterSpacing: '0.15em', color: '#ffffffb0', fontWeight: 600 }}>
            {layer.en.toUpperCase()} · {layer.id}
          </span>
          {layer.core && <span style={{ fontSize: 9, padding: '2px 6px', borderRadius: 3, background: C.warning + '30', color: C.warning, fontWeight: 700, marginLeft: 'auto' }}>CORE</span>}
        </div>
        <Trace step={step} ctx={ctx} />
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
const Yy = ({ children }) => <span style={{ color: yel }}>{children}</span>;

function Trace({ step, ctx }) {
  const s = step.key;
  if (s === 'home') return (
    <>
      <TrLine><Kk>input</Kk> = <Qq>"想在上海玩一天，轻松一点，有文化感，不要太网红"</Qq></TrLine>
      <TrLine> </TrLine>
      <TrLine><Cm>// 提取非标感受词</Cm></TrLine>
      <TrLine><Kk>tokens</Kk> = [<Qq c={grn}>"轻松"</Qq>, <Qq c={grn}>"有文化感"</Qq>, <Qq c={grn}>"不要太网红"</Qq>]</TrLine>
      <TrLine> </TrLine>
      <TrLine><Cm>// 待映射约束</Cm></TrLine>
      <TrLine><Kk>physical_load_max</Kk>: <Yy>?</Yy></TrLine>
      <TrLine><Kk>culture_weight</Kk>: <Yy>?</Yy></TrLine>
      <TrLine><Kk>crowd_threshold</Kk>: <Yy>?</Yy></TrLine>
      <TrLine> </TrLine>
      <TrLine><Cm>// next: L2 追问补全</Cm></TrLine>
    </>
  );
  if (s === 'wizard') return (
    <>
      <TrLine><Kk>turn</Kk>: <Vv c={yel}>3/3</Vv></TrLine>
      <TrLine><Kk>questions_asked</Kk>:</TrLine>
      <TrLine>  · 同行人 → <Vv c={grn}>"爸妈"</Vv></TrLine>
      <TrLine>  · 预算 → <Vv c={grn}>"100–300"</Vv></TrLine>
      <TrLine>  · 交通 → <Vv c={grn}>"地铁 + 打车"</Vv></TrLine>
      <TrLine> </TrLine>
      <TrLine><Kk>profile</Kk> = {`{`}</TrLine>
      <TrLine>  <Kk c={cyn}>mode</Kk>: <Vv c={grn}>"relaxed_elder"</Vv>,</TrLine>
      <TrLine>  <Kk c={cyn}>walk_max_km</Kk>: <Vv c={org}>2.5</Vv>,</TrLine>
      <TrLine>  <Kk c={cyn}>physical_profile</Kk>: <Vv c={grn}>"mid_elder"</Vv>,</TrLine>
      <TrLine>  <Kk c={cyn}>budget_max</Kk>: <Vv c={org}>300</Vv>,</TrLine>
      <TrLine>  <Kk c={cyn}>transport</Kk>: [<Vv c={grn}>"metro"</Vv>, <Vv c={grn}>"taxi"</Vv>],</TrLine>
      <TrLine>  <Kk c={cyn}>culture_weight</Kk>: <Vv c={org}>0.25</Vv>,</TrLine>
      <TrLine>  <Kk c={cyn}>crowd_threshold</Kk>: <Vv c={org}>0.6</Vv></TrLine>
      <TrLine>{`}`}</TrLine>
    </>
  );
  if (s === 'plans') return (
    <>
      <TrLine><Cm>// weights (relaxed_elder)</Cm></TrLine>
      <TrLine><Kk>w</Kk> = [<Vv c={org}>{ctx.weights.map(x=>x.toFixed(2)).join(', ')}</Vv>]</TrLine>
      <TrLine> </TrLine>
      <TrLine><Cm>// rank 3 plans by ScoreAttraction()</Cm></TrLine>
      <TrLine><Vv c={mag}>#1</Vv> 轻松长辈线 → <Vv c={grn}>0.86</Vv></TrLine>
      <TrLine>   <Cm>+</Cm> 室内文化点为主</TrLine>
      <TrLine>   <Cm>+</Cm> 已通过开放时间硬约束</TrLine>
      <TrLine><Vv c={mag}>#2</Vv> 经典文化线 → <Vv c={yel}>0.78</Vv></TrLine>
      <TrLine>   <Cm>!</Cm> 步行 4.2km 超长辈日均 30%</TrLine>
      <TrLine><Vv c={mag}>#3</Vv> 城市记忆线 → <Vv c={yel}>0.72</Vv></TrLine>
      <TrLine>   <Cm>!</Cm> 含商业合作节点 → 已标注</TrLine>
    </>
  );
  if (s === 'trip') return (
    <>
      <TrLine><Kk>conflict_detected</Kk>: <Vv c={org}>true</Vv></TrLine>
      <TrLine><Kk>user_pref</Kk> = <Vv c={grn}>"保留武康路 Citywalk"</Vv></TrLine>
      <TrLine><Kk>partner_constraint</Kk> = <Vv c={grn}>"爸妈体力下午偏高"</Vv></TrLine>
      <TrLine> </TrLine>
      <TrLine><Cm>// negotiate options</Cm></TrLine>
      <TrLine>A: 坚持原计划 → <Vv c={org}>体力风险 ↑</Vv></TrLine>
      <TrLine>B: 缩短 + 打车 → <Vv c={yel}>少 60min 街区感</Vv></TrLine>
      <TrLine>C: 换思南公馆茶歇 → <Vv c={grn}>保留氛围</Vv></TrLine>
      <TrLine> </TrLine>
      <TrLine><Cm>// monitor sources active:</Cm></TrLine>
      <TrLine>  weather_api, traffic, queue, behavior_signal</TrLine>
    </>
  );
  const ev = D.events[ctx.eventKey];
  if (s === 'alert') return (
    <>
      <TrLine><Kk>event</Kk> = {`{`}</TrLine>
      <TrLine>  <Kk c={cyn}>type</Kk>: <Vv c={grn}>"{ctx.eventKey}"</Vv>,</TrLine>
      <TrLine>  <Kk c={cyn}>severity</Kk>: <Vv c={ev.severity==='critical'?'#ff8970':org}>"{ev.severity}"</Vv>,</TrLine>
      <TrLine>  <Kk c={cyn}>detail</Kk>: <Vv c={grn}>"{ev.headline}"</Vv></TrLine>
      <TrLine>{`}`}</TrLine>
      <TrLine> </TrLine>
      <TrLine><Cm>// trigger reroute pipeline</Cm></TrLine>
      <TrLine><Vv c={grn}>✓</Vv> Detect</TrLine>
      <TrLine><Vv c={grn}>✓</Vv> Resolve affected steps</TrLine>
      <TrLine><Vv c={grn}>✓</Vv> Query KB · 同主题室内 · 5km</TrLine>
      <TrLine><Vv c={grn}>✓</Vv> Score & rank</TrLine>
      <TrLine><Vv c={yel}>○</Vv> Generate explanation…</TrLine>
    </>
  );
  if (s === 'replan') return (
    <>
      <TrLine><Kk>alternatives</Kk> = [</TrLine>
      {D.alternatives[ctx.eventKey].map((a, i) => (
        <TrLine key={i}>
          {'  '}{`{`}<Kk c={cyn}>id</Kk>:<Vv c={grn}>"{a.id}"</Vv>, <Kk c={cyn}>rec</Kk>:<Vv c={org}>{a.recommended?'true':'false'}</Vv>{`}`},
        </TrLine>
      ))}
      <TrLine>]</TrLine>
      <TrLine> </TrLine>
      <TrLine><Cm>// loss declaration · 诚实告知</Cm></TrLine>
      <TrLine><Kk>explanation_template</Kk> = (</TrLine>
      <TrLine>  发生 → 影响 → 选项 →</TrLine>
      <TrLine>  <Vv c={org}>损失</Vv> → 你来决定</TrLine>
      <TrLine>)</TrLine>
      <TrLine> </TrLine>
      <TrLine><Kk>user_confirmation_required</Kk>: <Vv c={org}>true</Vv></TrLine>
    </>
  );
  if (s === 'detail') return (
    <>
      <TrLine><Kk>query</Kk> = <Vv c={grn}>"上海博物馆东馆"</Vv></TrLine>
      <TrLine> </TrLine>
      <TrLine><Cm>// RAG 检索 · 结构化 + 向量</Cm></TrLine>
      <TrLine><Vv c={grn}>✓</Vv> 上博官网 · 常设展介绍</TrLine>
      <TrLine><Vv c={grn}>✓</Vv> 《何以中国》图录 2024</TrLine>
      <TrLine><Vv c={yel}>·</Vv> 知识图谱 · 7 个关联节点</TrLine>
      <TrLine> </TrLine>
      <TrLine><Kk>output</Kk> = {`{`}</TrLine>
      <TrLine>  <Kk c={cyn}>format</Kk>: <Vv c={grn}>"three_things"</Vv>,</TrLine>
      <TrLine>  <Kk c={cyn}>confidence</Kk>: <Vv c={grn}>0.92</Vv>,</TrLine>
      <TrLine>  <Kk c={cyn}>sources</Kk>: <Vv c={grn}>2</Vv>,</TrLine>
      <TrLine>  <Kk c={cyn}>asking_followup</Kk>: <Vv c={grn}>"enabled"</Vv></TrLine>
      <TrLine>{`}`}</TrLine>
    </>
  );
  return null;
}

// ═════════════════════════════════════════════════════════════
// Bottom dock (same shape as v1)
// ═════════════════════════════════════════════════════════════

function OtaDock({ ctx, showOverlay }) {
  const step = STEPS[ctx.step];
  const layer = D.layers[step.layerIdx];
  const isLast = ctx.step === STEPS.length - 1;
  const isMap = ctx.step === 3;

  return (
    <div style={{
      background: C.paper, borderTop: `1px solid ${C.line}`,
      padding: '10px 28px 12px', display: 'flex', alignItems: 'center', gap: 20
    }}>
      {showOverlay && (
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <LayerBars activeIdx={step.layerIdx} />
          <div>
            <div style={{ fontSize: 10, letterSpacing: '0.16em', color: C.muted, fontWeight: 600 }}>当前架构层 · ACTIVE LAYER</div>
            <div style={{ fontSize: 14, fontWeight: 600, marginTop: 2, display: 'flex', alignItems: 'baseline', gap: 8 }}>
              {layer.name}
              {layer.core && <span style={{ fontSize: 10, padding: '2px 6px', borderRadius: 4, background: C.warningSoft, color: C.warning, fontWeight: 700 }}>核心差异</span>}
            </div>
            <div style={{ fontSize: 11, color: C.muted, marginTop: 2 }}>{step.note}</div>
          </div>
        </div>
      )}
      <div style={{ flex: 1 }}></div>
      <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
        <div style={{ fontFamily: FM, fontSize: 11, color: C.muted, marginRight: 8, whiteSpace: 'nowrap' }}>
          {String(ctx.step+1).padStart(2,'0')} / {String(STEPS.length).padStart(2,'0')}
        </div>
        <button onClick={ctx.back} disabled={ctx.step === 0} style={{
          appearance: 'none', cursor: ctx.step===0?'default':'pointer',
          border: `1px solid ${C.line}`, background: C.paper, color: ctx.step===0?C.mutedSoft:C.ink,
          padding: '9px 16px', borderRadius: 8, fontFamily: FS, fontSize: 13, fontWeight: 500, whiteSpace: 'nowrap'
        }}>← 上一步</button>

        {isMap && !ctx.autoRained ? (
          <div style={{
            display: 'flex', alignItems: 'center', gap: 8,
            padding: '9px 14px', borderRadius: 8,
            background: C.warningSoft, color: C.warning,
            border: `1px solid ${C.warning}40`, fontSize: 12, fontWeight: 500, whiteSpace: 'nowrap'
          }}>
            <Spinner />
            停留 5 秒后自动推送降雨…
          </div>
        ) : (
          <button onClick={ctx.advance} disabled={isLast} style={{
            appearance: 'none', cursor: isLast?'default':'pointer',
            border: 'none', background: isLast ? C.bg : C.price, color: isLast?C.mutedSoft:C.paper,
            padding: '10px 18px', borderRadius: 8, fontFamily: FS, fontSize: 13, fontWeight: 600,
            boxShadow: isLast ? 'none' : `0 4px 12px ${C.price}40`,
            display: 'flex', alignItems: 'center', gap: 8, whiteSpace: 'nowrap'
          }}>
            下一步 <span style={{ fontFamily: FM, fontSize: 14 }}>→</span>
          </button>
        )}
      </div>
    </div>
  );
}

function LayerBars({ activeIdx }) {
  return (
    <div style={{ display: 'flex', gap: 4, alignItems: 'flex-end' }}>
      {D.layers.map((l, i) => {
        const active = i === activeIdx;
        return (
          <div key={l.id} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4 }}>
            <div style={{ fontFamily: FM, fontSize: 9, color: active ? (l.core ? C.warning : C.ink) : C.mutedSoft, fontWeight: active ? 700 : 400 }}>{l.id}</div>
            <div style={{
              width: 28, height: active ? 28 : 16, borderRadius: 2,
              background: active ? (l.core ? C.warning : C.ink) : C.line, transition: 'all .25s ease'
            }}></div>
          </div>
        );
      })}
    </div>
  );
}

function Spinner() {
  return (
    <div style={{
      width: 12, height: 12, borderRadius: '50%',
      border: `2px solid ${C.warning}40`, borderTopColor: C.warning,
      animation: 'spin .8s linear infinite'
    }}></div>
  );
}

// ═════════════════════════════════════════════════════════════
// Tweaks
// ═════════════════════════════════════════════════════════════

function OtaTweaks({ ctx, showOverlay, setShowOverlay }) {
  return (
    <TweaksPanel title="Tweaks">
      <TweakSection label="架构讲解层">
        <TweakToggle label="底部层指示器" value={showOverlay} onChange={setShowOverlay} />
      </TweakSection>
      <TweakSection label="突发事件（动态反馈层）">
        <TweakRadio label="事件类型" value={ctx.eventKey} onChange={ctx.setEventKey}
          options={[{label:'降雨',value:'rain'},{label:'闭馆',value:'closed'},{label:'疲劳',value:'fatigue'},{label:'延误',value:'delay'}]} />
      </TweakSection>
      <TweakSection label="评分权重">
        <OtaWeightSliders weights={ctx.weights} setWeights={ctx.setWeights} />
      </TweakSection>
      <TweakSection label="用户模式预设">
        <OtaModePresets weights={ctx.weights} setWeights={ctx.setWeights} />
      </TweakSection>
    </TweaksPanel>
  );
}

function OtaWeightSliders({ weights, setWeights }) {
  const update = (i, v) => {
    const next = weights.slice(); next[i] = v;
    const sum = next.reduce((a,b)=>a+b,0);
    setWeights(next.map(x=>x/sum));
  };
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
      {D.scoreDims.map((d, i) => (
        <div key={d.key} style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <div style={{ width: 64, fontSize: 11, color: C.text2, fontWeight: 500 }}>{d.name}</div>
          <input type="range" min="0" max="1" step="0.01" value={weights[i]}
            onChange={e => update(i, parseFloat(e.target.value))}
            style={{ flex: 1, accentColor: C.brand }} />
          <div style={{ width: 36, textAlign: 'right', fontFamily: FM, fontSize: 10, color: C.muted }}>
            {(weights[i]*100).toFixed(0)}%
          </div>
        </div>
      ))}
    </div>
  );
}

function OtaModePresets({ weights, setWeights }) {
  return (
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 6 }}>
      {Object.entries(D.modes).map(([k, m]) => {
        const active = JSON.stringify(weights.map(x=>+x.toFixed(2))) === JSON.stringify(m.weights.map(x=>+x.toFixed(2)));
        return (
          <button key={k} onClick={() => setWeights(m.weights.slice())} style={{
            appearance: 'none', cursor: 'pointer',
            background: active ? C.ink : C.paper, color: active ? C.paper : C.ink,
            border: `1px solid ${active ? C.ink : C.line}`,
            padding: '8px 10px', borderRadius: 6, textAlign: 'left',
            fontFamily: FS, fontSize: 12, fontWeight: 500
          }}>
            <div>{m.label}</div>
            <div style={{ fontSize: 10, color: active ? '#ffffffa0' : C.muted, marginTop: 2 }}>{m.caption}</div>
          </button>
        );
      })}
    </div>
  );
}

// ═════════════════════════════════════════════════════════════
// Shared phone atoms
// ═════════════════════════════════════════════════════════════

function StatusSpacer() { return <div style={{ height: 54, flexShrink: 0 }}></div>; }

function PScroll({ children }) {
  return <div style={{ flex: 1, overflowY: 'auto', overflowX: 'hidden' }}>{children}</div>;
}

function NavBar({ title, sub, right, back }) {
  return (
    <div style={{
      padding: '10px 14px 12px', display: 'flex', alignItems: 'center', gap: 10,
      background: C.paper, borderBottom: `1px solid ${C.line}`, flexShrink: 0
    }}>
      {back && <div style={{
        width: 28, height: 28, borderRadius: '50%', background: C.bg,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        fontSize: 14, color: C.ink, flexShrink: 0
      }}>‹</div>}
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ fontSize: 15, fontWeight: 600, letterSpacing: '-0.005em' }}>{title}</div>
        {sub && <div style={{ fontSize: 11, color: C.muted, marginTop: 1 }}>{sub}</div>}
      </div>
      {right}
    </div>
  );
}

function TabBar({ active = 'trip' }) {
  const tabs = [
    { k: 'home', label: '首页', i: '⌂' },
    { k: 'trip', label: '行程', i: '◫' },
    { k: 'ai',   label: 'AI 游伴', i: '✦' },
    { k: 'msg',  label: '消息', i: '✉' },
    { k: 'me',   label: '我的', i: '◉' }
  ];
  return (
    <div style={{
      borderTop: `1px solid ${C.line}`, background: C.paper,
      display: 'flex', justifyContent: 'space-around', padding: '6px 0 18px',
      flexShrink: 0
    }}>
      {tabs.map(t => {
        const a = t.k === active;
        return (
          <div key={t.k} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2 }}>
            <div style={{
              width: 22, height: 22, display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: 15, color: a ? C.brand : C.muted, fontWeight: a ? 600 : 400
            }}>{t.i}</div>
            <div style={{ fontSize: 10, color: a ? C.brand : C.muted, fontWeight: a ? 600 : 400 }}>{t.label}</div>
          </div>
        );
      })}
    </div>
  );
}

function Badge({ kind = 'neutral', children, dense }) {
  const map = {
    neutral: { bg: C.bg, fg: C.text2, br: C.line },
    brand:   { bg: C.brandSoft, fg: C.brandInk, br: C.brand + '30' },
    price:   { bg: C.priceSoft, fg: C.priceDeep, br: C.price + '40' },
    success: { bg: C.successSoft, fg: C.success, br: C.success + '40' },
    warning: { bg: C.warningSoft, fg: C.warning, br: C.warning + '40' },
    gold:    { bg: C.goldSoft, fg: C.gold, br: C.gold + '40' },
    solid:   { bg: C.price, fg: C.paper, br: C.price }
  };
  const m = map[kind] || map.neutral;
  return <span style={{
    fontSize: dense ? 9 : 10, padding: dense ? '1px 5px' : '2px 6px', borderRadius: 3,
    background: m.bg, color: m.fg, border: `1px solid ${m.br}`,
    fontWeight: 700, whiteSpace: 'nowrap', letterSpacing: '0.02em'
  }}>{children}</span>;
}

// Tiny svg icons used inline
const Icn = {
  loc:  <svg width="11" height="11" viewBox="0 0 12 12"><path d="M6 1C3.8 1 2 2.8 2 5c0 2.5 4 6 4 6s4-3.5 4-6c0-2.2-1.8-4-4-4zm0 5.5A1.5 1.5 0 116 3.5a1.5 1.5 0 010 3z" fill="currentColor"/></svg>,
  walk: <svg width="11" height="11" viewBox="0 0 12 12"><circle cx="7" cy="2.5" r="1" fill="currentColor"/><path d="M5 4l-2 4 1.5.5L6 5.5 7 7v3h1.5V6.5L7.2 5h1.3l2-1L10 3l-1.5.7L7 3l-2 1z" fill="currentColor"/></svg>,
  time: <svg width="11" height="11" viewBox="0 0 12 12"><circle cx="6" cy="6" r="5" stroke="currentColor" strokeWidth="1.1" fill="none"/><path d="M6 3v3l2 1.2" stroke="currentColor" strokeWidth="1.1" fill="none" strokeLinecap="round"/></svg>,
  yuan: <svg width="11" height="11" viewBox="0 0 12 12"><path d="M3 2l3 4 3-4M3 6h6M3 8h6M6 6v4" stroke="currentColor" strokeWidth="1.2" fill="none"/></svg>,
  star: <svg width="11" height="11" viewBox="0 0 12 12"><path d="M6 1l1.5 3 3.3.5-2.4 2.3.6 3.3L6 8.5 3 10.1l.6-3.3L1.2 4.5 4.5 4z" fill="currentColor"/></svg>,
  rain: <svg width="14" height="14" viewBox="0 0 14 14"><path d="M4 6a3 3 0 016 0c1 0 2 .9 2 2s-1 2-2 2H4c-1 0-2-.9-2-2s1-2 2-2z" fill="currentColor" opacity=".4"/><path d="M4 11l-.5 1.5M7 11l-.5 1.5M10 11l-.5 1.5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/></svg>,
  user: <svg width="11" height="11" viewBox="0 0 12 12"><circle cx="6" cy="4" r="2" fill="currentColor"/><path d="M2 11c0-2.2 1.8-4 4-4s4 1.8 4 4" stroke="currentColor" strokeWidth="1.2" fill="none"/></svg>,
};

window.OTA = { C, FS, FM, STEPS, Trace, OtaApp, NavBar, TabBar, Badge, Icn, StatusSpacer, PScroll };

// Mount when ready (after screens load)
window.__otaReady = true;
