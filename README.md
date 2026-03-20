## 🧠 NALS — NeuroAdaptive Learning System

### Cognitive Infrastructure Layer for Next-Generation Learning Systems

---

## 🏆 The Problem

Traditional EdTech platforms treat all learners the same.

Most systems rely on **static spaced repetition** (e.g., Anki), which assumes:

* Uniform memory decay
* Independent topics
* Fixed revision intervals

### ⚠️ Reality is Different:

* Memory decay varies per individual
* Concepts are **interdependent**
* Forgetting a foundational topic causes **cascading failure**

👉 When a student forgets *DBMS Normalization*, it impacts *Indexing, Query Optimization, and Design*

**Current systems do not detect or prevent this.**

---

## 🚀 The Solution — NALS

NALS is not just a learning platform —
it is a **Cognitive Prediction System**.

It builds a dynamic model of:

* Memory decay
* Concept dependencies
* Learning behavior

👉 And **intervenes before failure occurs**

---

Demo Link:

https://nals-eight.vercel.app

---

Demo Video Link:

https://drive.google.com/file/d/19jThttkx7_QnyQ_lQDtpIcsXNwVWUhBX/view?usp=share_link

---

## 🎯 Target Users & Business Value

### 👨‍🎓 B2C — Students & Professionals

* Engineering, Medical, Law
* High-volume, high-stakes learning environments

### 🏢 B2B — EdTech Platforms

* LMS platforms (Canvas, Blackboard)
* Improve retention & reduce dropout rates
* Optimize learning efficiency at scale

---

## 🧠 Core Innovations

### 🔹 1. Personalized Cognitive Decay (λ)

We extend the **Ebbinghaus Forgetting Curve** by introducing:

👉 A **dynamic λ (lambda)** per user

* Adjusts based on quiz performance
* Adapts to learning patterns
* Enables personalized retention modeling

---

### 🔹 2. Cognitive Dependency Mapping

Knowledge is not isolated.

NALS builds a **graph-based dependency model**:

* Nodes → Topics
* Edges → Concept relationships

👉 If a core topic weakens:

* System detects **cascading risk**
* Assigns **impact-based priority**

---

### 🔹 3. Explainable AI (XAI Layer)

Unlike black-box systems:

✔ Shows *why* a revision is recommended
✔ Displays confidence scores
✔ Builds user trust

---

### 🔹 4. Prediction vs Reality Engine

* Continuously compares predicted vs actual performance
* Improves system reliability over time

📊 Current prototype simulation:

* Model alignment observed at ~91% consistency

---

## 🏗 System Architecture

```
                        ┌────────────────────────┐
                        │        USER            │
                        │  (Student / Learner)   │
                        └──────────┬─────────────┘
                                   ↓
                    ┌────────────────────────────┐
                    │        FRONTEND UI         │
                    │ React + Vite + Tailwind    │
                    │ - Dashboard                │
                    │ - Analytics Page           │
                    │ - Cognitive Map            │
                    └──────────┬─────────────────┘
                               ↓
                    ┌────────────────────────────┐
                    │        API LAYER           │
                    │ Node.js / Serverless API   │
                    │ - /api/cognitive/map       │
                    │ - /api/retention           │
                    └──────────┬─────────────────┘
                               ↓
        ┌──────────────────────────────────────────────┐
        │        COGNITIVE ENGINE (CORE LOGIC)         │
        │                                              │
        │ • Risk Prediction Model                      │
        │ • Retention Decay Simulation                 │
        │ • Dependency Analysis Engine                 │
        │ • Feature Weight Computation                 │
        └──────────┬───────────────────────────────────┘
                   ↓
        ┌──────────────────────────────────────────────┐
        │      DATA PROCESSING & RESPONSE LAYER        │
        │                                              │
        │ • Weak Topics Detection                      │
        │ • Impacted Topics Generation                 │
        │ • Insight Generation                         │
        └──────────┬───────────────────────────────────┘
                   ↓
        ┌──────────────────────────────────────────────┐
        │   VISUALIZATION & ANALYTICS LAYER            │
        │                                              │
        │ • Cognitive Map (Graph)                      │
        │ • ML Telemetry (Confidence, Time)            │
        │ • Risk Dashboard                             │
        └──────────────────────────────────────────────┘

```
The architecture separates intelligence (cognitive engine) from visualization, enabling scalability for real AI model integration.

---

## 🧠 Algorithm Design

Current Model:

```
Retention = e^(-λ * t / p)
```

Where:

* λ → Personalized decay rate
* t → Time since last revision
* p → Performance factor

---

### 🔮 Future Roadmap

The system is designed to evolve into:

👉 **Reinforcement Learning-based Adaptive Engine**

* Continuous feedback loop
* Self-optimizing decay predictions
* Real-time learning adaptation

---

## 💻 Tech Stack

### Frontend

* React 19
* Tailwind CSS v4
* Recharts (Analytics)
* React Flow / XYFlow (Graph Visualization)

### Backend

* Node.js
* Express

### Architecture

* Client-Server SPA
* Modular AI Service Layer

---

## 🏃‍♂️ Running Locally

```bash
npm install
npm run dev
```

Open:
👉 http://localhost:3000

Use any email/password for demo login.

---

## 🏁 Key Insight

NALS shifts learning from:

📚 Content Delivery
➡️ 🧠 Cognitive Intelligence

---

---

## 👥 Team — Phantom!!

### 🚀 Team Members

* **Pavithra P** 
* **Sharmila V** 
* **Priyadharshini R** 
* **Nithyasree M** 

---

## 🤝 Collaboration

This project was built collaboratively with contributions across:

* System Design
* Frontend Development
* Backend Logic
* AI Simulation & Analysis

---
