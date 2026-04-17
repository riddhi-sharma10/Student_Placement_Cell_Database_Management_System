# Database Architecture & Integrity Report

This document provides a comprehensive overview of the `placement_cell_db` architecture, including normalization details, data integrity checks, and viva-ready explanations.

---

## 1. Normalization & Schema Design

### 1.1 First Normal Form (1NF) Fixes
The database was audited for multi-valued attribute violations. The `JOB_PROFILE` table has been successfully normalized.

*   **Identified Violation**: Comma-separated strings in `required_skills` and `eligible_branch`.
*   **Resolution**: Created two new normalized tables:
    - `JOB_REQUIRED_SKILL` (One skill per row)
    - `JOB_ELIGIBILITY_BRANCH` (One branch per row)
*   **Impact**: Enables fast indexing, accurate searching, and eliminates update anomalies.

### 1.2 Table Relationships (3NF Audit)
The database structure follows **Third Normal Form (3NF)** for its core entities.

| Entity | Primary Key | Normalization Level | Reason |
| :--- | :--- | :--- | :--- |
| `STUDENT` | `s_id` | 3NF | Atomic attributes; no transitive dependencies. |
| `COMPANY` | `comp_id` | 3NF | Master data stored uniquely. |
| `APPLICATION` | `app_id` | 3NF | Links students/jobs via Foreign Keys. |
| `USER_ROLE` | `user_id` | 3NF | Centralized credential management. |

---

## 2. Redundancy & Data Integrity Audit

A deep consistency audit was performed to identify potential areas of data mismatch.

### 2.1 Calculated Field Redundancies
Certain tables store "Derived Data"—values that can be calculated from other tables. While useful for speed, they are points of potential **inconsistency**.

| Table | Column | Risk |
| :--- | :--- | :--- |
| `COMPANY` | `avg_package_offered` | May mismatch actual data in `OFFER`. |
| `VISIT_HISTORY` | `students_placed` | **CRITICAL**: Audit found mismatch between summary rows and actual placement records. |

### 2.2 Functional Redundancies
- **`USER_ROLE`**: `role` and `entity_type` store the same information. One is redundant.
- **`PLACEMENT_RECORD`**: Stores a "snapshot" of the student's `stream` at the time of placement. This is **Safe Redundancy** used for historical auditing.

---

## 3. Findings from Consistency Audit

| Check | Result | Detail |
| :--- | :--- | :--- |
| **User Roles** | ✅ Consistent | Roles match entity types. |
| **Placement Records** | ⚠️ Inconsistent | `COMPANY_VISIT_HISTORY` reports placement counts (e.g., 30+), but `PLACEMENT_RECORD` table is currently empty for those entries. |
| **Salaries** | ℹ️ Varied | Differences between job profile packages and final offered salaries were found, which is acceptable (negotiation results). |

---

## 4. Recommended Next Steps for 100% Integrity
To prevent future inconsistencies, the following improvements are recommended:
1.  **Replace Derived Columns with VIEWS**: Use SQL Views (e.g., `vw_company_stats`) to calculate averages and counts dynamically.
2.  **Implement Triggers**: Create `AFTER INSERT` triggers on `PLACEMENT_RECORD` to automatically update counts in `COMPANY_VISIT_HISTORY`.
3.  **Consolidate User Columns**: Merge `role` and `entity_type` in the `USER_ROLE` table to remove duplication.

---

## 5. Viva Preparation Quick-Sheet

### Key Concepts to Explain:
- **Normalization**: Reducing redundancy by organizing tables so that data is only stored once.
- **Data Integrity**: Ensuring that related tables stay "in sync." (e.g., the total count in history matches the actual list of students).
- **Atomic Values**: The core of 1NF—values must be individual (no lists/comma-separated strings).
- **Joins**: How we combine the normalized tables to present a complete picture (e.g., Joining `STUDENT` with `STUDENT_SKILL` to show a student's profile).

---
*Created by Antigravity AI for the Student Placement Cell Management System.*
