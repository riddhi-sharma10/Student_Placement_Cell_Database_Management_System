import fs from 'fs';

let s = fs.readFileSync('routes/admin.js', 'utf8');

s = s.replace(/c\.name/g, 'c.comp_name');
s = s.replace(/c\.industry/g, 'c.industry_type');
s = s.replace(/c\.status/g, "'active'");
s = s.replace(/COALESCE\('active','active'\)/g, "'active'");
s = s.replace(/j\.package_lpa/g, 'j.package');
s = s.replace(/j\.description/g, 'j.job_description');

s = s.replace(/'Selected','Placed','Accepted'/g, "'selected'");
s = s.replace(/'Selected', 'Placed', 'Accepted'/g, "'selected'");
s = s.replace(/IN \('Verified','Complete','Active'\)/g, "IN ('active')");
s = s.replace(/status = 'Interview'/g, "status IN ('under_review', 'shortlisted')");

fs.writeFileSync('routes/admin.js', s);
