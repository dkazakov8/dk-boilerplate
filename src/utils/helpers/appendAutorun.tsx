import { autorun, IReactionDisposer } from 'mobx';
import { Component } from 'react';

export function appendAutorun(
  ctx: Component & { autorunDisposers?: Array<IReactionDisposer> },
  fn: () => void,
  options?: { throttleTimeout?: number }
) {
  const disposer = autorun(fn, { delay: options?.throttleTimeout || 0 });

  if (!ctx.autorunDisposers) {
    Object.defineProperty(ctx, 'autorunDisposers', { value: [] });
  }

  ctx.autorunDisposers!.push(disposer);

  const original = ctx.componentWillUnmount ? ctx.componentWillUnmount.bind(ctx) : null;

  Object.defineProperty(ctx, 'componentWillUnmount', {
    value: function componentWillUnmount() {
      ctx.autorunDisposers!.forEach((d) => d());
      if (original) original();
    },
    writable: true,
  });
}
