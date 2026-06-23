import { onCLS, onINP, onLCP, onFCP, onTTFB } from 'web-vitals'

function log(metric) {
  // In development, log to console
  if (import.meta.env.DEV) {
    console.log(`[Web Vitals] ${metric.name}:`, metric.value.toFixed(2), metric)
  }

  // In production, you can send to analytics endpoint
  // Example: sendToAnalytics(metric)
}

export function reportWebVitals() {
  onCLS(log)
  onINP(log)
  onLCP(log)
  onFCP(log)
  onTTFB(log)
}
