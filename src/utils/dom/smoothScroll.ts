import { system } from 'const';

// Easing function: easeInOutCubic
// From: https://gist.github.com/gre/1650294
function easing(t: number) {
  // eslint-disable-next-line @typescript-eslint/no-magic-numbers
  return t < 0.5 ? 4 * t * t * t : (t - 1) * (2 * t - 2) * (2 * t - 2) + 1;
}

export function smoothScroll(
  targetTop: number,
  duration: number = system.SMOOTH_SCROLL_DURATION,
  container?: any
): Promise<void> {
  return new Promise((resolve) => {
    const startingY = container?.scrollTop || window.pageYOffset;
    const distance = targetTop - startingY;

    if (distance === 0) return;

    let startTime = 0;

    window.requestAnimationFrame(function step(timestamp) {
      if (!startTime) startTime = timestamp;

      const timeElapsed = timestamp - startTime;
      const progress = easing(Math.min(timeElapsed / duration, 1));

      (container || window).scrollTo(0, startingY + distance * progress);

      if (timeElapsed < duration) window.requestAnimationFrame(step);
      else resolve();
    });
  });
}
