// js/student/history.js

export function render(container, app) {
    const archiveData = [
        // 2024-2025
        { year: "2024-2025", dept: "CSE", company: "Google India", role: "SDE / Analyst", placed: 12, highest: "₹45.0 LPA", average: "₹18.5 LPA" },
        { year: "2024-2025", dept: "CSE", company: "Microsoft", role: "SDE I", placed: 8, highest: "₹42.0 LPA", average: "₹16.2 LPA" },
        { year: "2024-2025", dept: "ECE", company: "Qualcomm", role: "Hardware Engineer", placed: 6, highest: "₹32.5 LPA", average: "₹14.0 LPA" },
        { year: "2024-2025", dept: "ECE", company: "Intel", role: "VLSI Design", placed: 4, highest: "₹28.0 LPA", average: "₹12.5 LPA" },
        { year: "2024-2025", dept: "ME", company: "Tata Motors", role: "GET", placed: 15, highest: "₹12.0 LPA", average: "₹7.5 LPA" },
        { year: "2024-2025", dept: "ME", company: "L&T", role: "Project Engineer", placed: 10, highest: "₹9.5 LPA", average: "₹6.8 LPA" },

        // 2023-2024
        { year: "2023-2024", dept: "CSE", company: "Amazon", role: "Cloud Associate", placed: 18, highest: "₹32.0 LPA", average: "₹14.2 LPA" },
        { year: "2023-2024", dept: "CSE", company: "Adobe", role: "Member Tech Staff", placed: 5, highest: "₹35.0 LPA", average: "₹15.5 LPA" },
        { year: "2023-2024", dept: "ECE", company: "Texas Instruments", role: "Embedded Dev", placed: 3, highest: "₹25.0 LPA", average: "₹11.2 LPA" },
        { year: "2023-2024", dept: "ECE", company: "Samsung", role: "R&D Engineer", placed: 7, highest: "₹22.0 LPA", average: "₹10.5 LPA" },
        { year: "2023-2024", dept: "ME", company: "Maruti Suzuki", role: "Design Engineer", placed: 12, highest: "₹10.5 LPA", average: "₹7.2 LPA" },
        { year: "2023-2024", dept: "ME", company: "BOSCH", role: "Systems Specialist", placed: 8, highest: "₹11.2 LPA", average: "₹7.8 LPA" },

        // 2022-2023
        { year: "2022-2023", dept: "CSE", company: "TCS Digital", role: "System Engineer", placed: 156, highest: "₹7.5 LPA", average: "₹7.0 LPA" },
        { year: "2022-2023", dept: "ECE", company: "Infosys", role: "Specialist Programmer", placed: 45, highest: "₹9.5 LPA", average: "₹6.5 LPA" },
        { year: "2022-2023", dept: "ME", company: "Mahindra & Mahindra", role: "Manufacturing Lead", placed: 20, highest: "₹8.5 LPA", average: "₹6.2 LPA" }
    ];

    let currentYear = "2024-2025";
    let currentDept = "All Departments";

    const renderSelf = () => {
        const filteredRecords = archiveData.filter(record => {
            const matchYear = record.year === currentYear;
            const matchDept = currentDept === "All Departments" || record.dept === currentDept;
            return matchYear && matchDept;
        });

        container.innerHTML = `
            <div class="dashboard-header" style="margin-bottom: 32px;">
                <h1 style="font-size: 2rem; color: var(--primary);">Placement History</h1>
                <p style="color: var(--text-muted);">View companies and placement records from previous years.</p>
            </div>

            <div class="card" style="margin-bottom: 32px;">
                <div style="display: flex; gap: 16px; align-items: flex-end;">
                    <div class="form-group" style="flex: 1; margin-bottom: 0;">
                        <label>SELECT ACADEMIC YEAR</label>
                        <select id="year-select" style="width: 100%; padding: 12px; border: 1px solid var(--border); border-radius: 8px;">
                            <option ${currentYear === '2024-2025' ? 'selected' : ''}>2024-2025</option>
                            <option ${currentYear === '2023-2024' ? 'selected' : ''}>2023-2024</option>
                            <option ${currentYear === '2022-2023' ? 'selected' : ''}>2022-2023</option>
                            <option ${currentYear === '2021-2022' ? 'selected' : ''}>2021-2022</option>
                        </select>
                    </div>
                    <div class="form-group" style="flex: 1; margin-bottom: 0;">
                        <label>DEPARTMENT</label>
                        <select id="dept-select" style="width: 100%; padding: 12px; border: 1px solid var(--border); border-radius: 8px;">
                            <option ${currentDept === 'All Departments' ? 'selected' : ''}>All Departments</option>
                            <option ${currentDept === 'CSE' ? 'selected' : ''}>CSE</option>
                            <option ${currentDept === 'ECE' ? 'selected' : ''}>ECE</option>
                            <option ${currentDept === 'ME' ? 'selected' : ''}>ME</option>
                        </select>
                    </div>
                    <button class="btn-primary" id="search-history-btn" style="min-width: 150px;">Search Records</button>
                </div>
            </div>

            <div class="card">
                <div class="data-table-container">
                    <table style="width: 100%; border-collapse: collapse;">
                        <thead>
                            <tr style="text-align: left; border-bottom: 1px solid var(--border);">
                                <th style="padding: 16px;">Year</th>
                                <th style="padding: 16px;">Dept</th>
                                <th style="padding: 16px;">Company</th>
                                <th style="padding: 16px;">Job Role</th>
                                <th style="padding: 16px;">Total Placed</th>
                                <th style="padding: 16px;">Highest Package</th>
                                <th style="padding: 16px;">Average Package</th>
                            </tr>
                        </thead>
                        <tbody>
                            ${filteredRecords.length > 0 
                                ? filteredRecords.map(record => `
                                    <tr style="border-bottom: 1px solid var(--border);">
                                        <td style="padding: 16px; font-weight: 600; color: var(--primary);">${record.year}</td>
                                        <td style="padding: 16px;"><span class="tag tag-info">${record.dept}</span></td>
                                        <td style="padding: 16px;"><b>${record.company}</b></td>
                                        <td style="padding: 16px;">${record.role}</td>
                                        <td style="padding: 16px;">${record.placed}</td>
                                        <td style="padding: 16px; color: var(--success); font-weight: 700;">${record.highest}</td>
                                        <td style="padding: 16px; font-weight: 600;">${record.average}</td>
                                    </tr>
                                `).join('')
                                : `<tr>
                                    <td colspan="7" style="text-align: center; padding: 48px; color: var(--text-muted);">
                                        No placement records found for this criteria.
                                    </td>
                                   </tr>`
                            }
                        </tbody>
                    </table>
                </div>
            </div>
        `;

        setupHandlers();
    };

    const setupHandlers = () => {
        document.getElementById('search-history-btn').addEventListener('click', () => {
            currentYear = document.getElementById('year-select').value;
            currentDept = document.getElementById('dept-select').value;
            renderSelf();
        });
    };

    renderSelf();
}
