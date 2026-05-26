// 游伴 OTA 实用风 · 7 屏

const D_ = window.YOUBAN_DATA;
const { C: c, FS: fs, FM: fm, NavBar, TabBar, Badge, Icn, StatusSpacer, PScroll } = window.OTA;
const { useState } = React;

// ═════════════════════════════════════════════════════════════
// S1 — Home / Search
// ═════════════════════════════════════════════════════════════

function HomeScreen({ ctx }) {
  return (
    <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
      <StatusSpacer />

      {/* Brand bar — search */}
      <div style={{
        padding: '8px 14px 14px',
        background: `linear-gradient(180deg, ${c.brand} 0%, ${c.brand} 60%, ${c.bg} 100%)`,
        position: 'relative'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 12 }}>
          <div style={{ fontSize: 18, fontWeight: 800, color: c.paper, letterSpacing: '-0.01em' }}>
            游伴<span style={{ opacity: 0.7, fontWeight: 500, marginLeft: 2 }}>YouBan</span>
          </div>
          <div style={{ flex: 1 }}></div>
          <div style={{ display: 'flex', gap: 6 }}>
            {['◐', '✉'].map((g, i) => (
              <div key={i} style={{
                width: 28, height: 28, borderRadius: '50%',
                background: '#ffffff20', color: c.paper,
                display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 13
              }}>{g}</div>
            ))}
          </div>
        </div>

        {/* Search */}
        <div style={{
          background: c.paper, borderRadius: 12, padding: '10px 12px',
          display: 'flex', alignItems: 'center', gap: 8,
          boxShadow: '0 4px 14px rgba(0,0,0,0.08)'
        }}>
          <div style={{
            width: 28, height: 28, borderRadius: 8, background: c.priceSoft, color: c.price,
            display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 13, flexShrink: 0
          }}>✦</div>
          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{ fontSize: 13, fontWeight: 500, color: c.ink, lineHeight: 1.3 }}>
              想在上海玩一天，轻松一点，有文化感
            </div>
            <div style={{ fontSize: 10, color: c.muted, marginTop: 2 }}>AI 行程规划 · 用一句话描述</div>
          </div>
          <button style={{
            appearance: 'none', border: 'none', cursor: 'pointer',
            background: c.price, color: c.paper, padding: '6px 11px', borderRadius: 8,
            fontFamily: fs, fontSize: 12, fontWeight: 700, whiteSpace: 'nowrap'
          }}>AI 规划</button>
        </div>

        {/* hot chips */}
        <div style={{ display: 'flex', gap: 6, marginTop: 10, flexWrap: 'nowrap', overflow: 'hidden' }}>
          {['带爸妈轻松游', '朋友打卡', '深度文化', '亲子游', '一个人'].map(t => (
            <div key={t} style={{
              padding: '4px 9px', borderRadius: 999,
              background: '#ffffff25', color: c.paper, fontSize: 11, fontWeight: 500,
              whiteSpace: 'nowrap', backdropFilter: 'blur(4px)'
            }}>{t}</div>
          ))}
        </div>
      </div>

      <PScroll>
        {/* Category icons row */}
        <div style={{ background: c.paper, margin: '0 10px', borderRadius: 12, padding: '14px 8px', boxShadow: '0 1px 3px rgba(0,0,0,0.03)' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: 4 }}>
            {[
              { i: '⌖', n: '景点', sub: '门票' },
              { i: '⌂', n: '酒店', sub: 'Hotel' },
              { i: '✈', n: '机票', sub: 'Flight' },
              { i: '⊞', n: '门票', sub: 'Ticket' },
              { i: '☕', n: '美食', sub: 'Food' }
            ].map(t => (
              <div key={t.n} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4 }}>
                <div style={{
                  width: 38, height: 38, borderRadius: 10,
                  background: c.brandSoft, color: c.brand,
                  display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 18, fontWeight: 600
                }}>{t.i}</div>
                <div style={{ fontSize: 11, fontWeight: 500 }}>{t.n}</div>
              </div>
            ))}
          </div>
        </div>

        {/* AI 入口 ribbon */}
        <div style={{ margin: '10px 10px 0' }}>
          <div style={{
            background: `linear-gradient(95deg, ${c.priceSoft} 0%, #fff 50%)`,
            borderRadius: 12, padding: '12px 14px', border: `1px solid ${c.price}30`,
            display: 'flex', alignItems: 'center', gap: 10
          }}>
            <div style={{
              width: 38, height: 38, borderRadius: 10,
              background: c.price, color: c.paper,
              display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 18, flexShrink: 0
            }}>✦</div>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ fontSize: 13.5, fontWeight: 700, color: c.ink, display: 'flex', alignItems: 'center', gap: 6 }}>
                AI 游伴帮你规划
                <Badge kind="solid" dense>NEW</Badge>
              </div>
              <div style={{ fontSize: 11, color: c.text2, marginTop: 2 }}>说一句话 · AI 拆成可执行行程</div>
            </div>
            <div style={{ fontSize: 14, color: c.price }}>›</div>
          </div>
        </div>

        {/* L1 extraction */}
        <div style={{ margin: '10px 10px 0', background: c.paper, borderRadius: 12, padding: '12px 14px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 8 }}>
            <Badge kind="brand" dense>L1 意图理解层</Badge>
            <span style={{ fontSize: 11, color: c.muted }}>提取到 3 个非标感受词</span>
          </div>
          <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
            {[
              { t: '轻松一点', m: '→ 体力优先' },
              { t: '有文化感', m: '→ 文化权重 ↑' },
              { t: '不要太网红', m: '→ 拥挤阈值 ↓' }
            ].map(p => (
              <div key={p.t} style={{
                padding: '5px 10px', background: c.bg, borderRadius: 6, fontSize: 11,
                whiteSpace: 'nowrap'
              }}>
                <span style={{ fontWeight: 600, color: c.ink }}>"{p.t}"</span>
                <span style={{ color: c.muted, marginLeft: 6 }}>{p.m}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom price/promo card to feel OTA-ish */}
        <div style={{ margin: '10px 10px 14px', background: c.paper, borderRadius: 12, padding: '12px 14px' }}>
          <div style={{ fontSize: 12, color: c.muted, fontWeight: 600, letterSpacing: '0.08em', marginBottom: 8 }}>热门城市</div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 }}>
            {[
              { n: '上海', sub: '外滩 · 豫园 · 武康路', p: '128' },
              { n: '苏州', sub: '园林 · 平江路 · 拙政园', p: '98' }
            ].map(city => (
              <div key={city.n} style={{
                position: 'relative', borderRadius: 10, overflow: 'hidden',
                background: c.bg2, height: 86, padding: 10
              }}>
                <div style={{ fontSize: 14, fontWeight: 700 }}>{city.n}</div>
                <div style={{ fontSize: 10, color: c.muted, marginTop: 2, lineHeight: 1.4 }}>{city.sub}</div>
                <div style={{ position: 'absolute', bottom: 8, left: 10, display: 'flex', alignItems: 'baseline', gap: 2 }}>
                  <span style={{ fontSize: 10, color: c.price, fontWeight: 700 }}>¥</span>
                  <span style={{ fontFamily: fm, fontSize: 18, fontWeight: 800, color: c.price, lineHeight: 1 }}>{city.p}</span>
                  <span style={{ fontSize: 10, color: c.muted, marginLeft: 2 }}>起</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </PScroll>

      <TabBar active="home" />
    </div>
  );
}

// ═════════════════════════════════════════════════════════════
// S2 — Wizard (clarify)
// ═════════════════════════════════════════════════════════════

const Q = [
  { q: '同行人是？', sub: '会决定体力剖面和节奏', opts: ['爸妈', '朋友', '伴侣', '一个人', '带孩子'], pick: '爸妈' },
  { q: '今天预算大约？', sub: '不含住宿，仅一天', opts: ['100 以内', '100–300', '300–600', '不太敏感'], pick: '100–300' },
  { q: '主要怎么走？', sub: '决定路线生成约束', opts: ['地铁优先', '地铁 + 打车', '全程打车', '尽量步行'], pick: '地铁 + 打车' }
];

function WizardScreen({ ctx }) {
  return (
    <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
      <StatusSpacer />
      <NavBar title="AI 行程规划" sub="补全 3 项约束 · L1 → L2" back right={<Badge kind="brand">3/3 已答</Badge>} />
      <PScroll>
        <div style={{ padding: '12px 12px 0' }}>
          {/* Step indicator */}
          <div style={{ display: 'flex', gap: 6, marginBottom: 14 }}>
            {[0,1,2].map(i => (
              <div key={i} style={{
                flex: 1, height: 4, borderRadius: 2,
                background: c.brand
              }}></div>
            ))}
          </div>

          {Q.map((q, i) => (
            <div key={i} style={{
              background: c.paper, borderRadius: 12, padding: '12px 14px', marginBottom: 10
            }}>
              <div style={{ display: 'flex', alignItems: 'baseline', gap: 8 }}>
                <span style={{ fontFamily: fm, fontSize: 11, color: c.brand, fontWeight: 700 }}>Q{i+1}</span>
                <span style={{ fontSize: 14, fontWeight: 600 }}>{q.q}</span>
              </div>
              <div style={{ fontSize: 11, color: c.muted, marginTop: 4 }}>{q.sub}</div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginTop: 10 }}>
                {q.opts.map(o => {
                  const a = o === q.pick;
                  return (
                    <div key={o} style={{
                      padding: '6px 11px', borderRadius: 6,
                      background: a ? c.brand : c.bg,
                      color: a ? c.paper : c.text,
                      border: a ? 'none' : `1px solid ${c.line}`,
                      fontSize: 12, fontWeight: a ? 600 : 500, whiteSpace: 'nowrap'
                    }}>{o}</div>
                  );
                })}
              </div>
            </div>
          ))}

          {/* L2 profile snapshot */}
          <div style={{
            background: c.ink, color: c.paper, borderRadius: 12,
            padding: '14px 16px', marginBottom: 14
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 10 }}>
              <Badge kind="warning" dense>L2 约束建模层</Badge>
              <span style={{ fontSize: 11, color: '#ffffffa0', marginLeft: 'auto' }}>用户画像已生成</span>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 }}>
              {[
                ['mode', 'relaxed_elder'],
                ['步行上限', '2.5 km/日'],
                ['同行人体力', '中老年 · 中'],
                ['预算', '¥100–300'],
                ['交通', '地铁 + 打车'],
                ['文化权重', '↑ 0.25'],
                ['拥挤阈值', '< 0.6'],
                ['节奏', '悠闲漫步']
              ].map(([k, v]) => (
                <div key={k} style={{
                  display: 'flex', justifyContent: 'space-between',
                  fontSize: 11, padding: '4px 0',
                  borderBottom: `1px solid #ffffff14`
                }}>
                  <span style={{ color: '#ffffff80' }}>{k}</span>
                  <span style={{ fontFamily: fm, fontWeight: 600, whiteSpace: 'nowrap' }}>{v}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </PScroll>

      {/* sticky CTA */}
      <div style={{ padding: '8px 12px 14px', borderTop: `1px solid ${c.line}`, background: c.paper, flexShrink: 0 }}>
        <button style={{
          width: '100%', appearance: 'none', border: 'none', cursor: 'pointer',
          background: c.price, color: c.paper, padding: '12px', borderRadius: 10,
          fontFamily: fs, fontSize: 14, fontWeight: 700,
          boxShadow: `0 4px 14px ${c.price}40`
        }}>开始为我推荐 ›</button>
      </div>
    </div>
  );
}

// ═════════════════════════════════════════════════════════════
// S3 — Plans (3 product-style cards)
// ═════════════════════════════════════════════════════════════

function PlansScreen({ ctx }) {
  const ranked = D_.plans
    .map(p => ({ ...p, live: p.score })) // simple: keep base
    .sort((a, b) => b.score - a.score);

  return (
    <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
      <StatusSpacer />
      <NavBar
        title="为你推荐 3 个行程"
        sub="按「轻松长辈」画像排序 · L4"
        back
        right={<div style={{ display: 'flex', gap: 6 }}>
          <div style={{ width: 26, height: 26, borderRadius: '50%', background: c.bg, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 12 }}>↻</div>
          <div style={{ width: 26, height: 26, borderRadius: '50%', background: c.bg, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 12 }}>♡</div>
        </div>}
      />

      {/* Filter strip */}
      <div style={{
        background: c.paper, padding: '8px 12px', display: 'flex', gap: 6,
        borderBottom: `1px solid ${c.line}`, overflowX: 'auto', flexShrink: 0
      }}>
        {['综合排序 ↓', '体力 ↑', '价格 ↑', '文化深度 ↑'].map((f, i) => (
          <div key={f} style={{
            padding: '4px 10px', borderRadius: 999,
            background: i === 0 ? c.ink : c.bg,
            color: i === 0 ? c.paper : c.text2,
            fontSize: 11, fontWeight: 500, whiteSpace: 'nowrap'
          }}>{f}</div>
        ))}
      </div>

      <PScroll>
        <div style={{ padding: '10px 10px 14px' }}>
          {ranked.map((p, i) => <PlanCard key={p.id} p={p} top={i === 0} idx={i + 1} />)}
        </div>
      </PScroll>
    </div>
  );
}

function PlanCard({ p, top, idx }) {
  return (
    <div style={{
      background: c.paper, borderRadius: 12, marginBottom: 10,
      overflow: 'hidden', position: 'relative',
      border: top ? `1.5px solid ${c.price}` : `1px solid ${c.line}`,
      boxShadow: top ? `0 4px 14px ${c.price}25` : '0 1px 3px rgba(0,0,0,0.03)'
    }}>
      {top && (
        <div style={{
          position: 'absolute', top: 0, right: 0,
          background: c.price, color: c.paper,
          padding: '3px 10px 4px 14px', fontSize: 10, fontWeight: 700,
          clipPath: 'polygon(8px 0, 100% 0, 100% 100%, 0 100%)'
        }}>AI 推荐 · #1</div>
      )}

      <div style={{ padding: '14px 14px 0' }}>
        <div style={{ display: 'flex', alignItems: 'baseline', gap: 8 }}>
          <span style={{ fontSize: 16, fontWeight: 700, letterSpacing: '-0.005em' }}>{p.title}</span>
          {!top && <span style={{ fontFamily: fm, fontSize: 10, color: c.muted }}>#{idx}</span>}
        </div>
        <div style={{ fontSize: 11, color: c.muted, marginTop: 4, lineHeight: 1.4 }}>
          {p.stops.join(' · ')}
        </div>
      </div>

      {/* Stats row — OTA-style big numbers */}
      <div style={{
        margin: '12px 14px 0', padding: '10px 0',
        borderTop: `1px solid ${c.lineSoft}`, borderBottom: `1px solid ${c.lineSoft}`,
        display: 'flex', gap: 0
      }}>
        {[
          { I: Icn.time, v: p.duration, l: '时长' },
          { I: Icn.walk, v: p.walk, l: '步行' },
          { I: Icn.yuan, v: p.cost.replace('￥', ''), l: '预算' },
          { I: Icn.star, v: p.score.toFixed(2), l: '匹配' }
        ].map((s, i) => (
          <div key={i} style={{
            flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2,
            borderLeft: i === 0 ? 'none' : `1px solid ${c.lineSoft}`
          }}>
            <div style={{ color: c.muted }}>{s.I}</div>
            <div style={{ fontFamily: fm, fontSize: 14, fontWeight: 800, color: c.ink, lineHeight: 1 }}>{s.v}</div>
            <div style={{ fontSize: 9.5, color: c.muted }}>{s.l}</div>
          </div>
        ))}
      </div>

      {/* Reasons */}
      <div style={{ padding: '10px 14px 0' }}>
        {p.reasons.slice(0, 2).map((r, i) => (
          <div key={i} style={{
            display: 'flex', gap: 6, alignItems: 'flex-start',
            fontSize: 11.5, marginTop: i === 0 ? 0 : 6, lineHeight: 1.5
          }}>
            <Badge dense kind={r.kind === 'match' ? 'success' : r.kind === 'biz' ? 'gold' : 'neutral'}>
              {r.kind === 'match' ? '偏好匹配' : r.kind === 'biz' ? '商业合作' : '客观约束'}
            </Badge>
            <span style={{ color: c.text }}>{r.text}</span>
          </div>
        ))}
      </div>

      {/* CTA row */}
      <div style={{
        padding: '12px 14px', display: 'flex', alignItems: 'center', gap: 8
      }}>
        <div style={{ flex: 1, display: 'flex', alignItems: 'baseline', gap: 4 }}>
          {p.recommended ? <Badge kind="price" dense>无需预付</Badge> : <span style={{ fontSize: 11, color: c.muted }}>含 1 个商业合作节点</span>}
        </div>
        <button style={{
          appearance: 'none', border: 'none', cursor: 'pointer',
          background: top ? c.price : c.paper,
          color: top ? c.paper : c.ink,
          border: top ? 'none' : `1px solid ${c.ink}`,
          padding: '7px 16px', borderRadius: 999,
          fontFamily: fs, fontSize: 12, fontWeight: 700, whiteSpace: 'nowrap'
        }}>选这个 →</button>
      </div>
    </div>
  );
}

// ═════════════════════════════════════════════════════════════
// S4 — Trip (today's itinerary)
// ═════════════════════════════════════════════════════════════

function TripScreen({ ctx }) {
  return (
    <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
      <StatusSpacer />
      <NavBar
        title="今日行程 · 轻松长辈线"
        sub="5 站 · 6.5 小时 · 步行 2.1 km"
        back
        right={<div style={{ display: 'flex', gap: 6 }}>
          <Badge kind="success" dense>已执行</Badge>
        </div>}
      />

      <PScroll>
        {/* Schematic map */}
        <div style={{ height: 168, position: 'relative', overflow: 'hidden', margin: '10px 10px 0', borderRadius: 12 }}>
          <TripMap />
        </div>

        {/* Conflict card — OTA banner style */}
        <div style={{ margin: '10px 10px 0' }}>
          <div style={{
            background: c.paper, borderRadius: 12, padding: '12px 14px',
            borderLeft: `3px solid ${c.warning}`
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
              <Badge kind="warning" dense>L4 多人协商</Badge>
              <span style={{ fontSize: 13, fontWeight: 700 }}>识别到偏好冲突</span>
              <span style={{ marginLeft: 'auto', fontSize: 11, color: c.muted }}>3 折中方向</span>
            </div>
            <div style={{ fontSize: 12, color: c.text, marginTop: 6, lineHeight: 1.55 }}>
              你想保留 <strong>武康路 Citywalk</strong>（步行 90 分钟），但爸妈体力剖面显示下午步行负担偏高。
            </div>
            <div style={{ marginTop: 10, display: 'flex', flexDirection: 'column', gap: 4 }}>
              {D_.conflict.options.map((o, i) => (
                <div key={i} style={{
                  display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                  padding: '7px 10px', background: c.bg, borderRadius: 6, fontSize: 11
                }}>
                  <span style={{ fontWeight: 500 }}>{o.label}</span>
                  <span style={{ color: c.muted, fontFamily: fm }}>{o.cost}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Itinerary list — OTA itinerary style */}
        <div style={{ margin: '10px 10px 14px' }}>
          <div style={{ background: c.paper, borderRadius: 12, padding: '4px 14px 10px' }}>
            <div style={{ fontSize: 11, color: c.muted, fontWeight: 600, letterSpacing: '0.08em', padding: '10px 0 6px' }}>
              TIMELINE · 今天 · 9 月 21 日
            </div>
            {D_.itinerary.map((s, i) => <TimelineRow key={s.id} s={s} last={i === D_.itinerary.length - 1} />)}
          </div>
        </div>
      </PScroll>
    </div>
  );
}

function TripMap() {
  return (
    <div style={{
      position: 'absolute', inset: 0,
      background: 'linear-gradient(180deg, #e8edf2 0%, #dde3ea 100%)'
    }}>
      <svg width="100%" height="100%" style={{ position: 'absolute', inset: 0, opacity: 0.5 }}>
        <defs>
          <pattern id="otag" width="40" height="40" patternUnits="userSpaceOnUse">
            <path d="M40 0 L0 0 0 40" fill="none" stroke={c.line} strokeWidth="0.5"/>
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#otag)"/>
        <path d="M 360 -10 Q 280 100 240 220 T 200 600" stroke="#a7c3d8" strokeWidth="34" fill="none" opacity="0.5"/>
        {D_.itinerary.map((s, i) => {
          if (i === 0) return null;
          const prev = D_.itinerary[i - 1];
          return (
            <line key={s.id}
              x1={prev.loc.x * 372} y1={prev.loc.y * 168}
              x2={s.loc.x * 372} y2={s.loc.y * 168}
              stroke={s.atRisk ? c.warning : c.brand} strokeWidth={1.8}
              strokeDasharray={s.atRisk ? '4 4' : '0'} opacity="0.85"
            />
          );
        })}
      </svg>
      {D_.itinerary.map((s, i) => (
        <div key={s.id} style={{
          position: 'absolute', left: `${s.loc.x * 100}%`, top: `${s.loc.y * 100}%`,
          transform: 'translate(-50%, -100%)',
          display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2
        }}>
          <div style={{
            background: s.atRisk ? c.warning : c.brand, color: c.paper,
            padding: '2px 6px', borderRadius: 4,
            fontFamily: fm, fontSize: 9, fontWeight: 700, whiteSpace: 'nowrap'
          }}>{i + 1} · {s.name}</div>
          <div style={{
            width: 10, height: 10, borderRadius: '50%', background: c.paper,
            border: `2px solid ${s.atRisk ? c.warning : c.brand}`
          }}></div>
        </div>
      ))}
      <div style={{
        position: 'absolute', top: 8, right: 8,
        padding: '3px 8px', background: '#ffffffd0', borderRadius: 6,
        fontSize: 10, color: c.muted, fontFamily: fm, whiteSpace: 'nowrap'
      }}>上海 · 黄浦/徐汇</div>
    </div>
  );
}

function TimelineRow({ s, last }) {
  const icon = { outdoor: '⛰', indoor: '⌂', meal: '☕', cafe: '☕' }[s.type] || '·';
  return (
    <div style={{ display: 'flex', gap: 12, padding: '10px 0', borderTop: `1px solid ${c.lineSoft}` }}>
      <div style={{
        fontFamily: fm, fontSize: 13, fontWeight: 700,
        color: s.atRisk ? c.warning : c.ink, minWidth: 44
      }}>{s.time}</div>
      <div style={{
        width: 28, height: 28, borderRadius: 8,
        background: s.atRisk ? c.warningSoft : c.brandSoft,
        color: s.atRisk ? c.warning : c.brand,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        fontSize: 14, fontWeight: 600, flexShrink: 0
      }}>{icon}</div>
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
          <span style={{ fontSize: 13.5, fontWeight: 600 }}>{s.name}</span>
          {s.atRisk && <Badge kind="warning" dense>天气敏感</Badge>}
        </div>
        <div style={{ fontSize: 11, color: c.muted, marginTop: 3, display: 'flex', gap: 8 }}>
          <span>{s.dur}</span>
          <span>·</span>
          <span>{s.type === 'outdoor' ? '户外' : s.type === 'indoor' ? '室内' : s.type === 'meal' ? '用餐' : '休息'}</span>
        </div>
      </div>
    </div>
  );
}

// ═════════════════════════════════════════════════════════════
// S5 — Alert (event popup)
// ═════════════════════════════════════════════════════════════

function AlertScreen({ ctx }) {
  const ev = D_.events[ctx.eventKey];
  return (
    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', position: 'relative' }}>
      <StatusSpacer />
      <NavBar title="今日行程 · 轻松长辈线" sub="5 站 · 步行 2.1 km" back right={<Badge kind="success" dense>已执行</Badge>} />

      {/* Behind: trip map */}
      <div style={{ flex: 1, position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', inset: 0 }}>
          <TripMap />
        </div>
        {/* dim overlay */}
        <div style={{ position: 'absolute', inset: 0, background: '#0a0e1480' }}></div>

        {/* Sheet */}
        <div style={{
          position: 'absolute', top: 10, left: 10, right: 10,
          background: c.paper, borderRadius: 14,
          boxShadow: '0 12px 32px rgba(0,0,0,0.25)', overflow: 'hidden'
        }}>
          {/* Header strip */}
          <div style={{
            background: ev.severity === 'critical' ? c.priceDeep : c.warning,
            color: c.paper, padding: '8px 14px',
            display: 'flex', alignItems: 'center', gap: 8
          }}>
            <span style={{ display: 'inline-flex' }}>{Icn.rain}</span>
            <span style={{ fontSize: 11, letterSpacing: '0.14em', fontWeight: 700 }}>
              AI 智能调整 · L6 动态反馈层
            </span>
            <span style={{ marginLeft: 'auto', fontSize: 10, fontFamily: fm, opacity: 0.9 }}>14:42</span>
          </div>

          <div style={{ padding: '14px 16px' }}>
            <div style={{ fontSize: 17, fontWeight: 700, lineHeight: 1.35 }}>{ev.headline}</div>
            <div style={{ fontSize: 12, color: c.text2, marginTop: 6, lineHeight: 1.6 }}>{ev.desc}</div>

            <div style={{
              marginTop: 12, padding: '8px 12px',
              background: c.bg, borderRadius: 8,
              display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 6, fontSize: 11
            }}>
              <Row k="检测时间" v="14:42:11" />
              <Row k="严重程度" v={ev.severity.toUpperCase()} />
              <Row k="响应路径" v="规则 → LLM" />
              <Row k="预计耗时" v="~2 秒" />
            </div>

            <div style={{ marginTop: 12, display: 'flex', flexDirection: 'column', gap: 6 }}>
              <button style={{
                appearance: 'none', border: 'none', cursor: 'pointer',
                background: c.price, color: c.paper,
                padding: '11px 14px', borderRadius: 9,
                fontFamily: fs, fontSize: 13, fontWeight: 700,
                display: 'flex', justifyContent: 'space-between', alignItems: 'center'
              }}>
                查看 3 个替代方案 <span style={{ fontFamily: fm }}>→</span>
              </button>
              <div style={{ display: 'flex', gap: 6 }}>
                <Secondary>保留原计划</Secondary>
                <Secondary>让我自己调整</Secondary>
              </div>
            </div>

            <div style={{
              marginTop: 12, paddingTop: 10, borderTop: `1px solid ${c.lineSoft}`,
              display: 'flex', alignItems: 'center', gap: 6, fontSize: 10.5, color: c.muted
            }}>
              <Badge kind="brand" dense>P2 否决权</Badge>
              <span>Agent 不替你决定，三个按钮总在。</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function Row({ k, v }) {
  return (
    <div style={{ display: 'flex', justifyContent: 'space-between', gap: 6 }}>
      <span style={{ color: c.muted, whiteSpace: 'nowrap' }}>{k}</span>
      <span style={{ fontFamily: fm, color: c.ink, fontWeight: 600, whiteSpace: 'nowrap' }}>{v}</span>
    </div>
  );
}

function Secondary({ children }) {
  return <button style={{
    appearance: 'none', cursor: 'pointer',
    border: `1px solid ${c.line}`, background: c.paper, color: c.text,
    padding: '9px 10px', borderRadius: 9, flex: 1,
    fontFamily: fs, fontSize: 12, fontWeight: 500
  }}>{children}</button>;
}

// ═════════════════════════════════════════════════════════════
// S6 — Replan (alternatives)
// ═════════════════════════════════════════════════════════════

function ReplanScreen({ ctx }) {
  const ev = D_.events[ctx.eventKey];
  const alts = D_.alternatives[ctx.eventKey];
  return (
    <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
      <StatusSpacer />
      <NavBar
        title="3 个调整方案"
        sub={`由 ${ev.title.replace('动态反馈层：', '')} 触发`}
        back
        right={<Badge kind="brand">L6 · 动态反馈</Badge>}
      />
      <PScroll>
        <div style={{ padding: '10px 10px 14px', display: 'flex', flexDirection: 'column', gap: 10 }}>
          {alts.map(a => <AltCard key={a.id} alt={a} />)}

          <div style={{
            padding: '12px 14px', background: c.paper, borderRadius: 12,
            fontSize: 11, color: c.muted, lineHeight: 1.65
          }}>
            <strong style={{ color: c.text }}>设计原则 P2：</strong>
            选 A 后地图/时间线/文化卡都会更新；选 B 或 C，Agent 闭嘴。任何变更需你点确认。
          </div>
        </div>
      </PScroll>
    </div>
  );
}

function AltCard({ alt }) {
  return (
    <div style={{
      background: c.paper, borderRadius: 12,
      border: alt.recommended ? `1.5px solid ${c.price}` : `1px solid ${c.line}`,
      overflow: 'hidden', position: 'relative',
      boxShadow: alt.recommended ? `0 4px 14px ${c.price}25` : '0 1px 3px rgba(0,0,0,0.03)'
    }}>
      {alt.recommended && (
        <div style={{
          position: 'absolute', top: 0, right: 0,
          background: c.price, color: c.paper,
          padding: '3px 10px 4px 14px', fontSize: 10, fontWeight: 700,
          clipPath: 'polygon(8px 0, 100% 0, 100% 100%, 0 100%)'
        }}>AI 推荐</div>
      )}
      <div style={{ padding: '14px 14px 0' }}>
        <div style={{ display: 'flex', alignItems: 'baseline', gap: 8 }}>
          <span style={{
            fontFamily: fm, fontSize: 20, fontWeight: 800,
            color: alt.recommended ? c.price : c.muted, lineHeight: 1
          }}>{alt.id}</span>
          <span style={{ fontSize: 14, fontWeight: 600, lineHeight: 1.4 }}>{alt.title}</span>
        </div>
      </div>

      <div style={{ padding: '10px 14px 0' }}>
        <GainLoss kind="gain" t={alt.gained} />
        <GainLoss kind="loss" t={alt.lost} />
      </div>

      <div style={{
        padding: '10px 14px 12px', marginTop: 8,
        borderTop: `1px solid ${c.lineSoft}`,
        display: 'flex', alignItems: 'center', gap: 8
      }}>
        <span style={{ fontSize: 11, color: c.muted, flex: 1 }}>影响 · {alt.impact}</span>
        <button style={{
          appearance: 'none', border: 'none', cursor: 'pointer',
          background: alt.recommended ? c.price : c.paper,
          color: alt.recommended ? c.paper : c.ink,
          border: alt.recommended ? 'none' : `1px solid ${c.ink}`,
          padding: '7px 16px', borderRadius: 999,
          fontFamily: fs, fontSize: 12, fontWeight: 700, whiteSpace: 'nowrap'
        }}>选这个 →</button>
      </div>
    </div>
  );
}

function GainLoss({ kind, t }) {
  const g = kind === 'gain';
  return (
    <div style={{ display: 'flex', gap: 8, alignItems: 'flex-start', marginTop: g ? 0 : 6 }}>
      <span style={{
        fontFamily: fm, fontSize: 9, fontWeight: 800,
        padding: '2px 5px', borderRadius: 3,
        background: g ? c.successSoft : c.priceSoft,
        color: g ? c.success : c.priceDeep,
        marginTop: 1, flexShrink: 0
      }}>{g ? 'GAIN' : 'LOST'}</span>
      <span style={{ fontSize: 12, color: c.text, lineHeight: 1.5 }}>{t}</span>
    </div>
  );
}

// ═════════════════════════════════════════════════════════════
// S7 — Detail (cultural three-things)
// ═════════════════════════════════════════════════════════════

function DetailScreen({ ctx }) {
  const k = D_.cultureCard;
  return (
    <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
      <StatusSpacer />
      <NavBar title="上海博物馆 东馆" sub="行程已更新 · 第 4 站替换" back right={
        <div style={{ display: 'flex', gap: 6 }}>
          <div style={{ width: 26, height: 26, borderRadius: '50%', background: c.bg, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 12 }}>♡</div>
          <div style={{ width: 26, height: 26, borderRadius: '50%', background: c.bg, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 12 }}>↗</div>
        </div>
      } />

      <PScroll>
        {/* Hero strip */}
        <div style={{
          margin: '10px 10px 0', height: 130, borderRadius: 12,
          background: `linear-gradient(135deg, ${c.brand} 0%, #4a7faa 100%)`,
          position: 'relative', overflow: 'hidden',
          display: 'flex', alignItems: 'flex-end', padding: 12
        }}>
          {/* Pattern */}
          <svg width="100%" height="100%" style={{ position: 'absolute', inset: 0, opacity: 0.15 }}>
            <defs>
              <pattern id="dt" width="20" height="20" patternUnits="userSpaceOnUse">
                <circle cx="10" cy="10" r="1" fill="#fff"/>
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#dt)"/>
          </svg>
          <div style={{ position: 'relative', color: c.paper }}>
            <Badge kind="solid" dense>NEW · 第 4 站替换</Badge>
            <div style={{ fontSize: 20, fontWeight: 800, marginTop: 8, letterSpacing: '-0.01em' }}>{k.title}</div>
            <div style={{ fontSize: 11, opacity: 0.85, marginTop: 2 }}>📍 浦东新区世纪大道 1952 号</div>
          </div>
        </div>

        {/* Score / facts */}
        <div style={{
          margin: '10px 10px 0', background: c.paper, borderRadius: 12,
          padding: '12px 14px', display: 'flex', alignItems: 'center', gap: 0
        }}>
          {[
            { v: '9.6', l: '匹配度', s: '/10' },
            { v: '免费', l: '票价', s: '需预约' },
            { v: '120', l: '建议时长', s: 'min' },
            { v: '室内', l: '类型', s: '不怕雨' }
          ].map((f, i) => (
            <div key={i} style={{
              flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center',
              borderLeft: i === 0 ? 'none' : `1px solid ${c.lineSoft}`
            }}>
              <div style={{ display: 'flex', alignItems: 'baseline', gap: 1 }}>
                <span style={{
                  fontFamily: fm, fontSize: 16, fontWeight: 800,
                  color: i === 0 ? c.price : c.ink
                }}>{f.v}</span>
                <span style={{ fontSize: 9, color: c.muted }}>{f.s}</span>
              </div>
              <div style={{ fontSize: 10, color: c.muted, marginTop: 2 }}>{f.l}</div>
            </div>
          ))}
        </div>

        {/* Three things */}
        <div style={{ margin: '10px 10px 0', background: c.paper, borderRadius: 12, overflow: 'hidden' }}>
          <div style={{
            padding: '12px 14px',
            borderBottom: `1px solid ${c.lineSoft}`,
            display: 'flex', alignItems: 'center', gap: 8
          }}>
            <Badge kind="brand" dense>L3 知识数据层</Badge>
            <span style={{ fontSize: 13, fontWeight: 700 }}>到了之后看这三件事</span>
          </div>
          {k.items.map((it, i) => (
            <div key={it.n} style={{
              padding: '12px 14px',
              borderTop: i === 0 ? 'none' : `1px solid ${c.lineSoft}`,
              display: 'flex', gap: 12, alignItems: 'flex-start'
            }}>
              <div style={{
                width: 26, height: 26, borderRadius: 6,
                background: c.brand, color: c.paper,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontFamily: fm, fontSize: 11, fontWeight: 800, flexShrink: 0
              }}>{it.n}</div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontSize: 13.5, fontWeight: 600, letterSpacing: '-0.005em' }}>{it.head}</div>
                <div style={{ fontSize: 12, color: c.text, marginTop: 4, lineHeight: 1.6 }}>{it.body}</div>
              </div>
            </div>
          ))}

          {/* Source footer */}
          <div style={{
            padding: '10px 14px', background: c.bg,
            display: 'flex', justifyContent: 'space-between', alignItems: 'center',
            borderTop: `1px solid ${c.lineSoft}`
          }}>
            <div style={{ fontSize: 10.5, color: c.muted, lineHeight: 1.5 }}>
              来源 · {k.sources.join(' / ')}
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
              <span style={{ fontSize: 10, color: c.muted }}>置信度</span>
              <span style={{ fontFamily: fm, fontSize: 13, fontWeight: 700, color: c.success }}>{(k.confidence*100).toFixed(0)}%</span>
            </div>
          </div>
        </div>

        <div style={{ margin: '10px 10px 14px' }}>
          <button style={{
            width: '100%', appearance: 'none', cursor: 'pointer',
            border: `1px solid ${c.line}`, background: c.paper, color: c.ink,
            padding: '12px', borderRadius: 12,
            fontFamily: fs, fontSize: 13.5, fontWeight: 600,
            display: 'flex', justifyContent: 'space-between', alignItems: 'center'
          }}>
            <span>继续追问 · 想了解更多</span>
            <span style={{ color: c.brand }}>›</span>
          </button>
        </div>
      </PScroll>

      {/* Sticky bottom CTA — OTA style */}
      <div style={{
        padding: '10px 12px 14px', background: c.paper,
        borderTop: `1px solid ${c.line}`, display: 'flex', alignItems: 'center', gap: 10
      }}>
        <div>
          <div style={{ fontSize: 10, color: c.muted }}>预约状态</div>
          <div style={{ display: 'flex', alignItems: 'baseline', gap: 4 }}>
            <span style={{ fontFamily: fm, fontSize: 16, fontWeight: 800, color: c.success }}>可约</span>
            <span style={{ fontSize: 11, color: c.muted }}>今天 11:00</span>
          </div>
        </div>
        <button style={{
          flex: 1, appearance: 'none', border: 'none', cursor: 'pointer',
          background: c.price, color: c.paper, padding: '12px', borderRadius: 10,
          fontFamily: fs, fontSize: 14, fontWeight: 700,
          boxShadow: `0 4px 14px ${c.price}40`
        }}>立即预约 · 免费 ›</button>
      </div>
    </div>
  );
}

// ═════════════════════════════════════════════════════════════
// Registry
// ═════════════════════════════════════════════════════════════

window.SCREENS = {
  home:    HomeScreen,
  wizard:  WizardScreen,
  plans:   PlansScreen,
  trip:    TripScreen,
  alert:   AlertScreen,
  replan:  ReplanScreen,
  detail:  DetailScreen
};
