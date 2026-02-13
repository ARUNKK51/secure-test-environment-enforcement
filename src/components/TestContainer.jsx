import { useEffect, useState } from "react";
import "./TestContainer.css";
import {
  logEvent,
  sendLogsBatch,
  lockAttempt,
  isAttemptLocked,
  resetAttemptLock
} from "../utils/logger";

const TEST_DURATION_SECONDS = 30 * 60;
const MAX_VIOLATIONS = 3;

/* ----------  QUESTIONS ---------- */

const QUESTIONS = [
  {
    id: "Q1",
    question: "What is the output of 2 + '2' in JavaScript?",
    options: ["4", "22", "NaN", "undefined"]
  },
  {
    id: "Q2",
    question: "Which hook is used for side effects in React?",
    options: ["useState", "useEffect", "useRef", "useMemo"]
  },
  {
    id: "Q3",
    question: "Which company developed React?",
    options: ["Google", "Facebook", "Microsoft", "Amazon"]
  },
  {
    id: "Q4",
    question: "Which keyword declares a block-scoped variable?",
    options: ["var", "let", "const", "both let and const"]
  },
  {
    id: "Q5",
    question: "Which method converts JSON string into object?",
    options: ["JSON.parse()", "JSON.stringify()", "parse.JSON()", "toObject()"]
  },
  {
    id: "Q6",
    question: "Which HTML tag is used for hyperlink?",
    options: ["<a>", "<link>", "<href>", "<nav>"]
  },
  {
    id: "Q7",
    question: "Which CSS property controls text size?",
    options: ["font-style", "font-weight", "font-size", "text-style"]
  },
  {
    id: "Q8",
    question: "What does JSX stand for?",
    options: ["JavaScript XML", "Java Syntax Extension", "JSON XML", "JavaScript Extension"]
  },
  {
    id: "Q9",
    question: "Which array method creates a new array with modified values?",
    options: ["forEach()", "map()", "filter()", "reduce()"]
  },
  {
    id: "Q10",
    question: "Which lifecycle hook replaces componentDidMount in hooks?",
    options: ["useEffect", "useState", "useRef", "useCallback"]
  },
  {
    id: "Q11",
    question: "Which operator checks both value and type?",
    options: ["==", "=", "===", "!="]
  },
  {
    id: "Q12",
    question: "Which CSS layout uses rows and columns?",
    options: ["Flexbox", "Grid", "Block", "Inline"]
  },
  {
    id: "Q13",
    question: "Which method removes last element from array?",
    options: ["pop()", "push()", "shift()", "slice()"]
  },
  {
    id: "Q14",
    question: "Which hook stores mutable values without re-render?",
    options: ["useEffect", "useState", "useRef", "useMemo"]
  },
  {
    id: "Q15",
    question: "What does DOM stand for?",
    options: ["Document Object Model", "Data Object Model", "Document Order Model", "Display Object Management"]
  },
  {
    id: "Q16",
    question: "Which event detects tab switching?",
    options: ["click", "visibilitychange", "mouseover", "keydown"]
  },
  {
    id: "Q17",
    question: "Which CSS property centers flex items?",
    options: ["align-items", "justify-content", "display", "float"]
  },
  {
    id: "Q18",
    question: "Which keyword prevents reassignment?",
    options: ["let", "var", "const", "static"]
  },
  {
    id: "Q19",
    question: "Which React hook updates state?",
    options: ["useEffect", "useState", "useRef", "useReducer"]
  },
  {
    id: "Q20",
    question: "Which HTTP method retrieves data?",
    options: ["POST", "PUT", "GET", "DELETE"]
  },
  {
    id: "Q21",
    question: "Which array method filters elements?",
    options: ["map()", "filter()", "reduce()", "push()"]
  },
  {
    id: "Q22",
    question: "Which CSS unit is relative to root font size?",
    options: ["px", "em", "rem", "%"]
  },
  {
    id: "Q23",
    question: "Which hook is used for memoization?",
    options: ["useState", "useMemo", "useEffect", "useRef"]
  },
  {
    id: "Q24",
    question: "Which function delays execution?",
    options: ["setTimeout", "setInterval", "delay()", "wait()"]
  },
  {
    id: "Q25",
    question: "Which attribute makes input mandatory?",
    options: ["required", "validate", "must", "mandatory"]
  },
  {
    id: "Q26",
    question: "Which method converts object to JSON string?",
    options: ["JSON.parse()", "JSON.stringify()", "toJSON()", "stringify.JSON()"]
  },
  {
    id: "Q27",
    question: "Which property changes background color?",
    options: ["color", "bgcolor", "background-color", "background-style"]
  },
  {
    id: "Q28",
    question: "Which operator spreads array elements?",
    options: ["...", "&&", "||", "??"]
  },
  {
    id: "Q29",
    question: "Which hook handles complex state logic?",
    options: ["useReducer", "useEffect", "useRef", "useState"]
  },
  {
    id: "Q30",
    question: "Which method adds element to end of array?",
    options: ["push()", "pop()", "shift()", "splice()"]
  },
  {
    id: "Q31",
    question: "Which HTML element defines navigation links?",
    options: ["<nav>", "<menu>", "<header>", "<section>"]
  },
  {
    id: "Q32",
    question: "Which CSS property controls stacking order?",
    options: ["position", "z-index", "overflow", "display"]
  },
  {
    id: "Q33",
    question: "Which JavaScript keyword creates a class?",
    options: ["function", "class", "object", "prototype"]
  },
  {
    id: "Q34",
    question: "Which hook runs only once on mount?",
    options: ["useEffect([])", "useState()", "useRef()", "useMemo()"]
  },
  {
    id: "Q35",
    question: "Which event triggers on form submission?",
    options: ["onClick", "onSubmit", "onChange", "onLoad"]
  },
  {
    id: "Q36",
    question: "Which method combines arrays?",
    options: ["join()", "concat()", "merge()", "append()"]
  },
  {
    id: "Q37",
    question: "Which CSS property sets element display type?",
    options: ["display", "position", "float", "visibility"]
  },
  {
    id: "Q38",
    question: "Which keyword handles errors?",
    options: ["catch", "throw", "try", "try-catch"]
  },
  {
    id: "Q39",
    question: "Which React feature improves performance?",
    options: ["Virtual DOM", "Real DOM", "Shadow DOM", "Document Fragment"]
  },
  {
    id: "Q40",
    question: "Which operator provides default value?",
    options: ["??", "||", "&&", "=="]
  },
  {
    id: "Q41",
    question: "Which hook references DOM element?",
    options: ["useEffect", "useRef", "useState", "useMemo"]
  },
  {
    id: "Q42",
    question: "Which method removes first element of array?",
    options: ["shift()", "pop()", "splice()", "slice()"]
  },
  {
    id: "Q43",
    question: "Which CSS property makes element flexible?",
    options: ["flex", "grid", "float", "position"]
  },
  {
    id: "Q44",
    question: "Which API detects page visibility?",
    options: ["Fullscreen API", "Clipboard API", "Page Visibility API", "Storage API"]
  },
  {
    id: "Q45",
    question: "Which method prevents default event behavior?",
    options: ["stopPropagation()", "preventDefault()", "stop()", "cancelEvent()"]
  }
];


export default function TestContainer({ attemptId }) {
  const [started, setStarted] = useState(false);
  const [timeLeft, setTimeLeft] = useState(TEST_DURATION_SECONDS);
  const [violations, setViolations] = useState(0);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState({});

  /* ---------- START TEST ---------- */

  const handleStartTest = async () => {
    try {
      await document.documentElement.requestFullscreen();
      logEvent("FULLSCREEN_ENTER", attemptId, null, {});
    } catch {}

    logEvent("TEST_STARTED", attemptId, null, {});
    logEvent("TIMER_STARTED", attemptId, null, {
      durationSeconds: TEST_DURATION_SECONDS
    });

    setStarted(true);
  };

  /* ---------- TIMER ---------- */

  useEffect(() => {
    if (!started) return;

    const interval = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          handleForceSubmit("TIME_EXPIRED");
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [started]);

  /* ---------- MONITORING ---------- */

  useEffect(() => {
    if (!started || isAttemptLocked()) return;

    const registerViolation = (type) => {
      logEvent(type, attemptId, null, { violation: true });

      setViolations((prev) => {
        const newCount = prev + 1;
        if (newCount >= MAX_VIOLATIONS) {
          handleForceSubmit("MAX_VIOLATIONS_REACHED");
        }
        return newCount;
      });
    };

    const handleFullscreenChange = () => {
      if (!document.fullscreenElement) {
        registerViolation("FULLSCREEN_EXIT");
      }
    };

    const handleVisibilityChange = () => {
      if (document.hidden) {
        registerViolation("TAB_SWITCH");
      }
    };

    document.addEventListener("fullscreenchange", handleFullscreenChange);
    document.addEventListener("visibilitychange", handleVisibilityChange);

    return () => {
      document.removeEventListener("fullscreenchange", handleFullscreenChange);
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, [started]);

  /* ---------- ANSWER SELECTION ---------- */

  const handleSelectAnswer = (option) => {
    const questionId = QUESTIONS[currentIndex].id;

    setAnswers((prev) => ({
      ...prev,
      [questionId]: option
    }));

    logEvent("ANSWER_SELECTED", attemptId, questionId, {
      selectedOption: option
    });
  };

  /* ---------- FORCE SUBMIT ---------- */

  const handleForceSubmit = async (reason) => {
    logEvent("FORCE_SUBMITTED", attemptId, null, { reason });

    await sendLogsBatch();
    lockAttempt();
    setStarted(false);
  };

  /* ---------- RESET ---------- */

  const handleReset = () => {
    resetAttemptLock();
    localStorage.removeItem("SECURE_TEST_LOGS");
    window.location.reload();
  };

  /* ---------- FORMAT TIME ---------- */

  const formatTime = (s) => {
    const m = Math.floor(s / 60);
    const sec = s % 60;
    return `${m}:${sec.toString().padStart(2, "0")}`;
  };

  /* ---------- COMPLETED SCREEN ---------- */

  if (!started && isAttemptLocked()) {
    return (
      <div>
        <h2>Test Completed</h2>
        <button onClick={handleReset}>Start New Attempt</button>
      </div>
    );
  }

  /* ---------- START SCREEN ---------- */

  if (!started) {
    return (
      <div>
        <h1>Secure Test Environment</h1>
        <button onClick={handleStartTest}>Start Test</button>
      </div>
    );
  }

  /* ---------- TEST SCREEN ---------- */

  const currentQuestion = QUESTIONS[currentIndex];

  return (
    <div className="test-wrapper">
      <h2>Time Left: {formatTime(timeLeft)}</h2>

      <p style={{ color: violations > 0 ? "red" : "green" }}>
        Violations: {violations} / {MAX_VIOLATIONS}
      </p>

      <hr />

      <h3>
        Question {currentIndex + 1} of {QUESTIONS.length}
      </h3>

      <p>{currentQuestion.question}</p>

      {currentQuestion.options.map((option, index) => (
        <div key={index}>
          <label>
            <input
              type="radio"
              name={currentQuestion.id}
              value={option}
              checked={answers[currentQuestion.id] === option}
              onChange={() => handleSelectAnswer(option)}
            />
            {option}
          </label>
        </div>
      ))}

      <br />

      <button
        disabled={currentIndex === 0}
        onClick={() => setCurrentIndex((prev) => prev - 1)}
      >
        Previous
      </button>

      <button
        disabled={currentIndex === QUESTIONS.length - 1}
        onClick={() => setCurrentIndex((prev) => prev + 1)}
      >
        Next
      </button>
    </div>
  );
}
