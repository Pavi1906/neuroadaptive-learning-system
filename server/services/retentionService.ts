export function calculateRetention({ lambda, timeGap, performance }: { lambda: number, timeGap: number, performance: number }) {
  // Avoid divide by zero
  const perf = performance || 0.5;
  const retention = Math.exp(-(lambda * timeGap) / perf);
  return Number(retention.toFixed(4));
}

export function updateLambda({ currentLambda, performance }: { currentLambda: number, performance: number }) {
  // Adaptive learning rate
  let newLambda;
  if (performance < 0.5) {
    newLambda = currentLambda * 1.15; // forgets faster
  } else if (performance > 0.8) {
    newLambda = currentLambda * 0.85; // retains better
  } else {
    newLambda = currentLambda;
  }
  return Number(newLambda.toFixed(4));
}
