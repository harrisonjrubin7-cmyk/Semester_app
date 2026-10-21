# Semester Platform: Operations Runbook & Maintenance Governance

**Document Version:** 2.4  
**Classification:** Tier 1 University Service Infrastructure  
**Authoritative Review Cadence:** Monthly SRE Review / Quarterly Governance Council

---

## 1. Service Ownership Matrix

| Service Component | Technical Lead | Operational Owner | Escalation Route | Primary Data Authority |
|:---|:---|:---|:---|:---|
| **Web Shell & Ingestion Edge** | `platform-eng` | `operations` | PagerDuty SRE-Tier1 | Semester Edge Cache (Cloud Run) |
| **PeopleSoft SIS Integration** | `backend-eng` | `registrar` | SIS-Operations-Bridge | Vanderbilt PeopleSoft 9.2 SIS |
| **Canvas LMS Sync Engine** | `integration-eng` | `academic-tech` | LMS-Support-Queue | Instructure Canvas LMS API |
| **Semester Intelligence Gateway** | `ai-eng` | `honor-council` | AI-Safety-Escalation | Enterprise Gemini Model Host |
| **Identity & Access Management** | `security-eng` | `campus-it` | Duo-IAM-Emergency | Vanderbilt Central Shibboleth / SAML |

---

## 2. Operational Objectives & SLA Thresholds

- **Availability:** 99.95% during active academic term (excluding scheduled Sunday maintenance 2:00 AM – 4:00 AM CST).
- **Edge Latency:** p50 < 15ms, p95 < 45ms, p99 < 120ms.
- **SIS Reconciliation Lag:** Maximum 15 minutes for non-critical grade changes; synchronous 2-phase commit for registration writes.
- **Error Budget:** Maximum 0.05% requests returning HTTP 5xx per 30-day rolling window.

---

## 3. Incident Severity Model & Response SLA

### SEV-1: Critical Platform Outage
- **Definition:** Total loss of access to Action Center, degree audit failure during active registration time-tickets, or FERPA security breach.
- **Target Triage:** &lt; 5 minutes.
- **Incident Commander:** VP Engineering / Lead SRE.
- **Communication:** Immediate campus status page banner update within 15 minutes.

### SEV-2: Degraded Core Functionality
- **Definition:** Canvas LMS grade sync delayed > 1 hour, audio player streaming interrupted, or intermittent AI gateway timeouts.
- **Target Triage:** &lt; 15 minutes.
- **Response:** Trip affected circuit breaker; engage secondary failover queue.

### SEV-3: Non-Blocking Feature Defect
- **Definition:** Minor cosmetic alignment on wide screens, non-critical flashcard rendering issue, or minor catalog typos.
- **Target Triage:** &lt; 2 business hours. Next scheduled patch window.

---

## 4. Emergency Circuit Breaker Procedures

### Procedure A: Trip Direct SIS Writes Circuit
- **When to invoke:** When PeopleSoft reports elevated 504 Gateway Timeouts or unexpected deadlocks during high-load registration bursts.
- **Impact:** Converts registration checkout to queued cart-staging mode. Students receive guaranteed priority timestamp receipts.
- **Command / Trigger:** Toggle `directSisWrites` switch in SRE Operator Console or run:
  ```bash
  semester-ops circuit-breaker trip --service=peoplesoft-sis --reason="SIS Gateway Latency Spike"
  ```

### Procedure B: AI Copilot Honor Code Safeguard Trip
- **When to invoke:** When model provider updates cause anomalous response styles that bypass syllabus restrictions.
- **Impact:** Reverts AI answers to strict canned syllabus excerpts with zero generative extrapolation.
- **Command / Trigger:** Toggle `aiHomeworkAssistance` switch in SRE Operator Console.
