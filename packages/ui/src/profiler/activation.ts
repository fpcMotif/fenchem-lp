export function isProfilerEnabled(): boolean {
  if (typeof window === "undefined") {
    const globalObj = globalThis as unknown as {
      process?: { env?: Record<string, string | undefined> };
    };
    const envVal = globalObj.process?.env?.PROFILER_ENABLED;
    return envVal === "1" || envVal === "true";
  }

  try {
    const params = new URLSearchParams(window.location.search);
    const queryVal = params.get("profiler");
    if (queryVal === "1" || queryVal === "true") {
      return true;
    }
  } catch {
    // ignore
  }

  try {
    const win = window as unknown as { __PROFILER_ENABLED__?: boolean };
    if (win.__PROFILER_ENABLED__ === true) {
      return true;
    }
  } catch {
    // ignore
  }

  return false;
}
