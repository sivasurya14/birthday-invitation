interface CalendarEventProps {
  title: string;
  description: string;
  startISO: string;
  durationMinutes?: number;
  location: string;
}

export function downloadICS({ 
  title, 
  description, 
  startISO, 
  durationMinutes = 180, 
  location 
}: CalendarEventProps) {
  const start = new Date(startISO);
  const end = new Date(start.getTime() + durationMinutes * 60000);
  
  const toICS = (d: Date) => d.toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z';
  
  const ics = [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    'PRODID:-//Birthday Invite//Birthday Invite//EN',
    'BEGIN:VEVENT',
    `DTSTART:${toICS(start)}`,
    `DTEND:${toICS(end)}`,
    `SUMMARY:${title}`,
    `DESCRIPTION:${description}`,
    `LOCATION:${location}`,
    'END:VEVENT',
    'END:VCALENDAR'
  ].join('\n');
  
  const blob = new Blob([ics], { type: 'text/calendar;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = 'birthday-invite.ics';
  a.click();
  URL.revokeObjectURL(url);
}