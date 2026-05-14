# Nistula Technical Assessment — Guest Message Handler

Backend system built for the Nistula Summer Technology Internship 2026 assessment.

---

# Setup Instructions

## 1. Install Dependencies

```bash
cd server
npm install
```

## 2. Configure Environment Variables

Create:

```txt
server/.env
```

Add:

```env
PORT=3000
CLAUDE_API_KEY=your_api_key_here
```

## 3. Run Development Server

```bash
npm run dev
```

Server runs at:

```txt
http://localhost:3000
```

---

# Confidence Scoring & System Logic

The webhook pipeline follows this flow:

```txt
Webhook Request
→ Validation
→ Logging
→ Message Normalization
→ Query Classification
→ Claude AI Service
→ Confidence Scoring
→ Action Routing
→ Final Response
```

The confidence scoring system was intentionally designed as a deterministic rule-based system instead of an opaque ML confidence estimator. The goal was to keep the system explainable, predictable, and operationally safe for hospitality workflows.

The score starts with a base confidence of:

```txt
0.5
```

The score is then adjusted numerically:

| Condition | Score Adjustment |
|---|---|
| Query classified successfully | +0.2 |
| AI/fallback reply generated | +0.2 |
| Fallback response triggered | -0.3 |
| Complaint detected | -0.3 |

Mathematically:

```txt
Final Confidence =
0.5
+ classification reliability
+ response generation reliability
- operational risk penalties
```

### Example — Availability Query

```txt
0.5 + 0.2 + 0.2 - 0.3 = 0.6
```

Result:

```txt
agent_review
```

### Example — Complaint Query

```txt
0.5 + 0.2 + 0.2 - 0.3 - 0.3 = 0.3
```

Result:

```txt
escalate
```

Routing logic:

| Confidence Score | Action |
|---|---|
| Above 0.85 | auto_send |
| 0.60–0.85 | agent_review |
| Below 0.60 | escalate |

Complaint queries always escalate regardless of score because hospitality systems should prioritize operational safety and human intervention over aggressive automation.

---

# API Endpoint

```http
POST /webhook/message
```

Example Request:

```bash
curl -X POST http://localhost:3000/webhook/message \
-H "Content-Type: application/json" \
-d '{
  "source": "whatsapp",
  "guest_name": "Rahul Sharma",
  "message": "Is the villa available from April 20 to 24?",
  "timestamp": "2026-05-05T10:30:00Z",
  "booking_ref": "NIS-2024-0891",
  "property_id": "villa-b1"
}'
```

Example Response:

```json
{
  "message_id": "uuid",
  "query_type": "pre_sales_availability",
  "drafted_reply": "Our team will get back to you shortly.",
  "confidence_score": 0.6,
  "action": "agent_review"
}
```

---

# Tech Stack

- Node.js
- Express.js
- Axios
- UUID
- PostgreSQL Schema Design

---

# Features Implemented

- Webhook endpoint for inbound guest messages
- Unified schema normalization
- Query classification engine
- Claude AI integration layer
- Confidence scoring system
- Action routing system
- Graceful fallback handling
- Request logging middleware
- PostgreSQL schema design
- Operational escalation workflow design

---

# Notes

The Claude integration architecture was implemented successfully. However, the temporary assessment API key currently returns an authentication error from Anthropic, so graceful fallback handling is used to maintain uninterrupted request processing.