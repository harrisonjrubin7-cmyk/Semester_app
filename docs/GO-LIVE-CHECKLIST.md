# Semester Platform: Go-Live and Launch Readiness Register

**Release Identifier:** `semester-v2026.10-l9`  
**Target Environment:** Vanderbilt Production Pilot  
**Institutional Sponsor:** Office of the Provost & University Registrar  
**Lead Architecture & SRE Council:** Founder, Principal Product Architect, Security Lead, Operations Lead

---

## 1. Governance Verification Register

| Stable ID | Requirement / Scope | Owner Role | Pass Criteria | Current Result | Blocking Status | Stop Condition | Recovery Action |
|:---|:---|:---|:---|:---|:---|:---|:---|
| **GO-PROD-001** | **Action Center Core Journeys**<br>Student assignment tracking, hold notices, and task completion. | `product` | 100% of canonical flows functional with zero undisclosed mock persistence. | **PASSED** | NON-BLOCKING | Journey break or data loss | Fallback to cached student local session |
| **GO-DATA-002** | **FERPA Tenant Integrity**<br>Student private drafts vs Official SIS separation. | `privacy` | Zero cross-tenant leaks; private drafts never exported to institutional records without consent. | **PASSED** | **BLOCKING** | Unrestricted join exposing student private notes | Immediate killswitch on external reporting adapters |
| **GO-SEC-003** | **Least Privilege & SSO MFA**<br>Vanderbilt Duo SSO session validity and role authorization. | `security` | Validated session claims; role switching strictly changes data scope. | **PASSED** | **BLOCKING** | Role privilege escalation | Invalidate active tokens & force re-authentication |
| **GO-A11Y-004** | **WCAG 2.2 AA Compliance**<br>Screen reader landmarks, keyboard traps, color contrast. | `accessibility` | Zero critical axe-core violations; 4.5:1 text contrast across all themes. | **PASSED** | NON-BLOCKING | Focus trap in modal | Deploy keyboard navigation remediation patch |
| **GO-INT-005** | **PeopleSoft SIS Registration Contract**<br>Two-phase commit hold check and enrollment write. | `engineering` | Verified idempotency keys; registration writes blocked if hold active. | **PASSED** | **BLOCKING** | Unchecked hold bypass | Trip direct SIS write circuit to cart-staging mode |
| **GO-AI-006** | **Governed AI Gateway Clearances**<br>Grounded syllabus citations and honor code guardrails. | `security` | Strict per-course AI policy enforcement; refuse exam solution leakage. | **PASSED** | **BLOCKING** | Honor code policy bypass | Open circuit breaker on AI homework helper |
| **GO-SRE-007** | **Edge Latency & Availability**<br>p99 latency < 50ms, cache hit > 90%. | `operations` | Synthetic probes verify < 20ms edge latency on Cloud Run. | **PASSED** | NON-BLOCKING | p99 > 300ms over 5 min | Auto-scale container replicas and clear cache |

---

## 2. Live Execution Sequence

1. **Change Freeze:** Confirm frozen repository state at git revision `8f921d7a`.
2. **Pre-Flight Health:** Verify PeopleSoft SIS and Canvas LMS connector status endpoints.
3. **Container Deployment:** Deploy Docker image `semester-platform:v2026.10-l9` to Google Cloud Run edge.
4. **Synthetic Smoke Verification:** Execute automated browser smoke tests for all 5 canonical destinations (`Today`, `My Path`, `Courses`, `Campus`, `Plan`).
5. **Two-Phase Hold Check:** Test active Advising Hold constraint with Dr. Gregory Thorne test account.
6. **Go / No-Go Decision Gate:** Formal authorization confirmed by University Registrar & Engineering Council.
7. **Production Traffic Shift:** Route 100% of Vanderbilt pilot student cohort traffic to active release.
8. **Post-Launch Telemetry:** Monitor p99 latency, error budget burn, and support desk intake queues.
