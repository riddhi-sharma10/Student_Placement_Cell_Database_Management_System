# Database Normalization & Schema Report

This report documents the structural improvements made to the `placement_cell_db` to ensure data integrity and First Normal Form (1NF) compliance.

## 1. Executive Summary
The database was audited for normalization issues. The most significant finding was a violation of **First Normal Form (1NF)** in the `JOB_PROFILE` table, where multi-valued attributes (skills and eligible branches) were stored as comma-separated strings. These have been extracted into separate tables.

---

## 2. Normalization Transformation (1NF Implementation)

### Before (Violation)
The `JOB_PROFILE` table used `eligible_branch` and `required_skills` as CSV strings.
*   *Anomalies*: Difficult to search for a specific skill, impossible to index individual branches, and risk of data inconsistency.

### After (Normalized)
The attributes were moved to dedicated mapping tables:

1.  **`JOB_REQUIRED_SKILL`**:
    - `job_id` (FK)
    - `skill_name`
    - *Result*: Each skill is a separate row. Searching for "SQL" is now a direct indexed lookup.

2.  **`JOB_ELIGIBILITY_BRANCH`**:
    - `job_id` (FK)
    - `branch_name`
    - *Result*: Allows for precise matching between students' departments and job eligibility.

---

## 3. Detailed Schema Audit

### 3.1 masters (3NF)
- **`STUDENT`**: Normalized. No partial or transitive dependencies. Dept/Coordinator info managed via FKs.
- **`COMPANY`**: Normalized. Stores core organizational data.
- **`PLACEMENT_COORDINATOR`**: Normalized. Stores faculty/staff details.

### 3.2 Transactional Tables (3NF)
- **`APPLICATION`**: Tracks student-job interactions.
- **`INTERVIEW`**: Manages schedules and outcomes.
- **`OFFER`**: Records financial and joining details.

### 3.3 Historical Data (Modified 3NF)
- **`PLACEMENT_RECORD`**: This table intentionally keeps some redundant data (like `stream` and `comp_id`).
- **Rationale**: While technically 3NF allows joining this from other tables, we maintain a **snapshot** here. This ensures that if a student changes their department or a company is updated later, the record of the successful placement *at that point in time* remains statically accurate for historical reporting.

---

## 4. Database Objects Summary

### Views
The database uses specialized views for efficient data retrieval:
- `vw_dashboard_stats`: Real-time key performance indicators.
- `vw_placement_analytics`: Comprehensive join of all placement data.
- `vw_student_skills_summary`: Reformats normalized skill data for reading.

### Stored Procedures
Critical business logic is encapsulated in procedures:
- `sp_accept_offer`: Atomic operation updating the offer, generating a placement record, and setting student status.
- `sp_get_company_hiring_stats`: complex aggregation of company performance.

---

## 5. Viva / Interview Reference

- **What is Normalization?**
  Organizing a database to minimize redundancy and prevent anomalies (Insertion, Deletion, Update).
  
- **What is 1NF?**
  Ensuring every column contains atomic (individual) values. We achieved this by splitting job skills into a separate table.
  
- **What is 2NF?**
  1NF + ensures all non-key attributes are fully dependent on the primary key.
  
- **What is 3NF?**
  2NF + ensures no transitive dependencies (non-key columns don't depend on other non-key columns).
