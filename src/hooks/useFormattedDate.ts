import { useMemo } from 'react';

export function useFormattedDate(dateISO: string) {
  return useMemo(() => {
    const d = new Date(dateISO);
    const day = d.toLocaleDateString(undefined, { weekday: 'long' });
    const date = d.toLocaleDateString(undefined, { 
      day: 'numeric', 
      month: 'long', 
      year: 'numeric' 
    });
    const time = d.toLocaleTimeString(undefined, { 
      hour: 'numeric', 
      minute: '2-digit' 
    });
    return { day, date, time };
  }, [dateISO]);
}