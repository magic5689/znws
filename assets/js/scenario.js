/* ===== 场景页：按 ?s= 渲染 ===== */
(function () {
  var SC = {
    gov: {
      name: '政务',
      img: 'scene-gov.jpg',
      title: '跨部门口径统一，政策条款秒答',
      lead: '委办局各建各的系统，同一指标多套口径；政策文件散在网站深处，找一个条款要翻三份文件。',
      tags: ['一网通办问数', '政策秒答', '原文出处'],
      stats: [['12', '个委办局数据源'], ['1 套', '全市统一口径'], ['3 秒', '条款定位'], ['100%', '答案可回溯']],
      painH: '同一个数，三个口径',
      painLead: '不是没有数据，是数据之间没有共同的解释。',
      pains: [
        ['口径打架', '同一指标各区县各算法，开会先花半小时对口径，对完再谈事。'],
        ['数据孤岛', '办件、事项、监管各一套库，跨部门的问题没有人能一句话答上来。'],
        ['政策难查', '文件挂在网站三四层目录下，条款要靠人工比对，答复口径还不一致。']
      ],
      howLead: '接三类库、建四类对象、配两个 Agent，窗口与热线共用一套。',
      steps: [
        ['接', '一网通办、事项库、办件库、政策文件统一接入，增量同步。'],
        ['建', 'M1 建事项 / 办件 / 企业 / 政策四类对象，M7 收 30+ 高频口径，政策原文编译进 Wiki。'],
        ['用', '配「办件问数」与「政策问答」两个 Agent，窗口、热线、领导驾驶舱共用。']
      ],
      concept: { src: ['一网通办', '事项库', '办件库', '政策文件'], obj: '事项 · 办件 · 企业', ans: ['办件问数', '政策问答'] },
      ask: [
        ['今年新增市场主体多少？', '指标卡'],
        ['开办企业要几个环节、几天？', '清单卡'],
        ['哪些区办件超时最多？', '排序卡'],
        ['惠企政策我们符合哪几条？', '清单卡'],
        ['这个事项的依据是哪份文件？', '原文引用']
      ],
      gains: [['40%', '取数工单下降'], ['3 秒', '条款定位'], ['1 套', '全市口径'], ['6 类', '常态问法']],
      roles: [
        ['分管副市长', '一屏看清全市办件与新开办走势，不用等报表', ['今年新增市场主体多少？分城区看一下', '哪些区办件超时最多？'], '指标卡 · 排序卡', '汇报当场出数，会后不用补表'],
        ['审批科业务人员', '查事项环节、时限与依据，不用再翻文件', ['开办企业要几个环节、几天？', '这个事项的依据是哪份文件？'], '清单卡 · 原文引用', '答复口径统一，减少反复确认'],
        ['窗口一线人员', '照着条款办事，原文随手可查可截屏', ['惠企政策我们符合哪几条？', '这个事项要交哪些材料？'], '清单卡 · 原文页码', '新政策当天就能用上'],
      ],
      phones: [
        ['mob-gov-q.jpg', '问数 · 指标与排行', '一句话给出结论、关键指标、趋势与清单', 0],
        ['mob-gov-a.jpg', '问答 · 依据与条款', '给结论、给原文、给页码', 0],
      ],
    },

    mfg: {
      name: '智能制造',
      img: 'scene-mfg.jpg',
      title: '多源数据打通，工艺经验沉淀',
      lead: '生产、供应链、质量三套系统各说各话；工艺参数留在老师傅脑子里，人一走经验就断。',
      tags: ['良率问数', '工艺 Wiki', '设备效率'],
      stats: [['3 类', '系统打通'], ['200+', '工艺文件入库'], ['5 分钟', '本体建模'], ['32 种', '呈现形态']],
      painH: '良率说不清，经验留不住',
      painLead: '数据在系统里，解释在人的脑子里，两者都没沉淀下来。',
      pains: [
        ['良率说不清', '不良率一波动，要拉三张表对半天，才能定位到具体工序与批次。'],
        ['经验留不住', '工艺参数靠师徒传，新人上手慢，异常处置各凭经验。'],
        ['设备不透明', '稼动率、停机原因散在工单里，口径不统一，排名不可比。']
      ],
      howLead: '接三套业务系统与工艺文档，本体做到工序级，工艺沉淀成可查的页。',
      steps: [
        ['接', 'MES、ERP、QMS 与工艺文件、作业指导书统一接入。'],
        ['建', 'M1 建产线 / 工序 / 设备 / 批次，M7 收良率与稼动口径，工艺文件编译为 Wiki。'],
        ['用', '配「良率问数」与「工艺问答」，车间大屏与班组手机共用。']
      ],
      concept: { src: ['MES', 'ERP', 'QMS', '工艺文件'], obj: '产线 · 工序 · 批次', ans: ['良率问数', '工艺问答'] },
      ask: [
        ['上月各产线良率是多少？', '指标卡'],
        ['哪台设备稼动率最低？', '排序卡'],
        ['这批不良主要出在哪道工序？', '归因卡'],
        ['某型号工艺参数怎么设？', '规范引用'],
        ['换型要停机多久？', '清单卡']
      ],
      gains: [['25%', '不良定位提速'], ['200+', '工艺知识页'], ['1 套', '良率口径'], ['3 类', '角色可用']],
      roles: [
        ['厂长', '良率与产线排名一眼看到，异常直接定位到工序', ['上月各产线良率是多少？', '这批不良主要出在哪道工序？'], '指标卡 · 归因卡', '异常当天定位，减少批量返工'],
        ['工艺工程师', '参数与规程随手查，标准有出处', ['某型号工艺参数怎么设？', '换型要停机多久？'], '规范引用 · 清单卡', '新人上手从周级缩到天级'],
        ['车间班组', '按作业指导书处置，步骤照着做', ['焊接气孔怎么排查？', '首件检验要检哪几项？'], '步骤 · 原文', '处置动作不再凭个人经验'],
      ],
      phones: [
        ['mob-mfg-q.jpg', '问数 · 良率与归因', '产线良率、不良占比与趋势图', 0],
        ['mob-mfg-a.jpg', '问答 · 工艺参数', '给参数区间、给标准条款与排查步骤', 0],
      ],
    },

    env: {
      name: '生态环保',
      img: 'scene-env.jpg',
      title: '环境要素一体，环评判定有据',
      lead: '水、气、土多源监测数据量大；环评分类判定条款繁复，编报告书还是报告表常靠人翻名录。',
      tags: ['环境要素本体', '环评判定', '断面达标'],
      stats: [['4 类', '监测数据接入'], ['8 类', '文档格式'], ['5 秒', '给出判定'], ['100%', '附原文']],
      painH: '数据很多，依据很难找',
      painLead: '监测数据管够，但从数据到「该编报告书还是报告表」，中间隔着厚厚一本名录。',
      pains: [
        ['要素割裂', '水、气、土各一套系统，综合研判要人工拼，拼一次半天。'],
        ['判定靠人', '报告书 / 报告表要对照名录逐条比，不同人给出不同结论。'],
        ['依据难查', '标准、名录、技术导则分散，答复常缺原文，事后难以复核。']
      ],
      howLead: '接监测与审批数据，本体做到断面与项目级，名录标准编译成可引用的页。',
      steps: [
        ['接', '空气站、水质站、排污许可、环评文件与名录标准统一接入。'],
        ['建', 'M1 建断面 / 污染源 / 项目 / 标准，M7 收浓度与达标口径，名录入 Wiki。'],
        ['用', '配「环境问数」与「环评问答」，监测中心与审批窗口共用。']
      ],
      concept: { src: ['空气站', '水质站', '排污许可', '名录标准'], obj: '断面 · 污染源 · 项目', ans: ['达标问数', '环评问答'] },
      ask: [
        ['今年 PM2.5 达标了吗？', '判断卡'],
        ['哪些断面超标？', '清单卡'],
        ['减水剂项目编报告书还是报告表？', '判定 + 原文'],
        ['主要来自哪些行业？', '归因卡'],
        ['这个标准限值是多少？', '原文引用']
      ],
      gains: [['60%', '判定提速'], ['100%', '附原文'], ['4 类', '数据打通'], ['21', '市州覆盖']],
      roles: [
        ['分管领导', '全市达标与否、谁在拖后腿，一屏看清', ['今年 PM2.5 达标了吗？', '哪些断面超标？'], '判断卡 · 清单卡', '情况通报不用等人工汇总'],
        ['监测研判岗', '断面数据与口径随时取，综合研判不再靠拼表', ['主要来自哪些行业？', '这个标准限值是多少？'], '归因卡 · 原文引用', '综合研判从半天到几分钟'],
        ['审批经办人', '编报告书还是报告表，一次判定到底', ['减水剂项目编报告书还是报告表？', '环评文件要交哪些附件？'], '判定 + 原文', '判定有原文、可复核'],
      ],
      phones: [
        ['real-env-q.jpg', '问数 · 真机界面', '移动端问数：结论、指标卡与图表明细', 1],
        ['mob-env-a.jpg', '问答 · 判定与原文', '环评判定给出结论与引用条款', 0],
      ],
    },

    telecom: {
      name: '电信',
      img: 'scene-telecom.jpg',
      title: '经营指标一问即得，规程秒查',
      lead: '经营、网络、客户数据分散在十余个系统；指标口径敏感，一个数字要三级确认才敢往上报。',
      tags: ['经营本体', '口径可审计', '规程问答'],
      stats: [['10+', '系统接入'], ['1 套', '口径定义'], ['秒级', '出数'], ['全程', '留痕可审']],
      painH: '报表堆成山，口径不敢动',
      painLead: '每天几十张日报，看数的人比做数的人还累；口径一改，一圈人都要重新对。',
      pains: [
        ['报表成山', '日报、周报、月报层层叠，同一指标在不同报表里数字不一致。'],
        ['口径难改', '指标定义散在文档里，改一次要通知一圈人，还容易漏。'],
        ['规程难落', '装维、退服处置规程长，一线记不住，处置动作靠问人。']
      ],
      howLead: '接四类系统，口径收敛到本体，规程编译成页，省市共用一套。',
      steps: [
        ['接', '经分、CRM、网管、工单与装维规程统一接入。'],
        ['建', 'M1 建地市 / 产品 / 客户 / 基站，M7 收净增、离网、退服口径，规程入 Wiki。'],
        ['用', '配「经营问数」与「装维问答」，省市两级共用一套口径。']
      ],
      concept: { src: ['经分', 'CRM', '网管', '装维规程'], obj: '地市 · 产品 · 基站', ans: ['经营问数', '装维问答'] },
      ask: [
        ['本月宽带净增多少？', '指标卡'],
        ['哪个地市离网率最高？', '排序卡'],
        ['5G 基站退服怎么处置？', '步骤 + 原文'],
        ['这个指标口径怎么定义的？', '口径说明'],
        ['近半年 ARPU 走势？', '趋势图']
      ],
      gains: [['70%', '取数提速'], ['1 套', '全省口径'], ['全程', '调用留痕'], ['省 / 市', '同源同数']],
      roles: [
        ['分管副总', '经营指标随时看，口径统一不打架', ['本月宽带净增多少？', '哪个地市离网率最高？'], '指标卡 · 排序卡', '日报不再等数，会上直接调'],
        ['经营分析岗', '明细随时下钻，口径与来源可审计', ['近半年 ARPU 走势？', '这个指标口径怎么定义的？'], '趋势图 · 口径说明', '取数工单大幅减少'],
        ['装维一线', '退服处置按规程走，步骤与时限都明确', ['5G 基站退服怎么处置？', '故障升级流程是什么？'], '步骤 · 原文', '处置动作不依赖个人经验'],
      ],
      phones: [
        ['mob-telecom-q.jpg', '问数 · 经营指标', '净增、离网率与 ARPU 一屏看完', 0],
        ['mob-telecom-a.jpg', '问答 · 处置规程', '给处置步骤、给时限与规程条款', 0],
      ],
    },

    medical: {
      name: '医疗',
      img: 'scene-medical.jpg',
      title: '敏感数据分域，规范问答可核',
      lead: '运营、病案、医保数据高度敏感；诊疗规范、临床路径检索慢，年轻医生常靠问同事。',
      tags: ['数据分域', '规范问答', '科室授权'],
      stats: [['4 类', '数据域隔离'], ['按角色', '授权范围'], ['秒级', '规范检索'], ['全程', '审计']],
      painH: '数据敏感，规范难查',
      painLead: '一边是不能随便看的数据，一边是查不到的规范，两头都卡人。',
      pains: [
        ['数据敏感', '病案与医保数据不能混看，跨科室调阅要走审批，流程长。'],
        ['规范难查', '诊疗规范、临床路径、护理制度散在院内网，找一条要翻半天。'],
        ['口径不一', '平均住院日、药占比各科室算法不同，横向比较失真。']
      ],
      howLead: '接四类数据，权限收到角色与科室，规范编译成可引用页。',
      steps: [
        ['接', 'HIS、病案、医保、院内制度与临床路径统一接入。'],
        ['建', 'M1 建科室 / 病种 / 诊疗项目，M5 按角色分域授权，规范入 Wiki。'],
        ['用', '配「运营问数」与「规范问答」，管理端与临床端分权使用。']
      ],
      concept: { src: ['HIS', '病案', '医保', '院内规范'], obj: '科室 · 病种 · 项目', ans: ['运营问数', '规范问答'] },
      ask: [
        ['本月门诊量同比？', '指标卡'],
        ['哪个科室平均住院日最长？', '排序卡'],
        ['三级手术授权流程？', '步骤 + 原文'],
        ['这个病种的临床路径？', '清单卡'],
        ['药占比是怎么算的？', '口径说明']
      ],
      gains: [['双域', '数据隔离'], ['秒级', '规范检索'], ['统一', '科室口径'], ['全程', '审计可追']],
      roles: [
        ['院长 / 分管院领导', '科室效率与资源占用一眼看清', ['哪个科室平均住院日最长？', '本月门诊量同比？'], '指标卡 · 排序卡', '科室横向对比不用各自拉数'],
        ['医务科', '规范与授权流程随手查，答复带原文', ['三级手术授权流程？', '这个病种的临床路径？'], '步骤 · 原文', '年轻医生少问人、多查依据'],
        ['临床一线', '诊疗问题随时问，回答有出处可核对', ['术后多久复查？', '这个药院内有什么限制？'], '结论 + 原文', '床旁可查，不必回办公室'],
      ],
      phones: [
        ['real-medical-home.jpg', '个人助手 · 真机入口', '移动端入口：常见问题直接点开', 1],
        ['real-medical-a.jpg', '问答 · 真机作答', '给出结论、建议检查与处置提示', 1],
        ['mob-medical-q.jpg', '问数 · 科室指标', '住院日、门诊量、床位使用率', 0],
      ],
    }
  };

  var ORDER = ['gov', 'mfg', 'env', 'telecom', 'medical'];
  var key = new URLSearchParams(location.search).get('s') || 'gov';
  var d = SC[key] || SC.gov;

  document.title = d.name + ' · 场景案例 · 智能问数';
  document.getElementById('crumb').textContent = d.name;
  document.getElementById('scTitle').textContent = d.title;
  document.getElementById('scLead').textContent = d.lead;
  document.getElementById('scBg').src = '../assets/images/' + d.img;

  document.getElementById('caseQ').src = '../assets/images/case-' + key + '-q.jpg';
  document.getElementById('caseA').src = '../assets/images/case-' + key + '-a.jpg';

  document.getElementById('scTags').innerHTML = d.tags.map(function (t) {
    return '<span>' + t + '</span>';
  }).join('');

  document.getElementById('scStats').innerHTML = d.stats.map(function (s) {
    return '<div><b>' + s[0] + '</b><span>' + s[1] + '</span></div>';
  }).join('');

  document.getElementById('painH').textContent = d.painH;
  document.getElementById('painLead').textContent = d.painLead;
  // 痛点示意图：按关键词选形态
  function painArt(title) {
    if (/口径|说不清|不透明|不一|难改|靠人|打架/.test(title)) {
      var byPerson = /靠人/.test(title);
      var labs = byPerson ? ['A 判定', 'B 判定', 'C 判定'] : ['财务口径', '业务口径', '系统口径'];
      return '<div class="art art--num">' +
        '<div class="art-num"><b>7.2</b><em>' + labs[0] + '</em></div>' +
        '<div class="art-num art-num--mid"><b>7.8</b><em>' + labs[1] + '</em></div>' +
        '<div class="art-num"><b>8.1</b><em>' + labs[2] + '</em></div>' +
        '<span class="art-q">' + (byPerson ? '同一份材料，三个结论' : '同一个指标，三个数') + '</span></div>';
    }
    if (/孤岛|敏感|隔离/.test(title)) {
      return '<div class="art art--lock">' +
        '<div class="art-row"><span>核心数据域</span><i class="art-lock">需授权</i></div>' +
        '<div class="art-row"><span>跨科室调阅</span><i class="art-lock">走审批</i></div>' +
        '<div class="art-row art-row--dim"><span>对外共享</span><i class="art-lock">不开放</i></div></div>';
    }
    if (/割裂|成山|散/.test(title)) {
      return '<div class="art art--flow">' +
        '<div class="art-box">业务库</div><i class="art-brk"></i>' +
        '<div class="art-box">指标表</div><i class="art-brk"></i>' +
        '<div class="art-box">工单</div>' +
        '<span class="art-q">数据对不上，靠人对</span></div>';
    }
    return '<div class="art art--docs">' +
      '<div class="art-docs"><i></i><i></i><i></i></div>' +
      '<div class="art-search">检索「' + d.name + '相关规范」<b>0 条命中</b></div></div>';
  }

  document.getElementById('scPains').innerHTML = d.pains.map(function (p, i) {
    return '<article class="sc-card reveal">' +
      '<span class="sc-card__no">0' + (i + 1) + '</span>' +
      '<h3>' + p[0] + '</h3><p>' + p[1] + '</p>' + painArt(p[0]) + '</article>';
  }).join('');

  document.getElementById('howLead').textContent = d.howLead;
  var HOW = ['接入', '建模', '用起来'];
  var srcChips = d.concept.src.map(function (t) { return '<span class="hw-chip">' + t + '</span>'; }).join('');
  var ART = [
    '<div class="hw-art hw-art--in">' + srcChips + '<i class="hw-line"></i><div class="hw-core">统一入口</div></div>',
    '<div class="hw-art hw-art--build">' +
      '<div class="hw-layer hw-layer--1">M1 对象<span>' + d.concept.obj + '</span></div>' +
      '<div class="hw-layer hw-layer--2">M5 权限</div>' +
      '<div class="hw-layer hw-layer--3">M7 口径</div></div>',
    '<div class="hw-art hw-art--use">' +
      '<div class="hw-agent">Agent</div><i class="hw-line"></i>' +
      '<div class="hw-ans"><span>' + d.concept.ans[0] + '</span><span>' + d.concept.ans[1] + '</span></div></div>'
  ];
  document.getElementById('scHow').innerHTML = d.steps.map(function (s, i) {
    return '<article class="sc-step reveal"><div class="sc-step__hd"><b>' + s[0] + '</b><h3>' + HOW[i] +
      '</h3></div><p>' + s[1] + '</p>' + ART[i] + '</article>';
  }).join('');

  var c = d.concept;
  var y = [46, 118, 190, 262];
  var srcSvg = c.src.map(function (t, i) {
    return '<g><rect x="18" y="' + y[i] + '" width="128" height="42" rx="8" fill="#fff" stroke="#dbe6f5"/>' +
      '<text x="82" y="' + (y[i] + 26) + '" text-anchor="middle" fill="#33415a" font-size="12" font-weight="600">' + t + '</text>' +
      '<path d="M146,' + (y[i] + 21) + ' L186,' + (y[i] + 21) + '" stroke="#cfdcef" stroke-width="1.4"/></g>';
  }).join('');

  document.getElementById('scConcept').innerHTML =
    '<svg viewBox="0 0 760 360" class="sc-svg" role="img" aria-label="场景概念图">' +
      srcSvg +
      '<path d="M186,67 L186,283" stroke="#cfdcef" stroke-width="1.4"/>' +
      '<path d="M186,150 L214,150" stroke="#cfdcef" stroke-width="1.4"/>' +
      '<path d="M186,247 L214,247" stroke="#cfdcef" stroke-width="1.4"/>' +
      '<rect x="214" y="74" width="216" height="94" rx="12" fill="#2b6bff"/>' +
      '<text x="322" y="108" text-anchor="middle" fill="#fff" font-size="14" font-weight="700">本体 M1 · M5 · M7</text>' +
      '<text x="322" y="130" text-anchor="middle" fill="#cfe2ff" font-size="10.5">' + c.obj + '</text>' +
      '<text x="322" y="150" text-anchor="middle" fill="#9fc4ff" font-size="9.5">对象 / 权限 / 口径</text>' +
      '<rect x="214" y="200" width="216" height="94" rx="12" fill="#fff" stroke="#12a594" stroke-width="1.4"/>' +
      '<text x="322" y="234" text-anchor="middle" fill="#0a8f80" font-size="14" font-weight="700">知识 Wiki</text>' +
      '<text x="322" y="256" text-anchor="middle" fill="#4a5565" font-size="10.5">文档编译 · 七层检索</text>' +
      '<text x="322" y="276" text-anchor="middle" fill="#8a94a6" font-size="9.5">每条结论附页码与原文</text>' +
      '<path d="M430,121 L486,121" stroke="#cfdcef" stroke-width="1.6"/>' +
      '<path d="M430,247 L486,247" stroke="#cfdcef" stroke-width="1.6"/>' +
      '<rect x="486" y="82" width="248" height="78" rx="12" fill="#fff" stroke="#dbe6f5"/>' +
      '<text x="610" y="114" text-anchor="middle" fill="#1a1a1a" font-size="13" font-weight="700">' + c.ans[0] + '</text>' +
      '<text x="610" y="136" text-anchor="middle" fill="#8a94a6" font-size="10">结论 + 图表 + 口径</text>' +
      '<rect x="486" y="208" width="248" height="78" rx="12" fill="#fff" stroke="#dbe6f5"/>' +
      '<text x="610" y="240" text-anchor="middle" fill="#1a1a1a" font-size="13" font-weight="700">' + c.ans[1] + '</text>' +
      '<text x="610" y="262" text-anchor="middle" fill="#8a94a6" font-size="10">结论 + 原文 + 页码</text>' +
    '</svg>' +
    '<div class="sc-flowm">' +
      '<div class="sc-flowm__row"><span>数据源</span><b>' + c.src.join(' / ') + '</b></div>' +
      '<i>↓</i>' +
      '<div class="sc-flowm__row"><span>本体</span><b>' + c.obj + ' · 对象 / 权限 / 口径</b></div>' +
      '<div class="sc-flowm__row"><span>知识</span><b>文档编译 · 七层检索 · 附页码</b></div>' +
      '<i>↓</i>' +
      '<div class="sc-flowm__row"><span>回答</span><b>' + c.ans[0] + ' / ' + c.ans[1] + '</b></div>' +
    '</div>';

  document.getElementById('scRoles').innerHTML = d.roles.map(function (r, i) {
    return '<article class="role reveal">' +
      '<div class="role__hd"><span class="role__i">0' + (i + 1) + '</span><h3>' + r[0] + '</h3></div>' +
      '<p>' + r[1] + '</p>' +
      '<div class="role__qs">' + r[2].map(function (q) {
        return '<span class="role__q">' + q + '</span>';
      }).join('') + '</div>' +
      '<div class="role__ft"><em>' + r[3] + '</em><b>' + r[4] + '</b></div>' +
      '</article>';
  }).join('');

  document.getElementById('scPhones').innerHTML = d.phones.map(function (p) {
    return '<figure class="phone reveal">' +
      '<div class="phone__shot"><img src="../assets/images/' + p[0] + '" alt="' + p[1] + '" loading="lazy">' +
      (p[3] ? '<span class="phone__badge">真机截图</span>' : '') + '</div>' +
      '<figcaption><b>' + p[1] + '</b><span>' + p[2] + '</span></figcaption></figure>';
  }).join('');

  document.getElementById('scAsk').innerHTML = d.ask.map(function (q) {
    return '<div class="sc-q"><span>' + q[0] + '</span><em>' + q[1] + '</em></div>';
  }).join('');

  document.getElementById('scGains').innerHTML = d.gains.map(function (g) {
    return '<div class="de-num reveal"><b>' + g[0] + '</b><span>' + g[1] + '</span></div>';
  }).join('');

  document.getElementById('scNav').innerHTML = ORDER.filter(function (k) { return k !== key; })
    .map(function (k) { return '<a href="scenario.html?s=' + k + '">' + SC[k].name + '</a>'; })
    .join('') + '<a href="scenario-energy.html">机房动环</a>';

  // 动态生成的卡片不会被 main.js 的观察器接管，这里统一放行
  setTimeout(function () {
    document.querySelectorAll('.reveal').forEach(function (el, i) {
      setTimeout(function () { el.classList.add('is-in'); }, Math.min(i * 70, 420));
    });
  }, 60);
})();
