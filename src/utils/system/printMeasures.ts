import { TypeRouteValues } from 'routes';

function parseDuration(duration: number) {
  const TIMING_PRECISION = 3;

  return Number(duration.toFixed(TIMING_PRECISION));
}

export function printMeasures({ currentRoute }: { currentRoute: Omit<TypeRouteValues, 'loader'> }) {
  const customClientMeasures = performance
    .getEntriesByType('measure')
    .reduce((acc, item) => ({ ...acc, [item.name]: parseDuration(item.duration) }), {});

  // eslint-disable-next-line prefer-destructuring
  const navigationTiming = performance.getEntriesByType(
    'navigation'
  )[0] as PerformanceNavigationTiming;
  const loggedNavigationKeys = [
    'domComplete',
    'responseStart',
    'domInteractive',
    'domainLookupEnd',
    'domContentLoadedEventEnd',
  ] as Array<keyof PerformanceNavigationTiming>;
  const navigationMeasures = loggedNavigationKeys.reduce(
    (acc, key: keyof PerformanceNavigationTiming) => ({
      ...acc,
      [key]: parseDuration(navigationTiming[key] as number),
    }),
    {} as Record<keyof typeof loggedNavigationKeys, number>
  );

  const measures = {
    server: window.MEASURES.server,
    client: { ...navigationMeasures, ...customClientMeasures },
    currentRoute,
    userAgent: navigator.userAgent,
  };

  // eslint-disable-next-line no-console
  console.log(JSON.stringify(measures, null, 2));
}
