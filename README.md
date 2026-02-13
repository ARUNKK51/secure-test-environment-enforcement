Secure Test Environment Enforcement
A frontend-based secure assessment prototype that enforces a controlled, time-bound, and auditable test environment using browser APIs and structured event logging.
🚀 Live Demo
Deployed on Vercel:
https://secure-test-environment-enforcement-eta.vercel.app/
🎯 Project Objective
    Ensure candidates complete assessments in a locked-down environment by:
    Enforcing browser restrictions (Chrome only)
    Monitoring fullscreen mode
    Detecting tab switching
    Logging behavioral violations
    Maintaining a complete audit trail
    Persisting logs locally
    Batching logs to backend
    Locking attempt after submission
    🧩 Features Implemented
1️⃣ Browser Enforcement
        Detects browser name and version
        Blocks non-Chrome browsers
        Logs unsupported access attempts
2️⃣ Fullscreen Enforcement
        Requires fullscreen to start test
        Logs fullscreen exit attempts
Counts violations
3️⃣ Tab / Focus Monitoring
        Detects tab switching using Page Visibility API
Logs violations in real-time
4️⃣ Unified Event Logging
        Each event includes:
        eventType
        timestamp
        attemptId
        questionId (if applicable)
        metadata
        Example:
        Copy code
        Json
        {
        "eventType": "ANSWER_SELECTED",
        "timestamp": "2026-02-12T12:30:10.123Z",
        "attemptId": "ATTEMPT_abc123",
        "questionId": "Q1",
        "metadata": {
            "selectedOption": "22"
        }
        }
5️⃣ Violation System
        Maximum violations allowed: 3
        On reaching limit:
        Test force-submits
        Logs final event
        Locks session
6️⃣ Timer System
        30-minute countdown
        Auto-submit on expiry
Logs timer start and expiration
7️⃣ Persistent Logging
        Logs stored in localStorage
        Survive page refresh
        Prevent data loss
8️⃣ Batched Backend Sync
        Logs sent every 10 seconds
        Final batch sent on submission
        Uses mock backend API
        Clears logs only after successful send
9️⃣ Immutability Enforcement
                    After submission:
                    Logging stops
                    Monitoring stops
                    Attempt is locked
                    No further modifications allowed
                    🛠 Tech Stack
                    React (Vite)
                    JavaScript (ES6+)
                    Browser APIs:
                    Fullscreen API
                    Page Visibility API
                    beforeunload event
                    LocalStorage
                    Fetch API
                    Vercel (Deployment)
                    Mock API backend