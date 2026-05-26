// 游伴 Agent Demo — Screens
// Two variants (compact / narrative) of the same 7-step flow.

const { useState, useEffect, useMemo, useRef } = React;
const D2 = window.YOUBAN_DATA;
const { T: TT, FONT_SANS: FS, FONT_MONO: FM, dotWeighted, scoresArray } = window.__YouBan;

// ═════════════════════════════════════════════════════════════
// Shared atoms
// ═════════════════════════════════════════════════════════════

function PhoneScroll({ children, pad = 0, bg }) {
  return (
    <div style={{
      flex: 1, overflowY: 'auto', overflowX: 'hidden',
      WebkitOverflowScrolling: 'touch',
      background: bg || 'transparent',
      paddingBottom: pad
    }}>{children}</div>
  );
}

function PhoneStatus({ time = '9:41', accent = '#000' }) {
  // IOSDevice already renders its own status bar + dynamic island absolutely on top.
  // We just reserve vertical space so our content doesn't slide under them.
  return <div style={{ height: 54, flexShrink: 0 }}></div>;
}

function AppBar({ title, sub, right, dense, variant = 'compact' }) {
  return (
    <div style={{
      padding: variant === 'narrative' ? '12px 24px 14px' : '10px 20px 12px',
      display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      borderBottom: `1px solid ${TT.lineSoft}`,
      flexShrink: 0
    }}>
      <div>
        <div style={{ fontSize: variant === 'narrative' ? 17 : 15, fontWeight: 600, letterSpacing: '-0.005em' }}>{title}</div>
        {sub && <div style={{ fontSize: 11, color: TT.muted, marginTop: 2 }}>{sub}</div>}
      </div>
      {right}
    </div>
  );
}

function Chip({ children, onClick, active, color = TT.ink, soft = TT.ground }) {
  return (
    <button onClick={onClick} style={{
      appearance: 'none', cursor: 'pointer',
      border: `1px solid ${active ? color : TT.line}`,
      background: active ? color : TT.paper,
      color: active ? TT.paper : TT.ink,
      padding: '6px 11px', borderRadius: 999,
      fontFamily: FS, fontSize: 12, fontWeight: 500,
      whiteSpace: 'nowrap', flexShrink: 0
    }}>{children}</button>
  );
}

function Badge({ children, kind = 'neutral' }) {
  const map = {
    neutral: { bg: TT.ground, fg: TT.inkSoft, br: TT.line },
    match:   { bg: TT.accentSoft, fg: TT.accentInk, br: TT.accent + '40' },
    biz:     { bg: TT.warningSoft, fg: TT.warning, br: TT.warning + '40' },
    risk:    { bg: TT.dangerSoft, fg: TT.danger, br: TT.danger + '40' }
  };
  const c = map[kind] || map.neutral;
  return (
    <span style={{
      fontSize: 10, padding: '2px 7px', borderRadius: 4,
      background: c.bg, color: c.fg, border: `1px solid ${c.br}`,
      fontWeight: 600, whiteSpace: 'nowrap'
    }}>{children}</span>
  );
}

function BotAvatar({ size = 28 }) {
  return (
    <div style={{
      width: size, height: size, borderRadius: '50%',
      background: TT.accent, color: TT.paper,
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      fontFamily: FM, fontSize: size * 0.36, fontWeight: 700,
      flexShrink: 0
    }}>游</div>
  );
}

function Bubble({ children, side = 'bot', sub, dense, narrative }) {
  const isBot = side === 'bot';
  return (
    <div style={{ display: 'flex', justifyContent: isBot ? 'flex-start' : 'flex-end', gap: 8, alignItems: 'flex-start' }}>
      {isBot && <BotAvatar />}
      <div style={{ maxWidth: narrative ? 280 : 240 }}>
        <div style={{
          padding: dense ? '8px 12px' : '10px 14px',
          borderRadius: 14,
          borderTopLeftRadius: isBot ? 4 : 14,
          borderTopRightRadius: isBot ? 14 : 4,
          background: isBot ? TT.paper : TT.ink,
          color: isBot ? TT.ink : TT.paper,
          border: isBot ? `1px solid ${TT.line}` : 'none',
          fontSize: narrative ? 14 : 13, lineHeight: 1.55
        }}>{children}</div>
        {sub && <div style={{ fontSize: 10, color: TT.muted, marginTop: 4, marginLeft: isBot ? 4 : 0, textAlign: isBot ? 'left' : 'right' }}>{sub}</div>}
      </div>
    </div>
  );
}

// ═════════════════════════════════════════════════════════════
// Screen 1: INPUT
// ═════════════════════════════════════════════════════════════
const userInput = '想在上海玩一天，轻松一点，有文化感，不要太网红';

function InputCompact({ ctx }) {
  return (
    <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
      <PhoneStatus />
      <AppBar title="游伴 Agent" sub="今天去哪里？" right={<DotMenu/>} />
      <PhoneScroll>
        <div style={{ padding: '24px 20px 16px' }}>
          <div style={{ fontSize: 11, letterSpacing: '0.16em', color: TT.muted, fontWeight: 600 }}>NEW TRIP</div>
          <div style={{ fontSize: 22, fontWeight: 600, lineHeight: 1.35, marginTop: 6 }}>
            告诉我你的旅行想法<br/>
            <span style={{ color: TT.muted, fontWeight: 400 }}>越随意越好</span>
          </div>
        </div>

        <div style={{ padding: '0 16px' }}>
          <div style={{
            border: `1.5px solid ${TT.ink}`, borderRadius: 14,
            padding: '14px 16px', background: TT.paper,
            boxShadow: `0 0 0 4px ${TT.ink}08`
          }}>
            <div style={{ fontSize: 15, lineHeight: 1.55 }}>{userInput}</div>
            <div style={{
              display: 'flex', justifyContent: 'space-between', alignItems: 'center',
              marginTop: 10, paddingTop: 10, borderTop: `1px solid ${TT.lineSoft}`
            }}>
              <div style={{ fontSize: 10, color: TT.muted, fontFamily: FM, whiteSpace: 'nowrap' }}>{userInput.length} 字 · 自由输入</div>
              <div style={{
                width: 32, height: 32, borderRadius: '50%', background: TT.ink,
                color: TT.paper, display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: 14
              }}>↑</div>
            </div>
          </div>

          <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', marginTop: 14 }}>
            {['带爸妈轻松游', '朋友打卡游', '深度文化游', '亲子游', '一个人'].map(t => (
              <Chip key={t}>{t}</Chip>
            ))}
          </div>
        </div>

        <div style={{ padding: '20px 20px 0' }}>
          <ExtractBox />
        </div>
      </PhoneScroll>
    </div>
  );
}

function ExtractBox() {
  return (
    <div style={{
      background: TT.panel, borderRadius: 12, padding: '12px 14px',
      border: `1px solid ${TT.line}`
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
        <div style={{ width: 5, height: 5, background: TT.accent, borderRadius: '50%' }}></div>
        <div style={{ fontSize: 11, letterSpacing: '0.12em', color: TT.accentInk, fontWeight: 600 }}>
          意图理解层 · L1
        </div>
      </div>
      <div style={{ fontSize: 11, color: TT.muted, marginTop: 6 }}>提取到的非标感受词：</div>
      <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', marginTop: 6 }}>
        {['轻松一点', '有文化感', '不要太网红'].map(t => (
          <span key={t} style={{ fontFamily: FM, fontSize: 11, padding: '2px 7px', background: TT.paper, border: `1px solid ${TT.line}`, borderRadius: 4, whiteSpace: 'nowrap' }}>"{t}"</span>
        ))}
      </div>
      <div style={{ fontSize: 11, color: TT.muted, marginTop: 8 }}>下一步：映射到可计算约束（步行上限 / 文化深度权重 / 体力剖面）</div>
    </div>
  );
}

function DotMenu() {
  return (
    <div style={{ display: 'flex', gap: 3 }}>
      {[0,1,2].map(i => <div key={i} style={{ width: 4, height: 4, borderRadius: '50%', background: TT.muted }}></div>)}
    </div>
  );
}

function InputNarrative({ ctx }) {
  return (
    <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
      <PhoneStatus />
      <PhoneScroll>
        <div style={{ padding: '40px 28px 24px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <BotAvatar size={36} />
            <div>
              <div style={{ fontSize: 13, fontWeight: 600 }}>游伴</div>
              <div style={{ fontSize: 11, color: TT.muted }}>文化旅行代理 · 上海</div>
            </div>
          </div>

          <div style={{
            fontSize: 28, fontWeight: 500, lineHeight: 1.35,
            marginTop: 36, letterSpacing: '-0.015em', color: TT.ink
          }}>
            为什么<br/>
            <span style={{ color: TT.muted }}>想旅行？</span>
          </div>
          <div style={{ fontSize: 13, color: TT.muted, marginTop: 14, lineHeight: 1.7 }}>
            随意写下你的想法，越口语越好。<br/>
            我会先理解你，再去规划。
          </div>
        </div>

        <div style={{ padding: '0 28px' }}>
          <div style={{
            padding: '20px 22px',
            background: TT.paper, borderRadius: 18,
            border: `1px solid ${TT.line}`,
            boxShadow: '0 4px 24px rgba(0,0,0,0.04)'
          }}>
            <div style={{
              fontSize: 17, lineHeight: 1.65, fontWeight: 500,
              fontFamily: '"Noto Serif SC", ' + FS,
              color: TT.ink
            }}>
              "{userInput}"
            </div>
            <div style={{
              marginTop: 14, paddingTop: 12, borderTop: `1px solid ${TT.lineSoft}`,
              display: 'flex', alignItems: 'center', justifyContent: 'space-between'
            }}>
              <div style={{ fontSize: 11, color: TT.muted, fontFamily: FM, whiteSpace: 'nowrap' }}>{userInput.length} 字</div>
              <div style={{ fontSize: 12, color: TT.accent, fontWeight: 600, whiteSpace: 'nowrap' }}>已收到 ✓</div>
            </div>
          </div>

          <div style={{ marginTop: 28 }}>
            <div style={{ fontSize: 11, letterSpacing: '0.16em', color: TT.muted, fontWeight: 600 }}>
              ↓ 我在听到 ↓
            </div>
            <div style={{ marginTop: 14, display: 'flex', flexDirection: 'column', gap: 10 }}>
              <PhraseRow phrase="轻松一点" map="→ 体力优先 · 步行 ≤ 2.5km/日" />
              <PhraseRow phrase="有文化感" map="→ 文化深度权重 ↑ · 历史/建筑标签" />
              <PhraseRow phrase="不要太网红" map="→ 拥挤度风险阈值 ↓ · 排除 Top10 网红" />
            </div>
          </div>
        </div>
      </PhoneScroll>
    </div>
  );
}

function PhraseRow({ phrase, map }) {
  return (
    <div style={{ display: 'flex', alignItems: 'baseline', gap: 12 }}>
      <span style={{
        fontFamily: '"Noto Serif SC", ' + FS, fontSize: 14, fontWeight: 600,
        color: TT.ink, minWidth: 84, whiteSpace: 'nowrap'
      }}>"{phrase}"</span>
      <span style={{ fontSize: 12, color: TT.muted, lineHeight: 1.6 }}>{map}</span>
    </div>
  );
}

// ═════════════════════════════════════════════════════════════
// Screen 2: CLARIFY
// ═════════════════════════════════════════════════════════════

const CLARIFY_QS = [
  {
    q: '同行人是？',
    sub: '会决定体力剖面和节奏',
    opts: ['爸妈', '朋友', '伴侣', '一个人', '带孩子'],
    pick: '爸妈'
  },
  {
    q: '今天预算大约？',
    sub: '不含住宿，仅一天',
    opts: ['100 以内', '100–300', '300–600', '不太敏感'],
    pick: '100–300'
  },
  {
    q: '主要怎么走？',
    sub: '决定路线生成约束',
    opts: ['地铁优先', '地铁 + 打车', '全程打车', '尽量步行'],
    pick: '地铁 + 打车'
  }
];

function ClarifyCompact({ ctx }) {
  return (
    <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
      <PhoneStatus />
      <AppBar title="对话补全约束" sub="3 个追问 · L1→L2" />
      <PhoneScroll>
        <div style={{ padding: '14px 16px', display: 'flex', flexDirection: 'column', gap: 14 }}>
          <Bubble dense>
            听到了「轻松」「有文化感」「不要太网红」。<br/>
            为了把这些转成可执行约束，我想再确认 3 件事。
          </Bubble>

          {CLARIFY_QS.map((q, i) => (
            <div key={i} style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              <Bubble dense sub={`Q${i+1} · 追问`}>
                <div style={{ fontWeight: 600 }}>{q.q}</div>
                <div style={{ fontSize: 11, color: TT.muted, marginTop: 3 }}>{q.sub}</div>
              </Bubble>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, justifyContent: 'flex-end' }}>
                {q.opts.map(o => (
                  <Chip key={o} active={o === q.pick}>{o}</Chip>
                ))}
              </div>
            </div>
          ))}

          <div style={{
            marginTop: 8, padding: '12px 14px',
            background: TT.accentSoft, border: `1px solid ${TT.accent}30`,
            borderRadius: 12
          }}>
            <div style={{ fontSize: 11, fontWeight: 600, letterSpacing: '0.1em', color: TT.accentInk }}>
              约束建模层 · L2 · 已构建用户画像
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 6, marginTop: 8, fontSize: 11 }}>
              {[
                ['步行上限', '2.5 km/日'],
                ['同行人体力', '中老年 · 中'],
                ['预算', '￥100–300'],
                ['交通', '地铁 + 打车'],
                ['文化深度', '权重 ↑ (0.25)'],
                ['拥挤阈值', '< 0.6']
              ].map(([k, v]) => (
                <div key={k} style={{ display: 'flex', justifyContent: 'space-between', padding: '2px 0' }}>
                  <span style={{ color: TT.muted }}>{k}</span>
                  <span style={{ fontFamily: FM, fontWeight: 600 }}>{v}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </PhoneScroll>
    </div>
  );
}

function ClarifyNarrative({ ctx }) {
  return (
    <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
      <PhoneStatus />
      <PhoneScroll>
        <div style={{ padding: '28px 28px 16px' }}>
          <div style={{ fontSize: 11, letterSpacing: '0.18em', color: TT.muted, fontWeight: 600 }}>
            STEP 02 · 追问与建模
          </div>
          <div style={{ fontSize: 24, fontWeight: 500, lineHeight: 1.35, marginTop: 8, letterSpacing: '-0.015em' }}>
            再问你 <span style={{ color: TT.accent }}>三件事</span>
          </div>
          <div style={{ fontSize: 13, color: TT.muted, marginTop: 10, lineHeight: 1.6 }}>
            知道这些，才知道在为谁优化。<br/>
            没有约束的"个性化"是假象。
          </div>
        </div>

        <div style={{ padding: '0 28px', display: 'flex', flexDirection: 'column', gap: 18 }}>
          {CLARIFY_QS.map((q, i) => (
            <div key={i} style={{
              borderLeft: `2px solid ${TT.accent}`, paddingLeft: 16
            }}>
              <div style={{ fontFamily: FM, fontSize: 11, color: TT.accent, fontWeight: 600 }}>
                Q{String(i+1).padStart(2,'0')}
              </div>
              <div style={{ fontSize: 17, fontWeight: 500, marginTop: 4 }}>{q.q}</div>
              <div style={{ fontSize: 12, color: TT.muted, marginTop: 2 }}>{q.sub}</div>
              <div style={{ marginTop: 10, display: 'flex', flexWrap: 'wrap', gap: 6 }}>
                {q.opts.map(o => (
                  <span key={o} style={{
                    padding: '5px 11px',
                    borderRadius: 999,
                    border: `1px solid ${o === q.pick ? TT.ink : TT.line}`,
                    background: o === q.pick ? TT.ink : 'transparent',
                    color: o === q.pick ? TT.paper : TT.inkSoft,
                    fontSize: 12, fontWeight: 500, whiteSpace: 'nowrap'
                  }}>{o}</span>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div style={{ padding: '24px 28px 32px' }}>
          <div style={{
            background: TT.ink, color: TT.paper,
            borderRadius: 16, padding: '20px 22px'
          }}>
            <div style={{ fontSize: 10, letterSpacing: '0.18em', color: TT.mutedSoft, fontWeight: 600 }}>
              USER PROFILE · L2 OUTPUT
            </div>
            <div style={{ fontSize: 13, marginTop: 10, lineHeight: 1.85, fontFamily: FM }}>
              <div>mode: <span style={{ color: TT.accent }}>"relaxed_elder"</span></div>
              <div>walk_max: 2.5 km/day</div>
              <div>budget: ¥100–300</div>
              <div>transport: ["metro", "taxi"]</div>
              <div>culture_weight: 0.25</div>
              <div>crowd_threshold: 0.6</div>
            </div>
          </div>
        </div>
      </PhoneScroll>
    </div>
  );
}

window.SCREENS = window.SCREENS || { compact: {}, narrative: {} };
Object.assign(window.SCREENS.compact, {
  input: InputCompact, clarify: ClarifyCompact
});
Object.assign(window.SCREENS.narrative, {
  input: InputNarrative, clarify: ClarifyNarrative
});

// Export shared atoms to window for other screen files
Object.assign(window, {
  PhoneScroll, PhoneStatus, AppBar, Chip, Badge, BotAvatar, Bubble, DotMenu,
  ExtractBox, PhraseRow
});
