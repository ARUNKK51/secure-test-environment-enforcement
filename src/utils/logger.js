const STORAGE_KEY = "SECURE_TEST_LOGS";
const LOCK_KEY = "SECURE_TEST_LOCK";
const API_URL = "https://6986276d6964f10bf255a5dd.mockapi.io/logs"; 

let logs = JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
let isLocked = JSON.parse(localStorage.getItem(LOCK_KEY)) || false;

/* ---------- LOG EVENT ---------- */

export function logEvent(eventType, attemptId, questionId, metadata = {}) {
  if (isLocked) {
    console.warn("🚫 Attempt locked. No new logs allowed.");
    return;
  }

  const event = {
    eventType,
    timestamp: new Date().toString(),
    attemptId,
    questionId,
    metadata
  };

  logs.push(event);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(logs));

  console.log("✅ LOGGED:", event);
}

/* ---------- SEND BATCH ---------- */

export async function sendLogsBatch() {
  if (logs.length === 0) {
    console.log("ℹ No logs to send.");
    return;
  }

  console.log("🚀 Sending batch:", logs);

  try {
    const response = await fetch(API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ logs })
    });

    if (!response.ok) {
      throw new Error("Server error");
    }

    console.log("✅ Batch sent successfully.");

    // Clear logs ONLY after success
    logs = [];
    localStorage.removeItem(STORAGE_KEY);

  } catch (err) {
    console.error("❌ Batch failed. Will retry later.", err);
  }
}

/* ---------- LOCK ATTEMPT ---------- */

export function lockAttempt() {
  isLocked = true;
  localStorage.setItem(LOCK_KEY, JSON.stringify(true));
  console.log("🔒 Attempt locked.");
}

/* ---------- RESET LOCK (For Dev Testing) ---------- */

export function resetAttemptLock() {
  isLocked = false;
  localStorage.removeItem(LOCK_KEY);
  console.log("🔓 Attempt lock reset.");
}

/* ---------- CHECK LOCK ---------- */

export function isAttemptLocked() {
  return isLocked;
}
