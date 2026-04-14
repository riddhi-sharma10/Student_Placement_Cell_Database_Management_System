// js/coordinator/data.js — Shared mock data for all coordinator pages

export const coordinator = {
  name: "Priya Singh",
  department: "Computer Science",
  departmentCode: "CSE",
  totalAssigned: 10,
};

export const students = [
  {
    id: 1, name: "Riddhi Sharma", rollNo: "CSE2021001", cgpa: 9.82,
    status: "Placed", gradYear: 2025, avatar: "RS",
    skills: ["React", "Node.js", "SQL", "AWS", "TypeScript"],
    resumeUrl: "#", activelyApplying: false,
    applications: [
      { company: "Google India", role: "Software Engineer", appliedDate: "10 Jan 2025", atsScore: 94, status: "Selected" },
      { company: "Amazon", role: "SDE-II", appliedDate: "5 Jan 2025", atsScore: 88, status: "Rejected" },
      { company: "Zomato", role: "Backend Engineer", appliedDate: "2 Jan 2025", atsScore: 82, status: "Applied" },
    ]
  },
  {
    id: 2, name: "Alex Sterling", rollNo: "CSE2021002", cgpa: 9.42,
    status: "Active", gradYear: 2025, avatar: "AS",
    skills: ["Python", "Django", "AWS", "Docker", "Kubernetes"],
    resumeUrl: "#", activelyApplying: true,
    applications: [
      { company: "Microsoft", role: "Full Stack Developer", appliedDate: "12 Jan 2025", atsScore: 90, status: "Shortlisted" },
      { company: "Amazon", role: "SDE Intern", appliedDate: "8 Jan 2025", atsScore: 85, status: "Interview" },
    ]
  },
  {
    id: 3, name: "Sara Chen", rollNo: "CSE2021003", cgpa: 8.95,
    status: "Active", gradYear: 2025, avatar: "SC",
    skills: ["Java", "Spring Boot", "Docker", "Kubernetes", "MySQL"],
    resumeUrl: "#", activelyApplying: true,
    applications: [
      { company: "Google India", role: "Software Engineer", appliedDate: "11 Jan 2025", atsScore: 78, status: "Applied" },
      { company: "TCS", role: "Digital Role", appliedDate: "6 Jan 2025", atsScore: 72, status: "Shortlisted" },
    ]
  },
  {
    id: 4, name: "Aman Verma", rollNo: "CSE2021004", cgpa: 7.80,
    status: "Rejected", gradYear: 2025, avatar: "AV",
    skills: ["C++", "Linux", "Git", "Docker"],
    resumeUrl: "#", activelyApplying: false,
    applications: [
      { company: "TCS", role: "System Engineer", appliedDate: "3 Jan 2025", atsScore: 61, status: "Rejected" },
      { company: "Infosys", role: "System Analyst", appliedDate: "1 Jan 2025", atsScore: 58, status: "Rejected" },
    ]
  },
  {
    id: 5, name: "Priya Desai", rollNo: "CSE2021005", cgpa: 9.10,
    status: "Placed", gradYear: 2025, avatar: "PD",
    skills: ["JavaScript", "React", "MongoDB", "Node.js", "GraphQL"],
    resumeUrl: "#", activelyApplying: false,
    applications: [
      { company: "Zomato", role: "Frontend Engineer", appliedDate: "9 Jan 2025", atsScore: 91, status: "Selected" },
      { company: "Microsoft", role: "Developer", appliedDate: "4 Jan 2025", atsScore: 87, status: "Rejected" },
    ]
  },
  {
    id: 6, name: "Rohan Singh", rollNo: "CSE2021006", cgpa: 7.95,
    status: "Not Applied", gradYear: 2025, avatar: "RS",
    skills: ["Java", "SQL", "Cloud Computing", "DevOps"],
    resumeUrl: "#", activelyApplying: false,
    applications: []
  },
  {
    id: 7, name: "Neha Gupta", rollNo: "CSE2021007", cgpa: 9.35,
    status: "Placed", gradYear: 2025, avatar: "NG",
    skills: ["Python", "Machine Learning", "TensorFlow", "Data Science", "NLP"],
    resumeUrl: "#", activelyApplying: false,
    applications: [
      { company: "Google India", role: "ML Engineer", appliedDate: "14 Jan 2025", atsScore: 96, status: "Selected" },
      { company: "Amazon", role: "Data Scientist", appliedDate: "7 Jan 2025", atsScore: 92, status: "Applied" },
    ]
  },
  {
    id: 8, name: "Vikram Patel", rollNo: "CSE2021008", cgpa: 8.72,
    status: "Active", gradYear: 2025, avatar: "VP",
    skills: ["Full Stack", "JavaScript", "AWS", "React", "PostgreSQL"],
    resumeUrl: "#", activelyApplying: true,
    applications: [
      { company: "Amazon", role: "SDE-II", appliedDate: "13 Jan 2025", atsScore: 83, status: "Interview" },
      { company: "Zomato", role: "Backend Engineer", appliedDate: "5 Jan 2025", atsScore: 79, status: "Applied" },
    ]
  },
  {
    id: 9, name: "Ananya Iyer", rollNo: "CSE2021009", cgpa: 9.00,
    status: "Placed", gradYear: 2025, avatar: "AI",
    skills: ["Backend", "Go", "Microservices", "Kubernetes", "Redis"],
    resumeUrl: "#", activelyApplying: false,
    applications: [
      { company: "Microsoft", role: "Backend Engineer", appliedDate: "10 Jan 2025", atsScore: 89, status: "Selected" },
      { company: "Infosys", role: "System Engineer", appliedDate: "3 Jan 2025", atsScore: 75, status: "Applied" },
    ]
  },
  {
    id: 10, name: "Siddhant Nair", rollNo: "CSE2021010", cgpa: 8.40,
    status: "Active", gradYear: 2025, avatar: "SN",
    skills: ["Mobile Dev", "Flutter", "Firebase", "Dart", "iOS"],
    resumeUrl: "#", activelyApplying: true,
    applications: [
      { company: "TCS", role: "Digital Role", appliedDate: "11 Jan 2025", atsScore: 69, status: "Applied" },
      { company: "Infosys", role: "Jr. Developer", appliedDate: "6 Jan 2025", atsScore: 71, status: "Shortlisted" },
    ]
  },
];

export const companies = [
  {
    id: 1, name: "Google India", industry: "Technology", website: "google.com",
    tier: "Tier 1", status: "Active",
    hr: { name: "Pooja Sharma", email: "pooja.sharma@google.com", phone: "+91 98765 43210", linkedin: "linkedin.com/in/poojasharma" },
    jobs: [
      { role: "Software Engineer", package: 45, deadline: "Feb 28, 2025", status: "Open" },
      { role: "ML Engineer", package: 50, deadline: "Mar 5, 2025", status: "Open" },
    ],
    upcomingVisit: { date: "Feb 15, 2025", mode: "Offline", hrContact: "Pooja Sharma" }
  },
  {
    id: 2, name: "Amazon", industry: "E-Commerce / Cloud", website: "amazon.com",
    tier: "Tier 1", status: "Active",
    hr: { name: "Rahul Mehra", email: "rahul.mehra@amazon.com", phone: "+91 87654 32109", linkedin: "linkedin.com/in/rahulmehra" },
    jobs: [
      { role: "SDE Intern", package: 12, deadline: "Jan 31, 2025", status: "Closed" },
      { role: "SDE-II", package: 38, deadline: "Mar 10, 2025", status: "Open" },
    ],
    upcomingVisit: null
  },
  {
    id: 3, name: "Microsoft", industry: "Technology", website: "microsoft.com",
    tier: "Tier 1", status: "Active",
    hr: { name: "Seema Kapoor", email: "seema.kapoor@microsoft.com", phone: "+91 76543 21098", linkedin: "linkedin.com/in/seemakapoor" },
    jobs: [
      { role: "Full Stack Developer", package: 42, deadline: "Feb 20, 2025", status: "Open" },
    ],
    upcomingVisit: { date: "Feb 25, 2025", mode: "Online", hrContact: "Seema Kapoor" }
  },
  {
    id: 4, name: "TCS", industry: "IT Services", website: "tcs.com",
    tier: "Tier 2", status: "Active",
    hr: { name: "Ankit Joshi", email: "ankit.joshi@tcs.com", phone: "+91 65432 10987", linkedin: "linkedin.com/in/ankitjoshi" },
    jobs: [
      { role: "Digital Role", package: 7, deadline: "Mar 1, 2025", status: "Open" },
      { role: "System Engineer", package: 6.5, deadline: "Mar 15, 2025", status: "Open" },
    ],
    upcomingVisit: null
  },
  {
    id: 5, name: "Infosys", industry: "IT Services", website: "infosys.com",
    tier: "Tier 2", status: "Active",
    hr: { name: "Priya Nair", email: "priya.nair@infosys.com", phone: "+91 54321 09876", linkedin: "linkedin.com/in/priyanair" },
    jobs: [
      { role: "System Analyst", package: 6, deadline: "Feb 15, 2025", status: "Closed" },
      { role: "Jr. Developer", package: 7.5, deadline: "Mar 20, 2025", status: "Open" },
    ],
    upcomingVisit: null
  },
  {
    id: 6, name: "Zomato", industry: "Food Tech", website: "zomato.com",
    tier: "Tier 1", status: "Active",
    hr: { name: "Nikhil Bhatia", email: "nikhil.bhatia@zomato.com", phone: "+91 43210 98765", linkedin: "linkedin.com/in/nikhilbhatia" },
    jobs: [
      { role: "Backend Engineer", package: 22, deadline: "Mar 5, 2025", status: "Open" },
      { role: "Frontend Engineer", package: 20, deadline: "Mar 5, 2025", status: "Open" },
    ],
    upcomingVisit: { date: "Mar 8, 2025", mode: "Online", hrContact: "Nikhil Bhatia" }
  },
];

export const jobOpportunities = [
  {
    id: 1, companyId: 1, company: "Google India", role: "Software Engineer",
    type: "Full-time", package: 45, deadline: "Feb 28, 2025",
    cgpaCutoff: 8.0, tier: "Tier 1", branch: ["CSE", "ECE"],
    description: "Join the Google India engineering team to work on cutting-edge products used by billions worldwide. You'll collaborate with world-class engineers on scalable distributed systems.",
    requiredSkills: ["Data Structures", "Algorithms", "System Design", "Python/Java/C++"],
    eligibleStudents: [1, 2, 3, 5, 7, 8, 9],
    appliedStudents: [1, 7],
  },
  {
    id: 2, companyId: 2, company: "Amazon", role: "SDE-II",
    type: "Full-time", package: 38, deadline: "Mar 10, 2025",
    cgpaCutoff: 7.5, tier: "Tier 1", branch: ["CSE", "ECE", "IT"],
    description: "Amazon is looking for talented software engineers to build and operate highly available distributed services at planet-scale. You'll work directly with customers and impact millions.",
    requiredSkills: ["Distributed Systems", "Java", "AWS", "Problem Solving"],
    eligibleStudents: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
    appliedStudents: [1, 2, 7, 8],
  },
  {
    id: 3, companyId: 3, company: "Microsoft", role: "Full Stack Developer",
    type: "Full-time", package: 42, deadline: "Feb 20, 2025",
    cgpaCutoff: 8.0, tier: "Tier 1", branch: ["CSE"],
    description: "Microsoft is seeking passionate full stack developers to build next-generation cloud applications. Be part of the Azure team driving cloud transformation globally.",
    requiredSkills: ["React", "Node.js", "Azure", "TypeScript", "SQL"],
    eligibleStudents: [1, 2, 3, 5, 7, 8, 9],
    appliedStudents: [2, 5, 9],
  },
  {
    id: 4, companyId: 6, company: "Zomato", role: "Backend Engineer",
    type: "Full-time", package: 22, deadline: "Mar 5, 2025",
    cgpaCutoff: 7.0, tier: "Tier 1", branch: ["CSE", "IT"],
    description: "Zomato's engineering team is powering food delivery across 500+ cities. Join us to build microservices that handle millions of orders daily at unbelievable scale.",
    requiredSkills: ["Go / Node.js", "PostgreSQL", "Redis", "Microservices", "Kafka"],
    eligibleStudents: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
    appliedStudents: [1, 5, 8],
  },
  {
    id: 5, companyId: 4, company: "TCS", role: "Digital Role",
    type: "Full-time", package: 7, deadline: "Mar 1, 2025",
    cgpaCutoff: 6.5, tier: "Tier 2", branch: ["CSE", "ECE", "IT", "MECH"],
    description: "TCS Digital is our elite program for top engineering talent. You will work on enterprise digital transformation projects across Fortune 500 clients globally.",
    requiredSkills: ["Java", "SQL", "Cloud Basics", "Communication"],
    eligibleStudents: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
    appliedStudents: [4, 6, 10],
  },
  {
    id: 6, companyId: 5, company: "Infosys", role: "Jr. Developer",
    type: "Full-time", package: 7.5, deadline: "Mar 20, 2025",
    cgpaCutoff: 6.0, tier: "Tier 2", branch: ["CSE", "ECE", "IT"],
    description: "Infosys is hiring junior developers to be part of their digital services division. You'll be involved in client-facing projects with extensive mentorship and training support.",
    requiredSkills: ["Java or Python", "SQL", "Agile", "REST APIs"],
    eligibleStudents: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
    appliedStudents: [4, 9, 10],
  },
  {
    id: 7, companyId: 1, company: "Google India", role: "ML Engineer",
    type: "Full-time", package: 50, deadline: "Mar 5, 2025",
    cgpaCutoff: 8.5, tier: "Tier 1", branch: ["CSE"],
    description: "Google Brain India is looking for exceptional ML engineers to train and deploy large-scale AI systems. You will work on research-to-production pipelines for state-of-the-art models.",
    requiredSkills: ["Python", "TensorFlow/PyTorch", "ML Theory", "Research Publications a plus"],
    eligibleStudents: [1, 2, 3, 5, 7, 9],
    appliedStudents: [7],
  },
];

// Generate all applications across all students
export const allApplications = (() => {
  const apps = [];
  let id = 1;
  students.forEach(s => {
    s.applications.forEach(a => {
      apps.push({
        id: id++,
        studentId: s.id,
        studentName: s.name,
        studentCGPA: s.cgpa,
        company: a.company,
        role: a.role,
        appliedDate: a.appliedDate,
        atsScore: a.atsScore,
        status: a.status,
      });
    });
  });
  return apps;
})();

export const adminContact = {
  id: "admin", name: "Department Admin", avatar: "DA",
  role: "admin", department: "CSE Administration", status: "online",
};

export const mockChats = {
  admin: [
    { id: 1, senderType: "admin", senderName: "Department Admin", message: "Hi Priya, please send me the latest placement statistics for your batch.", timestamp: "10:30 AM" },
    { id: 2, senderType: "coordinator", senderName: "You", message: "Hello! Currently 4 students have been placed. Working on shortlisting for remaining positions. Will share a full report by EOD.", timestamp: "10:35 AM" },
    { id: 3, senderType: "admin", senderName: "Department Admin", message: "Great! Please also highlight students who need urgent support.", timestamp: "10:37 AM" },
    { id: 4, senderType: "coordinator", senderName: "You", message: "Sure. Aman Verma and Rohan Singh need immediate guidance. I'll schedule sessions this week.", timestamp: "10:40 AM" },
  ],
  1: [
    { id: 1, senderType: "student", senderName: "Riddhi Sharma", message: "Hi! I have a question about the Google interview process.", timestamp: "Yesterday" },
    { id: 2, senderType: "coordinator", senderName: "You", message: "Of course! What's your concern?", timestamp: "Yesterday" },
    { id: 3, senderType: "student", senderName: "Riddhi Sharma", message: "How many rounds are there and what topics should I focus on?", timestamp: "Yesterday" },
    { id: 4, senderType: "coordinator", senderName: "You", message: "Usually 3 rounds: coding, system design, and a behavioral round with HR. Focus on DSA, LLD, and HLD. You're already very strong — just stay calm!", timestamp: "9:00 AM" },
    { id: 5, senderType: "student", senderName: "Riddhi Sharma", message: "Thank you so much! I feel more confident now 😊", timestamp: "9:05 AM" },
  ],
  2: [
    { id: 1, senderType: "student", senderName: "Alex Sterling", message: "Got shortlisted at Microsoft! 🎉", timestamp: "Today" },
    { id: 2, senderType: "coordinator", senderName: "You", message: "Congratulations Alex! That's brilliant. Prepare well for the technical rounds — review system design basics.", timestamp: "Today" },
    { id: 3, senderType: "student", senderName: "Alex Sterling", message: "Will do! Any recommended resources?", timestamp: "Today" },
  ],
  3: [
    { id: 1, senderType: "coordinator", senderName: "You", message: "Hi Sara, just checking in on your applications. How is it going?", timestamp: "2:00 PM" },
    { id: 2, senderType: "student", senderName: "Sara Chen", message: "Hi! Going well. Got a shortlist from TCS. Waiting on Google.", timestamp: "2:15 PM" },
  ],
  4: [
    { id: 1, senderType: "coordinator", senderName: "You", message: "Hi Aman, I noticed you've had some rejections recently. Let's schedule a session to work on your interview skills.", timestamp: "Yesterday" },
    { id: 2, senderType: "student", senderName: "Aman Verma", message: "Yes ma'am, I'd really appreciate that.", timestamp: "Yesterday" },
    { id: 3, senderType: "coordinator", senderName: "You", message: "Great! Let's meet tomorrow at 3 PM. I'll share some practice resources in the meantime.", timestamp: "Yesterday" },
  ],
  5: [],
  6: [],
  7: [],
  8: [],
  9: [],
  10: [
    { id: 1, senderType: "student", senderName: "Siddhant Nair", message: "Hello, when is the Infosys interview scheduled?", timestamp: "11:00 AM" },
    { id: 2, senderType: "coordinator", senderName: "You", message: "Hi Siddhant! The Infosys interview is tentatively scheduled for Feb 22. I'll confirm the exact time shortly.", timestamp: "11:30 AM" },
  ],
};
