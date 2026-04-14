// js/admin/company_view.js

// Sample companies data - will be synced with companies.js
let companiesDataView = [
    { name: 'Google India', industry: 'Technology', tier: 'Tier 1', activeJobs: 8, placements: 256, status: 'active', positions: [{ title: 'Software Engineer', salary: '12-18 LPA', skills: 'Python, Java' }, { title: 'Product Manager', salary: '15-20 LPA', skills: 'Analytics, Leadership' }] },
    { name: 'Microsoft India', industry: 'Technology', tier: 'Tier 1', activeJobs: 6, placements: 198, status: 'active', positions: [{ title: 'Cloud Developer', salary: '10-16 LPA', skills: 'Azure, C#' }] },
    { name: 'J.P. Morgan', industry: 'Fintech', tier: 'Tier 1', activeJobs: 5, placements: 142, status: 'active', positions: [{ title: 'Analyst', salary: '8-14 LPA', skills: 'Finance, SQL' }] },
    { name: 'Goldman Sachs', industry: 'Finance', tier: 'Tier 1', activeJobs: 4, placements: 118, status: 'active', positions: [] },
    { name: 'TCS', industry: 'IT Services', tier: 'Tier 2', activeJobs: 12, placements: 1450, status: 'active', positions: [{ title: 'IT Associate', salary: '3-4.5 LPA', skills: 'Java, SQL' }, { title: 'Senior Developer', salary: '8-12 LPA', skills: 'Java, Microservices' }] },
    { name: 'Infosys', industry: 'IT Services', tier: 'Tier 2', activeJobs: 10, placements: 980, status: 'active', positions: [{ title: 'Systems Engineer', salary: '3-4.5 LPA', skills: 'C++, Unix' }] },
    { name: 'Wipro', industry: 'IT Services', tier: 'Tier 2', activeJobs: 9, placements: 856, status: 'active', positions: [] },
    { name: 'HCL Technologies', industry: 'IT Services', tier: 'Tier 2', activeJobs: 7, placements: 654, status: 'active', positions: [] },
    { name: 'Cognizant', industry: 'IT Services', tier: 'Tier 2', activeJobs: 8, placements: 745, status: 'active', positions: [] },
    { name: 'Amazon India', industry: 'E-commerce', tier: 'Tier 1', activeJobs: 9, placements: 287, status: 'active', positions: [{ title: 'SDE I', salary: '15-22 LPA', skills: 'DSA, Java/Python' }] },
    { name: 'Adobe Systems', industry: 'Software', tier: 'Tier 1', activeJobs: 3, placements: 94, status: 'active', positions: [] },
    { name: 'Accenture', industry: 'Consulting', tier: 'Tier 2', activeJobs: 11, placements: 1120, status: 'active', positions: [] },
    { name: 'Deloitte', industry: 'Consulting', tier: 'Tier 2', activeJobs: 6, placements: 542, status: 'active', positions: [] },
    { name: 'KPMG', industry: 'Consulting', tier: 'Tier 2', activeJobs: 5, placements: 398, status: 'active', positions: [] },
    { name: 'McKinsey & Company', industry: 'Consulting', tier: 'Tier 1', activeJobs: 2, placements: 76, status: 'active', positions: [] },
    { name: 'TechStartup AI', industry: 'AI/ML', tier: 'Startup', activeJobs: 3, placements: 28, status: 'active', positions: [] },
    { name: 'CloudNine Solutions', industry: 'Cloud Computing', tier: 'Startup', activeJobs: 2, placements: 15, status: 'inactive', positions: [] },
    { name: 'DataViz Analytics', industry: 'Analytics', tier: 'Startup', activeJobs: 1, placements: 8, status: 'active', positions: [] },
];

function getTierBadgeClass(tier) {
    switch(tier) {
        case 'Tier 1': return 'tag-tier1';
        case 'Tier 2': return 'tag-tier2';
        case 'Startup': return 'tag-startup';
        default: return 'tag-info';
    }
}

function getTierDisplay(tier) {
    return tier === 'Startup' ? 'Startup' : tier;
}

function getStatusBadgeClass(status) {
    return status === 'active' ? 'tag-success' : 'tag-muted';
}

function getInitials(name) {
    return name.split(' ').map(word => word[0]).join('').toUpperCase().slice(0, 2);
}

export function render(container, app) {
    const companyName = sessionStorage.getItem('selectedCompany') || 'Google India';
    
    const company = companiesDataView.find(c => c.name === companyName) || {
        name: 'Google India',
        industry: 'Technology',
        tier: 'Tier 1',
        activeJobs: 8,
        placements: 256,
        status: 'active',
        positions: []
    };

    container.innerHTML = `
        <div style="padding: 24px 32px;">
            <!-- Header with Back Button -->
            <div style="display: flex; align-items: center; gap: 16px; margin-bottom: 32px;">
                <button id="backBtn" style="background: linear-gradient(135deg, var(--primary), #0f2f61); color: white; border: none; padding: 10px 20px; border-radius: 8px; cursor: pointer; font-weight: 600; font-size: 0.95rem; transition: all 0.3s;">← Back to Companies</button>
                <h1 style="margin: 0; font-size: 2rem; color: var(--primary);">${company.name}</h1>
            </div>

            <!-- Main Content Grid -->
            <div style="display: grid; grid-template-columns: 1fr 2fr; gap: 32px;">
                <!-- Left Sidebar -->
                <div style="display: flex; flex-direction: column; gap: 24px;">
                    <div class="card" style="border-radius: 16px; padding: 28px; background: #ffffff; box-shadow: 0 10px 30px rgba(15, 23, 42, 0.08); border: 1px solid #e2e8f0;">
                        <div style="display: flex; align-items: center; gap: 18px; margin-bottom: 22px;">
                            <div style="width: 72px; height: 72px; border-radius: 18px; background: linear-gradient(135deg, #eff6ff, #dbeafe); color: var(--primary); display: flex; align-items: center; justify-content: center; font-size: 1.6rem; font-weight: 800; border: 1px solid #bfdbfe;">${getInitials(company.name)}</div>
                            <div>
                                <p style="margin: 0 0 6px 0; font-size: 0.78rem; font-weight: 700; letter-spacing: 0.5px; color: #64748b; text-transform: uppercase;">Company</p>
                                <h2 style="margin: 0; font-size: 1.5rem; font-weight: 800; color: #0f172a;">${company.name}</h2>
                                <p style="margin: 6px 0 0 0; color: #475569; font-size: 0.95rem;">${company.industry}</p>
                            </div>
                        </div>

                        <div style="display: grid; gap: 16px;">
                            <div style="padding: 14px 0; border-top: 1px solid #e2e8f0;">
                                <p style="font-size: 0.75rem; color: #64748b; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px; margin: 0 0 8px 0;">Industry</p>
                                <p style="font-size: 1rem; font-weight: 600; color: var(--text-main); margin: 0;">${company.industry}</p>
                            </div>
                            <div style="padding: 14px 0; border-top: 1px solid #e2e8f0;">
                                <p style="font-size: 0.75rem; color: #64748b; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px; margin: 0 0 8px 0;">Company Tier</p>
                                <div>${company.tier === 'Tier 1' ? `<span class="tag tag-tier1">Tier 1</span>` : company.tier === 'Tier 2' ? `<span class="tag tag-tier2">Tier 2</span>` : `<span class="tag tag-startup">Startup</span>`}</div>
                            </div>
                            <div style="padding: 14px 0; border-top: 1px solid #e2e8f0;">
                                <p style="font-size: 0.75rem; color: #64748b; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px; margin: 0 0 8px 0;">Status</p>
                                <div>${company.status === 'active' ? `<span class="tag tag-success">Active Partner</span>` : `<span class="tag tag-muted">Inactive</span>`}</div>
                            </div>
                            <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 12px; padding-top: 8px;">
                                <div style="background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 12px; padding: 14px; text-align: center;">
                                    <p style="margin: 0 0 6px 0; font-size: 0.72rem; font-weight: 700; color: #64748b; text-transform: uppercase;">Placements</p>
                                    <p style="margin: 0; font-size: 1.3rem; font-weight: 800; color: #0f172a;">${company.placements}</p>
                                </div>
                                <div style="background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 12px; padding: 14px; text-align: center;">
                                    <p style="margin: 0 0 6px 0; font-size: 0.72rem; font-weight: 700; color: #64748b; text-transform: uppercase;">Jobs</p>
                                    <p style="margin: 0; font-size: 1.3rem; font-weight: 800; color: #0f172a;">${company.activeJobs}</p>
                                </div>
                                <div style="background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 12px; padding: 14px; text-align: center;">
                                    <p style="margin: 0 0 6px 0; font-size: 0.72rem; font-weight: 700; color: #64748b; text-transform: uppercase;">Open</p>
                                    <p style="margin: 0; font-size: 1.3rem; font-weight: 800; color: #0f172a;">${(company.positions || []).length}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Right Content -->
                <div style="display: flex; flex-direction: column; gap: 24px;">
                    <!-- Open Positions Section -->
                    <div class="card" style="border-radius: 16px; box-shadow: 0 10px 30px rgba(15, 23, 42, 0.08); overflow: hidden; background: #ffffff; border: 1px solid #e2e8f0;">
                        <div style="background: #ffffff; padding: 22px 24px; border-bottom: 1px solid #e2e8f0; display: flex; justify-content: space-between; align-items: center;">
                            <h3 style="font-size: 1.15rem; font-weight: 800; margin: 0; color: #0f172a;">Open Positions</h3>
                            <span style="background: #eff6ff; color: var(--primary); padding: 8px 14px; border-radius: 999px; font-weight: 800; font-size: 0.95rem; border: 1px solid #bfdbfe;">${(company.positions || []).length}</span>
                        </div>
                        <div style="padding: 24px;">
                            ${(company.positions && company.positions.length > 0) ? `
                                <div style="display: grid; gap: 16px;">
                                    ${company.positions.map((pos, idx) => `
                                        <div style="padding: 18px; background: #f8fafc; border-radius: 14px; border: 1px solid #e2e8f0; border-left: 4px solid var(--primary);">
                                            <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 16px;">
                                                <div style="flex: 1;">
                                                    <h4 style="font-size: 1.05rem; font-weight: 700; color: var(--primary); margin: 0 0 6px 0;">${pos.title}</h4>
                                                    <p style="font-size: 0.85rem; color: #64748b; margin: 0; font-weight: 500;">Position ${idx + 1} of ${company.positions.length}</p>
                                                </div>
                                                <div style="background: #ffffff; color: var(--primary); width: 40px; height: 40px; border-radius: 10px; display: flex; align-items: center; justify-content: center; font-weight: 800; font-size: 1.05rem; flex-shrink: 0; border: 1px solid #bfdbfe;">${idx + 1}</div>
                                            </div>
                                            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 12px;">
                                                <div style="padding: 14px; background: white; border-radius: 8px; border: 1px solid #e2e8f0;">
                                                    <p style="font-size: 0.7rem; color: #64748b; font-weight: 700; text-transform: uppercase; letter-spacing: 0.4px; margin: 0 0 8px 0;">Salary Range</p>
                                                    <p style="font-size: 1rem; font-weight: 700; color: #10b981; margin: 0;">${pos.salary}</p>
                                                </div>
                                                <div style="padding: 14px; background: white; border-radius: 8px; border: 1px solid #e2e8f0;">
                                                    <p style="font-size: 0.7rem; color: #64748b; font-weight: 700; text-transform: uppercase; letter-spacing: 0.4px; margin: 0 0 8px 0;">Required Skills</p>
                                                    <p style="font-size: 0.9rem; font-weight: 600; color: #1e40af; margin: 0;">${pos.skills}</p>
                                                </div>
                                            </div>
                                        </div>
                                    `).join('')}
                                </div>
                            ` : `
                                <div style="padding: 40px; text-align: center; background: linear-gradient(135deg, #f8fafc, #f1f5f9); border-radius: 10px; border: 2px dashed #cbd5e1;">
                                    <p style="color: #64748b; font-size: 1.1rem; font-weight: 500; margin: 0;">No open positions at this moment</p>
                                </div>
                            `}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `;

    const backBtn = container.querySelector('#backBtn');
    if (backBtn) {
        backBtn.addEventListener('click', () => {
            sessionStorage.removeItem('selectedCompany');
            app.navigateTo('companies');
        });
    }
}
