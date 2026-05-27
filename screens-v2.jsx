// 游伴 文旅风 v2 — 8 屏 (Click-through Prototype)
// Strict Figma navigation: every CTA goes to a specific screen.

const D_ = window.YOUBAN_DATA;
const { C: c, FS: fs, FM: fm, Badge, StatusLine, PScroll } = window.V2;
const { useState } = React;

// ───────────────────────────────────────────────
// Atoms
// ───────────────────────────────────────────────
function Section({ title, hint, children, style }) {
  return (
    <div style={{ padding: '0 20px', ...style }}>
      {title && (
        <div style={{ display: 'flex', alignItems: 'baseline', marginBottom: 10 }}>
          <div style={{ fontSize: 12.5, fontWeight: 600, color: c.text }}>{title}</div>
          {hint && <div style={{ fontSize: 11, color: c.muted, marginLeft: 'auto' }}>{hint}</div>}
        </div>
      )}
      {children}
    </div>
  );
}

function HeroTitle({ title, sub }) {
  return (
    <div style={{ padding: '6px 20px 18px' }}>
      <div style={{ fontSize: 23, fontWeight: 700, letterSpacing: '-0.018em', color: c.ink, lineHeight: 1.25 }}>{title}</div>
      {sub && <div style={{ fontSize: 12.5, color: c.muted, marginTop: 6 }}>{sub}</div>}
    </div>
  );
}

function CtaRow({ ghost, ghostAction, primary, primaryAction }) {
  return (
    <div style={{
      padding: '12px 20px 18px', background: c.paper,
      borderTop: `1px solid ${c.lineSoft}`, flexShrink: 0,
      display: 'flex', gap: 10, alignItems: 'center'
    }}>
      {ghost && (
        <button onClick={ghostAction} style={{
          appearance: 'none', cursor: 'pointer',
          border: `1px solid ${c.line}`, background: c.paper, color: c.text,
          padding: '12px 20px', borderRadius: 999,
          fontFamily: fs, fontSize: 13, fontWeight: 500
        }}>{ghost}</button>
      )}
      <button onClick={primaryAction} style={{
        flex: 1, appearance: 'none', border: 'none', cursor: 'pointer',
        background: c.cta, color: c.paper,
        padding: '14px', borderRadius: 999,
        fontFamily: fs, fontSize: 14, fontWeight: 600
      }}>{primary}</button>
    </div>
  );
}

function NavBack({ onClick, right }) {
  return (
    <div style={{
      padding: '4px 16px 8px', display: 'flex', alignItems: 'center', gap: 10,
      flexShrink: 0
    }}>
      <button onClick={onClick} style={{
        appearance: 'none', cursor: 'pointer', border: 'none',
        width: 32, height: 32, borderRadius: '50%', background: c.bg,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        fontSize: 15, color: c.ink, flexShrink: 0, fontFamily: fs
      }}>‹</button>
      <div style={{ flex: 1 }}></div>
      {right}
    </div>
  );
}

// ═════════════════════════════════════════════════════════════
// S1 — Home (Frame 1)
// ═════════════════════════════════════════════════════════════

function HomeScreen({ ctx }) {
  const [date, setDate] = useState('08/01');
  const [tags, setTags] = useState(['Citywalk', '豫园', '文化深度游']);
  const allTags = ['Citywalk', '豫园', '文化深度游', '研学游', '亲子游', '不太网红', '地铁 + 打车', '轻松节奏'];

  return (
    <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
      <StatusLine />

      <PScroll>
        <HeroTitle
          title="这次想怎么玩？"
          sub="先告诉我时间，再告诉我旅行偏好"
        />

        <Section title="出行时间">
          <div style={{
            background: c.paper, border: `1px solid ${c.line}`, borderRadius: 14,
            padding: 14
          }}>
            <div style={{ fontSize: 11, color: c.muted, fontWeight: 600, letterSpacing: '0.06em', marginBottom: 8 }}>
              日期
            </div>
            <div style={{ display: 'flex', gap: 8 }}>
              {[
                { d: '08/01', sub: '出发' },
                { d: '08/02', sub: '回程' },
                { d: '自定义', sub: '日期' }
              ].map((x, i) => {
                const a = x.d === date && i < 2;
                return (
                  <button key={x.d} onClick={() => i < 2 && setDate(x.d)} style={{
                    appearance: 'none', cursor: 'pointer', flex: 1,
                    background: a ? c.cta : c.bg,
                    border: a ? 'none' : `1px solid ${c.line}`,
                    color: a ? c.paper : c.ink,
                    padding: '10px 0', borderRadius: 10,
                    fontFamily: fs, textAlign: 'center'
                  }}>
                    <div style={{ fontSize: 15, fontWeight: 700, letterSpacing: '-0.005em' }}>{x.d}</div>
                    <div style={{ fontSize: 10, color: a ? '#ffffffa0' : c.muted, marginTop: 2 }}>{x.sub}</div>
                  </button>
                );
              })}
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10, marginTop: 12 }}>
              <div style={{ background: c.bg, borderRadius: 10, padding: '10px 12px' }}>
                <div style={{ fontSize: 10, color: c.muted, fontWeight: 600 }}>出行时间</div>
                <div style={{ fontSize: 16, fontWeight: 700, marginTop: 2, fontFamily: fm }}>09:30 <span style={{ fontSize: 11, color: c.muted, fontFamily: fs, fontWeight: 500 }}>出发</span></div>
              </div>
              <div style={{ background: c.bg, borderRadius: 10, padding: '10px 12px' }}>
                <div style={{ fontSize: 10, color: c.muted, fontWeight: 600 }}>预计时长</div>
                <div style={{ fontSize: 16, fontWeight: 700, marginTop: 2, fontFamily: fm }}>1 <span style={{ fontSize: 11, color: c.muted, fontFamily: fs, fontWeight: 500 }}>天</span></div>
              </div>
            </div>
          </div>
        </Section>

        <Section title="我想要…" style={{ marginTop: 18 }}>
          <div style={{
            background: c.paper, border: `1px solid ${c.line}`, borderRadius: 14,
            padding: 14, minHeight: 92, position: 'relative'
          }}>
            <div style={{ fontSize: 13.5, color: c.text, lineHeight: 1.65 }}>
              上海一天，轻松一点，<br/>
              有文化感，适合带爸妈。
            </div>
            <div style={{
              position: 'absolute', right: 12, bottom: 10,
              fontSize: 10, color: c.muted, fontFamily: fm
            }}>32 / 200</div>
          </div>
        </Section>

        <Section title="灵感标签" hint="点选偏好向量" style={{ marginTop: 18 }}>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
            {allTags.map(t => {
              const a = tags.includes(t);
              return (
                <button key={t} onClick={() => setTags(a ? tags.filter(x=>x!==t) : [...tags, t])} style={{
                  appearance: 'none', cursor: 'pointer',
                  background: a ? c.mintSoft : c.paper,
                  color: a ? c.mintDeep : c.text,
                  border: `1px solid ${a ? c.mint + '60' : c.line}`,
                  padding: '7px 14px', borderRadius: 999,
                  fontFamily: fs, fontSize: 12.5, fontWeight: a ? 600 : 500
                }}>{t}</button>
              );
            })}
          </div>
        </Section>

        <div style={{ height: 16 }}></div>
      </PScroll>

      <CtaRow primary="让 AI 帮我整理需求" primaryAction={() => ctx.nav.push('prefs')} />
    </div>
  );
}

// ═════════════════════════════════════════════════════════════
// S2 — Prefs (Frame 2)
// ═════════════════════════════════════════════════════════════

const PREFS = [
  { key: 'walk',    label: '每日步行上限', valLabel: '低', range: '0~5km',          desc: '低 · 5km 以内',         val: 0.18 },
  { key: 'culture', label: '文化深度',    valLabel: '高', range: '70~100',         desc: '高 · 偏博物馆/历史街区', val: 0.78 },
  { key: 'rest',    label: '休憩频率',    valLabel: '高', range: '约 90 min / 次', desc: '高 · 90 min/次',         val: 0.82 }
];

function PrefsScreen({ ctx }) {
  const [vals, setVals] = useState(PREFS.map(p => p.val));

  return (
    <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
      <StatusLine />

      <PScroll>
        <HeroTitle
          title="确认旅行偏好"
          sub="滑块设置会影响行程排序"
        />

        <Section>
          <div style={{
            background: c.paper, border: `1px solid ${c.line}`, borderRadius: 14,
            padding: '14px 16px',
            display: 'flex', alignItems: 'center', gap: 12
          }}>
            <div style={{
              width: 34, height: 34, borderRadius: 10,
              background: c.mintSoft, color: c.mintDeep,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: 16, fontWeight: 700
            }}>✦</div>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 14, fontWeight: 700 }}>推荐模式</div>
              <div style={{ fontSize: 11, color: c.muted, marginTop: 2 }}>轻松长辈 · 可手动修改</div>
            </div>
            <Badge kind="mint">已选</Badge>
          </div>
        </Section>

        <Section title="可调整偏好" style={{ marginTop: 20 }}>
          <div style={{
            background: c.paper, border: `1px solid ${c.line}`, borderRadius: 14,
            padding: '4px 16px'
          }}>
            {PREFS.map((p, i) => (
              <PrefSlider
                key={p.key}
                pref={p}
                value={vals[i]}
                onChange={v => setVals(vals.map((x, j) => j === i ? v : x))}
                last={i === PREFS.length - 1}
              />
            ))}
          </div>
        </Section>

        <Section style={{ marginTop: 16 }}>
          <div style={{
            background: c.mintSoft, borderRadius: 12,
            padding: '12px 14px',
            display: 'flex', alignItems: 'flex-start', gap: 10
          }}>
            <div style={{
              width: 18, height: 18, borderRadius: '50%',
              background: c.mint, color: c.paper,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: 10, fontWeight: 700, flexShrink: 0, marginTop: 1
            }}>i</div>
            <div style={{ fontSize: 11.5, color: c.mintDeep, lineHeight: 1.55 }}>
              你可以随时修改这些偏好，调整后，新方案将会重新排序。
            </div>
          </div>
        </Section>

        <div style={{ height: 16 }}></div>
      </PScroll>

      <CtaRow
        ghost="返回修改"
        ghostAction={() => ctx.nav.pop()}
        primary="生成方案"
        primaryAction={() => ctx.nav.push('plans')}
      />
    </div>
  );
}

function PrefSlider({ pref, value, onChange, last }) {
  return (
    <div style={{
      padding: '14px 0',
      borderBottom: last ? 'none' : `1px solid ${c.lineSoft}`
    }}>
      <div style={{ display: 'flex', alignItems: 'baseline', marginBottom: 10 }}>
        <div style={{ fontSize: 13, fontWeight: 600, color: c.ink }}>{pref.label}</div>
        <div style={{ fontSize: 11, color: c.mintDeep, marginLeft: 8, fontWeight: 600 }}>: {pref.valLabel}</div>
        <div style={{ flex: 1 }}></div>
        <div style={{ fontSize: 10.5, color: c.muted, fontFamily: fm }}>{pref.range}</div>
      </div>
      <Slider value={value} onChange={onChange} />
      <div style={{ fontSize: 10.5, color: c.muted, marginTop: 6 }}>{pref.desc}</div>
    </div>
  );
}

function Slider({ value, onChange }) {
  return (
    <div style={{ position: 'relative', height: 22, display: 'flex', alignItems: 'center' }}>
      <div style={{ position: 'absolute', left: 0, right: 0, height: 4, borderRadius: 4, background: c.lineSoft }}></div>
      <div style={{ position: 'absolute', left: 0, height: 4, borderRadius: 4, width: `${value * 100}%`, background: c.mint }}></div>
      <input
        type="range" min="0" max="1" step="0.01" value={value}
        onChange={e => onChange(parseFloat(e.target.value))}
        style={{ position: 'absolute', inset: 0, opacity: 0, cursor: 'pointer', width: '100%', margin: 0 }}
      />
      <div style={{
        position: 'absolute', left: `calc(${value * 100}% - 9px)`,
        width: 18, height: 18, borderRadius: '50%',
        background: c.paper, border: `2.5px solid ${c.mint}`,
        boxShadow: '0 1px 4px rgba(0,0,0,0.12)', pointerEvents: 'none'
      }}></div>
    </div>
  );
}

// ═════════════════════════════════════════════════════════════
// S3 — Plans (Frame 3)
// ═════════════════════════════════════════════════════════════

const PLAN_DATA = [
  { id: 'A', code: '经典文化线', score: 86, recommended: false, summary: '外滩 → 豫园 → 博物馆', note: '文化沉浸高，但下午行进较多。', walk: '4.2 km', dur: '6.5 h', cost: '¥180' },
  { id: 'B', code: '轻松长辈线', score: 92, recommended: true,  summary: '外滩 → 午餐 → 上海博物馆东馆', note: '休憩点充足，已避开下午烈日和高峰客流。', walk: '2.1 km', dur: '5.0 h', cost: '¥220' },
  { id: 'C', code: '城市记忆线', score: 79, recommended: false, summary: '武康路 → 田子坊 → 思南公馆', note: '街区漫步主，含 1 个商业合作节点，已标注。', walk: '3.5 km', dur: '6.0 h', cost: '¥150' }
];

function PlansScreen({ ctx }) {
  const picked = ctx.pickedPlan;
  const setPicked = ctx.setPickedPlan;

  return (
    <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
      <StatusLine />

      <PScroll>
        <HeroTitle
          title="选择你的行程方案"
          sub="不满意可返回调整偏好"
        />

        <div style={{ padding: '0 20px', display: 'flex', flexDirection: 'column', gap: 12 }}>
          {PLAN_DATA.map(p => (
            <PlanCard key={p.id} p={p} picked={picked === p.id} onPick={() => setPicked(p.id)} />
          ))}
        </div>

        <div style={{ height: 16 }}></div>
      </PScroll>

      <CtaRow
        ghost="返回修改"
        ghostAction={() => ctx.nav.pop()}
        primary={`选择方案 ${picked}`}
        primaryAction={() => { ctx.setAutoTriggered(false); ctx.nav.push('trip'); }}
      />
    </div>
  );
}

function PlanCard({ p, picked, onPick }) {
  return (
    <button onClick={onPick} style={{
      appearance: 'none', cursor: 'pointer', textAlign: 'left',
      background: c.paper,
      border: picked ? `1.5px solid ${c.mint}` : `1px solid ${c.line}`,
      borderRadius: 14, padding: '14px 16px',
      position: 'relative', fontFamily: fs
    }}>
      <div style={{ display: 'flex', alignItems: 'flex-start', gap: 10 }}>
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
            <span style={{ fontSize: 15, fontWeight: 700, letterSpacing: '-0.005em' }}>
              {p.id} · {p.code}
            </span>
            {p.recommended && <Badge kind="mint" dense>推荐</Badge>}
          </div>
          <div style={{ fontSize: 11.5, color: c.muted, marginTop: 4 }}>{p.summary}</div>
        </div>
        <div style={{
          fontFamily: fm, fontSize: 22, fontWeight: 800, lineHeight: 1,
          color: p.recommended ? c.mintDeep : c.ink, letterSpacing: '-0.02em'
        }}>{p.score}</div>
      </div>

      <div style={{ marginTop: 10, height: 3, background: c.lineSoft, borderRadius: 2, overflow: 'hidden' }}>
        <div style={{
          height: '100%', width: `${p.score}%`,
          background: p.recommended ? c.mint : c.mutedSoft
        }}></div>
      </div>

      <div style={{
        marginTop: 10,
        display: 'flex', alignItems: 'center', gap: 12,
        fontSize: 11, color: c.text2
      }}>
        <span><span style={{ color: c.muted }}>步行</span> <span style={{ fontFamily: fm, fontWeight: 600, color: c.ink }}>{p.walk}</span></span>
        <span style={{ color: c.line }}>|</span>
        <span><span style={{ color: c.muted }}>时长</span> <span style={{ fontFamily: fm, fontWeight: 600, color: c.ink }}>{p.dur}</span></span>
        <span style={{ color: c.line }}>|</span>
        <span><span style={{ color: c.muted }}>预算</span> <span style={{ fontFamily: fm, fontWeight: 600, color: c.ink }}>{p.cost}</span></span>
      </div>

      <div style={{
        marginTop: 10, paddingTop: 10,
        borderTop: `1px solid ${c.lineSoft}`,
        fontSize: 11.5, color: c.text2, lineHeight: 1.5
      }}>{p.note}</div>
    </button>
  );
}

// ═════════════════════════════════════════════════════════════
// S4 — Trip (Frame 4)
// ═════════════════════════════════════════════════════════════

const STOPS = [
  { n: 1, name: '外滩',         kind: '景点', meta: '地铁 · 2.0 公里 · 18 分钟', x: 0.30, y: 0.78 },
  { n: 2, name: '老字号午餐',    kind: '餐厅', meta: '地铁 · 2.7 公里 · 13 分钟', x: 0.66, y: 0.40 },
  { n: 3, name: '上海博物馆东馆', kind: '景点', meta: '地铁 · 3.4 公里 · 21 分钟', x: 0.78, y: 0.18 }
];

function TripScreen({ ctx }) {
  const [tab, setTab] = useState('day1');

  return (
    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', position: 'relative' }}>
      <div style={{ position: 'absolute', inset: 0, zIndex: 0 }}>
        <TripMap />
      </div>

      <div style={{ position: 'relative', zIndex: 1, background: 'linear-gradient(180deg, #ffffffe8 0%, #ffffff00 100%)' }}>
        <StatusLine />
        <div style={{ padding: '4px 18px 12px', display: 'flex', alignItems: 'center', gap: 10 }}>
          <button onClick={() => ctx.nav.push('search')} style={{
            flex: 1, appearance: 'none', cursor: 'pointer',
            background: c.paper, borderRadius: 999, padding: '10px 14px',
            display: 'flex', alignItems: 'center', gap: 8,
            border: `1px solid ${c.line}`, textAlign: 'left'
          }}>
            <span style={{ color: c.muted, fontSize: 13 }}>⌕</span>
            <span style={{ fontSize: 12, color: c.muted }}>搜索景点、餐厅、酒店</span>
          </button>
          <div style={{
            width: 36, height: 36, borderRadius: '50%', background: c.paper,
            border: `1px solid ${c.line}`,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: 14
          }}>◐</div>
        </div>
      </div>

      <div style={{ flex: 1 }}></div>

      <div style={{
        position: 'relative', zIndex: 2,
        background: c.paper, borderRadius: '18px 18px 0 0',
        boxShadow: '0 -8px 28px rgba(15, 20, 17, 0.08)',
        padding: '10px 0 6px'
      }}>
        <div style={{ width: 36, height: 4, borderRadius: 2, background: c.mutedSoft, margin: '0 auto 12px' }}></div>

        <div style={{ padding: '0 20px', display: 'flex', alignItems: 'center', gap: 18, borderBottom: `1px solid ${c.lineSoft}` }}>
          {[
            { k: 'all',  l: '总览', d: '' },
            { k: 'day1', l: '08.01', d: '周五' },
            { k: 'day2', l: '08.02', d: '周六' }
          ].map(t => {
            const a = t.k === tab;
            return (
              <button key={t.k} onClick={() => setTab(t.k)} style={{
                appearance: 'none', border: 'none', cursor: 'pointer',
                background: 'transparent', padding: '10px 0 12px',
                position: 'relative', fontFamily: fs,
                display: 'flex', alignItems: 'baseline', gap: 4
              }}>
                <span style={{
                  fontSize: 13, fontWeight: a ? 700 : 500,
                  color: a ? c.ink : c.muted, fontFamily: t.k === 'all' ? fs : fm
                }}>{t.l}</span>
                {t.d && <span style={{ fontSize: 11, color: a ? c.text2 : c.mutedSoft }}>{t.d}</span>}
                {a && <span style={{
                  position: 'absolute', left: 0, right: 0, bottom: -1, height: 2,
                  background: c.cta
                }}></span>}
              </button>
            );
          })}
          <div style={{ flex: 1 }}></div>
          <button style={{
            appearance: 'none', border: 'none', cursor: 'pointer',
            background: 'transparent', color: c.mintDeep,
            fontSize: 12, fontWeight: 600
          }}>添加备注</button>
        </div>

        <div style={{ padding: '14px 20px 4px', display: 'flex', alignItems: 'baseline' }}>
          <div style={{ fontSize: 18, fontWeight: 700, fontFamily: fm, letterSpacing: '-0.005em' }}>08.01</div>
          <div style={{ fontSize: 13, color: c.muted, marginLeft: 8 }}>周五</div>
        </div>

        <div style={{ padding: '0 20px 6px' }}>
          {STOPS.map(s => <StopRow key={s.n} s={s} onClick={() => ctx.nav.push('detail')} />)}
        </div>

        <div style={{ padding: '8px 20px 16px', display: 'flex', justifyContent: 'flex-end' }}>
          <button onClick={() => ctx.nav.push('search')} style={{
            appearance: 'none', cursor: 'pointer', border: 'none',
            background: c.cta, color: c.paper,
            padding: '11px 22px', borderRadius: 999,
            fontFamily: fs, fontSize: 13, fontWeight: 600,
            display: 'flex', alignItems: 'center', gap: 8
          }}>
            <span style={{ fontSize: 13 }}>✎</span>
            编辑路线
          </button>
        </div>
      </div>

      {!ctx.autoTriggered && <AutoEventHint />}
    </div>
  );
}

function AutoEventHint() {
  return (
    <div style={{
      position: 'absolute', top: 122, left: '50%', transform: 'translateX(-50%)',
      background: c.warnPaper, color: c.warn, zIndex: 5,
      padding: '7px 14px', borderRadius: 999,
      fontSize: 11, fontWeight: 600, fontFamily: fs,
      border: `1px solid ${c.warn}40`, whiteSpace: 'nowrap',
      display: 'flex', alignItems: 'center', gap: 6,
      boxShadow: '0 4px 12px rgba(0,0,0,0.08)'
    }}>
      <div style={{
        width: 8, height: 8, borderRadius: '50%', background: c.warn,
        animation: 'pulse 1.4s infinite'
      }}></div>
      6 秒后自动推送同行偏好提醒…
    </div>
  );
}

function StopRow({ s, onClick }) {
  return (
    <button onClick={onClick} style={{
      appearance: 'none', cursor: 'pointer', border: 'none', background: 'transparent',
      display: 'flex', alignItems: 'center', gap: 12,
      padding: '10px 0', width: '100%',
      borderTop: `1px solid ${c.lineSoft}`,
      textAlign: 'left', fontFamily: fs
    }}>
      <div style={{
        width: 44, height: 44, borderRadius: 10,
        background: c.bg2, display: 'flex', alignItems: 'center', justifyContent: 'center',
        flexShrink: 0
      }}>
        <svg width="22" height="22" viewBox="0 0 22 22">
          <rect x="3" y="14" width="16" height="5" fill={c.mutedSoft} opacity="0.6"/>
          <path d="M3 14 L8 7 L13 11 L19 4 L19 14 Z" fill={c.mutedSoft}/>
          <circle cx="14" cy="6" r="1.5" fill={c.mutedSoft}/>
        </svg>
      </div>
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ fontSize: 11, color: c.muted, marginBottom: 2 }}>{s.kind}</div>
        <div style={{ fontSize: 14, fontWeight: 600, letterSpacing: '-0.005em' }}>
          {s.n}. {s.name}
        </div>
        <div style={{ fontSize: 11, color: c.muted, marginTop: 3 }}>{s.meta}</div>
      </div>
      <div style={{ fontSize: 16, color: c.mutedSoft, paddingRight: 4 }}>›</div>
    </button>
  );
}

function TripMap() {
  return (
    <div style={{
      position: 'absolute', inset: 0,
      background: c.sky,
      overflow: 'hidden'
    }}>
      <svg width="100%" height="100%" viewBox="0 0 372 540" preserveAspectRatio="xMidYMid slice">
        <path d="M 0 420 Q 90 360 180 400 T 380 340" fill="none" stroke="#b9d2e0" strokeWidth="42" opacity="0.5"/>
        <ellipse cx="320" cy="140" rx="48" ry="32" fill="#cde0c8" opacity="0.7"/>
        <ellipse cx="60"  cy="200" rx="42" ry="26" fill="#cde0c8" opacity="0.55"/>

        {[60, 120, 180, 240, 300, 360, 420, 480].map(y => (
          <line key={'h'+y} x1="0" y1={y} x2="372" y2={y} stroke="#ffffff" strokeWidth="1" opacity="0.6"/>
        ))}
        {[60, 140, 220, 300].map(x => (
          <line key={'v'+x} x1={x} y1="0" x2={x} y2="540" stroke="#ffffff" strokeWidth="1" opacity="0.6"/>
        ))}

        <path
          d="M 112 421 Q 200 316 246 216 T 290 97"
          stroke={c.mint} strokeWidth="3" fill="none" strokeLinecap="round"
        />
        <path
          d="M 112 421 Q 200 316 246 216 T 290 97"
          stroke={c.paper} strokeWidth="1" fill="none" strokeLinecap="round" strokeDasharray="2 4" opacity="0.7"
        />

        {STOPS.map(s => (
          <g key={s.n} transform={`translate(${s.x * 372}, ${s.y * 540})`}>
            <circle r="16" fill={c.mint}/>
            <circle r="16" fill="none" stroke={c.paper} strokeWidth="2.5"/>
            <text textAnchor="middle" y="5" fill={c.paper} fontSize="14" fontWeight="700" fontFamily={fs}>{s.n}</text>
          </g>
        ))}
      </svg>

      <div style={{
        position: 'absolute', right: 14, bottom: '38%',
        width: 36, height: 36, borderRadius: '50%',
        background: c.paper, border: `1px solid ${c.line}`,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        boxShadow: '0 2px 8px rgba(0,0,0,0.08)', fontSize: 14
      }}>⌖</div>
    </div>
  );
}

// ═════════════════════════════════════════════════════════════
// S4A — Search (Frame 4A)
// ═════════════════════════════════════════════════════════════

const SEARCH_RESULTS = [
  { n: '博', name: '上海博物馆东馆', meta: '室内 · 文化深度展览 · 距离 2.1 km', tag: '博物馆' },
  { n: '园', name: '豫园',         meta: '园林 · 历史街区 · 距离 1.4 km',     tag: '景点' }
];

function SearchScreen({ ctx }) {
  return (
    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', position: 'relative' }}>
      {/* map background */}
      <div style={{ position: 'absolute', inset: 0, zIndex: 0 }}>
        <SearchMap />
      </div>

      {/* top sticky search */}
      <div style={{ position: 'relative', zIndex: 2 }}>
        <StatusLine />
        <div style={{ padding: '4px 16px 12px', display: 'flex', alignItems: 'center', gap: 8 }}>
          <button onClick={() => ctx.nav.pop()} style={{
            appearance: 'none', cursor: 'pointer', border: 'none',
            width: 36, height: 36, borderRadius: '50%', background: c.paper,
            border: `1px solid ${c.line}`,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: 15, color: c.ink
          }}>‹</button>
          <div style={{
            flex: 1, background: c.paper, borderRadius: 999, padding: '10px 14px',
            display: 'flex', alignItems: 'center', gap: 8,
            border: `1px solid ${c.line}`, boxShadow: '0 2px 6px rgba(0,0,0,0.04)'
          }}>
            <span style={{ color: c.mint, fontSize: 13 }}>⌕</span>
            <span style={{ fontSize: 12.5, color: c.ink, fontWeight: 500 }}>搜索景点、餐厅、酒店</span>
          </div>
        </div>
      </div>

      <div style={{ flex: 1 }}></div>

      {/* bottom results sheet */}
      <div style={{
        position: 'relative', zIndex: 2,
        background: c.paper, borderRadius: '18px 18px 0 0',
        boxShadow: '0 -8px 28px rgba(15,20,17,0.08)',
        padding: '10px 0 0'
      }}>
        <div style={{ width: 36, height: 4, borderRadius: 2, background: c.mutedSoft, margin: '0 auto 12px' }}></div>

        <div style={{ padding: '0 20px 8px', display: 'flex', alignItems: 'baseline' }}>
          <div style={{ fontSize: 13, fontWeight: 600 }}>搜索结果</div>
          <div style={{ fontSize: 11, color: c.muted, marginLeft: 'auto', fontFamily: fm }}>2 results</div>
        </div>
        <div style={{ fontSize: 11, color: c.muted, padding: '0 20px 10px' }}>
          以下结果在你行程沿路 2 km
        </div>

        <div style={{ padding: '0 20px', display: 'flex', flexDirection: 'column', gap: 10 }}>
          {SEARCH_RESULTS.map((r, i) => (
            <div key={i} style={{
              background: c.paper, border: `1px solid ${c.line}`, borderRadius: 12,
              padding: '12px 14px', display: 'flex', alignItems: 'center', gap: 12
            }}>
              <div style={{
                width: 38, height: 38, borderRadius: 10,
                background: c.mintSoft, color: c.mintDeep,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: 14, fontWeight: 700
              }}>{r.n}</div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ display: 'flex', alignItems: 'baseline', gap: 6 }}>
                  <span style={{ fontSize: 13, fontWeight: 600 }}>{r.name}</span>
                  <Badge dense kind="ghost">{r.tag}</Badge>
                </div>
                <div style={{ fontSize: 11, color: c.muted, marginTop: 3 }}>{r.meta}</div>
              </div>
              <button style={{
                appearance: 'none', cursor: 'pointer',
                border: `1px solid ${c.line}`, background: c.paper, color: c.ink,
                padding: '6px 12px', borderRadius: 999,
                fontFamily: fs, fontSize: 11.5, fontWeight: 500
              }}>查看</button>
            </div>
          ))}
        </div>

        <div style={{ padding: '14px 20px 18px' }}>
          <button onClick={() => ctx.nav.pop()} style={{
            width: '100%', appearance: 'none', cursor: 'pointer', border: 'none',
            background: c.cta, color: c.paper,
            padding: '14px', borderRadius: 999,
            fontFamily: fs, fontSize: 14, fontWeight: 600
          }}>查看已选地点</button>
        </div>
      </div>
    </div>
  );
}

function SearchMap() {
  return (
    <div style={{
      position: 'absolute', inset: 0, background: c.sky, overflow: 'hidden'
    }}>
      <svg width="100%" height="100%" viewBox="0 0 372 540" preserveAspectRatio="xMidYMid slice">
        <ellipse cx="80" cy="180" rx="56" ry="36" fill="#cde0c8" opacity="0.6"/>
        <ellipse cx="290" cy="100" rx="58" ry="38" fill="#cde0c8" opacity="0.6"/>
        <path d="M 0 360 Q 100 320 200 350 T 380 320" fill="none" stroke="#b9d2e0" strokeWidth="40" opacity="0.5"/>

        {[60, 120, 180, 240, 300, 360, 420].map(y => (
          <line key={'h'+y} x1="0" y1={y} x2="372" y2={y} stroke="#ffffff" strokeWidth="1" opacity="0.6"/>
        ))}
        {[60, 140, 220, 300].map(x => (
          <line key={'v'+x} x1={x} y1="0" x2={x} y2="540" stroke="#ffffff" strokeWidth="1" opacity="0.6"/>
        ))}

        {/* 3 numbered pins as in 4A */}
        {[
          { n: 1, x: 100, y: 280 },
          { n: 2, x: 280, y: 160 },
          { n: 3, x: 220, y: 360 }
        ].map(p => (
          <g key={p.n} transform={`translate(${p.x}, ${p.y})`}>
            <circle r="16" fill={c.mint}/>
            <circle r="16" fill="none" stroke={c.paper} strokeWidth="2.5"/>
            <text textAnchor="middle" y="5" fill={c.paper} fontSize="14" fontWeight="700">{p.n}</text>
          </g>
        ))}
      </svg>

      <div style={{
        position: 'absolute', right: 14, bottom: 200,
        width: 36, height: 36, borderRadius: '50%',
        background: c.paper, border: `1px solid ${c.line}`,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        boxShadow: '0 2px 8px rgba(0,0,0,0.08)', fontSize: 14
      }}>⌖</div>
    </div>
  );
}

// ═════════════════════════════════════════════════════════════
// S5 — Alert (Frame 5)
// ═════════════════════════════════════════════════════════════

function AlertScreen({ ctx }) {
  const [companion, setCompanion] = useState('couple');

  return (
    <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
      <StatusLine />
      <NavBack onClick={() => ctx.nav.pop()} right={<Badge kind="mint" dense>L6</Badge>} />

      <PScroll>
        <div style={{ padding: '4px 20px 18px' }}>
          <div style={{ fontSize: 22, fontWeight: 700, letterSpacing: '-0.018em' }}>同行偏好提醒</div>
          <div style={{ fontSize: 12.5, color: c.muted, marginTop: 6 }}>先看可能冲突，再一起决定</div>
        </div>

        <Section title="同行人">
          <div style={{
            background: c.paper, border: `1px solid ${c.line}`, borderRadius: 14,
            padding: '14px 16px'
          }}>
            <div style={{ display: 'flex', gap: 8 }}>
              {[
                { k: 'couple', l: '我' },
                { k: 'family', l: '他' },
                { k: 'kids',   l: '+' }
              ].map(p => {
                const a = p.k === companion;
                return (
                  <button key={p.k} onClick={() => setCompanion(p.k)} style={{
                    appearance: 'none', cursor: 'pointer',
                    width: 36, height: 36, borderRadius: '50%',
                    background: a ? c.mint : c.bg,
                    color: a ? c.paper : c.text,
                    border: 'none',
                    fontFamily: fs, fontSize: 14, fontWeight: 600
                  }}>{p.l}</button>
                );
              })}
              <div style={{ flex: 1 }}></div>
              <div style={{ alignSelf: 'center', fontSize: 11, color: c.muted }}>3 人共同出行</div>
            </div>
          </div>
        </Section>

        <Section style={{ marginTop: 18 }}>
          <div style={{
            background: c.warnPaper,
            border: `1px solid ${c.warn}30`,
            borderRadius: 14, padding: '14px 16px'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
              <span style={{ width: 8, height: 8, borderRadius: '50%', background: c.warn }}></span>
              <span style={{ fontSize: 13.5, fontWeight: 700, color: c.warn }}>冲突风险提示 · Citywalk</span>
            </div>
            <div style={{ fontSize: 12, color: c.text, lineHeight: 1.7 }}>
              你想保留武康路 Citywalk，<br/>
              同行人爸妈偏好<strong>轻松节奏</strong>，<br/>
              <span style={{ color: c.warn }}>下午预报降雨概率 60%，可能影响。</span>
            </div>
          </div>
        </Section>

        <Section title="折中建议" style={{ marginTop: 20 }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {[
              { t: '缩短 Citywalk', d: '武康路漫步从 90 分钟 → 30 分钟', icon: '◐' },
              { t: '换室内文化点', d: '换去思南公馆 / 上海博物馆东馆', icon: '⌂' }
            ].map(o => (
              <button key={o.t} onClick={() => ctx.nav.push('replan')} style={{
                appearance: 'none', cursor: 'pointer', border: 'none',
                background: c.paper, border: `1px solid ${c.line}`, borderRadius: 12,
                padding: '12px 14px', display: 'flex', alignItems: 'center', gap: 12,
                textAlign: 'left', fontFamily: fs, width: '100%'
              }}>
                <div style={{
                  width: 32, height: 32, borderRadius: 8,
                  background: c.mintSoft, color: c.mintDeep,
                  display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 14
                }}>{o.icon}</div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontSize: 13, fontWeight: 600 }}>{o.t}</div>
                  <div style={{ fontSize: 11, color: c.muted, marginTop: 2 }}>{o.d}</div>
                </div>
                <div style={{ fontSize: 14, color: c.mutedSoft }}>›</div>
              </button>
            ))}
          </div>
        </Section>

        <div style={{ height: 16 }}></div>
      </PScroll>

      <CtaRow
        ghost="返回我决定"
        ghostAction={() => ctx.nav.pop()}
        primary="查看推荐调整"
        primaryAction={() => ctx.nav.push('replan')}
      />
    </div>
  );
}

// ═════════════════════════════════════════════════════════════
// S6 — Replan (Frame 6)
// ═════════════════════════════════════════════════════════════

function ReplanScreen({ ctx }) {
  return (
    <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
      <StatusLine />
      <NavBack onClick={() => ctx.nav.pop()} right={<Badge kind="warn" dense>L6</Badge>} />

      <PScroll>
        <div style={{ padding: '4px 20px 18px' }}>
          <div style={{ fontSize: 22, fontWeight: 700, letterSpacing: '-0.018em' }}>行程需要调整</div>
          <div style={{ fontSize: 12.5, color: c.muted, marginTop: 6 }}>下午会降雨 · 推荐切换室内体验</div>
        </div>

        <Section title="当前行程">
          <div style={{ background: c.paper, border: `1px solid ${c.line}`, borderRadius: 14, padding: '14px 16px' }}>
            <ReplanStopsRow active={1} />
          </div>
        </Section>

        <Section title="降雨预测" hint="下午 14:00 起" style={{ marginTop: 18 }}>
          <div style={{ background: c.paper, border: `1px solid ${c.line}`, borderRadius: 14, padding: '14px 16px' }}>
            <RainChart />
            <div style={{ marginTop: 10, display: 'flex', alignItems: 'baseline', gap: 6 }}>
              <span style={{ fontSize: 11, color: c.muted }}>下午降雨概率升至</span>
              <span style={{ fontFamily: fm, fontSize: 22, fontWeight: 800, color: c.warn }}>80%</span>
            </div>
            <div style={{ fontSize: 11, color: c.muted, marginTop: 2 }}>
              受影响：<span style={{ color: c.text, fontWeight: 600 }}>武康路 Citywalk</span>
            </div>
          </div>
        </Section>

        <Section title="推荐 A · 换上海博物馆东馆" style={{ marginTop: 18 }}>
          <div style={{
            background: c.paper, border: `1.5px solid ${c.mint}`, borderRadius: 14,
            padding: '14px 16px', position: 'relative'
          }}>
            <div style={{
              position: 'absolute', top: -10, right: 14,
              padding: '3px 10px', borderRadius: 999,
              background: c.mint, color: c.paper, fontSize: 10.5, fontWeight: 700
            }}>AI 推荐</div>

            <div style={{ display: 'flex', alignItems: 'baseline', gap: 8, marginBottom: 8 }}>
              <span style={{ fontSize: 14, fontWeight: 700 }}>换上海博物馆东馆</span>
              <span style={{ fontSize: 11, color: c.muted }}>免费 · 已预约可用</span>
            </div>
            <div style={{ fontSize: 12, color: c.text2, lineHeight: 1.6 }}>
              室内文化点，避雨可控；与你今天的「文化深度」偏好高度一致。
            </div>

            <div style={{
              marginTop: 10, paddingTop: 10,
              borderTop: `1px solid ${c.lineSoft}`,
              display: 'flex', gap: 12
            }}>
              <GainLost kind="gain" t="文化深度 ↑ · 不怕雨" />
              <GainLost kind="lost" t="少了一段街区氛围" />
            </div>
          </div>
        </Section>

        <div style={{ padding: '14px 20px 16px', display: 'flex', justifyContent: 'center', gap: 16, fontSize: 11 }}>
          <button style={{ appearance:'none', border:'none', background:'transparent', color:c.text2, cursor:'pointer', fontFamily: fs, fontSize: 11 }}>保留原计划</button>
          <span style={{ color: c.line }}>·</span>
          <button style={{ appearance:'none', border:'none', background:'transparent', color:c.text2, cursor:'pointer', fontFamily: fs, fontSize: 11 }}>自己调整</button>
        </div>
      </PScroll>

      <CtaRow
        ghost="请更换其它"
        ghostAction={() => {}}
        primary="接受方案 A"
        primaryAction={() => ctx.nav.push('detail')}
      />
    </div>
  );
}

function ReplanStopsRow({ active }) {
  return (
    <div style={{ position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '8px 6px' }}>
      <div style={{
        position: 'absolute', left: '12%', right: '12%', top: '50%',
        height: 2, background: c.lineSoft
      }}></div>
      {[0, 1, 2, 3].map(i => {
        const done = i <= active;
        return (
          <div key={i} style={{
            position: 'relative', width: 18, height: 18, borderRadius: '50%',
            background: done ? c.mint : c.paper,
            border: `2px solid ${done ? c.mint : c.mutedSoft}`,
            zIndex: 1
          }}></div>
        );
      })}
    </div>
  );
}

function RainChart() {
  const data = [10, 15, 20, 25, 40, 55, 70, 80, 75, 60];
  const labels = ['10','11','12','13','14','15','16','17','18','19'];
  const max = 100;
  return (
    <svg width="100%" height="74" viewBox="0 0 280 80">
      {data.map((v, i) => {
        const x = 8 + i * 28;
        const h = (v / max) * 56;
        const isHigh = v >= 50;
        return (
          <g key={i}>
            <rect x={x} y={64 - h} width={18} height={h} rx="3"
              fill={isHigh ? c.warn : c.mintMid}/>
            <text x={x + 9} y="76" textAnchor="middle"
              fontSize="9" fill={c.muted} fontFamily={fm}>{labels[i]}</text>
          </g>
        );
      })}
      <line x1="0" y1="64" x2="280" y2="64" stroke={c.line} strokeWidth="0.5"/>
    </svg>
  );
}

function GainLost({ kind, t }) {
  const g = kind === 'gain';
  return (
    <div style={{ flex: 1, display: 'flex', gap: 6, alignItems: 'flex-start' }}>
      <span style={{
        fontFamily: fm, fontSize: 9, fontWeight: 800,
        padding: '2px 5px', borderRadius: 3,
        background: g ? c.mintSoft : c.warnSoft,
        color: g ? c.mintDeep : c.warn,
        marginTop: 1, flexShrink: 0
      }}>{g ? 'GAIN' : 'LOST'}</span>
      <span style={{ fontSize: 11, color: c.text2, lineHeight: 1.45 }}>{t}</span>
    </div>
  );
}

// ═════════════════════════════════════════════════════════════
// S7 — Detail (Frame 7)
// ═════════════════════════════════════════════════════════════

const THREE = [
  { n: 1, head: '为什么值得看', body: '这是国内首个汇集青铜、陶瓷、书画的常设展，号称「半部中国通史」。' },
  { n: 2, head: '到现场重点看哪里', body: '先看青铜馆「大盂鼎」与「商鞅方升」，再到三楼书画馆看赵孟頫真迹。' },
  { n: 3, head: '和你的兴趣有什么关系', body: '你勾了「文化深度」、「轻松节奏」标签——东馆室内可坐，沉浸时间长。' }
];

function DetailScreen({ ctx }) {
  return (
    <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
      <StatusLine />
      <NavBack onClick={() => ctx.nav.pop()} />

      <PScroll>
        <div style={{ padding: '4px 20px 18px' }}>
          <div style={{ fontSize: 22, fontWeight: 700, letterSpacing: '-0.018em' }}>看懂这一站</div>
          <div style={{ fontSize: 12.5, color: c.muted, marginTop: 6 }}>少一点百科，多一点为什么相关</div>
        </div>

        <Section>
          <div style={{
            background: c.paper, border: `1px solid ${c.line}`, borderRadius: 14,
            padding: '4px 16px'
          }}>
            <div style={{ fontSize: 11, color: c.muted, fontWeight: 600, letterSpacing: '0.06em', padding: '12px 0 4px' }}>
              已更新行程
            </div>
            <UpdatedRow time="15:20" name="上海博物馆东馆" tag="刚刚替换了 Citywalk" />
            <UpdatedRow time="17:30" name="晚餐 · 茶歇" tag="时间不变" last />
          </div>
        </Section>

        <Section style={{ marginTop: 18 }}>
          <div style={{ fontSize: 18, fontWeight: 700, letterSpacing: '-0.012em' }}>
            上海 · 博物馆东馆
          </div>
        </Section>

        <Section style={{ marginTop: 12 }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
            {THREE.map(t => (
              <div key={t.n} style={{ display: 'flex', gap: 14 }}>
                <div style={{
                  width: 26, height: 26, borderRadius: 7,
                  background: c.mintSoft, color: c.mintDeep,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontFamily: fm, fontSize: 12, fontWeight: 800, flexShrink: 0
                }}>{t.n}</div>
                <div style={{ flex: 1, paddingTop: 2 }}>
                  <div style={{ fontSize: 13.5, fontWeight: 700 }}>{t.n}、{t.head}</div>
                  <div style={{ fontSize: 12, color: c.text2, marginTop: 5, lineHeight: 1.65 }}>{t.body}</div>
                </div>
              </div>
            ))}
          </div>
        </Section>

        <Section style={{ marginTop: 18 }}>
          <div style={{
            background: c.bg, borderRadius: 10, padding: '10px 14px',
            display: 'flex', alignItems: 'center', gap: 10
          }}>
            <Badge kind="ghost" dense>来源</Badge>
            <span style={{ fontSize: 11, color: c.muted, flex: 1 }}>上博官网 / 《何以中国》图录 2024</span>
            <span style={{ fontFamily: fm, fontSize: 12, fontWeight: 700, color: c.mintDeep }}>92%</span>
          </div>
        </Section>

        <div style={{ height: 16 }}></div>
      </PScroll>

      <CtaRow
        ghost="返回地图"
        ghostAction={() => ctx.nav.jumpTo('trip')}
        primary="加入讲解"
        primaryAction={() => ctx.nav.jumpTo('trip')}
      />
    </div>
  );
}

function UpdatedRow({ time, name, tag, last }) {
  return (
    <div style={{
      padding: '10px 0',
      borderTop: `1px solid ${c.lineSoft}`,
      display: 'flex', alignItems: 'center', gap: 12
    }}>
      <div style={{ fontFamily: fm, fontSize: 13, fontWeight: 700, color: c.ink, minWidth: 44 }}>{time}</div>
      <div style={{ width: 8, height: 8, borderRadius: '50%', background: c.mint, flexShrink: 0 }}></div>
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ fontSize: 13, fontWeight: 600 }}>{name}</div>
        <div style={{ fontSize: 11, color: c.muted, marginTop: 2 }}>{tag}</div>
      </div>
    </div>
  );
}

// ═════════════════════════════════════════════════════════════
// Registry
// ═════════════════════════════════════════════════════════════

window.SCREENS = {
  home:    HomeScreen,
  prefs:   PrefsScreen,
  plans:   PlansScreen,
  trip:    TripScreen,
  search:  SearchScreen,
  alert:   AlertScreen,
  replan:  ReplanScreen,
  detail:  DetailScreen
};
