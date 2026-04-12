---
description: Interactive bug fix assistant with hypothesis-driven or logging-based debugging approaches
---

# 🐛 Bug Fix Assistant

## Context

- **Issue**: [GIVEN BY USER]
- **Expected behavior**: [GIVEN BY USER]

---

## 📋 Menu - Choose your debugging approach:

### **1. Deep Analysis + Hypothesis**

> Thorough code analysis: trace action paths, identify breaking points, provide 3 ranked hypotheses with confidence levels.
> Best for: Understanding the bug before deciding on a fix strategy.

### **2. Deep Analysis + Logging**

> Analyze code paths and inject strategic console.log/debug statements to trace the issue at runtime.
> Best for: Intermittent bugs, race conditions, async issues, unclear reproduction steps.

---

IMPORTANT : **⏸️ STOP HERE - Ask user to select option (1 or 2) before proceeding.**

## � Common Steps (both options)

### Step 1: Understand

- Summarize the issue in your own words (confirm understanding)
- Identify the feature/module affected
- List user action path (click → function → state → UI)
  **⏸️ STOP HERE - Ask if the understanding is correct - wait his confirmation**

### Step 2: Investigate

- Find relevant files based on action path
- Check recent changes in those files (if git available)
- Identify potential breaking points
- **Build a Call Trace Schema** (visual representation of code flow):

```
1. [Entry Point] (e.g., API call, user click, event trigger, scheduled task)
   └─ Component/Class.method()

2.    └─ ServiceOrHook.method()
         ✅ OK

3.       └─ Dependency.method()
            ❌ ERROR: [describe issue]

4.       └─ AnotherDependency.method()
            ⚠️ WARNING: [potential issue]

5.          └─ DataSource (API/DB/Store/Cache)
               🔍 TO INVESTIGATE
```

Legend: ✅ OK | ❌ ERROR | ⚠️ SUSPECT | 🔍 TO INVESTIGATE

---

## 🔹 OPTION 1: Deep Analysis + Hypothesis

### Step 3: Hypothesize

- List **3 potential causes** with confidence level (Hypothesis 1, 2, 3)

### Step 3b: ⏸️ CHECKPOINT - Ask user which hypothesis to explore

- Ask: "Which hypothesis do you want to explore? (1, 2, 3, multiple, or all)"
- User can select one or multiple hypotheses
- Wait for user choice before proceeding

### Step 4: Propose Solution

- Provide **ranked fix approaches** for the selected hypothesis/hypotheses only
- For each approach, include:
  - Root cause explanation
  - Proposed code changes
  - Potential side effects
  - Testing recommendations

### Step 5: ⏸️ CHECKPOINT - Wait for user confirmation before implementing

---

## 🔹 OPTION 2: Deep Analysis + Logging

### Step 3: Inject Logging

- Place `console.log` at:
  - Entry points (action dispatched, function called)
  - State mutations (before/after)
  - API calls (request/response)
  - Conditional branches (which path taken)
- Use consistent format: `console.log('[DEBUG][ComponentName] description:', value)`
- Add timestamps for async flows: `console.log('[DEBUG][${Date.now()}] ...')`
- Guide user to reproduce and share console output

### Step 4: ⏸️ CHECKPOINT - Ask user to paste logs

### Step 5: Analyze Logs

- Review provided console output
- Identify patterns, anomalies, and error sequences
- List **3 potential causes** with confidence level based on log evidence

### Step 6: Propose Solution

- Provide **ranked fix approaches** based on log analysis
- For each approach, include:
  - Root cause explanation
  - Proposed code changes
  - Potential side effects
  - Testing recommendations

### Step 7: ⏸️ CHECKPOINT - Wait for user confirmation before implementing
