// 游伴 Agent Demo — App Shell
// Linear flow controller, architecture layer indicator, two-phone canvas, tweaks.

const { useState, useEffect, useRef, useMemo, useCallback } = React;
const D = window.YOUBAN_DATA;

// ─────────────────────────────────────────────────────────────
// Tokens
// ─────────────────────────────────────────────────────────────
const T = {
  ink: '#1a1f24',
  ground: '#fafaf7',
  paper: '#ffffff',
  line: '#e5e2db',
  lineSoft: '#efece6',
  muted: '#76716a',
  mutedSoft: '#a5a098',
  accent: '#5b8267',     // 青 celadon
  accentSoft: '#e9efe9',
  accentInk: '#34503e',
  warning: '#c98a3a',    // 琥珀 - 用于降级/不确定性
  warningSoft: '#f6ecd9',
  danger: '#b85a3e',
  dangerSoft: '#f5e4dc',
  inkSoft: '#3a3f44',
  panel: '#f4f1eb'
};

const FONT_SANS = '-apple-system, "PingFang SC", "Noto Sans SC", "Manrope", system-ui, sans-serif';
const FONT_MONO = '"JetBrains Mono", "SF Mono", ui-monospace, monospace';

// ─────────────────────────────────────────────────────────────
// Steps & layer mapping
// ─────────────────────────────────────────────────────────────
const STEPS = [
  { idx: 0, key: 'input',    label: '需求输入',      layerIdx: 6, // L1
    note: '把模糊愿望转成结构化约束' },
  { idx: 1, key: 'clarify',  label: 'Agent 追问',    layerIdx: 5, // L2
    note: '把"轻松""文化感"映射到可计算参数' },
  { idx: 2, key: 'plans',    label: '三方案对比',    layerIdx: 3, // L4
    note: '加权评分 + 多方案并排，区分推荐来源' },
  { idx: 3, key: 'map',      label: '行程 + 冲突卡', layerIdx: 0, // L7
    note: '空间关系可视化 + 偏好冲突识别' },
  { idx: 4, key: 'event',    label: '动态反馈',      layerIdx: 1, // L6 ⭐
    note: '事件 → 重排 → 解释 → 等用户确认' },
  { idx: 5, key: 'choices',  label: '替代方案',      layerIdx: 1, // L6
    note: '带"损失声明"的替代方案，否决权保留' },
  { idx: 6, key: 'culture',  label: '文化解释',      layerIdx: 4, // L3
    note: '三段式 + 来源标注 + 置信度' }
];

// ─────────────────────────────────────────────────────────────
// Score helpers
// ─────────────────────────────────────────────────────────────
function dotWeighted(scores, weights) {
  return weights.reduce((s, w, i) => s + w * scores[i], 0);
}
function scoresArray(a) { return D.scoreDims.map(d => a.base[d.key]); }

// ─────────────────────────────────────────────────────────────
// Main App
// ─────────────────────────────────────────────────────────────
function App() {
  const [step, setStep] = useState(0);
  const [eventKey, setEventKey] = useState('rain');
  const [showOverlay, setShowOverlay] = useState(true);
  const [autoRained, setAutoRained] = useState(false);

  // weight sliders — start with relaxed_elder defaults
  const defaultWeights = D.modes.relaxed_elder.weights;
  const [weights, setWeights] = useState(defaultWeights);

  // Auto-trigger rain after 5s on map screen
  useEffect(() => {
    if (step === 3 && !autoRained) {
      const t = setTimeout(() => {
        setAutoRained(true);
        setStep(4);
      }, 5000);
      return () => clearTimeout(t);
    }
  }, [step, autoRained]);

  // Reset auto-rain flag when going back
  useEffect(() => {
    if (step < 3) setAutoRained(false);
  }, [step]);

  const advance = useCallback(() => setStep(s => Math.min(s + 1, STEPS.length - 1)), []);
  const back = useCallback(() => setStep(s => Math.max(s - 1, 0)), []);
  const goto = useCallback((i) => setStep(Math.max(0, Math.min(i, STEPS.length - 1))), []);

  const ctx = { step, eventKey, setEventKey, weights, setWeights, advance, back, goto, autoRained };

  return (
    <div style={{
      minHeight: '100vh', background: T.ground, color: T.ink,
      fontFamily: FONT_SANS, fontFeatureSettings: '"ss01", "cv01"',
      display: 'flex', flexDirection: 'column'
    }}>
      <TopBar step={step} goto={goto} />
      <Stage ctx={ctx} />
      <BottomDock ctx={ctx} showOverlay={showOverlay} />
      <TweaksPanelWired
        ctx={ctx}
        showOverlay={showOverlay}
        setShowOverlay={setShowOverlay}
      />
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// Top bar — title + step rail
// ─────────────────────────────────────────────────────────────
function TopBar({ step, goto }) {
  return (
    <div style={{
      padding: '14px 28px 14px',
      display: 'flex', alignItems: 'center', gap: 24,
      borderBottom: `1px solid ${T.line}`,
      background: T.paper
    }}>
      <div>
        <div style={{ fontSize: 11, letterSpacing: '0.18em', color: T.muted, textTransform: 'uppercase', fontWeight: 600 }}>
          PROJECT 2 · 模块 3+4 DEMO
        </div>
        <div style={{ fontSize: 20, fontWeight: 600, marginTop: 4, letterSpacing: '-0.01em' }}>
          游伴 Agent <span style={{ color: T.muted, fontWeight: 400, marginLeft: 8 }}>· 文化旅行连续决策代理</span>
        </div>
      </div>

      <div style={{ flex: 1 }}></div>

      <div style={{ display: 'flex', alignItems: 'center', gap: 0, background: T.ground, padding: 6, borderRadius: 10, border: `1px solid ${T.line}` }}>
        {STEPS.map((s, i) => {
          const active = i === step;
          const done = i < step;
          return (
            <button key={s.key}
              onClick={() => goto(i)}
              style={{
                appearance: 'none', border: 'none', cursor: 'pointer',
                padding: '7px 12px', borderRadius: 7,
                fontFamily: FONT_SANS, fontSize: 12,
                background: active ? T.ink : 'transparent',
                color: active ? T.paper : done ? T.inkSoft : T.muted,
                fontWeight: active ? 600 : 500,
                display: 'flex', alignItems: 'center', gap: 6,
                transition: 'all .15s ease'
              }}>
              <span style={{
                fontFamily: FONT_MONO, fontSize: 10, opacity: active ? 0.9 : 0.6
              }}>{String(i + 1).padStart(2, '0')}</span>
              <span>{s.label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// Stage — two phones side-by-side
// ─────────────────────────────────────────────────────────────
function Stage({ ctx }) {
  return (
    <div style={{
      flex: 1, padding: '20px 32px 16px',
      display: 'flex', alignItems: 'flex-start', justifyContent: 'center', gap: 40,
      flexWrap: 'wrap'
    }}>
      <PhoneFrame variant="compact" ctx={ctx} />
      <PhoneFrame variant="narrative" ctx={ctx} />
    </div>
  );
}

function PhoneFrame({ variant, ctx }) {
  const label = variant === 'compact' ? '紧凑 · Compact' : '叙事 · Narrative';
  const sub = variant === 'compact' ? '信息密度高、列表/网格' : '呼吸感、单列、解释优先';
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 10 }}>
      <div style={{ textAlign: 'center', minHeight: 38 }}>
        <div style={{ fontSize: 12, fontWeight: 600, letterSpacing: '-0.005em' }}>{label}</div>
        <div style={{ fontSize: 10.5, color: T.muted, marginTop: 2 }}>{sub}</div>
      </div>
      <IOSDevice width={352} height={672} dark={false}>
        <PhoneApp variant={variant} ctx={ctx} />
      </IOSDevice>
    </div>
  );
}

function PhoneApp({ variant, ctx }) {
  const step = STEPS[ctx.step];
  const Screen = window.SCREENS[variant][step.key];
  return (
    <div style={{
      height: '100%', display: 'flex', flexDirection: 'column',
      background: variant === 'narrative' ? '#fbf9f4' : T.paper,
      color: T.ink, overflow: 'hidden', position: 'relative'
    }}>
      {Screen ? <Screen ctx={ctx} T={T} /> : <Placeholder label={step.label} />}
    </div>
  );
}

function Placeholder({ label }) {
  return <div style={{ padding: 32, color: T.muted, fontSize: 13 }}>[{label}]</div>;
}

// ─────────────────────────────────────────────────────────────
// Bottom dock — layer overlay + step note + next button
// ─────────────────────────────────────────────────────────────
function BottomDock({ ctx, showOverlay }) {
  const step = STEPS[ctx.step];
  const layer = D.layers[step.layerIdx];
  const isLast = ctx.step === STEPS.length - 1;
  const isMap = ctx.step === 3;

  return (
    <div style={{
      background: T.paper, borderTop: `1px solid ${T.line}`,
      padding: '10px 28px 12px',
      display: 'flex', alignItems: 'center', gap: 20
    }}>
      {/* Layer indicator */}
      {showOverlay && (
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, minWidth: 380 }}>
          <LayerStack activeIdx={step.layerIdx} />
          <div style={{ minWidth: 0 }}>
            <div style={{ fontSize: 10, letterSpacing: '0.16em', color: T.muted, fontWeight: 600 }}>
              当前架构层 · ACTIVE LAYER
            </div>
            <div style={{ fontSize: 14, fontWeight: 600, marginTop: 2, display: 'flex', alignItems: 'baseline', gap: 8 }}>
              {layer.name}
              {layer.core && <span style={{ fontSize: 10, padding: '2px 6px', borderRadius: 4, background: T.accentSoft, color: T.accentInk, fontWeight: 600 }}>核心差异</span>}
            </div>
            <div style={{ fontSize: 11, color: T.muted, marginTop: 2 }}>{step.note}</div>
          </div>
        </div>
      )}

      <div style={{ flex: 1 }}></div>

      <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
        <div style={{ fontFamily: FONT_MONO, fontSize: 11, color: T.muted, marginRight: 8, whiteSpace: 'nowrap' }}>
          {String(ctx.step + 1).padStart(2, '0')} / {String(STEPS.length).padStart(2, '0')}
        </div>
        <button onClick={ctx.back} disabled={ctx.step === 0} style={{
          appearance: 'none', cursor: ctx.step === 0 ? 'default' : 'pointer',
          border: `1px solid ${T.line}`, background: T.paper, color: ctx.step === 0 ? T.mutedSoft : T.ink,
          padding: '9px 16px', borderRadius: 8, fontFamily: FONT_SANS, fontSize: 13, fontWeight: 500,
          whiteSpace: 'nowrap'
        }}>← 上一步</button>

        {isMap && !ctx.autoRained ? (
          <div style={{
            display: 'flex', alignItems: 'center', gap: 8,
            padding: '9px 14px', borderRadius: 8,
            background: T.warningSoft, color: T.warning,
            border: `1px solid ${T.warning}40`,
            fontSize: 12, fontWeight: 500, whiteSpace: 'nowrap'
          }}>
            <Spinner />
            停留 5 秒后将自动推送降雨事件…
          </div>
        ) : (
          <button onClick={ctx.advance} disabled={isLast} style={{
            appearance: 'none', cursor: isLast ? 'default' : 'pointer',
            border: 'none', background: isLast ? T.ground : T.ink,
            color: isLast ? T.mutedSoft : T.paper,
            padding: '10px 18px', borderRadius: 8,
            fontFamily: FONT_SANS, fontSize: 13, fontWeight: 600,
            boxShadow: isLast ? 'none' : `0 0 0 4px ${T.ink}12`,
            display: 'flex', alignItems: 'center', gap: 8, whiteSpace: 'nowrap',
            animation: isLast ? 'none' : 'pulse 2s ease-in-out infinite'
          }}>
            下一步 <span style={{ fontFamily: FONT_MONO, fontSize: 14 }}>→</span>
          </button>
        )}
      </div>
    </div>
  );
}

function LayerStack({ activeIdx }) {
  // Horizontal — 7 bars in a row, like the architecture stack laid sideways.
  return (
    <div style={{ display: 'flex', gap: 4, alignItems: 'flex-end' }}>
      {D.layers.map((l, i) => {
        const active = i === activeIdx;
        return (
          <div key={l.id} style={{
            display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4
          }}>
            <div style={{
              fontFamily: FONT_MONO, fontSize: 9,
              color: active ? (l.core ? T.accent : T.ink) : T.mutedSoft,
              fontWeight: active ? 700 : 400
            }}>{l.id}</div>
            <div style={{
              width: 28, height: active ? 28 : 16, borderRadius: 2,
              background: active ? (l.core ? T.accent : T.ink) : T.line,
              transition: 'all .25s ease'
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
      border: `2px solid ${T.warning}40`, borderTopColor: T.warning,
      animation: 'spin .8s linear infinite'
    }}></div>
  );
}

// ─────────────────────────────────────────────────────────────
// Tweaks Panel
// ─────────────────────────────────────────────────────────────
function TweaksPanelWired({ ctx, showOverlay, setShowOverlay }) {
  return (
    <TweaksPanel title="Tweaks">
      <TweakSection label="架构讲解层">
        <TweakToggle label="底部层指示器" value={showOverlay} onChange={setShowOverlay} />
      </TweakSection>

      <TweakSection label="突发事件（动态反馈层）">
        <TweakRadio
          label="事件类型"
          value={ctx.eventKey}
          onChange={ctx.setEventKey}
          options={[
            { label: '降雨', value: 'rain' },
            { label: '闭馆', value: 'closed' },
            { label: '疲劳', value: 'fatigue' },
            { label: '延误', value: 'delay' }
          ]}
        />
      </TweakSection>

      <TweakSection label="评分权重 · 调权重看排名变化">
        <WeightSliders weights={ctx.weights} setWeights={ctx.setWeights} />
      </TweakSection>

      <TweakSection label="用户模式预设">
        <ModePresets weights={ctx.weights} setWeights={ctx.setWeights} />
      </TweakSection>
    </TweaksPanel>
  );
}

function WeightSliders({ weights, setWeights }) {
  const update = (i, v) => {
    const next = weights.slice();
    next[i] = v;
    // re-normalize
    const sum = next.reduce((a, b) => a + b, 0);
    setWeights(next.map(x => x / sum));
  };
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
      {D.scoreDims.map((d, i) => (
        <div key={d.key} style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <div style={{ width: 64, fontSize: 11, color: T.inkSoft, fontWeight: 500 }}>{d.name}</div>
          <input type="range" min="0" max="1" step="0.01" value={weights[i]}
            onChange={e => update(i, parseFloat(e.target.value))}
            style={{ flex: 1, accentColor: T.accent }} />
          <div style={{ width: 36, textAlign: 'right', fontFamily: FONT_MONO, fontSize: 10, color: T.muted }}>
            {(weights[i] * 100).toFixed(0)}%
          </div>
        </div>
      ))}
      <div style={{ fontSize: 10, color: T.muted, marginTop: 2 }}>
        权重自动归一化。三方案对比页会立即反映新排名。
      </div>
    </div>
  );
}

function ModePresets({ weights, setWeights }) {
  return (
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 6 }}>
      {Object.entries(D.modes).map(([k, m]) => {
        const active = JSON.stringify(weights.map(x => +x.toFixed(2))) ===
                       JSON.stringify(m.weights.map(x => +x.toFixed(2)));
        return (
          <button key={k} onClick={() => setWeights(m.weights.slice())} style={{
            appearance: 'none', cursor: 'pointer',
            background: active ? T.ink : T.paper,
            color: active ? T.paper : T.ink,
            border: `1px solid ${active ? T.ink : T.line}`,
            padding: '8px 10px', borderRadius: 6, textAlign: 'left',
            fontFamily: FONT_SANS, fontSize: 12, fontWeight: 500
          }}>
            <div>{m.label}</div>
            <div style={{ fontSize: 10, color: active ? '#ffffffa0' : T.muted, marginTop: 2 }}>{m.caption}</div>
          </button>
        );
      })}
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// Mount
// ─────────────────────────────────────────────────────────────
window.__YouBan = { App, T, FONT_SANS, FONT_MONO, STEPS, dotWeighted, scoresArray };
