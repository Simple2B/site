"use client";

import { useLayoutEffect } from 'react';

/*
Expected global style for body element

.blocked {
  overflow: hidden;
  position: relative;
  touch-action: none;
  -ms-touch-action: none;
}
*/

export const useLockBodyScroll = (isActive: boolean) => {
  useLayoutEffect(() => {
    document.body.className = isActive ? 'blocked' : '';
  }, [isActive]);
};
