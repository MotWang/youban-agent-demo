// Screens 3 (PLANS) & 4 (MAP) — both variants

const { useState, useEffect, useMemo, useRef } = React;
const D3 = window.YOUBAN_DATA;
const { T: T3, FONT_SANS: FS3, FONT_MONO: FM3, dotWeighted: dw3, scoresArray: sa3 } = window.__YouBan;
const { PhoneScroll, PhoneStatus, AppBar, Chip, Badge } = window;

// ═════════════════════════════════════════════════════════════
// Helper: per-plan score with live weights
// ═════════════════════════════════════════════════════════════
function planLiveScore(plan, weights) {
  // Each plan has a fixed canonical attraction set; we compute aggregate
  // by stop using attraction.base where matched; fall back to plan.score.
  // Mapping is heuristic for demo.
  const stopMap = {
    '外滩': 'bund', '外滩（短）': 'bund', '外滩夜景': 'bund',
    '豫园': 'yuyuan',
    '武康路': 'wukang', '武康路 Citywalk': 'wukang',
    '上海博物馆东馆': 'sh_museum_east',
    '城隍庙': 'chenghuangmiao',
    '田子坊': 'wukang',
    '思南公馆': 'wukang',
    '永康路茶歇': 'wukang'
  };
  let total = 0; let cnt = 0;
  plan.stops.forEach(s => {
    const a = D3.attractions[stopMap[s]];
    if (a) { total += dw3(sa3(a), weights); cnt++; }
  });
  return cnt ? total / cnt : plan.score;
}

// ═════════════════════════════════════════════════════════════
// Screen 3: PLANS COMPACT
// ═════════════════════════════════════════════════════════════

function PlansCompact({ ctx }) {
  const ranked = useMemo(() => {
    return D3.plans
      .map(p => ({ ...p, live: planLiveScore(p, ctx.weights) }))
      .sort((a, b) => b.live - a.live);
  }, [ctx.weights]);

  return (
    <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
      <PhoneStatus />
      <AppBar
        title="3 个方案 · 已按你的画像排序"
        sub="规划决策层 · L4 · 多方案对比"
        right={<span style={{ fontSize: 11, color: T3.muted, fontFamily: FM3 }}>{ranked.length} plans</span>}
      />
      <PhoneScroll pad={20}>
        <div style={{ padding: '14px 14px' }}>
          {ranked.map((p, i) => (
            <PlanCard key={p.id} p={p} rank={i + 1} top={i === 0} />
          ))}
        </div>
        <ScoringHint />
      </PhoneScroll>
    </div>
  );
}

function PlanCard({ p, rank, top }) {
  return (
    <div style={{
      background: T3.paper, borderRadius: 12,
      border: `1.5px solid ${top ? T3.ink : T3.line}`,
      padding: '12px 14px', marginBottom: 10,
      boxShadow: top ? `0 4px 16px ${T3.ink}10` : 'none',
      position: 'relative'
    }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'baseline', gap: 8 }}>
            <span style={{ fontFamily: FM3, fontSize: 10, color: T3.muted }}>#{rank}</span>
            <span style={{ fontSize: 15, fontWeight: 600 }}>{p.title}</span>
            {top && <Badge kind="match">推荐</Badge>}
          </div>
          <div style={{ fontSize: 11, color: T3.muted, marginTop: 4 }}>
            {p.stops.join(' · ')}
          </div>
        </div>
        <ScorePill score={p.live} />
      </div>

      <div style={{ display: 'flex', gap: 10, marginTop: 10, fontSize: 11, color: T3.muted, whiteSpace: 'nowrap' }}>
        <span><span style={{ fontFamily: FM3, color: T3.ink, fontWeight: 600 }}>{p.duration}</span> 时长</span>
        <span><span style={{ fontFamily: FM3, color: T3.ink, fontWeight: 600 }}>{p.walk}</span> 步行</span>
        <span><span style={{ fontFamily: FM3, color: T3.ink, fontWeight: 600 }}>{p.cost}</span> 预算</span>
      </div>

      <div style={{ marginTop: 10, borderTop: `1px solid ${T3.lineSoft}`, paddingTop: 10 }}>
        <div style={{ fontSize: 10, letterSpacing: '0.14em', color: T3.muted, fontWeight: 600 }}>
          推荐理由
        </div>
        <div style={{ marginTop: 6, display: 'flex', flexDirection: 'column', gap: 5 }}>
          {p.reasons.map((r, i) => (
            <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: 6, fontSize: 11.5, lineHeight: 1.5 }}>
              <Badge kind={r.kind === 'match' ? 'match' : r.kind === 'biz' ? 'biz' : 'neutral'}>
                {r.kind === 'match' ? '偏好匹配' : r.kind === 'biz' ? '商业合作' : '客观约束'}
              </Badge>
              <span style={{ color: T3.inkSoft }}>{r.text}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function ScorePill({ score }) {
  return (
    <div style={{
      padding: '4px 8px', borderRadius: 6,
      background: T3.ink, color: T3.paper,
      fontFamily: FM3, fontSize: 12, fontWeight: 600, lineHeight: 1
    }}>{score.toFixed(2)}</div>
  );
}

function ScoringHint() {
  return (
    <div style={{ padding: '0 14px 16px' }}>
      <div style={{ fontSize: 11, color: T3.muted, lineHeight: 1.6, padding: 10, background: T3.panel, borderRadius: 8 }}>
        <strong style={{ color: T3.inkSoft }}>P1 可解释性：</strong>每条推荐理由标注来源类型（偏好匹配 / 客观约束 / 平台资源）。
        改 Tweaks 里的"权重滑杆"，排名会立即变化。
      </div>
    </div>
  );
}

// ═════════════════════════════════════════════════════════════
// Screen 3: PLANS NARRATIVE
// ═════════════════════════════════════════════════════════════

function PlansNarrative({ ctx }) {
  const ranked = useMemo(() => {
    return D3.plans
      .map(p => ({ ...p, live: planLiveScore(p, ctx.weights) }))
      .sort((a, b) => b.live - a.live);
  }, [ctx.weights]);

  const top = ranked[0];
  const others = ranked.slice(1);

  return (
    <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
      <PhoneStatus />
      <PhoneScroll>
        <div style={{ padding: '24px 28px 12px' }}>
          <div style={{ fontSize: 11, letterSpacing: '0.18em', color: T3.muted, fontWeight: 600 }}>
            STEP 03 · 三个方案
          </div>
          <div style={{ fontSize: 22, fontWeight: 500, lineHeight: 1.4, marginTop: 8, letterSpacing: '-0.01em' }}>
            为你排了 3 种，<br/>
            <span style={{ color: T3.muted }}>每个都告诉你为什么。</span>
          </div>
        </div>

        <div style={{ padding: '8px 24px 12px' }}>
          <PlanHero p={top} />
        </div>

        <div style={{
          padding: '0 28px', display: 'flex', flexDirection: 'column', gap: 14
        }}>
          <div style={{ fontSize: 11, letterSpacing: '0.14em', color: T3.muted, fontWeight: 600 }}>其他选项</div>
          {others.map(p => <PlanRowNarr key={p.id} p={p} />)}
        </div>

        <div style={{ padding: '20px 28px 28px' }}>
          <div style={{ fontSize: 11, color: T3.muted, lineHeight: 1.7 }}>
            评分公式有 7 个维度，权重根据画像动态切换。在 Tweaks 里挪一下滑杆，
            <span style={{ color: T3.ink, fontWeight: 600 }}>排名会实时变化</span> —— 这是"千人千面"的技术实现。
          </div>
        </div>
      </PhoneScroll>
    </div>
  );
}

function PlanHero({ p }) {
  return (
    <div style={{
      background: T3.ink, color: T3.paper,
      borderRadius: 18, padding: '20px 22px',
      position: 'relative', overflow: 'hidden'
    }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
        <div>
          <div style={{ fontSize: 10, letterSpacing: '0.18em', color: T3.mutedSoft, fontWeight: 600 }}>
            RECOMMENDED · 顶部推荐
          </div>
          <div style={{ fontSize: 22, fontWeight: 600, marginTop: 6 }}>{p.title}</div>
        </div>
        <div style={{
          padding: '6px 10px', borderRadius: 8, background: T3.accent,
          fontFamily: FM3, fontSize: 14, fontWeight: 700
        }}>{p.live.toFixed(2)}</div>
      </div>

      <div style={{ marginTop: 14, fontSize: 12, color: T3.mutedSoft, lineHeight: 1.7 }}>
        {p.stops.join(' → ')}
      </div>

      <div style={{ display: 'flex', gap: 14, marginTop: 14, fontSize: 11, color: T3.mutedSoft }}>
        {[['时长', p.duration], ['步行', p.walk], ['预算', p.cost]].map(([k, v]) => (
          <div key={k}>
            <div style={{ fontFamily: FM3, color: T3.paper, fontSize: 16, fontWeight: 600 }}>{v}</div>
            <div style={{ marginTop: 2 }}>{k}</div>
          </div>
        ))}
      </div>

      <div style={{ marginTop: 16, paddingTop: 14, borderTop: `1px solid #ffffff14` }}>
        {p.reasons.map((r, i) => (
          <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: 8, marginTop: i === 0 ? 0 : 8, fontSize: 12.5, lineHeight: 1.55 }}>
            <span style={{
              fontSize: 9, padding: '2px 6px', borderRadius: 3,
              background: r.kind === 'match' ? T3.accent + '30' : r.kind === 'biz' ? T3.warning + '30' : '#ffffff14',
              color: r.kind === 'match' ? T3.accent : r.kind === 'biz' ? T3.warning : T3.mutedSoft,
              fontWeight: 600, marginTop: 2, flexShrink: 0
            }}>{r.kind === 'match' ? '偏好' : r.kind === 'biz' ? '合作' : '约束'}</span>
            <span>{r.text}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function PlanRowNarr({ p }) {
  return (
    <div style={{
      padding: '14px 0', borderTop: `1px solid ${T3.lineSoft}`,
      display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 12
    }}>
      <div style={{ flex: 1 }}>
        <div style={{ fontSize: 15, fontWeight: 600 }}>{p.title}</div>
        <div style={{ fontSize: 11, color: T3.muted, marginTop: 4, lineHeight: 1.6 }}>
          {p.stops.slice(0, 3).join(' · ')}{p.stops.length > 3 ? ' 等' : ''} · {p.walk} · {p.duration}
        </div>
        <div style={{ fontSize: 11, color: T3.muted, marginTop: 6, fontStyle: 'italic' }}>
          {p.reasons.find(r => r.kind === 'constraint')?.text || p.reasons[0]?.text}
        </div>
      </div>
      <div style={{
        fontFamily: FM3, fontSize: 16, fontWeight: 600, color: T3.muted
      }}>{p.live.toFixed(2)}</div>
    </div>
  );
}

// ═════════════════════════════════════════════════════════════
// Screen 4: MAP COMPACT
// ═════════════════════════════════════════════════════════════

function MapCompact({ ctx }) {
  const [showConflict, setShowConflict] = useState(true);
  return (
    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', minHeight: 0 }}>
      <PhoneStatus />
      <AppBar
        title="今日行程 · 轻松长辈线"
        sub={D3.itinerary.length + ' 站 · 步行 2.1 km'}
        right={<Badge kind="match">已执行</Badge>}
      />
      <PhoneScroll>
        <div style={{ height: 200, position: 'relative', overflow: 'hidden', margin: '10px 14px 0', borderRadius: 12 }}>
          <MapCanvas />
        </div>

        {showConflict && (
          <div style={{ padding: '12px 14px 0' }}>
            <ConflictCard onDismiss={() => setShowConflict(false)} />
          </div>
        )}

        <TimelineList />
      </PhoneScroll>
    </div>
  );
}

function MapCanvas() {
  return (
    <div style={{
      position: 'absolute', inset: 0,
      background: 'linear-gradient(180deg, #f2efe8 0%, #ece8df 100%)',
      overflow: 'hidden'
    }}>
      {/* grid */}
      <svg width="100%" height="100%" style={{ position: 'absolute', inset: 0, opacity: 0.4 }}>
        <defs>
          <pattern id="g" width="40" height="40" patternUnits="userSpaceOnUse">
            <path d="M 40 0 L 0 0 0 40" fill="none" stroke={T3.line} strokeWidth="0.5"/>
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#g)"/>
        {/* river curve */}
        <path d="M 350 -10 Q 280 200 240 400 T 200 900" stroke="#c8d8e0" strokeWidth="38" fill="none" opacity="0.5"/>
        <path d="M 350 -10 Q 280 200 240 400 T 200 900" stroke="#a5bfc8" strokeWidth="2" fill="none" opacity="0.6" strokeDasharray="4 6"/>
        {/* route polyline */}
        {D3.itinerary.map((s, i) => {
          if (i === 0) return null;
          const prev = D3.itinerary[i - 1];
          return (
            <line key={s.id}
              x1={prev.loc.x * 390} y1={prev.loc.y * 480}
              x2={s.loc.x * 390} y2={s.loc.y * 480}
              stroke={T3.ink} strokeWidth={1.8}
              strokeDasharray={s.atRisk ? '4 4' : '0'}
              opacity={s.atRisk ? 0.5 : 0.8}
            />
          );
        })}
      </svg>

      {/* pins */}
      {D3.itinerary.map((s, i) => (
        <div key={s.id} style={{
          position: 'absolute',
          left: `${s.loc.x * 100}%`, top: `${s.loc.y * 100}%`,
          transform: 'translate(-50%, -100%)',
          display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2
        }}>
          <div style={{
            background: s.atRisk ? T3.warning : T3.ink, color: T3.paper,
            padding: '2px 6px', borderRadius: 4,
            fontFamily: FM3, fontSize: 9, fontWeight: 600,
            whiteSpace: 'nowrap'
          }}>{i + 1}. {s.name}</div>
          <div style={{
            width: 10, height: 10, borderRadius: '50%',
            background: T3.paper, border: `2px solid ${s.atRisk ? T3.warning : T3.ink}`
          }}></div>
        </div>
      ))}

      <div style={{
        position: 'absolute', top: 8, right: 8,
        padding: '4px 8px', background: T3.paper + 'd0', backdropFilter: 'blur(4px)',
        borderRadius: 6, fontSize: 10, color: T3.muted, fontFamily: FM3, whiteSpace: 'nowrap'
      }}>上海 · 黄浦/徐汇</div>
    </div>
  );
}

function BottomSheet({ children }) {
  return (
    <div style={{
      position: 'absolute', left: 0, right: 0, bottom: 0,
      background: T3.paper, borderTopLeftRadius: 18, borderTopRightRadius: 18,
      boxShadow: '0 -8px 24px rgba(0,0,0,0.06)',
      maxHeight: '58%', overflow: 'auto',
      paddingTop: 8
    }}>
      <div style={{ width: 36, height: 4, background: T3.line, borderRadius: 2, margin: '0 auto 10px' }}></div>
      {children}
    </div>
  );
}

function ConflictCard({ onDismiss }) {
  const c = D3.conflict;
  return (
    <div style={{
      margin: '0 14px 12px',
      background: T3.warningSoft, border: `1px solid ${T3.warning}50`,
      borderRadius: 10, padding: '10px 12px'
    }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
            <Badge kind="biz">L4 · 多人协商</Badge>
            <span style={{ fontSize: 12, fontWeight: 600 }}>{c.title}</span>
          </div>
          <div style={{ fontSize: 11.5, color: T3.inkSoft, marginTop: 6, lineHeight: 1.55 }}>{c.detail}</div>
        </div>
        <button onClick={onDismiss} style={{
          appearance: 'none', border: 'none', background: 'transparent',
          color: T3.muted, fontSize: 14, cursor: 'pointer', padding: 0
        }}>×</button>
      </div>
      <div style={{ marginTop: 8, display: 'flex', flexDirection: 'column', gap: 4 }}>
        {c.options.map((o, i) => (
          <div key={i} style={{
            background: T3.paper, padding: '6px 10px', borderRadius: 6,
            display: 'flex', justifyContent: 'space-between', alignItems: 'center',
            fontSize: 11, border: `1px solid ${T3.line}`
          }}>
            <span style={{ fontWeight: 500 }}>{o.label}</span>
            <span style={{ color: T3.muted }}>{o.cost}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function TimelineList() {
  return (
    <div style={{ padding: '4px 14px 18px' }}>
      <div style={{ fontSize: 10, letterSpacing: '0.14em', color: T3.muted, fontWeight: 600, marginBottom: 8 }}>
        TIMELINE · 时间轴
      </div>
      {D3.itinerary.map((s, i) => (
        <div key={s.id} style={{
          display: 'flex', gap: 12, padding: '8px 0',
          borderBottom: i < D3.itinerary.length - 1 ? `1px solid ${T3.lineSoft}` : 'none'
        }}>
          <div style={{ width: 44, fontFamily: FM3, fontSize: 11, color: T3.muted }}>{s.time}</div>
          <div style={{ flex: 1 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
              <span style={{ fontSize: 13, fontWeight: 500 }}>{s.name}</span>
              {s.atRisk && <Badge kind="biz">天气敏感</Badge>}
            </div>
            <div style={{ fontSize: 10.5, color: T3.muted, marginTop: 2, display: 'flex', gap: 8 }}>
              <span>{s.dur}</span>
              <span>·</span>
              <span>{s.type === 'outdoor' ? '户外' : s.type === 'indoor' ? '室内' : s.type === 'meal' ? '用餐' : '休息'}</span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

// ═════════════════════════════════════════════════════════════
// Screen 4: MAP NARRATIVE
// ═════════════════════════════════════════════════════════════

function MapNarrative({ ctx }) {
  return (
    <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
      <PhoneStatus />
      <PhoneScroll>
        <div style={{ padding: '22px 28px 12px' }}>
          <div style={{ fontSize: 11, letterSpacing: '0.18em', color: T3.muted, fontWeight: 600 }}>
            今日 · 一日游
          </div>
          <div style={{ fontSize: 22, fontWeight: 500, marginTop: 6, letterSpacing: '-0.01em' }}>
            轻松长辈线
          </div>
          <div style={{ fontSize: 12, color: T3.muted, marginTop: 6 }}>
            5 站 · 6.5 小时 · 步行 2.1 km
          </div>
        </div>

        <div style={{ padding: '0 24px' }}>
          <div style={{ position: 'relative', height: 220, borderRadius: 14, overflow: 'hidden' }}>
            <MapCanvas />
          </div>
        </div>

        <div style={{ padding: '18px 28px 12px' }}>
          <div style={{
            background: T3.warningSoft, border: `1px solid ${T3.warning}40`,
            borderRadius: 14, padding: '14px 16px'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
              <Badge kind="biz">L4 · 多人协商</Badge>
              <span style={{ fontSize: 13, fontWeight: 600 }}>识别到偏好冲突</span>
            </div>
            <div style={{ fontSize: 13, color: T3.inkSoft, marginTop: 8, lineHeight: 1.6 }}>
              你想保留 <strong>武康路 Citywalk</strong>，<br/>
              但爸妈体力剖面显示下午步行负担偏高。
            </div>
            <div style={{ marginTop: 12, paddingTop: 10, borderTop: `1px solid ${T3.warning}30` }}>
              <div style={{ fontSize: 11, color: T3.muted, marginBottom: 6 }}>3 个折中方向</div>
              {D3.conflict.options.map((o, i) => (
                <div key={i} style={{
                  display: 'flex', justifyContent: 'space-between',
                  padding: '8px 0', borderTop: i === 0 ? 'none' : `1px solid ${T3.warning}20`,
                  fontSize: 12
                }}>
                  <span style={{ fontWeight: 500 }}>{o.label}</span>
                  <span style={{ color: T3.muted }}>{o.cost}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div style={{ padding: '16px 28px 32px' }}>
          <div style={{ fontSize: 11, letterSpacing: '0.14em', color: T3.muted, fontWeight: 600 }}>时间轴</div>
          {D3.itinerary.map((s, i) => (
            <div key={s.id} style={{
              display: 'flex', alignItems: 'flex-start', gap: 14, padding: '14px 0',
              borderBottom: i < D3.itinerary.length - 1 ? `1px solid ${T3.lineSoft}` : 'none'
            }}>
              <div style={{
                fontFamily: FM3, fontSize: 14, fontWeight: 600,
                color: s.atRisk ? T3.warning : T3.ink,
                minWidth: 54
              }}>{s.time}</div>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 15, fontWeight: 500, display: 'flex', alignItems: 'center', gap: 8 }}>
                  {s.name}
                  {s.atRisk && <Badge kind="biz">天气敏感</Badge>}
                </div>
                <div style={{ fontSize: 12, color: T3.muted, marginTop: 4 }}>
                  {s.dur} · {s.type === 'outdoor' ? '户外步行' : s.type === 'indoor' ? '室内文化' : s.type === 'meal' ? '本帮菜' : '咖啡休息'}
                </div>
              </div>
            </div>
          ))}
        </div>
      </PhoneScroll>
    </div>
  );
}

Object.assign(window.SCREENS.compact, {
  plans: PlansCompact, map: MapCompact
});
Object.assign(window.SCREENS.narrative, {
  plans: PlansNarrative, map: MapNarrative
});
