import { useState, useEffect } from 'react';

export function useCountdown(targetISO: string) {
  const [diff, setDiff] = useState(() => new Date(targetISO).getTime() - Date.now());
  
  useEffect(() => {
    const interval = setInterval(() => {
      setDiff(new Date(targetISO).getTime() - Date.now());
    }, 1000);
    
    return () => clearInterval(interval);
  }, [targetISO]);
  
  const clamp = (n: number) => Math.max(0, n);
  const days = clamp(Math.floor(diff / (1000 * 60 * 60 * 24)));
  const hours = clamp(Math.floor((diff / (1000 * 60 * 60)) % 24));
  const minutes = clamp(Math.floor((diff / (1000 * 60)) % 60));
  const seconds = clamp(Math.floor((diff / 1000) % 60));
  
  return { days, hours, minutes, seconds };
}