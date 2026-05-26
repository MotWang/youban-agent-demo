// Screens 5 (EVENT), 6 (CHOICES), 7 (CULTURE) — both variants

const { useState, useEffect, useMemo, useRef } = React;
const D4 = window.YOUBAN_DATA;
const { T: T4, FONT_SANS: FS4, FONT_MONO: FM4 } = window.__YouBan;
const { PhoneScroll, PhoneStatus, AppBar, Chip, Badge } = window;

// ═════════════════════════════════════════════════════════════
// Screen 5: EVENT (dynamic feedback trigger)
// ═════════════════════════════════════════════════════════════

function EventCompact({ ctx }) {
  const ev = D4.events[ctx.eventKey];
  return (
    <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
      <PhoneStatus />
      <div style={{ position: 'relative', flex: 1, overflow: 'hidden' }}>
        {/* Dim the prior map */}
        <div style={{ position: 'absolute', inset: 0 }}>
          <MapCanvasMini dim />
        </div>
        <div style={{ position: 'absolute', inset: 0, background: '#0008' }}></div>

        {/* Notification card */}
        <div style={{
          position: 'absolute', top: 18, left: 12, right: 12,
          background: T4.paper, borderRadius: 14,
          boxShadow: '0 12px 32px rgba(0,0,0,0.18)',
          overflow: 'hidden'
        }}>
          <div style={{
            padding: '8px 14px', display: 'flex', alignItems: 'center', gap: 8,
            background: T4.accentSoft, borderBottom: `1px solid ${T4.accent}30`
          }}>
            <div style={{ width: 6, height: 6, borderRadius: '50%', background: T4.accent, animation: 'pulse 1.5s ease-in-out infinite' }}></div>
            <div style={{ fontSize: 10, letterSpacing: '0.14em', color: T4.accentInk, fontWeight: 700 }}>
              {ev.title.toUpperCase()}
            </div>
          </div>

          <div style={{ padding: '14px 16px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 16, fontWeight: 600, lineHeight: 1.4 }}>{ev.headline}</div>
                <div style={{ fontSize: 12, color: T4.muted, marginTop: 6, lineHeight: 1.6 }}>{ev.desc}</div>
              </div>
              <div style={{
                fontSize: 24, padding: '6px 10px', borderRadius: 8,
                background: ev.severity === 'critical' ? T4.dangerSoft : T4.warningSoft,
                color: ev.severity === 'critical' ? T4.danger : T4.warning,
                marginLeft: 8
              }}>{ev.icon}</div>
            </div>

            <div style={{
              marginTop: 12, padding: '8px 10px',
              background: T4.ground, borderRadius: 8,
              fontSize: 11, color: T4.muted,
              display: 'flex', flexDirection: 'column', gap: 4
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', gap: 8 }}>
                <span style={{ whiteSpace: 'nowrap' }}>检测时间</span>
                <span style={{ fontFamily: FM4, color: T4.ink, whiteSpace: 'nowrap' }}>14:42:11</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', gap: 8 }}>
                <span style={{ whiteSpace: 'nowrap' }}>严重程度</span>
                <span style={{ fontFamily: FM4, color: T4.ink, textTransform: 'uppercase', whiteSpace: 'nowrap' }}>{ev.severity}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', gap: 8 }}>
                <span style={{ whiteSpace: 'nowrap' }}>响应路径</span>
                <span style={{ fontFamily: FM4, color: T4.ink, whiteSpace: 'nowrap' }}>规则 → LLM 解释</span>
              </div>
            </div>

            <div style={{ marginTop: 14, display: 'flex', flexDirection: 'column', gap: 6 }}>
              <button style={{
                appearance: 'none', cursor: 'pointer', border: 'none',
                background: T4.ink, color: T4.paper,
                padding: '11px 14px', borderRadius: 9,
                fontFamily: FS4, fontSize: 13, fontWeight: 600,
                display: 'flex', justifyContent: 'space-between', alignItems: 'center'
              }}>
                查看替代方案 <span style={{ fontFamily: FM4 }}>→</span>
              </button>
              <div style={{ display: 'flex', gap: 6 }}>
                <SecBtn>保留原计划</SecBtn>
                <SecBtn>让我自己调整</SecBtn>
              </div>
            </div>

            <div style={{
              marginTop: 12, paddingTop: 10, borderTop: `1px solid ${T4.lineSoft}`,
              display: 'flex', alignItems: 'center', gap: 6,
              fontSize: 10.5, color: T4.muted
            }}>
              <Badge kind="match">P2 否决权</Badge>
              <span>Agent 不会替你决定，三个按钮总在。</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function SecBtn({ children }) {
  return (
    <button style={{
      appearance: 'none', cursor: 'pointer',
      border: `1px solid ${T4.line}`, background: T4.paper, color: T4.ink,
      padding: '9px 10px', borderRadius: 9,
      fontFamily: FS4, fontSize: 12, fontWeight: 500,
      flex: 1
    }}>{children}</button>
  );
}

function MapCanvasMini({ dim }) {
  return (
    <div style={{
      position: 'absolute', inset: 0,
      background: 'linear-gradient(180deg, #f2efe8 0%, #ece8df 100%)',
      filter: dim ? 'blur(2px)' : 'none'
    }}>
      <svg width="100%" height="100%" style={{ position: 'absolute', inset: 0, opacity: 0.4 }}>
        <defs>
          <pattern id="g2" width="40" height="40" patternUnits="userSpaceOnUse">
            <path d="M 40 0 L 0 0 0 40" fill="none" stroke={T4.line} strokeWidth="0.5"/>
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#g2)"/>
      </svg>
      {D4.itinerary.map((s, i) => (
        <div key={s.id} style={{
          position: 'absolute',
          left: `${s.loc.x * 100}%`, top: `${s.loc.y * 100}%`,
          transform: 'translate(-50%, -50%)',
          width: 10, height: 10, borderRadius: '50%',
          background: T4.paper, border: `2px solid ${s.atRisk ? T4.warning : T4.ink}`
        }}></div>
      ))}
    </div>
  );
}

function EventNarrative({ ctx }) {
  const ev = D4.events[ctx.eventKey];
  return (
    <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
      <PhoneStatus />
      <PhoneScroll>
        <div style={{ padding: '40px 28px 24px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <div style={{ width: 8, height: 8, borderRadius: '50%', background: T4.accent, animation: 'pulse 1.5s ease-in-out infinite' }}></div>
            <div style={{ fontSize: 11, letterSpacing: '0.2em', color: T4.accentInk, fontWeight: 700 }}>
              动态反馈层 · DYNAMIC FEEDBACK
            </div>
          </div>

          <div style={{ fontSize: 32, fontWeight: 500, lineHeight: 1.25, marginTop: 28, letterSpacing: '-0.02em' }}>
            {ev.headline}
          </div>

          <div style={{ fontSize: 14, color: T4.muted, marginTop: 14, lineHeight: 1.65 }}>
            {ev.desc}
          </div>
        </div>

        <div style={{ padding: '0 28px' }}>
          <FeedbackTrace ev={ev} />
        </div>

        <div style={{ padding: '24px 28px 32px' }}>
          <div style={{
            background: T4.ink, color: T4.paper,
            padding: '18px 20px', borderRadius: 14
          }}>
            <div style={{ fontSize: 11, letterSpacing: '0.18em', color: T4.mutedSoft, fontWeight: 600 }}>
              下一步 · 生成替代方案
            </div>
            <div style={{ fontSize: 15, marginTop: 8, lineHeight: 1.6 }}>
              规则引擎已锁定受影响节点，<br/>
              LLM 正在为你生成 3 个带"损失声明"的选项。
            </div>
            <div style={{
              marginTop: 14, display: 'flex', alignItems: 'center', gap: 8,
              fontSize: 11, color: T4.mutedSoft
            }}>
              <div style={{
                width: 12, height: 12, borderRadius: '50%',
                border: `2px solid #ffffff30`, borderTopColor: T4.accent,
                animation: 'spin .9s linear infinite'
              }}></div>
              <span style={{ fontFamily: FM4 }}>generating alternatives…</span>
            </div>
          </div>
        </div>
      </PhoneScroll>
    </div>
  );
}

function FeedbackTrace({ ev }) {
  const rows = [
    { t: 'Detect', d: ev.headline, status: 'done' },
    { t: 'Resolve affected steps', d: ev.desc, status: 'done' },
    { t: 'Query knowledge base', d: '同主题室内替代 · 5km 半径', status: 'done' },
    { t: 'Score & rank candidates', d: '加权评分 · 按当前画像', status: 'done' },
    { t: 'Generate explanation', d: '发生→影响→选项→损失→你决定', status: 'pending' }
  ];
  return (
    <div style={{
      background: T4.paper, borderRadius: 14, padding: '16px 18px',
      border: `1px solid ${T4.line}`
    }}>
      <div style={{ fontSize: 11, letterSpacing: '0.14em', color: T4.muted, fontWeight: 600 }}>
        EVENT LOOP · 事件循环
      </div>
      <div style={{ marginTop: 12, display: 'flex', flexDirection: 'column', gap: 10 }}>
        {rows.map((r, i) => (
          <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: 10 }}>
            <div style={{
              width: 14, height: 14, borderRadius: '50%',
              background: r.status === 'done' ? T4.accent : 'transparent',
              border: r.status === 'done' ? 'none' : `1.5px solid ${T4.muted}`,
              flexShrink: 0, marginTop: 2,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              color: T4.paper, fontSize: 9
            }}>{r.status === 'done' ? '✓' : ''}</div>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 13, fontWeight: 600, fontFamily: FM4, color: r.status === 'done' ? T4.ink : T4.muted }}>
                {r.t}
              </div>
              <div style={{ fontSize: 12, color: T4.muted, marginTop: 2 }}>{r.d}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ═════════════════════════════════════════════════════════════
// Screen 6: CHOICES (3 alternatives)
// ═════════════════════════════════════════════════════════════

function ChoicesCompact({ ctx }) {
  const ev = D4.events[ctx.eventKey];
  const alts = D4.alternatives[ctx.eventKey];

  return (
    <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
      <PhoneStatus />
      <AppBar
        title="3 个替代方案"
        sub={`由 ${ev.title.replace('动态反馈层：', '')} 触发`}
        right={<Badge kind="match">L6 · 动态反馈</Badge>}
      />
      <PhoneScroll pad={12}>
        <div style={{ padding: '12px 14px', display: 'flex', flexDirection: 'column', gap: 10 }}>
          {alts.map(alt => <AltCard key={alt.id} alt={alt} />)}
        </div>

        <div style={{ padding: '0 14px 14px' }}>
          <div style={{
            padding: '10px 12px', background: T4.panel, borderRadius: 8,
            fontSize: 11, color: T4.muted, lineHeight: 1.6
          }}>
            <strong style={{ color: T4.inkSoft }}>P2 · 否决权：</strong>
            选 A 后，地图、时间线、文化解释卡都会更新；选 B 或 C，Agent 闭嘴。任何变更都需要你点确认。
          </div>
        </div>
      </PhoneScroll>
    </div>
  );
}

function AltCard({ alt }) {
  return (
    <div style={{
      background: T4.paper, borderRadius: 12,
      border: `1.5px solid ${alt.recommended ? T4.ink : T4.line}`,
      padding: '12px 14px',
      boxShadow: alt.recommended ? `0 4px 16px ${T4.ink}10` : 'none',
      position: 'relative'
    }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
        <div style={{ flex: 1 }}>
          <div style={{ display: 'flex', alignItems: 'baseline', gap: 8 }}>
            <span style={{ fontFamily: FM4, fontSize: 16, fontWeight: 700, color: alt.recommended ? T4.accent : T4.muted }}>{alt.id}</span>
            <span style={{ fontSize: 14, fontWeight: 600 }}>{alt.title}</span>
            {alt.recommended && <Badge kind="match">推荐</Badge>}
          </div>
        </div>
      </div>

      <div style={{ marginTop: 10, display: 'flex', flexDirection: 'column', gap: 6 }}>
        <GainLossRow kind="gain" text={alt.gained} />
        <GainLossRow kind="loss" text={alt.lost} />
      </div>

      <div style={{
        marginTop: 10, paddingTop: 8, borderTop: `1px solid ${T4.lineSoft}`,
        display: 'flex', justifyContent: 'space-between', alignItems: 'center'
      }}>
        <span style={{ fontSize: 10.5, color: T4.muted }}>影响 · {alt.impact}</span>
        <button style={{
          appearance: 'none', cursor: 'pointer', border: 'none',
          background: alt.recommended ? T4.ink : 'transparent',
          color: alt.recommended ? T4.paper : T4.ink,
          border: alt.recommended ? 'none' : `1px solid ${T4.line}`,
          padding: '5px 12px', borderRadius: 6,
          fontFamily: FS4, fontSize: 11.5, fontWeight: 600
        }}>选这个</button>
      </div>
    </div>
  );
}

function GainLossRow({ kind, text }) {
  const isGain = kind === 'gain';
  return (
    <div style={{ display: 'flex', gap: 8, alignItems: 'flex-start' }}>
      <span style={{
        fontFamily: FM4, fontSize: 9, fontWeight: 700,
        padding: '2px 5px', borderRadius: 3,
        background: isGain ? T4.accentSoft : T4.dangerSoft,
        color: isGain ? T4.accentInk : T4.danger,
        marginTop: 1, flexShrink: 0
      }}>{isGain ? 'GAIN' : 'LOST'}</span>
      <span style={{ fontSize: 12, color: T4.inkSoft, lineHeight: 1.5 }}>{text}</span>
    </div>
  );
}

function ChoicesNarrative({ ctx }) {
  const ev = D4.events[ctx.eventKey];
  const alts = D4.alternatives[ctx.eventKey];
  const top = alts.find(a => a.recommended) || alts[0];
  const others = alts.filter(a => a !== top);

  return (
    <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
      <PhoneStatus />
      <PhoneScroll>
        <div style={{ padding: '22px 28px 16px' }}>
          <div style={{ fontSize: 11, letterSpacing: '0.18em', color: T4.muted, fontWeight: 600 }}>
            因为 {ev.title.replace('动态反馈层：检测到', '').replace('动态反馈层：', '')}
          </div>
          <div style={{ fontSize: 22, fontWeight: 500, marginTop: 6, letterSpacing: '-0.01em', lineHeight: 1.35 }}>
            我们想给你 3 个选择
          </div>
          <div style={{ fontSize: 12, color: T4.muted, marginTop: 8, lineHeight: 1.7 }}>
            每个都会告诉你 <strong style={{ color: T4.ink }}>得到了什么</strong>，也告诉你
            <strong style={{ color: T4.ink }}>失去了什么</strong>。你来决定。
          </div>
        </div>

        <div style={{ padding: '6px 24px 12px' }}>
          <AltHero alt={top} />
        </div>

        <div style={{ padding: '0 28px', display: 'flex', flexDirection: 'column', gap: 14 }}>
          <div style={{ fontSize: 11, letterSpacing: '0.14em', color: T4.muted, fontWeight: 600 }}>其他选项</div>
          {others.map(a => <AltRowNarr key={a.id} alt={a} />)}
        </div>

        <div style={{ padding: '20px 28px 28px' }}>
          <div style={{ fontSize: 12, color: T4.muted, lineHeight: 1.7 }}>
            <strong style={{ color: T4.ink }}>P2 否决权：</strong>
            Agent 越能自主行动，确认机制越重要。每一次替换都需要你显式点确认。
          </div>
        </div>
      </PhoneScroll>
    </div>
  );
}

function AltHero({ alt }) {
  return (
    <div style={{
      background: T4.paper, borderRadius: 18,
      border: `1.5px solid ${T4.ink}`,
      padding: '20px 22px',
      boxShadow: `0 8px 24px ${T4.ink}0d`
    }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <span style={{ fontFamily: FM4, fontSize: 28, fontWeight: 700, color: T4.accent }}>{alt.id}</span>
            <Badge kind="match">推荐</Badge>
          </div>
          <div style={{ fontSize: 19, fontWeight: 600, marginTop: 6, lineHeight: 1.35, letterSpacing: '-0.005em' }}>{alt.title}</div>
        </div>
      </div>

      <div style={{ marginTop: 18, display: 'flex', flexDirection: 'column', gap: 12 }}>
        <div>
          <div style={{ fontSize: 10, letterSpacing: '0.16em', color: T4.accent, fontWeight: 700 }}>GAINED · 得到</div>
          <div style={{ fontSize: 14, color: T4.ink, marginTop: 4, lineHeight: 1.6 }}>{alt.gained}</div>
        </div>
        <div>
          <div style={{ fontSize: 10, letterSpacing: '0.16em', color: T4.danger, fontWeight: 700 }}>LOST · 失去</div>
          <div style={{ fontSize: 14, color: T4.ink, marginTop: 4, lineHeight: 1.6 }}>{alt.lost}</div>
        </div>
      </div>

      <div style={{
        marginTop: 18, paddingTop: 14, borderTop: `1px solid ${T4.lineSoft}`,
        display: 'flex', justifyContent: 'space-between', alignItems: 'center'
      }}>
        <span style={{ fontSize: 11, color: T4.muted }}>影响 · {alt.impact}</span>
        <button style={{
          appearance: 'none', cursor: 'pointer', border: 'none',
          background: T4.ink, color: T4.paper,
          padding: '9px 16px', borderRadius: 8,
          fontFamily: FS4, fontSize: 13, fontWeight: 600
        }}>选这个 →</button>
      </div>
    </div>
  );
}

function AltRowNarr({ alt }) {
  return (
    <div style={{
      padding: '14px 0', borderTop: `1px solid ${T4.lineSoft}`,
      display: 'flex', alignItems: 'flex-start', gap: 14
    }}>
      <span style={{ fontFamily: FM4, fontSize: 22, fontWeight: 700, color: T4.muted }}>{alt.id}</span>
      <div style={{ flex: 1 }}>
        <div style={{ fontSize: 14, fontWeight: 600 }}>{alt.title}</div>
        <div style={{ fontSize: 12, color: T4.muted, marginTop: 4, lineHeight: 1.6 }}>
          得到 {alt.gained.slice(0, 18)}… · 失去 {alt.lost.slice(0, 18)}…
        </div>
        <div style={{ fontSize: 11, color: T4.muted, marginTop: 4, fontFamily: FM4 }}>{alt.impact}</div>
      </div>
    </div>
  );
}

// ═════════════════════════════════════════════════════════════
// Screen 7: CULTURE (final card)
// ═════════════════════════════════════════════════════════════

function CultureCompact({ ctx }) {
  const c = D4.cultureCard;
  return (
    <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
      <PhoneStatus />
      <AppBar
        title="行程已更新"
        sub="武康路 → 上海博物馆东馆"
        right={<Badge kind="match">L3 知识层</Badge>}
      />
      <PhoneScroll>
        <UpdatedItinerary />
        <div style={{ padding: '6px 14px 14px' }}>
          <div style={{
            background: T4.paper, borderRadius: 14,
            border: `1px solid ${T4.line}`,
            overflow: 'hidden'
          }}>
            <div style={{
              padding: '14px 16px 12px',
              background: 'linear-gradient(180deg, #fbf9f4 0%, #ffffff 100%)',
              borderBottom: `1px solid ${T4.lineSoft}`
            }}>
              <div style={{ fontSize: 11, letterSpacing: '0.16em', color: T4.accent, fontWeight: 700 }}>
                到了之后 · NOW SHOWING
              </div>
              <div style={{ fontSize: 17, fontWeight: 600, marginTop: 6 }}>{c.title}</div>
              <div style={{ fontSize: 12, color: T4.muted, marginTop: 4 }}>{c.subtitle}</div>
            </div>

            <div style={{ padding: '4px 16px' }}>
              {c.items.map((it, i) => (
                <div key={it.n} style={{
                  padding: '12px 0',
                  borderBottom: i < c.items.length - 1 ? `1px solid ${T4.lineSoft}` : 'none',
                  display: 'flex', gap: 12, alignItems: 'flex-start'
                }}>
                  <span style={{
                    fontFamily: FM4, fontSize: 11, color: T4.accent,
                    fontWeight: 700, marginTop: 1, minWidth: 22
                  }}>{it.n}</span>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: 13.5, fontWeight: 600 }}>{it.head}</div>
                    <div style={{ fontSize: 12, color: T4.inkSoft, marginTop: 4, lineHeight: 1.65 }}>{it.body}</div>
                  </div>
                </div>
              ))}
            </div>

            <SourceFooter c={c} />
          </div>
        </div>
      </PhoneScroll>
    </div>
  );
}

function SourceFooter({ c }) {
  return (
    <div style={{
      padding: '10px 14px',
      background: T4.panel,
      borderTop: `1px solid ${T4.lineSoft}`,
      display: 'flex', justifyContent: 'space-between', alignItems: 'center'
    }}>
      <div style={{ fontSize: 10, color: T4.muted, lineHeight: 1.5 }}>
        来源 · {c.sources.join(' / ')}
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
        <span style={{ fontSize: 10, color: T4.muted }}>置信度</span>
        <span style={{ fontFamily: FM4, fontSize: 12, fontWeight: 600, color: T4.accent }}>{(c.confidence * 100).toFixed(0)}%</span>
      </div>
    </div>
  );
}

function UpdatedItinerary() {
  const updated = D4.itinerary.map(s =>
    s.atRisk
      ? { ...s, name: '上海博物馆东馆（替换）', dur: '120min', type: 'indoor', atRisk: false, swapped: true }
      : s
  );
  return (
    <div style={{ padding: '10px 14px' }}>
      <div style={{
        display: 'flex', alignItems: 'center', gap: 6,
        fontSize: 11, color: T4.muted, marginBottom: 8
      }}>
        <span style={{ width: 6, height: 6, borderRadius: '50%', background: T4.accent }}></span>
        <span>已替换 1 个节点 · 步行 2.1km → 1.2km</span>
      </div>
      <div style={{
        background: T4.paper, borderRadius: 10, border: `1px solid ${T4.line}`,
        padding: '4px 10px'
      }}>
        {updated.map((s, i) => (
          <div key={s.id} style={{
            display: 'flex', gap: 10, padding: '7px 0',
            borderBottom: i < updated.length - 1 ? `1px solid ${T4.lineSoft}` : 'none'
          }}>
            <span style={{ fontFamily: FM4, fontSize: 11, color: T4.muted, minWidth: 40 }}>{s.time}</span>
            <span style={{ fontSize: 12, flex: 1, fontWeight: s.swapped ? 600 : 400, color: s.swapped ? T4.accentInk : T4.ink }}>
              {s.name}
              {s.swapped && <span style={{ marginLeft: 6, fontSize: 9, padding: '1px 5px', borderRadius: 3, background: T4.accentSoft, color: T4.accentInk, fontWeight: 700 }}>NEW</span>}
            </span>
            <span style={{ fontSize: 11, color: T4.muted, fontFamily: FM4 }}>{s.dur}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function CultureNarrative({ ctx }) {
  const c = D4.cultureCard;
  return (
    <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
      <PhoneStatus />
      <PhoneScroll>
        <div style={{ padding: '36px 28px 16px' }}>
          <div style={{ fontSize: 11, letterSpacing: '0.2em', color: T4.accent, fontWeight: 700 }}>
            现在你站在
          </div>
          <div style={{
            fontSize: 30, fontWeight: 500, marginTop: 10,
            letterSpacing: '-0.02em', lineHeight: 1.25,
            fontFamily: '"Noto Serif SC", ' + FS4
          }}>{c.title}</div>
          <div style={{ fontSize: 14, color: T4.muted, marginTop: 12, lineHeight: 1.7 }}>
            {c.subtitle}。<br/>
            不是百科——是<strong style={{ color: T4.ink }}>三件值得专门看的事</strong>。
          </div>
        </div>

        <div style={{ padding: '0 28px', display: 'flex', flexDirection: 'column', gap: 22 }}>
          {c.items.map((it, i) => (
            <div key={it.n} style={{ display: 'flex', gap: 18, alignItems: 'flex-start' }}>
              <div style={{
                fontFamily: FM4, fontSize: 32, fontWeight: 300,
                color: T4.accent, lineHeight: 1, minWidth: 42,
                letterSpacing: '-0.02em'
              }}>{it.n}</div>
              <div style={{ flex: 1, paddingTop: 4 }}>
                <div style={{ fontSize: 16, fontWeight: 600, lineHeight: 1.4 }}>{it.head}</div>
                <div style={{ fontSize: 13.5, color: T4.inkSoft, marginTop: 8, lineHeight: 1.75 }}>{it.body}</div>
              </div>
            </div>
          ))}
        </div>

        <div style={{ padding: '24px 28px 28px' }}>
          <div style={{
            padding: '14px 16px',
            background: T4.panel, borderRadius: 12,
            border: `1px solid ${T4.line}`,
            display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 12
          }}>
            <div style={{ fontSize: 11, color: T4.muted, lineHeight: 1.55, flex: 1 }}>
              来源 · {c.sources.join(' / ')}
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 6, flexShrink: 0 }}>
              <span style={{ fontSize: 10, color: T4.muted }}>置信度</span>
              <span style={{ fontFamily: FM4, fontSize: 14, fontWeight: 600, color: T4.accent }}>{(c.confidence * 100).toFixed(0)}%</span>
            </div>
          </div>

          <button style={{
            appearance: 'none', cursor: 'pointer', border: `1px solid ${T4.line}`,
            background: T4.paper, color: T4.ink, width: '100%',
            padding: '13px 16px', borderRadius: 12, marginTop: 10,
            fontFamily: FS4, fontSize: 13.5, fontWeight: 500,
            display: 'flex', justifyContent: 'space-between', alignItems: 'center'
          }}>
            <span>继续追问·想了解更多</span>
            <span style={{ fontFamily: FM4 }}>→</span>
          </button>
        </div>
      </PhoneScroll>
    </div>
  );
}

Object.assign(window.SCREENS.compact, {
  event: EventCompact, choices: ChoicesCompact, culture: CultureCompact
});
Object.assign(window.SCREENS.narrative, {
  event: EventNarrative, choices: ChoicesNarrative, culture: CultureNarrative
});
