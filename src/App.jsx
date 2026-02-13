import { useEffect, useState } from "react";
import { detectBrowser } from "./utils/browser";
import { createAttemptId } from "./utils/attempt";
import { logEvent } from "./utils/logger";
import BlockedScreen from "./components/BlockedScreen";
import TestContainer from "./components/TestContainer";

function App() {
  const [isAllowed, setIsAllowed] = useState(null);
  const [attemptId, setAttemptId] = useState(null);

  useEffect(() => {
    const browser = detectBrowser();
    const id = createAttemptId();

    setAttemptId(id);

    logEvent("BROWSER_DETECTED", id, null, { browser });

    if (browser.name !== "Google Chrome") {
      logEvent("BROWSER_BLOCKED", id, null, {
        reason: "UNSUPPORTED_BROWSER"
      });
      setIsAllowed(false);
    } else {
      setIsAllowed(true);
    }
  }, []);

  if (isAllowed === null) return null;

  return isAllowed ? (
    <TestContainer attemptId={attemptId} />
  ) : (
    <BlockedScreen />
  );
}

export default App;
