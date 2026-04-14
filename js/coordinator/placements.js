// js/coordinator/placements.js

// Mock coordinator's 10 students with placement status
const coordinatorStudents = [
  {
    id: 1,
    name: "Riddhi Sharma",
    cgpa: 9.82,
    status: "Placed",
    offers: 3,
    appliedCount: 6,
    companies: ["Google India", "Amazon", "Zomato"],
  },
  {
    id: 2,
    name: "Alex Sterling",
    cgpa: 9.42,
    status: "Placed",
    offers: 2,
    appliedCount: 6,
    companies: ["Amazon", "Microsoft"],
  },
  {
    id: 3,
    name: "Sara Chen",
    cgpa: 8.95,
    status: "Under Interview",
    offers: 0,
    appliedCount: 5,
    companies: ["Google India", "TCS", "Infosys"],
  },
  {
    id: 4,
    name: "Aman Verma",
    cgpa: 8.56,
    status: "Rejected",
    offers: 0,
    appliedCount: 4,
    companies: ["TCS", "Infosys"],
  },
  {
    id: 5,
    name: "Priya Desai",
    cgpa: 9.1,
    status: "Placed",
    offers: 2,
    appliedCount: 6,
    companies: ["Zomato", "Microsoft"],
  },
  {
    id: 6,
    name: "Rohan Singh",
    cgpa: 7.95,
    status: "Applied",
    offers: 0,
    appliedCount: 3,
    companies: ["TCS"],
  },
  {
    id: 7,
    name: "Neha Gupta",
    cgpa: 9.35,
    status: "Placed",
    offers: 1,
    appliedCount: 6,
    companies: ["Google India"],
  },
  {
    id: 8,
    name: "Vikram Patel",
    cgpa: 8.72,
    status: "Under Interview",
    offers: 0,
    appliedCount: 4,
    companies: ["Amazon", "Zomato"],
  },
  {
    id: 9,
    name: "Ananya Iyer",
    cgpa: 9.0,
    status: "Placed",
    offers: 2,
    appliedCount: 5,
    companies: ["Microsoft", "Infosys"],
  },
  {
    id: 10,
    name: "Siddhant Nair",
    cgpa: 8.4,
    status: "Applied",
    offers: 0,
    appliedCount: 2,
    companies: ["TCS"],
  },
];

let filterStatus = "All";
let searchQuery = "";

export function render(container, app) {
  updatePlacementsDisplay(container);

  setTimeout(() => {
    const statusSelect = container.querySelector("#filterStatus");
    const searchInput = container.querySelector("#searchStudent");

    if (statusSelect) {
      statusSelect.addEventListener("change", (e) => {
        filterStatus = e.target.value;
        updatePlacementsDisplay(container);
      });
    }

    if (searchInput) {
      searchInput.addEventListener("input", (e) => {
        searchQuery = e.target.value.toLowerCase();
        updatePlacementsDisplay(container);
      });
    }

    // Click on student row to show details
    const studentRows = container.querySelectorAll(".student-row");
    studentRows.forEach((row) => {
      row.addEventListener("click", () => {
        const studentId = parseInt(row.dataset.studentId);
        showStudentDetails(container, studentId);
      });
    });
  }, 0);
}

function updatePlacementsDisplay(container) {
  const filteredStudents = coordinatorStudents.filter((student) => {
    const statusMatch =
      filterStatus === "All" || student.status === filterStatus;
    const searchMatch = student.name.toLowerCase().includes(searchQuery);
    return statusMatch && searchMatch;
  });

  // Calculate summary stats
  const placedCount = coordinatorStudents.filter(
    (s) => s.status === "Placed",
  ).length;
  const rejectedCount = coordinatorStudents.filter(
    (s) => s.status === "Rejected",
  ).length;
  const interviewCount = coordinatorStudents.filter(
    (s) => s.status === "Under Interview",
  ).length;

  const uniqueCompanies = new Set();
  coordinatorStudents.forEach((s) =>
    s.companies.forEach((c) => uniqueCompanies.add(c)),
  );

  container.innerHTML = `
        <div class="dashboard-header" style="margin-bottom: 32px;">
            <h1 style="font-size: 2rem; color: var(--primary);">Student Placements</h1>
            <p style="color: var(--text-muted);">Overview of your 10 assigned students' placement status and company applications.</p>
        </div>

        <!-- Summary Stats -->
        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 20px; margin-bottom: 32px;">
            <div class="card" style="padding: 20px; text-align: center;">
                <label style="font-size: 0.7rem; color: var(--text-muted); text-transform: uppercase; font-weight: 600;">Total Students</label>
                <div style="font-size: 2.5rem; font-weight: 800; color: var(--primary); margin-top: 8px;">${coordinatorStudents.length}</div>
                <p style="margin: 8px 0 0 0; font-size: 0.8rem; color: var(--text-muted);">under your coordination</p>
            </div>
            <div class="card" style="padding: 20px; text-align: center;">
                <label style="font-size: 0.7rem; color: var(--text-muted); text-transform: uppercase; font-weight: 600;">Placed</label>
                <div style="font-size: 2.5rem; font-weight: 800; color: var(--success); margin-top: 8px;">${placedCount}</div>
                <p style="margin: 8px 0 0 0; font-size: 0.8rem; color: var(--text-muted);">${((placedCount / 10) * 100).toFixed(0)}% placement rate</p>
            </div>
            <div class="card" style="padding: 20px; text-align: center;">
                <label style="font-size: 0.7rem; color: var(--text-muted); text-transform: uppercase; font-weight: 600;">In Interview</label>
                <div style="font-size: 2.5rem; font-weight: 800; color: var(--warning); margin-top: 8px;">${interviewCount}</div>
                <p style="margin: 8px 0 0 0; font-size: 0.8rem; color: var(--text-muted);">under processing</p>
            </div>
            <div class="card" style="padding: 20px; text-align: center;">
                <label style="font-size: 0.7rem; color: var(--text-muted); text-transform: uppercase; font-weight: 600;">Rejected</label>
                <div style="font-size: 2.5rem; font-weight: 800; color: var(--danger); margin-top: 8px;">${rejectedCount}</div>
                <p style="margin: 8px 0 0 0; font-size: 0.8rem; color: var(--text-muted);">need support</p>
            </div>
        </div>

        <!-- Filter & Search -->
        <div class="card" style="margin-bottom: 24px;">
            <div style="display: flex; gap: 16px; align-items: flex-end; flex-wrap: wrap;">
                <div class="form-group" style="flex: 1; min-width: 250px; margin-bottom: 0;">
                    <label style="text-transform: uppercase; font-size: 0.75rem; color: var(--text-muted); font-weight: 600;">Search Student</label>
                    <div class="input-with-icon" style="display: flex; align-items: center; border: 1px solid var(--border); border-radius: 8px; padding: 0 12px;">
                        <ion-icon name="search-outline" style="margin-right: 8px; color: var(--text-muted);"></ion-icon>
                        <input id="searchStudent" type="text" placeholder="By name..." style="flex: 1; border: none; padding: 12px 0; background: transparent;">
                    </div>
                </div>
                <div class="form-group" style="min-width: 200px; margin-bottom: 0;">
                    <label style="text-transform: uppercase; font-size: 0.75rem; color: var(--text-muted); font-weight: 600;">Status</label>
                    <select id="filterStatus" style="width: 100%; padding: 12px; border: 1px solid var(--border); border-radius: 8px; background: white;">
                        <option value="All">All Status</option>
                        <option value="Placed">Placed</option>
                        <option value="Under Interview">Under Interview</option>
                        <option value="Applied">Applied</option>
                        <option value="Rejected">Rejected</option>
                    </select>
                </div>
            </div>
        </div>

        <!-- Students Table -->
        <div class="card">
            <div class="data-table-container">
                <table>
                    <thead>
                        <tr>
                            <th>Student Name</th>
                            <th>CGPA</th>
                            <th>Placement Status</th>
                            <th>Offers</th>
                            <th>Applied To</th>
                            <th>Companies</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${filteredStudents
                          .map(
                            (student) => `
                            <tr class="student-row" data-student-id="${student.id}" style="cursor: pointer;">
                                <td><b>${student.name}</b></td>
                                <td>${student.cgpa.toFixed(2)}</td>
                                <td>
                                    <span class="tag ${
                                      student.status === "Placed"
                                        ? "tag-success"
                                        : student.status === "Rejected"
                                          ? "tag-danger"
                                          : student.status === "Under Interview"
                                            ? "tag-warning"
                                            : "tag-info"
                                    }">
                                        ${student.status}
                                    </span>
                                </td>
                                <td><b style="color: var(--success);">${student.offers}</b></td>
                                <td>${student.appliedCount}</td>
                                <td>
                                    <div style="display: flex; flex-wrap: wrap; gap: 4px;">
                                        ${student.companies
                                          .slice(0, 2)
                                          .map(
                                            (c) =>
                                              `<span class="tag tag-info" style="font-size: 0.7rem; padding: 4px 8px;">${c}</span>`,
                                          )
                                          .join("")}
                                        ${student.companies.length > 2 ? `<span class="tag" style="font-size: 0.7rem; padding: 4px 8px; background: var(--border); color: var(--text);">+${student.companies.length - 2}</span>` : ""}
                                    </div>
                                </td>
                            </tr>
                        `,
                          )
                          .join("")}
                    </tbody>
                </table>
            </div>
        </div>
    `;
}

function showStudentDetails(container, studentId) {
  const student = coordinatorStudents.find((s) => s.id === studentId);
  if (!student) return;

  container.innerHTML = `
        <div style="display: flex; align-items: center; gap: 16px; margin-bottom: 32px;">
            <button onclick="history.back()" class="btn-primary" style="padding: 10px 16px; font-size: 0.9rem; border: none; cursor: pointer; border-radius: 6px;">
                ← Back to List
            </button>
            <h1 style="margin: 0; font-size: 2rem; color: var(--primary);">${student.name}</h1>
        </div>

        <div style="display: grid; grid-template-columns: 2fr 1fr; gap: 24px;">
            <!-- Main Details -->
            <div class="card">
                <h3 style="margin-top: 0;">Placement Information</h3>
                
                <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px; margin-bottom: 24px;">
                    <div style="padding: 16px; background: var(--bg-muted); border-radius: 8px;">
                        <label style="font-size: 0.7rem; text-transform: uppercase; color: var(--text-muted); font-weight: 600;">Current Status</label>
                        <div style="margin-top: 8px;">
                            <span class="tag ${
                              student.status === "Placed"
                                ? "tag-success"
                                : student.status === "Rejected"
                                  ? "tag-danger"
                                  : student.status === "Under Interview"
                                    ? "tag-warning"
                                    : "tag-info"
                            }" style="padding: 8px 12px; font-size: 0.9rem;">
                                ${student.status}
                            </span>
                        </div>
                    </div>
                    <div style="padding: 16px; background: var(--bg-muted); border-radius: 8px;">
                        <label style="font-size: 0.7rem; text-transform: uppercase; color: var(--text-muted); font-weight: 600;">Total Offers</label>
                        <div style="font-size: 1.8rem; font-weight: 800; color: var(--success); margin-top: 8px;">${student.offers}</div>
                    </div>
                    <div style="padding: 16px; background: var(--bg-muted); border-radius: 8px;">
                        <label style="font-size: 0.7rem; text-transform: uppercase; color: var(--text-muted); font-weight: 600;">CGPA</label>
                        <div style="font-size: 1.8rem; font-weight: 800; color: var(--primary); margin-top: 8px;">${student.cgpa.toFixed(2)}</div>
                    </div>
                    <div style="padding: 16px; background: var(--bg-muted); border-radius: 8px;">
                        <label style="font-size: 0.7rem; text-transform: uppercase; color: var(--text-muted); font-weight: 600;">Applied Count</label>
                        <div style="font-size: 1.8rem; font-weight: 800; color: var(--warning); margin-top: 8px;">${student.appliedCount}</div>
                    </div>
                </div>

                <h4 style="margin-bottom: 16px; color: var(--primary);">Applied Companies (${student.companies.length})</h4>
                <div style="display: grid; grid-template-columns: repeat(auto-fill, minmax(150px, 1fr)); gap: 12px;">
                    ${student.companies
                      .map(
                        (company) => `
                        <div style="padding: 12px; border: 1px solid var(--border); border-radius: 8px; text-align: center;">
                            <p style="margin: 0; font-weight: 600; color: var(--primary); font-size: 0.95rem;">${company}</p>
                        </div>
                    `,
                      )
                      .join("")}
                </div>
            </div>

            <!-- Sidebar Stats -->
            <div>
                <div class="card">
                    <h4 style="margin-top: 0; color: var(--primary);">Quick Stats</h4>
                    <div style="display: flex; flex-direction: column; gap: 16px;">
                        <div style="padding: 12px; background: var(--bg-muted); border-radius: 6px;">
                            <p style="margin: 0; font-size: 0.75rem; color: var(--text-muted); text-transform: uppercase;">Success Rate</p>
                            <p style="margin: 8px 0 0 0; font-size: 1.5rem; font-weight: 700; color: var(--success);">${student.offers > 0 ? ((student.offers / student.appliedCount) * 100).toFixed(0) : "0"}%</p>
                        </div>
                        <div style="padding: 12px; background: var(--bg-muted); border-radius: 6px;">
                            <p style="margin: 0; font-size: 0.75rem; color: var(--text-muted); text-transform: uppercase;">Current Focus</p>
                            <p style="margin: 8px 0 0 0; font-size: 1rem; font-weight: 600;">${student.status}</p>
                        </div>
                        <button class="btn-primary" style="width: 100%; padding: 12px; margin-top: 12px; border: none; border-radius: 6px; cursor: pointer;">Message Student</button>
                    </div>
                </div>
            </div>
        </div>
    `;
}
