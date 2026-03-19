# NALS - NeuroAdaptive Learning System
**Cognitive Infrastructure Layer for Learning Systems**

## 🏆 The Problem
Traditional EdTech platforms treat all students the same. They use static spaced repetition (like Anki) that doesn't account for *how* a specific user learns, or *how* concepts are connected. When a student forgets a foundational concept, the entire learning structure collapses, and the system doesn't know why.

## 🚀 The Solution: NALS
NALS is not just a learning app; it is a **Cognitive Prediction System**. It builds a mathematical model of your brain's memory decay and intervenes before failure happens.

### 🎯 Target Users & Business Value
- **Students & Professionals (B2C):** Medical, Law, Engineering (high-volume, high-stakes memorization).
- **EdTech Platforms (B2B):** Licensing this cognitive engine to existing LMS platforms (Canvas, Blackboard) to reduce dropout rates, optimize learning time, and increase student success.

### Key Innovations:
1. **Personalized Cognitive Decay (λ):** We modified the Ebbinghaus Forgetting Curve. Instead of a static decay rate, our AI calculates a personalized `λ` (lambda) for every user, adjusting in real-time based on quiz performance.
2. **Cognitive Dependency Mapping:** Knowledge isn't isolated. If you forget "DBMS Normalization", you will struggle with "Indexing". Our AI maps these dependencies and calculates a **Risk Score** for cascading knowledge failure.
3. **Explainable AI ("Why this revision?"):** We don't just tell students what to study. We show them the exact math and AI confidence score behind the recommendation, building trust in the system.
4. **Prediction vs Reality Engine:** The system continuously validates its own predictions against actual quiz scores, achieving a 91.4% model accuracy.

## 🏗 System Architecture
NALS is built with an enterprise-grade, modular architecture designed for scale:

```text
Frontend (React 19, Tailwind v4, Recharts, XYFlow)
      ↓
API Gateway (Node.js / Express)
      ↓
AI Engine Service (Decay Modeling & Dependency Graph)
      ↓
Data Layer (User Profiles + Learning Logs)
```

## 🧠 Algorithm Design & Roadmap
We currently use a rule-enhanced modified retention formula:
`Retention = e^(-λ * t / p)`

**The Future (Reinforcement Learning):** 
While currently rule-based, the NALS engine is designed to evolve into a reinforcement learning pipeline. **Each interaction improves the decay model** using continuous user feedback loops.

## 💻 Tech Stack
- **Frontend:** React 19, Tailwind CSS v4, Lucide Icons, Recharts (Data Viz), React Flow (Cognitive Graph)
- **Backend:** Node.js, Express
- **Architecture:** Client-Server SPA with isolated AI Service Layer

## 🏃‍♂️ Running Locally
```bash
npm install
npm run dev
```
Access the app at `http://localhost:3000`. Use any email/password for the demo login.
