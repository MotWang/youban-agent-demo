// 游伴 Agent Demo — 数据
// All static; demo flow is deterministic so 答辩 is stable.

window.YOUBAN_DATA = {
  // ─── 用户模式与权重 ──────────────────────────────
  modes: {
    classic_culture: {
      label: '经典文化',
      en: 'Classic Culture',
      weights: [0.30, 0.25, 0.10, 0.10, 0.05, 0.05, 0.15],
      caption: '建筑/历史优先，节奏紧凑'
    },
    relaxed_elder: {
      label: '轻松长辈',
      en: 'Relaxed Elder',
      weights: [0.15, 0.15, 0.15, 0.30, 0.10, 0.05, 0.10],
      caption: '体力优先，少走多坐'
    },
    deep_study: {
      label: '深度研学',
      en: 'Deep Study',
      weights: [0.20, 0.35, 0.05, 0.05, 0.05, 0.05, 0.25],
      caption: '文化深度最大化'
    },
    family_kids: {
      label: '亲子家庭',
      en: 'Family',
      weights: [0.20, 0.10, 0.10, 0.15, 0.15, 0.10, 0.20],
      caption: '人少、好走、可参与'
    }
  },

  // 七个评分维度（顺序与 weights 对齐）
  scoreDims: [
    { key: 's1', name: '兴趣匹配', en: 'Interest' },
    { key: 's2', name: '文化深度', en: 'Cultural' },
    { key: 's3', name: '可达性',   en: 'Access' },
    { key: 's4', name: '体力轻',   en: 'Physical' },
    { key: 's5', name: '人少',     en: 'Crowd' },
    { key: 's6', name: '天气适配', en: 'Weather' },
    { key: 's7', name: '预算',     en: 'Budget' }
  ],

  // ─── 七层架构 ────────────────────────────────────
  layers: [
    { id: 'L7', name: '前端交互层', en: 'Frontend' },
    { id: 'L6', name: '动态反馈层', en: 'Dynamic Feedback', core: true },
    { id: 'L5', name: '工具调用层', en: 'Tool Calling' },
    { id: 'L4', name: '规划决策层', en: 'Planning' },
    { id: 'L3', name: '知识数据层', en: 'Knowledge' },
    { id: 'L2', name: '约束建模层', en: 'Constraints' },
    { id: 'L1', name: '意图理解层', en: 'Intent' }
  ],

  // ─── 候选景点（用于评分演示）────────────────────
  attractions: {
    yuyuan: {
      name: '豫园',
      en: 'Yu Garden',
      type: 'outdoor',
      tags: ['园林', '明清建筑', '城市记忆'],
      base: { s1: 0.85, s2: 0.78, s3: 0.72, s4: 0.55, s5: 0.45, s6: 0.6, s7: 0.7 },
      blurb: '明代私家园林，江南叠石与亭台',
      cost: '￥40',
      walkMin: 25
    },
    bund: {
      name: '外滩',
      en: 'The Bund',
      type: 'outdoor',
      tags: ['建筑', '近代史', '步行'],
      base: { s1: 0.78, s2: 0.65, s3: 0.92, s4: 0.65, s5: 0.55, s6: 0.7, s7: 1.0 },
      blurb: '万国建筑博览群，步行 1.5 公里',
      cost: '免费',
      walkMin: 60
    },
    wukang: {
      name: '武康路 Citywalk',
      en: 'Wukang Rd.',
      type: 'outdoor',
      tags: ['街区', '老洋房', '咖啡'],
      base: { s1: 0.80, s2: 0.55, s3: 0.75, s4: 0.50, s5: 0.42, s6: 0.45, s7: 0.85 },
      blurb: '法租界老洋房与街区漫步',
      cost: '免费',
      walkMin: 90
    },
    sh_museum_east: {
      name: '上海博物馆 东馆',
      en: 'SH Museum East',
      type: 'indoor',
      tags: ['博物馆', '青铜', '文化深度'],
      base: { s1: 0.82, s2: 0.95, s3: 0.78, s4: 0.85, s5: 0.70, s6: 0.95, s7: 1.0 },
      blurb: '常设青铜/陶瓷/书画馆，文化深度最高',
      cost: '免费（预约）',
      walkMin: 20
    },
    chenghuangmiao: {
      name: '城隍庙',
      en: 'City God Temple',
      type: 'outdoor',
      tags: ['庙宇', '小吃', '人多'],
      base: { s1: 0.62, s2: 0.50, s3: 0.85, s4: 0.55, s5: 0.20, s6: 0.55, s7: 0.75 },
      blurb: '老城厢中心，小吃集中、人流密集',
      cost: '免费',
      walkMin: 15
    }
  },

  // ─── 三个推荐方案（基于 relaxed_elder 模式）────
  plans: [
    {
      id: 'plan_classic',
      title: '经典文化线',
      en: 'Classic',
      score: 0.78,
      stops: ['外滩', '豫园', '城隍庙', '武康路'],
      duration: '8h',
      walk: '4.2 km',
      cost: '￥120',
      reasons: [
        { kind: 'match', text: '4 个标志性建筑/园林，文化主题连续' },
        { kind: 'constraint', text: '步行 4.2km，超出长辈日均建议 30%' }
      ],
      source: { type: '客观约束', text: '路线连续，地铁可达' }
    },
    {
      id: 'plan_elder',
      title: '轻松长辈线',
      en: 'Relaxed',
      score: 0.86,
      recommended: true,
      stops: ['外滩（短）', '上海博物馆东馆', '武康路 Citywalk'],
      duration: '6.5h',
      walk: '2.1 km',
      cost: '￥80',
      reasons: [
        { kind: 'match', text: '室内文化点为主，体力负担降低 50%' },
        { kind: 'match', text: '每站间 ≤ 15 分钟车程，可坐为主' },
        { kind: 'constraint', text: '上博东馆需提前预约（已校验可约）' }
      ],
      source: { type: '用户偏好匹配', text: '基于"轻松长辈"模式权重' }
    },
    {
      id: 'plan_memory',
      title: '城市记忆线',
      en: 'Memory',
      score: 0.72,
      stops: ['田子坊', '武康路', '思南公馆', '外滩夜景'],
      duration: '9h',
      walk: '5.6 km',
      cost: '￥60',
      reasons: [
        { kind: 'match', text: '街区漫步为主，氛围感强' },
        { kind: 'constraint', text: '步行密度高，长辈体力剖面不匹配' },
        { kind: 'biz', text: '思南公馆含合作茶歇资源' }
      ],
      source: { type: '平台资源 / 商业合作', text: '思南合作券' }
    }
  ],

  // ─── 选中方案的行程节点（地图页用）───────────────
  itinerary: [
    { id: 'i1', time: '09:30', name: '外滩（短）',     dur: '60min', type: 'outdoor', loc: { x: 0.78, y: 0.32 } },
    { id: 'i2', time: '11:00', name: '上海博物馆东馆', dur: '120min', type: 'indoor', loc: { x: 0.62, y: 0.48 } },
    { id: 'i3', time: '13:30', name: '本帮菜午餐',     dur: '60min', type: 'meal',    loc: { x: 0.55, y: 0.55 } },
    { id: 'i4', time: '15:00', name: '武康路 Citywalk', dur: '120min', type: 'outdoor', loc: { x: 0.30, y: 0.68 }, atRisk: true },
    { id: 'i5', time: '17:30', name: '永康路茶歇',     dur: '45min', type: 'cafe',    loc: { x: 0.35, y: 0.74 } }
  ],

  // ─── 冲突卡 ─────────────────────────────────────
  conflict: {
    title: '同行人偏好冲突',
    detail: '你想保留武康路 Citywalk（步行 90 分钟），但爸妈体力剖面显示下午步行负担偏高',
    options: [
      { label: '坚持原计划', cost: '体力风险 ↑' },
      { label: '缩短为 30 分钟 + 打车', cost: '少 60 分钟街区感' },
      { label: '换为思南公馆茶歇', cost: '保留氛围、减步行' }
    ]
  },

  // ─── 突发事件库 ──────────────────────────────────
  events: {
    rain: {
      key: 'rain',
      icon: '☂',
      title: '动态反馈层：检测到降雨',
      headline: '15:00 起降雨概率 80%',
      desc: '受影响：武康路 Citywalk（户外、步行 90 分钟）',
      severity: 'high'
    },
    closed: {
      key: 'closed',
      icon: '✕',
      title: '动态反馈层：景点临时闭馆',
      headline: '上海博物馆东馆 11:00–13:00 临时维护',
      desc: '受影响：第 2 站；可顺延或替换',
      severity: 'critical'
    },
    fatigue: {
      key: 'fatigue',
      icon: '·',
      title: '动态反馈层：检测到疲劳信号',
      headline: '连续 3 次停留 > 8 分钟，步速下降 32%',
      desc: '建议：插入休息或替换为轻量活动',
      severity: 'medium'
    },
    delay: {
      key: 'delay',
      icon: '⧖',
      title: '动态反馈层：行程偏离',
      headline: '当前进度比计划晚 68 分钟',
      desc: '建议：压缩低优先级节点或顺延晚餐',
      severity: 'medium'
    }
  },

  // ─── 替代方案（按事件类型）──────────────────────
  alternatives: {
    rain: [
      {
        id: 'A',
        recommended: true,
        title: '换上海博物馆东馆',
        type: 'indoor',
        gained: '室内舒适、文化深度高（s2: 0.95）',
        lost: '失去街区现场感与漫步氛围',
        impact: '总时长 −15min，预算 +0'
      },
      {
        id: 'B',
        title: '保留武康路，缩短为 30 分钟 + 打车',
        type: 'outdoor',
        gained: '保留街区体验',
        lost: '雨中步行体感下降，体力负担仍偏高',
        impact: '预算 +￥35（打车）'
      },
      {
        id: 'C',
        title: '增加 40 分钟休息，雨停后继续',
        type: 'wait',
        gained: '完全保留原计划',
        lost: '总时长延后 40min，晚餐顺延',
        impact: '时间 +40min'
      }
    ],
    closed: [
      { id: 'A', recommended: true, title: '换浦东美术馆（同主题）', type: 'indoor', gained: '同等文化深度', lost: '需多 15 分钟车程', impact: '+15min' },
      { id: 'B', title: '顺延上博东馆至 14:00', type: 'indoor', gained: '保留原选择', lost: '挤压下午行程', impact: '后续 −45min' },
      { id: 'C', title: '改为豫园 + 老城厢', type: 'outdoor', gained: '园林替代', lost: '主题切换', impact: '步行 +1.4km' }
    ],
    fatigue: [
      { id: 'A', recommended: true, title: '插入 30min 咖啡休息', type: 'rest', gained: '恢复体力', lost: '后续节点压缩 10min', impact: '−10min' },
      { id: 'B', title: '把下一站换为轻量活动', type: 'swap', gained: '体力大幅下降', lost: '主题切换', impact: '内容差异' },
      { id: 'C', title: '跳过武康路', type: 'skip', gained: '在上博停更久', lost: '少一个街区体验', impact: '−90min' }
    ],
    delay: [
      { id: 'A', recommended: true, title: '压缩永康路茶歇 → 15min', type: 'compress', gained: '主线节点不变', lost: '茶歇时间短', impact: '−30min' },
      { id: 'B', title: '顺延晚餐至 19:30', type: 'delay', gained: '保留茶歇', lost: '夜班地铁高峰', impact: '+30min' },
      { id: 'C', title: '拆为保守 / 完整两套方案', type: 'split', gained: '让用户选', lost: '需当场决定', impact: '决策点 ×2' }
    ]
  },

  // ─── 文化解释卡（最终页面）──────────────────────
  cultureCard: {
    title: '上海博物馆 东馆',
    subtitle: '到了之后，重点看这三件事',
    items: [
      {
        n: '01',
        head: '大克鼎（青铜馆）',
        body: '西周晚期最大的食器之一。看它内壁的 290 字铭文——是上博"镇馆四鼎"里铸字最完整的一件。'
      },
      {
        n: '02',
        head: '陶瓷馆 · 五大名窑陈列',
        body: '汝、官、哥、定、钧 一处看齐。和你白天看的外滩近代建筑形成对比——一边是工业现代，一边是宫廷审美的极致。'
      },
      {
        n: '03',
        head: '"何以中国" 特展',
        body: '玉器、礼器、文字三条线索讲早期中华文明形成。和你"想看有文化感的东西"匹配度 0.95。'
      }
    ],
    sources: ['上博官网 · 常设展介绍', '《何以中国》图录 2024'],
    confidence: 0.92
  }
};
