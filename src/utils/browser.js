export function detectBrowser() {
  const ua = navigator.userAgent;

  if (ua.includes("Chrome") && !ua.includes("Edg")) {
    return {
      name: "Google Chrome",
      version: ua.match(/Chrome\/(\d+)/)?.[1] || "unknown"
    };
  }

  return {
    name: "Unsupported Browser",
    version: "unknown"
  };
}
