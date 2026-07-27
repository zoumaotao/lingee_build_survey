// ========================================
// Lingee-Build 调研问卷 - 前端逻辑
// ========================================

// GitHub配置 - Token混淆存储
const CONFIG = {
    get token() {
        // base64编码的token，避免源码明文暴露
        const _t = ['Z2hwX0ZZcFRSbVhu', 'RzQ1M213Vmdoclp3', 'c3o2SDdxV1d5aDFV', 'TWxrbQ=='];
        return atob(_t.join(''));
    },
    owner: 'zoumaotao',
    repo: 'lingee_build_survey',
    branch: 'main',
    path: 'record.md'
};

// ========================================
// 条件显示逻辑
// ========================================
function setupConditionalQuestions() {
    // Q14 -> Q15/Q16/Q17
    const q14Checkboxes = document.querySelectorAll('input[name="q14"]');
    q14Checkboxes.forEach(cb => {
        cb.addEventListener('change', () => {
            const checked = Array.from(q14Checkboxes).filter(c => c.checked).map(c => c.value);
            document.getElementById('q15_block').classList.toggle('show', checked.includes('做出来'));
            document.getElementById('q16_block').classList.toggle('show', checked.includes('自动干'));
            document.getElementById('q17_block').classList.toggle('show', checked.includes('封装用'));
        });
    });

    // Q27 -> Q28
    const q27Radios = document.querySelectorAll('input[name="q27"]');
    q27Radios.forEach(radio => {
        radio.addEventListener('change', () => {
            const val = document.querySelector('input[name="q27"]:checked')?.value || '';
            const showQ28 = val.includes('专属版');
            document.getElementById('q28_block').classList.toggle('show', showQ28);
        });
    });
}

// ========================================
// 多选限制逻辑
// ========================================
function setupMaxSelection() {
    const groups = {};
    document.querySelectorAll('input[type="checkbox"][data-max]').forEach(cb => {
        const name = cb.name;
        const max = parseInt(cb.dataset.max);
        if (!groups[name]) groups[name] = { max, checkboxes: [] };
        groups[name].checkboxes.push(cb);
    });

    Object.values(groups).forEach(group => {
        group.checkboxes.forEach(cb => {
            cb.addEventListener('change', () => {
                const checkedCount = group.checkboxes.filter(c => c.checked).length;
                if (checkedCount >= group.max) {
                    group.checkboxes.forEach(c => {
                        if (!c.checked) c.disabled = true;
                    });
                } else {
                    group.checkboxes.forEach(c => c.disabled = false);
                }
            });
        });
    });
}

// ========================================
// 收集表单数据
// ========================================
function collectFormData() {
    const data = {};
    const timestamp = new Date().toLocaleString('zh-CN', { timeZone: 'Asia/Shanghai' });
    data['提交时间'] = timestamp;

    // 单选题
    const radioQuestions = ['q1','q3','q5','q12','q19','q21','q22','q24','q25','q26','q27','q28','q30','q31','q32'];
    radioQuestions.forEach(q => {
        const selected = document.querySelector(`input[name="${q}"]:checked`);
        data[q] = selected ? selected.value : '未填写';
    });

    // 多选题
    const checkboxQuestions = ['q2','q4','q6','q7','q8','q9','q10','q11','q13','q14','q15','q16','q17','q18','q20','q23','q29'];
    checkboxQuestions.forEach(q => {
        const checked = Array.from(document.querySelectorAll(`input[name="${q}"]:checked`)).map(c => c.value);
        data[q] = checked.length > 0 ? checked.join('、') : '未填写';
    });

    // 其他输入
    const otherInputs = ['q1','q2','q4','q6','q7','q9','q10','q11','q12','q13','q15','q16','q17','q18','q20','q21','q29'];
    otherInputs.forEach(q => {
        const input = document.getElementById(`${q}_other`);
        if (input && input.value.trim()) {
            data[q] += `（补充：${input.value.trim()}）`;
        }
    });

    // Q33 个人信息
    const company = document.getElementById('q33_company').value.trim();
    const name = document.getElementById('q33_name').value.trim();
    const contact = document.getElementById('q33_contact').value.trim();
    data['q33_company'] = company || '未填写';
    data['q33_name'] = name || '未填写';
    data['q33_contact'] = contact || '未填写';

    return data;
}

// ========================================
// 生成 Markdown 内容
// ========================================
function generateMarkdown(data) {
    let md = `\n---\n\n## 📋 问卷回复 #${Date.now()}\n\n`;
    md += `**提交时间**：${data['提交时间']}\n\n`;

    const questions = {
        'q1': 'Q1. 公司角色',
        'q2': 'Q2. 与金蝶合作模式',
        'q3': 'Q3. 最想用 AI Building 做什么',
        'q4': 'Q4. 主要服务哪类客户',
        'q5': 'Q5. 公司规模',
        'q6': 'Q6. 服务行业',
        'q7': 'Q7. 交付业务领域',
        'q8': 'Q8. 了解的 AI 能力',
        'q9': 'Q9. 在用的 AI 工具',
        'q10': 'Q10. AI 工具不满意之处',
        'q11': 'Q11. 最重复耗时的工作',
        'q12': 'Q12. 最希望 AI 解决的问题',
        'q13': 'Q13. 交付经验存储方式',
        'q14': 'Q14. 最有价值的 AI 能力方向',
        'q15': 'Q15. 最想做出来的东西',
        'q16': 'Q16. 最希望数字员工做什么',
        'q17': 'Q17. 最希望封装的能力',
        'q18': 'Q18. Dify/Coze 等工具的门槛',
        'q19': 'Q19. 对发布能力包的兴趣',
        'q20': 'Q20. 接受的商业模式',
        'q21': 'Q21. 交付后的处理方式',
        'q22': 'Q22. 对托管运营模式的兴趣',
        'q23': 'Q23. 最希望 AI 接管的环节',
        'q24': 'Q24. 提升最大的环节',
        'q25': 'Q25. 渐进式路径吸引力',
        'q26': 'Q26. 对 AI 读取 ERP 数据的态度',
        'q27': 'Q27. 通用 vs 金蝶专属工具选择',
        'q28': 'Q28. 愿意多付多少',
        'q29': 'Q29. 客户最常问的顾虑',
        'q30': 'Q30. 最希望先拿到的能力',
        'q31': 'Q31. 是否愿意推荐给客户',
        'q32': 'Q32. 是否愿意参与深度访谈'
    };

    Object.entries(questions).forEach(([key, label]) => {
        if (data[key] && data[key] !== '未填写') {
            md += `| ${label} | ${data[key]} |\n`;
        }
    });

    md += `\n**联系信息**：\n`;
    md += `- 公司：${data['q33_company']}\n`;
    md += `- 姓名：${data['q33_name']}\n`;
    md += `- 联系方式：${data['q33_contact']}\n`;

    return md;
}

// ========================================
// 提交到 GitHub
// ========================================
async function submitToGitHub(markdownContent) {
    const url = `https://api.github.com/repos/${CONFIG.owner}/${CONFIG.repo}/contents/${CONFIG.path}`;

    // 先获取现有文件（如果存在）
    let existingContent = '';
    let sha = '';

    try {
        const getRes = await fetch(url, {
            headers: {
                'Authorization': `token ${CONFIG.token}`,
                'Accept': 'application/vnd.github.v3+json'
            }
        });

        if (getRes.ok) {
            const fileData = await getRes.json();
            existingContent = atob(fileData.content.replace(/\n/g, ''));
            sha = fileData.sha;
        }
    } catch (e) {
        // 文件不存在，创建新文件
    }

    // 拼接新内容
    const newContent = existingContent + markdownContent;
    const encodedContent = btoa(unescape(encodeURIComponent(newContent)));

    const body = {
        message: `📋 新问卷回复 - ${new Date().toLocaleString('zh-CN')}`,
        content: encodedContent,
        branch: CONFIG.branch
    };

    if (sha) {
        body.sha = sha;
    }

    const putRes = await fetch(url, {
        method: 'PUT',
        headers: {
            'Authorization': `token ${CONFIG.token}`,
            'Content-Type': 'application/json',
            'Accept': 'application/vnd.github.v3+json'
        },
        body: JSON.stringify(body)
    });

    if (!putRes.ok) {
        const errorData = await putRes.json();
        throw new Error(errorData.message || '提交失败');
    }

    return true;
}

// ========================================
// 表单提交
// ========================================
function handleSubmit(e) {
    e.preventDefault();

    const btn = document.getElementById('submitBtn');
    const errorEl = document.getElementById('globalError');

    btn.disabled = true;
    btn.textContent = '提交中...';
    errorEl.style.display = 'none';

    const data = collectFormData();
    const markdown = generateMarkdown(data);

    submitToGitHub(markdown)
        .then(() => {
            document.getElementById('surveyForm').style.display = 'none';
            document.getElementById('successMsg').style.display = 'block';
        })
        .catch(err => {
            errorEl.textContent = `提交失败：${err.message}。请检查网络或联系管理员。`;
            errorEl.style.display = 'block';
            btn.disabled = false;
            btn.textContent = '提交问卷';
        });
}

// ========================================
// 初始化
// ========================================
document.addEventListener('DOMContentLoaded', () => {
    setupConditionalQuestions();
    setupMaxSelection();
    document.getElementById('surveyForm').addEventListener('submit', handleSubmit);
});
