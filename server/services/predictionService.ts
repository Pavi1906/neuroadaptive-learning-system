export function predictRevision({ retention, threshold = 0.6 }: { retention: number, threshold?: number }) {
  if (retention < threshold) {
    return {
      status: "CRITICAL",
      message: "Revise immediately",
      priority: 1
    };
  }

  if (retention < threshold + 0.2) {
    return {
      status: "WARNING",
      message: "Revise soon",
      priority: 2
    };
  }

  return {
    status: "OPTIMAL",
    message: "No revision needed",
    priority: 3
  };
}

export function calculateConfidence({ attempts, variance }: { attempts: number, variance: number }) {
  // simple confidence metric
  const confidence = Math.min(1, (attempts / 10) * (1 - variance));
  return Number((confidence * 100).toFixed(2));
}
