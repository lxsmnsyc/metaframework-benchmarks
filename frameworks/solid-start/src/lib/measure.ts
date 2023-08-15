import {
  onCLS,
  type CLSMetric,
  type FCPMetric,
  type FIDMetric,
  type INPMetric,
  type LCPMetric,
  type TTFBMetric,
  onFCP,
  onFID,
  onINP,
  onLCP,
  onTTFB,
} from 'web-vitals';

type WebVitalsMetric =
  | CLSMetric
  | FCPMetric
  | FIDMetric
  | INPMetric
  | LCPMetric
  | TTFBMetric;

type WebVitalsCode = WebVitalsMetric['name'];

if (typeof window !== 'undefined') {
  const flags = new Set<WebVitalsCode>(['CLS', 'FCP', 'FID', 'INP', 'LCP', 'TTFB']);
  const measurements: WebVitalsMetric[] = [];

  const capture = (value: WebVitalsMetric): void => {
    if (flags.size) {
      console.log('CAPTURED', value.name);
      flags.delete(value.name);
      measurements.push(value);
      if (flags.size === 0) {
        const el = document.createElement('script');
        el.id = 'web-vitals';
        el.style.display = 'hidden';
        el.innerText = JSON.stringify(measurements);
        document.head.appendChild(el);
      }
    }
  };

  // On-load
  onFCP(capture);
  onTTFB(capture);
  // input?
  onLCP(capture);
  onFID(capture);
  // page visibility
  onCLS(capture);
  onINP(capture);
}
