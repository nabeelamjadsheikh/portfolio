'use client';

import { useEffect, useState } from 'react';

// True only on devices with a precise pointer (mouse/trackpad). Used to gate
// cursor and magnetic effects so touch devices are never affected.
export function useFinePointer() {
  const [fine, setFine] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia('(pointer: fine) and (hover: hover)');
    const update = () => setFine(mq.matches);
    update();
    mq.addEventListener('change', update);
    return () => mq.removeEventListener('change', update);
  }, []);

  return fine;
}
