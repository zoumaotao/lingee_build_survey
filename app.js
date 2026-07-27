// ========================================
// Lingee-Build 调研问卷 - 分步卡片式交互
// ========================================

// GitHub配置 - Token混淆存储
const CONFIG = {
    get token() {
        const _t = ['Z2hwX0ZZcFRSbVhu', 'RzQ1M213Vmdoclp3', 'c3o2SDdxV1d5aDFV', 'TWxrbQ=='];
        return atob(_t.join(''));
    },
    owner: 'zoumaotao',
    repo: 'lingee_build_survey',
    branch: 'main',
    path: 'record.md'
};

// ========================================
// 题目数据定义
// ========================================
const QUESTIONS = [
    {
        id: 'q33', section: '基本信息', type: 'text',
        title: '先认识一下你 👋',
        hint: '用于样本去重和后续跟进，不对外披露。留下信息的参与者将收到调研报告摘要及内测优先资格。',
        fields: [
            { key: 'name', placeholder: '姓名（可填「匿名」）' },
            { key: 'company', placeholder: '公司名称（可填「保密」）' },
            { key: 'city', placeholder: '公司所在城市（可填「保密」）' },
            { key: 'contact', placeholder: '手机 / 微信' }
        ]
    },
    {
        id: 'q1', section: '第一部分：你是谁', type: 'single',
        title: '你在公司中的角色是？',
        options: ['技术负责人 / 研发总监', '项目经理 / 交付负责人', '开发工程师', '销售 / 商务 / BD', '公司创始人 / 合伙人'],
        hasOther: true
    },
    {
        id: 'q2', section: '第一部分：你是谁', type: 'multi',
        title: '你们公司目前和金蝶的合作模式是？',
        options: ['渠道合作：帮金蝶销售产品、获取客户', '交付合作：帮金蝶客户做实施、配置、培训', 'ISV合作：自研垂直应用或行业解决方案', '刚开始接触，还没有正式合作'],
        hasOther: true
    },
    {
        id: 'q3', section: '第一部分：你是谁', type: 'single',
        title: '如果有一个平台能赋予你们 AI Building 能力，你们最想用它做什么？',
        options: [
            '从「只卖产品」变成「能帮客户快速搭方案、做演示」',
            '从「做项目交付」变成「把交付经验产品化，可复用可售卖」',
            '从「卖一次性 License」变成「持续运营、持续收费」',
            '以上都想要，看产品能力再决定',
            '暂时没有跃迁需求'
        ]
    },
    {
        id: 'q4', section: '第一部分：你是谁', type: 'multi',
        title: '你们公司主要为哪类客户提供服务？',
        options: ['金蝶苍穹客户（大型企业）', '金蝶星空客户（中型企业）', '金蝶云·星辰客户（小微企业）', '非金蝶生态客户'],
        hasOther: true
    },
    {
        id: 'q5', section: '第一部分：你是谁', type: 'single',
        title: '你们公司的规模大概是？',
        options: ['20 人以下', '20-100 人', '100-500 人', '500 人以上']
    },
    {
        id: 'q6', section: '第一部分：你是谁', type: 'multi',
        title: '你们主要服务哪些行业的客户？',
        options: ['制造业（装备制造 / 流程制造 / 化工医药等）', '现代服务业（科学研究 / 软件信息 / 租赁商务等）', '建筑与房地产', '金融与投资', '交通与物流'],
        hasOther: true
    },
    {
        id: 'q7', section: '第一部分：你是谁', type: 'multi',
        title: '你们的交付工作主要涉及客户的哪些业务领域？',
        options: ['财务（账务 / 报表 / 预算 / 资金）', '供应链（采购 / 库存 / 物流 / 仓储）', '生产制造（排产 / 质检 / 工艺 / MES）', '销售与 CRM（客户管理 / 报价 / 订单）', '人力资源（招聘 / 薪酬 / 考勤）', '项目管理（投标 / 合同 / 进度 / 成本）', '研发与 PLM（产品研发 / BOM / 工艺路线）', '数据分析与 BI（报表 / 看板 / 决策支持）', '平台集成与接口开发（系统对接 / 数据同步 / API）'],
        hasOther: true
    },
    {
        id: 'q8', section: '第二部分：AI 认知与工具现状', type: 'multi',
        title: '以下 AI 能力，你用过或了解哪些？',
        options: [
            'AI 对话生成文字、图片、报告（ChatGPT、文心、通义）',
            'AI 描述需求生成页面或工具（秒哒、Lovable）',
            'AI 帮助写代码、补全函数（Cursor、通义灵码）',
            'AI 覆盖研发全流程（Claude Code、Devin）',
            '配置 AI 数字员工持续自动处理工作（扣子、飞书 Aily）',
            '以上都不太了解'
        ]
    },
    {
        id: 'q9', section: '第二部分：AI 认知与工具现状', type: 'multi',
        title: '你们团队目前用哪些 AI 工具？',
        hint: '没用过的不选',
        options: [
            'AI IDE（Cursor / Windsurf / Kiro / GitHub Copilot）',
            '国内 AI 编程工具（通义灵码 / CodeBuddy）',
            'AI 终端工具（Claude Code / OpenAI Codex）',
            'AI 对话工具（ChatGPT / 文心 / 通义 / Kimi）',
            'AI Build 工具（秒哒 / Lovable 等）',
            'AI 智能体平台（扣子 / Dify / FastGPT）',
            '低代码工具（钉钉宜搭 / 飞书妙搭 / 金蝶苍穹低代码）',
            '金蝶自研 AI 工具',
            '没有在用任何 AI 工具'
        ],
        hasOther: true
    },
    {
        id: 'q10', section: '第二部分：AI 认知与工具现状', type: 'multi', max: 2,
        title: '你现在用的 AI 工具，最让你不满意的是什么？',
        hint: '最多选 2 项',
        options: [
            '生成内容质量不稳定，有时很好有时很差',
            '不理解客户的业务背景，答案太通用',
            '数据安全问题，不敢把客户信息输进去',
            '不能导出为可部署的产品，没法直接交付',
            '和金蝶苍穹 / 星空的系统对接麻烦',
            '用起来复杂，团队学习成本高',
            '基本满意，没有明显不足',
            '没有在用 AI 工具'
        ],
        hasOther: true
    },
    {
        id: 'q11', section: '第三部分：交付痛点', type: 'multi', max: 2,
        title: '帮客户做交付时，最重复、最耗时的工作是什么？',
        hint: '最多选 2 项',
        options: [
            '理解和梳理客户需求，反复沟通对齐',
            '写重复性代码（类似功能重复开发）',
            '接口对接和系统集成调试',
            '测试和 Bug 修复',
            '给客户做方案展示 / 演示页面',
            '交付后的文档整理和知识沉淀',
            '客户验收和培训'
        ],
        hasOther: true
    },
    {
        id: 'q12', section: '第三部分：交付痛点', type: 'single',
        title: '如果 AI 今天只能帮你解决交付中的一个问题，你选哪个？',
        options: [
            '客户需求理解太慢，反复对齐浪费时间',
            '重复性代码写太多，每个项目都在重复造轮子',
            '接口对接和系统集成调试耗时耗力',
            '测试覆盖不够，Bug 到验收才发现',
            '交付完缺少运维手段，客户问题响应慢',
            '团队经验没有沉淀，新人上手效率低'
        ],
        hasOther: true
    },
    {
        id: 'q13', section: '第三部分：交付痛点', type: 'multi',
        title: '你们团队的交付经验和最佳实践，目前存在哪里？',
        options: [
            '在各人脑子里，靠口头传授',
            '在文档 / Confluence / 飞书文档里',
            '在代码模板 / 脚手架里，只有技术人员能理解',
            '几乎没有沉淀，人员流动后就流失了',
            '已经在用 Prompt 模板 / 知识库 / RAG 来固化'
        ],
        hasOther: true
    },
    {
        id: 'q14', section: '第四部分：场景价值与能力需求', type: 'multi', max: 2,
        title: '以下三种 AI 能力，哪些对你们的业务最有价值？',
        hint: '最多选 2 个',
        options: [
            '「做出来」：快速做出页面、小工具或数据看板，客户打开链接就能用',
            '「自动干」：配置 AI 数字员工，它自动持续处理某类工作',
            '「封装用」：把交付经验封装成 AI 能力包，可复用、可发布'
        ]
    },
    {
        id: 'q15', section: '第四部分：场景价值与能力需求', type: 'multi', max: 2,
        title: '你最想做出来的是哪类东西？',
        hint: '最多选 2 项',
        showIf: { q14: '「做出来」' },
        options: [
            '给客户看的展示页或方案演示页',
            '数据看板 / 进度页 / 状态页',
            '有交互功能的小工具（输入条件、查询结果）',
            '连接金蝶 ERP 数据的工具',
            '完整的业务应用（有登录、权限、多页面流程）'
        ],
        hasOther: true
    },
    {
        id: 'q16', section: '第四部分：场景价值与能力需求', type: 'multi', max: 2,
        title: '你最希望 AI 数字员工帮你做什么？',
        hint: '最多选 2 项',
        showIf: { q14: '「自动干」' },
        options: [
            '自动整理客户需求，生成需求文档初稿',
            '自动生成符合金蝶规范的代码',
            '自动回复客户的常见技术咨询',
            '自动生成测试用例并执行',
            '自动进行交付后的文档整理和知识沉淀'
        ],
        hasOther: true
    },
    {
        id: 'q17', section: '第四部分：场景价值与能力需求', type: 'multi', max: 2,
        title: '你最希望封装哪类交付能力？',
        hint: '最多选 2 项',
        showIf: { q14: '「封装用」' },
        options: [
            '生成符合金蝶规范的代码（元数据 / 插件 / 接口）',
            '生成标准化文档（需求文档、交付报告、方案模板）',
            '连接和操作客户内部系统（ERP 查数据、写配置）',
            '常见客户问题的自动诊断和解决方案推荐',
            '查询和分析业务数据（销售 TOP10、库存异常等）'
        ],
        hasOther: true
    },
    {
        id: 'q18', section: '第四部分：场景价值与能力需求', type: 'multi', max: 2,
        title: '用 Dify / Coze / 扣子这类工具时，最大的门槛是什么？',
        hint: '最多选 2 项',
        options: [
            '需要懂 API 和技术配置，学习成本高',
            '搭 Agent 配置复杂，耗时长',
            '没有企业级权限管理，不敢给客户正式用',
            '和客户现有系统（ERP / CRM）打通麻烦',
            '没有标准化能力包，每次从头描述',
            '我们没用过这类工具'
        ],
        hasOther: true
    },
    {
        id: 'q19', section: '第五部分：商业模式与变现', type: 'single',
        title: '如果能把交付经验封装成「AI 能力包」发布到市场，你们有兴趣吗？',
        options: [
            '非常有兴趣，这是个新的收入来源',
            '有兴趣，但要看商业模式（怎么分成）',
            '有兴趣，但担心核心经验被抄走',
            '兴趣不大，更关注自己的交付效率',
            '没有兴趣'
        ]
    },
    {
        id: 'q20', section: '第五部分：商业模式与变现', type: 'multi',
        title: '你们愿意接受哪种商业模式？',
        options: [
            '按调用次数收费（每次调用收到分成）',
            '卖授权（一次性或年度授权费）',
            '平台按运行时长收费，收益全部归伙伴',
            '平台抽佣模式（X% 归平台，其余归伙伴）',
            '免费发布，导流增加曝光和客户'
        ],
        hasOther: true
    },
    {
        id: 'q22', section: '第五部分：商业模式与变现', type: 'single',
        title: '「交付即上架，运营即收入」——平台托管你的交付成果，客户持续用、自动计费、收益归你，感兴趣吗？',
        options: [
            '非常感兴趣，一次性项目变持续收入',
            '感兴趣，但担心客户数据安全和合规',
            '感兴趣，需要先看托管稳定性和 SLA',
            '兴趣一般，习惯传统项目交付模式',
            '没有兴趣'
        ]
    },
    {
        id: 'q23', section: '第六部分：产品方向验证', type: 'multi', max: 3,
        title: '从 idea 到上线运营，哪些环节最希望被 AI 大幅提效？',
        hint: '最多选 3 项',
        options: [
            '需求分析：AI 理解客户需求，生成文档 / 方案初稿',
            'Coding：AI 生成符合金蝶规范的代码',
            '测试验证：自动生成测试用例、执行测试',
            '部署托管：一键部署到客户内网或云端',
            '上线运营：数据看板、版本管理、异常监控',
            '协同交付：多人协同、客户在线评审验收',
            '能力复用：交付成果自动沉淀为可复用模块'
        ]
    },
    {
        id: 'q24', section: '第六部分：产品方向验证', type: 'single',
        title: '上面的环节中，哪一个被解决后对你们提升最大？',
        options: ['需求分析', 'Coding', '测试验证', '部署托管', '上线运营', '协同交付', '能力复用']
    },
    {
        id: 'q25', section: '第六部分：产品方向验证', type: 'single',
        title: '「做出来」→「自动干」→「封装用」这种渐进式路径对你们有吸引力吗？',
        options: [
            '非常有吸引力，正是理想的交付升级路径',
            '有吸引力，但可能只用其中 1-2 步',
            '吸引力一般，更希望三个方向独立使用',
            '没有吸引力',
            '不太理解，需看到实际产品才能判断'
        ]
    },
    {
        id: 'q26', section: '第六部分：产品方向验证', type: 'single',
        title: 'AI 能直接读取客户 ERP / 业务系统数据来帮你完成交付，你的态度是？',
        options: [
            '非常期待，能大幅提升交付效率',
            '有价值，但数据必须留在客户环境内',
            '有价值，必须通过客户安全评估',
            '不太放心，客户对 AI 读取数据比较谨慎',
            '客户基本不允许',
            '和我们的交付方式关系不大'
        ]
    },
    {
        id: 'q29', section: '第六部分：产品方向验证', type: 'multi', max: 2,
        title: '向客户推荐 AI 工具时，客户最常问的顾虑是什么？',
        hint: '最多选 2 项',
        options: [
            '数据安全，代码和业务数据不能传给外部 AI',
            '生成质量不稳定，不敢用于生产环境',
            '和金蝶苍穹 / 星空的兼容性',
            '价格太高，客户预算有限',
            '团队学习成本高',
            '没有明显顾虑，客户比较开放'
        ],
        hasOther: true
    },
    {
        id: 'q30', section: '第七部分：结尾', type: 'single',
        title: 'Lingee-Build 明天上线一个能力，你最希望先拿到哪个？',
        options: [
            '30 秒搭一个 demo 页面，现场演示直接成交',
            'AI 自动写符合苍穹规范的代码，我只做 review',
            '项目经验变成可复用模板，新项目直接套用',
            '做好的东西一键部署，不折腾环境',
            '交付成果自动上架运营，持续收钱',
            '端到端平台，从需求到上线到运营全打通',
            '都想要，看哪个先出来就先用哪个'
        ]
    },
    {
        id: 'q32', section: '第七部分：结尾', type: 'single',
        title: '你愿意参与后续 30 分钟的深度访谈吗？',
        options: ['愿意', '暂时不方便']
    }
];

// ========================================
// 应用状态
// ========================================
let currentIndex = -1; // -1 = 欢迎页
const answers = {};

// ========================================
// 渲染逻辑
// ========================================
function getVisibleQuestions() {
    return QUESTIONS.filter(q => {
        if (!q.showIf) return true;
        const [depId, keyword] = Object.entries(q.showIf)[0];
        const depAnswer = answers[depId];
        if (!depAnswer) return false;
        if (Array.isArray(depAnswer)) {
            return depAnswer.some(a => a.includes(keyword));
        }
        return depAnswer.includes(keyword);
    });
}

function render() {
    const container = document.getElementById('surveyContainer');
    const visible = getVisibleQuestions();
    const total = visible.length;

    // 欢迎页
    if (currentIndex === -1) {
        document.getElementById('progressFill').style.width = '0%';
        document.getElementById('progressText').textContent = '';
        document.getElementById('progressSection').textContent = '';
        document.getElementById('actionsBar').style.display = 'none';
        container.innerHTML = `
            <div class="question-card active welcome-card">
                <h1>Lingee-Build<br>生态伙伴 AI 需求调研</h1>
                <p>感谢参与！本次调研约 10 分钟。<br>
                我们正在研究金蝶生态伙伴在 AI 时代的真实工作需求，<br>
                帮助我们把 Lingee-Build 产品做得更贴合你们的业务场景。<br><br>
                所有回答匿名处理，仅用于产品设计参考。</p>
                <button class="btn-start" onclick="goNext()">开始填写 →</button>
            </div>
        `;
        return;
    }

    // 完成页
    if (currentIndex >= total) {
        document.getElementById('progressFill').style.width = '100%';
        document.getElementById('progressText').textContent = '完成';
        document.getElementById('progressSection').textContent = '🎉';
        document.getElementById('actionsBar').style.display = 'none';
        container.innerHTML = `
            <div class="question-card active end-card">
                <h2>✅ 提交中...</h2>
                <p>正在保存你的回答...</p>
            </div>
        `;
        submitData();
        return;
    }

    // 正常题目
    const q = visible[currentIndex];
    if (!q) {
        // 安全兜底：如果索引越界回退
        currentIndex = total - 1;
        render();
        return;
    }
    const progress = Math.round(((currentIndex + 1) / total) * 100);
    document.getElementById('progressFill').style.width = progress + '%';
    document.getElementById('progressText').textContent = `${currentIndex + 1} / ${total}`;
    document.getElementById('progressSection').textContent = q.section;

    let html = `<div class="question-card active">`;
    // 在题目上方显示用户信息（Q33之后的题）
    if (q.id !== 'q33' && answers['q33']) {
        const info = answers['q33'];
        const userName = info.name || '匿名';
        const userCompany = info.company ? ` · ${info.company}` : '';
        html += `<div class="user-badge">👤 ${userName}${userCompany}</div>`;
    }
    html += `<div class="q-title">${q.title}</div>`;
    if (q.hint) html += `<div class="q-hint">${q.hint}</div>`;

    if (q.type === 'text') {
        html += `<div class="text-inputs">`;
        q.fields.forEach(f => {
            const val = (answers[q.id] && answers[q.id][f.key]) || '';
            html += `<input type="text" data-field="${f.key}" placeholder="${f.placeholder}" value="${val}">`;
        });
        html += `</div>`;
    } else {
        html += `<div class="options">`;
        const currentAnswer = answers[q.id] || (q.type === 'multi' ? [] : '');

        q.options.forEach((opt, i) => {
            let cls = 'opt-btn';
            if (q.type === 'single' && currentAnswer === opt) cls += ' selected';
            if (q.type === 'multi' && currentAnswer.includes(opt)) cls += ' selected-multi';
            // 如果达到 max 且未选中，disabled
            let disabled = '';
            if (q.type === 'multi' && q.max && currentAnswer.length >= q.max && !currentAnswer.includes(opt)) {
                disabled = ' style="opacity:0.4;pointer-events:none;"';
            }
            html += `<button class="${cls}" data-idx="${i}" data-value="${opt}"${disabled}>${opt}</button>`;
        });

        if (q.hasOther) {
            const otherVal = answers[q.id + '_other'] || '';
            const otherSelected = (q.type === 'single' && currentAnswer === '__other__') || (q.type === 'multi' && currentAnswer.includes('__other__'));
            let otherCls = 'opt-btn';
            if (q.type === 'single' && otherSelected) otherCls += ' selected';
            if (q.type === 'multi' && otherSelected) otherCls += ' selected-multi';
            html += `<button class="${otherCls}" data-idx="other" data-value="__other__">其他</button>`;
            html += `<div class="other-wrap ${otherSelected ? 'show' : ''}"><input class="other-input" placeholder="请补充..." value="${otherVal}"></div>`;
        }
        html += `</div>`;
    }

    // 操作按钮 - 固定底部栏，独立于卡片更新
    html += `</div>`;

    container.innerHTML = html;

    // 更新底部按钮栏
    const actionsBar = document.getElementById('actionsBar');
    const btnPrev = document.getElementById('btnPrev');
    const btnNext = document.getElementById('btnNext');
    actionsBar.style.display = 'flex';
    btnPrev.style.display = currentIndex > 0 ? 'block' : 'none';
    const isLast = currentIndex === total - 1;
    btnNext.textContent = isLast ? '提交问卷 ✓' : '下一题 →';

    // 绑定事件
    bindOptionEvents(q);
}

function bindOptionEvents(q) {
    const btns = document.querySelectorAll('.opt-btn');

    btns.forEach(btn => {
        btn.addEventListener('click', () => {
            const value = btn.dataset.value;

            if (q.type === 'single') {
                answers[q.id] = value;
                // 如果选了"其他"，显示输入框
                if (value === '__other__') {
                    document.querySelector('.other-wrap')?.classList.add('show');
                    setTimeout(() => document.querySelector('.other-input')?.focus(), 100);
                } else {
                    // 更新选中状态
                    document.querySelectorAll('.opt-btn').forEach(b => b.classList.remove('selected'));
                    btn.classList.add('selected');
                }
            } else if (q.type === 'multi') {
                if (!answers[q.id]) answers[q.id] = [];
                const idx = answers[q.id].indexOf(value);
                if (idx > -1) {
                    // 取消选中
                    answers[q.id].splice(idx, 1);
                    btn.classList.remove('selected-multi');
                } else {
                    if (q.max && answers[q.id].length >= q.max) return;
                    answers[q.id].push(value);
                    btn.classList.add('selected-multi');
                }
                // 更新 max 限制的禁用状态
                if (q.max) {
                    const allBtns = document.querySelectorAll('.opt-btn');
                    allBtns.forEach(b => {
                        if (!b.classList.contains('selected-multi')) {
                            if (answers[q.id].length >= q.max) {
                                b.style.opacity = '0.4';
                                b.style.pointerEvents = 'none';
                            } else {
                                b.style.opacity = '';
                                b.style.pointerEvents = '';
                            }
                        }
                    });
                }
                // 显示"其他"输入框
                if (value === '__other__') {
                    const otherWrap = document.querySelector('.other-wrap');
                    if (answers[q.id].includes('__other__')) {
                        otherWrap?.classList.add('show');
                        setTimeout(() => document.querySelector('.other-input')?.focus(), 100);
                    } else {
                        otherWrap?.classList.remove('show');
                    }
                }
            }
        });
    });

    // 其他输入框
    const otherInput = document.querySelector('.other-input');
    if (otherInput) {
        otherInput.addEventListener('input', (e) => {
            answers[q.id + '_other'] = e.target.value;
        });
        // 按回车跳下一题
        otherInput.addEventListener('keydown', (e) => {
            if (e.key === 'Enter') goNext();
        });
    }

    // 文本输入题
    const textInputs = document.querySelectorAll('.text-inputs input');
    textInputs.forEach(input => {
        input.addEventListener('input', (e) => {
            if (!answers[q.id]) answers[q.id] = {};
            answers[q.id][e.target.dataset.field] = e.target.value;
        });
    });
}

function goNext() {
    currentIndex++;
    const visible = getVisibleQuestions();
    // 不超过题目总数（等于 total 时 render 会触发提交）
    if (currentIndex > visible.length) currentIndex = visible.length;
    render();
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

function goPrev() {
    currentIndex--;
    if (currentIndex < 0) currentIndex = 0;
    // 回退时也需要考虑条件题变化，确保不落在不可见的题上
    const visible = getVisibleQuestions();
    if (currentIndex >= visible.length) currentIndex = visible.length - 1;
    render();
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

// ========================================
// 提交数据
// ========================================
async function submitData() {
    const md = generateMarkdown();

    try {
        await submitToGitHub(md);
        document.getElementById('surveyContainer').innerHTML = `
            <div class="question-card active end-card">
                <h2>✅ 提交成功！</h2>
                <p>感谢你的参与！<br>你的每一个回答都在帮助我们把 Lingee-Build<br>打造成对生态伙伴真正有价值的平台。</p>
            </div>
        `;
    } catch (err) {
        showError('提交失败：' + err.message);
        currentIndex--;
        setTimeout(() => render(), 2000);
    }
}

function generateMarkdown() {
    const visible = getVisibleQuestions();
    const timestamp = new Date().toLocaleString('zh-CN', { timeZone: 'Asia/Shanghai' });
    let md = `\n---\n\n## 📋 问卷回复\n\n`;
    md += `**提交时间**：${timestamp}\n\n`;

    visible.forEach(q => {
        const ans = answers[q.id];
        if (!ans || (Array.isArray(ans) && ans.length === 0)) return;

        let display = '';
        if (q.type === 'text') {
            display = Object.entries(ans).map(([k, v]) => v ? `${k}: ${v}` : '').filter(Boolean).join(' / ');
        } else if (Array.isArray(ans)) {
            display = ans.map(a => a === '__other__' ? `其他（${answers[q.id + '_other'] || ''}）` : a).join('、');
        } else {
            display = ans === '__other__' ? `其他（${answers[q.id + '_other'] || ''}）` : ans;
        }

        if (display) {
            md += `**${q.title}**\n\n${display}\n\n`;
        }
    });

    return md;
}

async function submitToGitHub(markdownContent) {
    const token = CONFIG.token;
    const baseUrl = `https://api.github.com/repos/${CONFIG.owner}/${CONFIG.repo}/contents`;
    const headers = { 'Authorization': `token ${token}`, 'Content-Type': 'application/json', 'Accept': 'application/vnd.github.v3+json' };

    // 生成文件名：时间戳_姓名
    const now = new Date();
    const ts = now.toISOString().replace(/[:.]/g, '-').slice(0, 19);
    const info = answers['q33'] || {};
    const nameSlug = (info.name || '匿名').replace(/\s+/g, '');
    const fileName = `${ts}_${nameSlug}.md`;
    const filePath = `record/${fileName}`;

    // 1. 创建新的单独问卷文件
    const fileContent = btoa(unescape(encodeURIComponent(markdownContent)));
    const createRes = await fetch(`${baseUrl}/${filePath}`, {
        method: 'PUT',
        headers,
        body: JSON.stringify({
            message: `📋 新问卷：${info.name || '匿名'} - ${info.company || '未知公司'}`,
            content: fileContent,
            branch: CONFIG.branch
        })
    });

    if (!createRes.ok) {
        const err = await createRes.json();
        throw new Error(err.message || '创建文件失败');
    }

    // 2. 更新 record.md 汇总列表
    const listUrl = `${baseUrl}/record.md`;
    let existingContent = '';
    let sha = '';

    try {
        const getRes = await fetch(listUrl, {
            headers: { 'Authorization': `token ${token}`, 'Accept': 'application/vnd.github.v3+json' }
        });
        if (getRes.ok) {
            const fileData = await getRes.json();
            existingContent = decodeURIComponent(escape(atob(fileData.content.replace(/\n/g, ''))));
            sha = fileData.sha;
        }
    } catch (e) { /* 文件不存在 */ }

    const timestamp = now.toLocaleString('zh-CN', { timeZone: 'Asia/Shanghai' });
    const company = info.company || '未填写';
    const city = info.city || '未填写';
    const newLine = `| ${timestamp} | ${info.name || '匿名'} | ${company} | ${city} | [查看](${filePath}) |\n`;

    // 如果文件为空或刚创建，加表头
    if (!existingContent || !existingContent.includes('| 时间 |')) {
        existingContent = `# Lingee-Build 调研问卷回复汇总\n\n| 时间 | 姓名 | 公司 | 城市 | 详情 |\n| --- | --- | --- | --- | --- |\n`;
    }

    const newContent = existingContent + newLine;
    const encodedContent = btoa(unescape(encodeURIComponent(newContent)));

    const body = {
        message: `📋 更新汇总：${info.name || '匿名'}`,
        content: encodedContent,
        branch: CONFIG.branch
    };
    if (sha) body.sha = sha;

    await fetch(listUrl, {
        method: 'PUT',
        headers,
        body: JSON.stringify(body)
    });
    // 汇总更新失败不阻塞（主文件已创建成功）
}

function showError(msg) {
    const toast = document.getElementById('errorToast');
    toast.textContent = msg;
    toast.style.display = 'block';
    setTimeout(() => { toast.style.display = 'none'; }, 3000);
}

// ========================================
// 启动
// ========================================
document.addEventListener('DOMContentLoaded', () => render());
