import { useRef, useCallback } from 'react';

export function useDeleteTimers() {
  const timersRef = useRef<Map<number, NodeJS.Timeout>>(new Map());

  const schedule = useCallback((id: number, callback: () => void, delay = 5000) => {
    if (timersRef.current.has(id)) return;
    const t = setTimeout(() => {
      callback();
      timersRef.current.delete(id);
    }, delay);
    timersRef.current.set(id, t);
  }, []);

  const cancel = useCallback((id: number) => {
    const t = timersRef.current.get(id);
    if (t) {
      clearTimeout(t);
      timersRef.current.delete(id);
    }
  }, []);

  const cleanup = useCallback(() => {
    timersRef.current.forEach((t) => clearTimeout(t));
    timersRef.current.clear();
  }, []);

  return { schedule, cancel, cleanup };
}